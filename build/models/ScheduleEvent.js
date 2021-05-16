"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var objection_1 = require("objection");
var Attendance_1 = __importDefault(require("./Attendance"));
var ClassCourse_1 = __importDefault(require("./ClassCourse"));
var ScheduleEvent = /** @class */ (function (_super) {
    __extends(ScheduleEvent, _super);
    function ScheduleEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScheduleEvent.tableName = 'schedule_events';
    // this object defines the relations to other models.
    ScheduleEvent.relationMappings = function () { return ({
        attendances: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: Attendance_1.default,
            join: {
                from: 'schedule_events.id',
                to: 'attendances.attendanceId',
            },
        },
        classCourses: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: ClassCourse_1.default,
            join: {
                from: 'schedule_events.classCourseId',
                to: 'class_courses.id',
            },
        },
    }); };
    ScheduleEvent.columnNameMappers = objection_1.snakeCaseMappers();
    return ScheduleEvent;
}(objection_1.Model));
exports.default = ScheduleEvent;
