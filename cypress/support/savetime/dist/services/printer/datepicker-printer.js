"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.printDatepicker = void 0;
var cypress_file_handler_1 = require("../handler/cypress-file-handler");
var date_handler_1 = require("../handler/date-handler");
var translation_handler_1 = require("../handler/translation-handler");
var cypress_file_store_1 = require("../store/cypress-file-store");
var settings_store_1 = require("../store/settings-store");
var result_printer_1 = require("./result-printer");
var selection__datepicker__day;
var selection__datepicker__buttonsFirst__legend;
var selection__datepicker__buttonsFirst__first;
var selection__datepicker__buttonsFirst__second;
var selection__datepicker__buttonsSecond__legend;
var selection__datepicker__buttonsSecond__first;
var selection__datepicker__buttonsSecond__second;
var selectionDatePickerButtons;
var selection__datepicker__functions__legend;
var selection__datepicker__functions__buttonSwap;
var selection__datepicker__functions__buttonReset;
var selection__datepicker__day__heading;
var selection__datepicker__day__wrapper;
var selection__datepicker__test__heading;
var selection__datepicker__test__wrapper;
var selectedFirstFirst;
var selectedFirstSecond;
var selectedSecondFirst;
var selectedSecondSecond;
var year;
var month;
var day;
var dayFileMap;
var clickedButton;
var shown;
var initializedBefore;
function printDatepicker(reInitPickers) {
    init(reInitPickers);
}
exports.printDatepicker = printDatepicker;
function init(reInitPickers) {
    if (!initializedBefore) {
        initializedBefore = true;
        shown = false;
        selection__datepicker__buttonsFirst__legend = document.getElementById('selection__datepicker__buttonsFirst__legend');
        selection__datepicker__buttonsFirst__first = document.getElementById('selection__datepicker__buttonsFirst__first');
        selection__datepicker__buttonsFirst__second = document.getElementById('selection__datepicker__buttonsFirst__second');
        selection__datepicker__buttonsSecond__legend = document.getElementById('selection__datepicker__buttonsSecond__legend');
        selection__datepicker__buttonsSecond__first = document.getElementById('selection__datepicker__buttonsSecond__first');
        selection__datepicker__buttonsSecond__second = document.getElementById('selection__datepicker__buttonsSecond__second');
        selection__datepicker__functions__legend = document.getElementById('selection__datepicker__functions__legend');
        selection__datepicker__functions__buttonSwap = document.getElementById('selection__datepicker__functions__buttonSwap');
        selection__datepicker__functions__buttonReset = document.getElementById('selection__datepicker__functions__buttonReset');
        selectionDatePickerButtons = [
            selection__datepicker__buttonsFirst__first,
            selection__datepicker__buttonsSecond__first,
            selection__datepicker__buttonsFirst__second,
            selection__datepicker__buttonsSecond__second,
        ];
        initSelectionDatepickerButtons(selectionDatePickerButtons);
        // initSelection__datepicker__buttonFirst__FirstClickListener()
        // initSelection__datepicker__buttonFirst__SecondClickListener()
        // initSelection__datepicker__buttonSecond__FirstClickListener()
        // initSelection__datepicker__buttonSecond__SecondClickListener()
        initselection__datepicker__buttonSwapClickListener();
        initselection__datepicker__buttonResetClickListener();
    }
    else {
        if (shown) {
            initializeDayHeading();
            if (day !== undefined) {
                initializeDatePickerSecondTitle();
            }
        }
    }
    selection__datepicker__buttonsFirst__legend.innerHTML =
        translation_handler_1.translation.selection__datepicker__buttonsFirst__legend;
    selection__datepicker__buttonsSecond__legend.innerHTML =
        translation_handler_1.translation.selection__datepicker__buttonsSecond__legend;
    selection__datepicker__functions__legend.innerHTML =
        translation_handler_1.translation.selection__datepicker__functions__legend;
    selection__datepicker__functions__buttonSwap.innerHTML = translation_handler_1.translation.swap;
    selection__datepicker__functions__buttonReset.innerHTML = translation_handler_1.translation.reset;
    selection__datepicker__day = document.getElementById('selection__datepicker__day');
    selection__datepicker__day__heading = document.getElementById('selection__datepicker__day__heading');
    selection__datepicker__day__wrapper = document.getElementById('selection__datepicker__day__wrapper');
    selection__datepicker__test__heading = document.getElementById('selection__datepicker__test__heading');
    selection__datepicker__test__wrapper = document.getElementById('selection__datepicker__test__wrapper');
    initializeSelectedElements(reInitPickers);
    initializeSpanButtonsVisibility();
    printResultsElement();
}
function initializeSpanButtonsVisibility() {
    var display = (0, settings_store_1.isCompareSpans)() ? 'block' : 'none';
    selection__datepicker__buttonsFirst__second.style.display = display;
    selection__datepicker__buttonsSecond__second.style.display = display;
}
function toggleDatePickerContent(close) {
    if (close === void 0) { close = false; }
    var display;
    if (shown || close) {
        clearDatePickerContent();
        display = 'none';
        shown = false;
    }
    else {
        year = new Date().getFullYear();
        month = new Date().getMonth();
        initializeDatePickerContent();
        display = 'block';
        shown = true;
    }
    selection__datepicker__day.style.display = display;
}
function initializeDayHeading() {
    selection__datepicker__day__heading.innerHTML = getDatePickerFirstTitle();
    initPreviousButtonClickListener();
    initNextButtonClickListener();
}
function initializeDatePickerContent() {
    initializeDayHeading();
    selection__datepicker__day__wrapper.innerHTML = getWeekdayContent();
    selection__datepicker__day__wrapper.innerHTML += getDatePickerSelectContent();
    initDateButtonClickListeners();
}
function clearSelectedClasses() {
    selectionDatePickerButtons.forEach(function (htmlElement) {
        htmlElement.classList.remove('selectedButton');
    });
}
function clearDatePickerContent() {
    clearSelectedClasses();
    day = undefined;
    clickedButton = undefined;
    selection__datepicker__day__heading.innerHTML = '';
    selection__datepicker__day__wrapper.innerHTML = '';
    selection__datepicker__test__heading.innerHTML = '';
    selection__datepicker__test__wrapper.innerHTML = '';
}
function initializeSelectedElements(reInitPickers) {
    var itemsSize = (0, cypress_file_handler_1.getAllFileDetails)((0, settings_store_1.getType)()).size;
    if (reInitPickers || !selectedFirstFirst || !selectedSecondFirst) {
        setSelectedFirstFirst(itemsSize - 1, false);
        setSelectedSecondFirst(itemsSize, !(0, settings_store_1.isCompareSpans)() && reInitPickers);
        toggleDatePickerContent(true);
    }
    if ((0, settings_store_1.isCompareSpans)()) {
        setSelectedFirstSecond(itemsSize - 1, false);
        setSelectedSecondSecond(itemsSize, reInitPickers);
    }
}
function setSelectedItem(htmlElement, key, printResults) {
    if (printResults === void 0) { printResults = true; }
    htmlElement.innerHTML =
        key > 0
            ? (0, date_handler_1.getFormatDateWithPosition)((0, cypress_file_handler_1.getAllFileDetails)((0, settings_store_1.getType)()).get(key), key)
            : '-';
    if (printResults) {
        printResultsElement();
    }
}
function setSelectedFirstFirst(key, printResults) {
    if (printResults === void 0) { printResults = true; }
    setSelectedItem(selection__datepicker__buttonsFirst__first, (selectedFirstFirst = key), printResults);
}
function setSelectedFirstSecond(key, printResults) {
    if (printResults === void 0) { printResults = true; }
    setSelectedItem(selection__datepicker__buttonsFirst__second, (selectedFirstSecond = key), printResults);
}
function setSelectedSecondFirst(key, printResults) {
    if (printResults === void 0) { printResults = true; }
    setSelectedItem(selection__datepicker__buttonsSecond__first, (selectedSecondFirst = key), printResults);
}
function setSelectedSecondSecond(key, printResults) {
    if (printResults === void 0) { printResults = true; }
    setSelectedItem(selection__datepicker__buttonsSecond__second, (selectedSecondSecond = key), printResults);
}
function getDatePickerFirstTitle() {
    return ("<button \n        id='selection__datepicker__navigation__previous'\n        class='selection__datepicker__navigation'\n        />\n        ".concat(translation_handler_1.translation.selection__datepicker__navigation__previous, "\n    </button>") +
        "<h2>".concat(translation_handler_1.translation.months.split(',')[month] +
            ' ' +
            new Date(year, month).getFullYear(), "</h2>") +
        "<button \n        id='selection__datepicker__navigation__next'\n        class='selection__datepicker__navigation'\n        />\n        ".concat(translation_handler_1.translation.selection__datepicker__navigation__next, "\n    </button>"));
}
function getDatePickerSecondTitle() {
    return "<h2>".concat(day +
        '. ' +
        translation_handler_1.translation.months.split(',')[month] +
        ' ' +
        new Date(year, month).getFullYear(), "</h2>");
}
function getDayArray() {
    var firstDayOfMonth = new Date(year, month, 1);
    // 0 -> Mon, 1 -> Tue, 2 -> Wed, 3 -> Thu
    // 4 -> Fri, 5 -> Sat, 6 -> Sun
    var firstDayOfMonthNumber = firstDayOfMonth.getDay() - 1 < 0 ? 6 : firstDayOfMonth.getDay() - 1;
    var days = Array(firstDayOfMonthNumber).fill('');
    days = __spreadArray(__spreadArray([], days, true), getValidDayArray(), true);
    if (days.length % 7 !== 0) {
        days = __spreadArray(__spreadArray([], days, true), Array(7 - (days.length % 7)).fill(''), true);
    }
    return days;
}
function getValidDayArray() {
    var lastDayOfMonth = new Date(year, month, 0);
    var lastDayOfMonthDay = lastDayOfMonth.getDate();
    var days = [];
    var count = 1;
    while (count <= lastDayOfMonthDay) {
        days.push(count.toString());
        count++;
    }
    return days;
}
function getWeekdayContent() {
    var htmlArray = [];
    var weekdays = translation_handler_1.translation.weekdays.split(',');
    var count = 0;
    for (var _i = 0, weekdays_1 = weekdays; _i < weekdays_1.length; _i++) {
        var weekday = weekdays_1[_i];
        htmlArray.push("<div id='selection__datepicker__weekday-".concat(count, "' class=\"selection__datepicker__weekday\">\n        ").concat(weekday, "\n       </div>"));
        count++;
    }
    return htmlArray.join(' ');
}
function getDatePickerSelectContent() {
    dayFileMap = new Map();
    (0, cypress_file_store_1.getCypressLogFiles)().forEach(function (value, key) {
        if (value.getFullYear() === year && value.getMonth() === month) {
            var date = value.getDate();
            if (dayFileMap.has(date)) {
                dayFileMap.set(date, new Map(__spreadArray(__spreadArray([], Array.from(dayFileMap.get(date)), true), [[key, value]], false)));
            }
            else {
                dayFileMap.set(date, new Map([[key, value]]));
            }
        }
    });
    var htmlArray = [];
    var invalidFieldCount = 0;
    for (var _i = 0, _a = getDayArray(); _i < _a.length; _i++) {
        var day_1 = _a[_i];
        var id = void 0;
        var dayInvalid = day_1 === '';
        if (dayInvalid) {
            id = '__invalid-' + invalidFieldCount;
            invalidFieldCount++;
        }
        else {
            id = '-' + day_1;
        }
        var value = dayFileMap.get(Number(day_1));
        var positionCount = value ? (value.size > 5 ? 5 : value.size) : 0;
        htmlArray.push("<button id='selection__datepicker__day".concat(id, "' class=\"selection__datepicker__day").concat(dayInvalid
            ? ' selection__datepicker__day__invalid'
            : ' selection__datepicker__day-' + positionCount, "\">").concat(day_1, "</button>"));
    }
    return htmlArray.join(' ');
}
function printResultsElement() {
    if (!(0, settings_store_1.isCompareSpans)()) {
        (0, result_printer_1.printResult)((0, cypress_file_handler_1.compareFilesByNumber)((0, settings_store_1.getType)(), selectedFirstFirst, selectedSecondFirst));
    }
    else {
        (0, result_printer_1.printResult)((0, cypress_file_handler_1.compareFilesByNumberSpan)((0, settings_store_1.getType)(), selectedFirstFirst, selectedFirstSecond, selectedSecondFirst, selectedSecondSecond));
    }
}
function initializeDatePickerSecondTitle() {
    selection__datepicker__test__heading.innerHTML = getDatePickerSecondTitle();
}
function initializeDatePickerSecondSelectContent() {
    var htmlArray = [];
    dayFileMap.get(day).forEach(function (value, key) {
        htmlArray.push("<button id='selection__datepicker__test-".concat(key, "' class=\"selection__datepicker__test\">\n        ").concat((0, date_handler_1.getFormatDateWithPosition)(value, key), "\n       </button>"));
    });
    selection__datepicker__test__wrapper.innerHTML = htmlArray.join(' ');
    initTestButtonClickListener();
}
function initSelectionDatepickerButtons(htmlElements) {
    htmlElements.forEach(function (htmlElement, index) {
        htmlElement.addEventListener('click', function () {
            var previousClickedButton = clickedButton;
            clickedButton = index;
            if (previousClickedButton === index) {
                toggleDatePickerContent();
            }
            else {
                if (previousClickedButton !== undefined) {
                    clearSelectedClasses();
                }
                else {
                    toggleDatePickerContent();
                }
                htmlElement.classList.add('selectedButton');
            }
        });
    });
}
function initSelection__datepicker__buttonFirst__FirstClickListener() {
    selection__datepicker__buttonsFirst__first.addEventListener('click', function () {
        var previousClickedButton = clickedButton;
        clickedButton = 1;
        if (previousClickedButton === 1) {
            toggleDatePickerContent();
        }
        else {
            selection__datepicker__buttonsFirst__first.classList.add('selectedButton');
            if (previousClickedButton === 2) {
                selection__datepicker__buttonsSecond__first.classList.remove('selectedButton');
            }
            else {
                toggleDatePickerContent();
            }
        }
    });
}
function initSelection__datepicker__buttonSecond__FirstClickListener() {
    selection__datepicker__buttonsSecond__first.addEventListener('click', function () {
        var previousClickedButton = clickedButton;
        clickedButton = 2;
        if (previousClickedButton === 2) {
            toggleDatePickerContent();
        }
        else {
            selection__datepicker__buttonsSecond__first.classList.add('selectedButton');
            if (previousClickedButton === 1) {
                selection__datepicker__buttonsFirst__first.classList.remove('selectedButton');
            }
            else {
                toggleDatePickerContent();
            }
        }
    });
}
function initselection__datepicker__buttonSwapClickListener() {
    selection__datepicker__functions__buttonSwap.addEventListener('click', function () {
        var selectedFirstFirstTemp = selectedFirstFirst;
        selectedFirstFirst = selectedSecondFirst;
        selectedSecondFirst = selectedFirstFirstTemp;
        var selection__datepicker__buttonsFirst__firstHTMLTemp = selection__datepicker__buttonsFirst__first.innerHTML;
        selection__datepicker__buttonsFirst__first.innerHTML =
            selection__datepicker__buttonsSecond__first.innerHTML;
        selection__datepicker__buttonsSecond__first.innerHTML = selection__datepicker__buttonsFirst__firstHTMLTemp;
        if ((0, settings_store_1.isCompareSpans)()) {
            var selectedFirstSecondTemp = selectedFirstSecond;
            selectedFirstSecond = selectedSecondSecond;
            selectedSecondSecond = selectedFirstSecondTemp;
            var selection__datepicker__buttonsFirst__secondHTMLTemp = selection__datepicker__buttonsFirst__second.innerHTML;
            selection__datepicker__buttonsFirst__second.innerHTML =
                selection__datepicker__buttonsSecond__second.innerHTML;
            selection__datepicker__buttonsSecond__second.innerHTML = selection__datepicker__buttonsFirst__secondHTMLTemp;
        }
        printResultsElement();
    });
}
function initselection__datepicker__buttonResetClickListener() {
    selection__datepicker__functions__buttonReset.addEventListener('click', function () {
        initializeSelectedElements(true);
        printResultsElement();
    });
}
function initPreviousButtonClickListener() {
    document
        .getElementById("selection__datepicker__navigation__previous")
        .addEventListener('click', function () {
        if (month === 0) {
            month = 11;
            year -= 1;
        }
        else {
            month -= 1;
        }
        initializeDatePickerContent();
    });
}
function initNextButtonClickListener() {
    document
        .getElementById("selection__datepicker__navigation__next")
        .addEventListener('click', function () {
        if (month === 11) {
            month = 0;
            year += 1;
        }
        else {
            month += 1;
        }
        initializeDatePickerContent();
    });
}
function initDateButtonClickListeners() {
    var elements = document.getElementsByClassName("selection__datepicker__day");
    var _loop_1 = function (index) {
        var item = elements.item(index);
        if (!item.classList.contains('selection__datepicker__day-0')) {
            item.addEventListener('click', function () {
                var splitId = item.id.split('-');
                day = Number(splitId[splitId.length - 1]);
                initializeDatePickerSecondTitle();
                initializeDatePickerSecondSelectContent();
            });
        }
    };
    for (var index = 0; index < elements.length; index++) {
        _loop_1(index);
    }
}
function initTestButtonClickListener() {
    var elements = document.getElementsByClassName("selection__datepicker__test");
    var _loop_2 = function (index) {
        var item = elements.item(index);
        item.addEventListener('click', function () {
            if (clickedButton === 0) {
                setSelectedFirstFirst(Number(item.innerHTML.trim().split(':')[0]));
            }
            else if (clickedButton === 1) {
                setSelectedSecondFirst(Number(item.innerHTML.trim().split(':')[0]));
            }
            else if (clickedButton === 2) {
                setSelectedFirstSecond(Number(item.innerHTML.trim().split(':')[0]));
            }
            else if (clickedButton === 3) {
                setSelectedSecondSecond(Number(item.innerHTML.trim().split(':')[0]));
            }
            toggleDatePickerContent();
        });
    };
    for (var index = 0; index < elements.length; index++) {
        _loop_2(index);
    }
}
//# sourceMappingURL=datepicker-printer.js.map