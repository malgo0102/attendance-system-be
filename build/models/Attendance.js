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
var User_1 = __importDefault(require("./User"));
//import ScheduleEvent from './ScheduleEvent'
var Attendance = /** @class */ (function (_super) {
    __extends(Attendance, _super);
    function Attendance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // todo: schedules?: ScheduleEvent[]
    Attendance.tableName = 'attendances';
    // this object defines the relations to other models.
    Attendance.relationMappings = function () { return ({
        user: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: User_1.default,
            join: {
                from: 'attendances.userId',
                to: 'users.id'
            }
        }
        // todo: define here relation with ScheduleEvents table
    }); };
    Attendance.columnNameMappers = objection_1.snakeCaseMappers();
    return Attendance;
}(objection_1.Model));
exports.default = Attendance;
