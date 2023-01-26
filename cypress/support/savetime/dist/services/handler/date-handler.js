"use strict";
exports.__esModule = true;
exports.getFormatDateWithPosition = exports.DELIMITER = void 0;
exports.DELIMITER = ':';
function formatDate(date) {
    return date.toISOString().slice(0, 16).replace('T', ' ');
}
function getFormatDateWithPosition(date, position) {
    return position + exports.DELIMITER + ' ' + formatDate(date);
}
exports.getFormatDateWithPosition = getFormatDateWithPosition;
//# sourceMappingURL=date-handler.js.map