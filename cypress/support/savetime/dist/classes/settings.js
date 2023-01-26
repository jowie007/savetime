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
exports.__esModule = true;
exports.INITIAL_SETTINGS = exports.Settings = exports.SaveSettings = void 0;
var cypress_log_type_1 = require("./cypress-log-type");
var locale_1 = require("./locale");
var SaveSettings = /** @class */ (function () {
    function SaveSettings(locale, type, maxDurationDifference, maxDurationDifferencePercentage, percentageValues, onlyCriticalTests) {
        this.locale = locale;
        this.type = type;
        this.maxDurationDifference = maxDurationDifference;
        this.maxDurationDifferencePercentage = maxDurationDifferencePercentage;
        this.percentageValues = percentageValues;
        this.onlyCriticalTests = onlyCriticalTests;
    }
    return SaveSettings;
}());
exports.SaveSettings = SaveSettings;
var Settings = /** @class */ (function (_super) {
    __extends(Settings, _super);
    function Settings(locale, type, maxDurationDifference, maxDurationDifferencePercentage, percentageValues, onlyCriticalTests) {
        var _this = _super.call(this, locale, type, maxDurationDifference, maxDurationDifferencePercentage, percentageValues, onlyCriticalTests) || this;
        _this.compareSpans = false;
        return _this;
    }
    return Settings;
}(SaveSettings));
exports.Settings = Settings;
exports.INITIAL_SETTINGS = {
    locale: locale_1.Locale.EN,
    type: cypress_log_type_1.CypressLogType.e2e,
    maxDurationDifference: 1000,
    maxDurationDifferencePercentage: 200,
    compareSpans: false,
    percentageValues: false,
    onlyCriticalTests: false
};
//# sourceMappingURL=settings.js.map