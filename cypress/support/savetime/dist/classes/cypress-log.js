"use strict";
exports.__esModule = true;
exports.CypressLog = void 0;
var CypressLog = /** @class */ (function () {
    function CypressLog(file, content) {
        this.file = file;
        if (content) {
            this.content = content;
        }
        else {
            this.content = [];
        }
    }
    return CypressLog;
}());
exports.CypressLog = CypressLog;
//# sourceMappingURL=cypress-log.js.map