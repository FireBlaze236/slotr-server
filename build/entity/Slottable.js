"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slottable = void 0;
var Timetable_1 = require("./Timetable");
var typeorm_1 = require("typeorm");
var Slottable = /** @class */ (function () {
    function Slottable() {
        this.title = '';
        this.row = -1;
        this.col = -1;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Slottable.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Slottable.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Slottable.prototype, "row", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Slottable.prototype, "col", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (t) { return Timetable_1.Timetable; }),
        __metadata("design:type", Timetable_1.Timetable)
    ], Slottable.prototype, "timetable", void 0);
    Slottable = __decorate([
        (0, typeorm_1.Entity)()
    ], Slottable);
    return Slottable;
}());
exports.Slottable = Slottable;
