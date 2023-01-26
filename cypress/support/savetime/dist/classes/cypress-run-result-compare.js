"use strict";
exports.__esModule = true;
exports.TestResultCompare = exports.RunResultCompare = exports.CypressRunResultCompare = exports.CypressDifference = void 0;
var CypressDifference;
(function (CypressDifference) {
    CypressDifference["NO_DIFFERENCE"] = "noDifference";
    CypressDifference["NOT_FOUND_FIRST"] = "notFoundFirst";
    CypressDifference["NOT_FOUND_SECOND"] = "notFoundSecond";
})(CypressDifference = exports.CypressDifference || (exports.CypressDifference = {}));
var CypressRunResultCompare = /** @class */ (function () {
    function CypressRunResultCompare() {
        this.durationDifference = 0;
        this.runs = [];
    }
    return CypressRunResultCompare;
}());
exports.CypressRunResultCompare = CypressRunResultCompare;
var RunResultCompare = /** @class */ (function () {
    function RunResultCompare() {
        this.durationDifference = 0;
        this.tests = [];
        this.name = '';
        this.differenceDetectedMessage = CypressDifference.NO_DIFFERENCE;
    }
    return RunResultCompare;
}());
exports.RunResultCompare = RunResultCompare;
var TestResultCompare = /** @class */ (function () {
    function TestResultCompare() {
        this.title = [];
        this.durationDifference = 0;
        this.attemptCountRun1 = 0;
        this.attemptCountRun2 = 0;
        this.differenceDetectedMessage = CypressDifference.NO_DIFFERENCE;
    }
    return TestResultCompare;
}());
exports.TestResultCompare = TestResultCompare;
//# sourceMappingURL=cypress-run-result-compare.js.map