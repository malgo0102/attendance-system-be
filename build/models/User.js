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
var Class_1 = __importDefault(require("./Class"));
var Attendance_1 = __importDefault(require("./Attendance"));
//import Course from 'Course';
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // todo: courses?: Course[]
    User.tableName = 'users';
    // this object defines the relations to other models.
    User.relationMappings = function () { return ({
        classes: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: Class_1.default,
            join: {
                from: 'users.classId',
                to: 'classes.id'
            }
        },
        attendances: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: Attendance_1.default,
            join: {
                from: 'users.id',
                to: 'attendances.userId'
            }
        }
        // todo: define here relation with Course table
    }); };
    User.columnNameMappers = objection_1.snakeCaseMappers();
    return User;
}(objection_1.Model));
exports.default = User;
