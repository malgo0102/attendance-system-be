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
//import ClassCourses from 'ClassCourses';
var Class = /** @class */ (function (_super) {
    __extends(Class, _super);
    function Class() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // todo: classCourses?: ClassCourses[]
    Class.tableName = 'classes';
    // this object defines the relations to other models.
    Class.relationMappings = function () { return ({
        users: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: User_1.default,
            join: {
                from: 'classes.id',
                to: 'users.userId'
            }
        }
        // todo: define here relation with ClassCourses
    }); };
    Class.columnNameMappers = objection_1.snakeCaseMappers();
    return Class;
}(objection_1.Model));
exports.default = Class;
