"use strict";
exports.__esModule = true;
exports.formatDate = void 0;
function formatDate(date) {
    return date.toISOString().slice(0, 16).replace('T', ' ');
}
exports.formatDate = formatDate;
//# sourceMappingURL=date-handler.js.map