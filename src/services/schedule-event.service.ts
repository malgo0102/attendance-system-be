import moment from 'moment';

import ScheduleEvent, { ScheduleEventShape } from '../models/ScheduleEvent';
import { QueryListParams } from '../types/interfaces/QueryListParams';
import { applyListParams } from '../util/apply-list-params';
import { ListResponse } from '../types/interfaces/ListResponse';
import APIError from '../errors/api-error';
import * as coursesService from './courses.service';

export async function create(
  scheduleEvent: ScheduleEventShape & { repeatWeekly: boolean; until: Date },
) {
  if (scheduleEvent.repeatWeekly) {
    const events: Partial<ScheduleEventShape>[] = [];
    events.push({
      courseId: scheduleEvent.courseId,
      start: scheduleEvent.start,
      end: scheduleEvent.end,
    });
    let newEvent = {
      courseId: scheduleEvent.courseId,
      start: moment(scheduleEvent.start)
        .add(1, 'week')
        .toDate(),
      end: moment(scheduleEvent.end)
        .add(1, 'week')
        .toDate(),
    };
    while (moment(newEvent.end).isBefore(moment(scheduleEvent.until))) {
      events.push(newEvent);
      newEvent = {
        courseId: scheduleEvent.courseId,
        start: moment(newEvent.start)
          .add(1, 'week')
          .toDate(),
        end: moment(newEvent.end)
          .add(1, 'week')
          .toDate(),
      };
    }
    return Promise.all(events.map(e => ScheduleEvent.query().insert(e)));
  }
  return ScheduleEvent.query().insert({
    start: scheduleEvent.start,
    end: scheduleEvent.end,
    courseId: scheduleEvent.courseId,
  });
}

export async function getAll(
  listParams?: QueryListParams,
): Promise<ListResponse<ScheduleEvent>> {
  const { count: totalCount } = (await ScheduleEvent.query()
    .count()
    .first()) as any;
  let query = ScheduleEvent.query().withGraphFetched('course');
  if (listParams) {
    if (listParams.filter && listParams.filter.length === 2) {
      if (listParams.filter[0] === 'teacher_id') {
        query = query
          .joinRelated('course')
          .where('course.teacher_id', listParams.filter[1]);
      }
      if (listParams.filter[0] === 'class_id') {
        query = query
          .joinRelated('course')
          .where('course.class_id', listParams.filter[1]);
      }
      listParams.filter = undefined;
    }
    query = applyListParams(query, listParams);
  }
  const scheduleEvents = await query;
  return {
    data: scheduleEvents,
    pagination: {
      total: totalCount,
      start: listParams?.range ? listParams.range[0] : 0,
      end: listParams?.range
        ? listParams.range[0] + scheduleEvents.length - 1
        : 0,
    },
  };
}
export async function getById(id: string | number) {
  return ScheduleEvent.query().findById(id);
}

export async function update(
  id: string,
  updatedScheduleEvent: ScheduleEventShape,
) {
  const course = await coursesService.getById(updatedScheduleEvent.courseId);
  if (!course) {
    throw APIError.ValidationError('Invalid course');
  }
  return ScheduleEvent.query().patchAndFetchById(id, updatedScheduleEvent);
}

export async function delete_(id: string) {
  return ScheduleEvent.query().deleteById(id);
}
