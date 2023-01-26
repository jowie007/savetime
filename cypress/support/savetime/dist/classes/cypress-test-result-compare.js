"use strict";
exports.__esModule = true;
exports.TestResultCompare = exports.RunResultCompare = exports.CypressRunResultCompare = exports.CypressFailed = exports.CypressDifference = void 0;
var CypressDifference;
(function (CypressDifference) {
    CypressDifference["NO_DIFFERENCE"] = "noDifference";
    CypressDifference["NOT_FOUND_FIRST"] = "notFoundFirst";
    CypressDifference["NOT_FOUND_SECOND"] = "notFoundSecond";
})(CypressDifference = exports.CypressDifference || (exports.CypressDifference = {}));
var CypressFailed;
(function (CypressFailed) {
    CypressFailed["FAILED_NONE"] = "failedNone";
    CypressFailed["FAILED_BOTH"] = "failedBoth";
    CypressFailed["FAILED_FIRST"] = "failedFirst";
    CypressFailed["FAILED_SECOND"] = "failedSecond";
})(CypressFailed = exports.CypressFailed || (exports.CypressFailed = {}));
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
        this.name = "";
        this.differenceDetected = CypressDifference.NO_DIFFERENCE;
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
        this.differenceDetected = CypressDifference.NO_DIFFERENCE;
        this.failDetected = CypressFailed.FAILED_NONE;
    }
    return TestResultCompare;
}());
exports.TestResultCompare = TestResultCompare;
//# sourceMappingURL=cypress-test-result-compare.js.map