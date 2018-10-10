"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var assert = require("assert");
var TestCase = /** @class */ (function () {
    function TestCase(name) {
        this.name = name;
        this.info = null;
        this.failed = false;
    }
    TestCase.prototype.GetName = function () {
        return this.name;
    };
    TestCase.prototype.WasFailed = function () {
        return this.failed;
    };
    TestCase.prototype.GetInfo = function () {
        return this.info;
    };
    TestCase.prototype.Equals = function (actual, expected, message) {
        assert.strictEqual(actual, expected, message);
    };
    TestCase.prototype.DeepEquals = function (actual, expected, message) {
        assert.deepStrictEqual(actual, expected, message);
    };
    TestCase.prototype.DoesNotReject = function (block, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, assert.doesNotReject(block, message)["catch"](function (error) { throw error; })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TestCase.prototype.DoesNotThrow = function (block, message) {
        assert.doesNotThrow(block, message);
    };
    TestCase.prototype.Fail = function (message) {
        assert.fail(message);
    };
    TestCase.prototype.IfError = function (value) {
        assert.ifError(value);
    };
    TestCase.prototype.NotStrictEquals = function (actual, expected, message) {
        assert.notStrictEqual(actual, expected, message);
    };
    TestCase.prototype.NotDeepStrictEquals = function (actual, expected, message) {
        assert.notDeepStrictEqual(actual, expected, message);
    };
    TestCase.prototype.True = function (value, message) {
        assert.ok(value, message);
    };
    TestCase.prototype.Rejects = function (block, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, assert.rejects(block, message)["catch"](function (error) { throw error; })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TestCase.prototype.Throws = function (block, message) {
        assert.throws(block, message);
    };
    return TestCase;
}());
exports.TestCase = TestCase;
var Test = function (testName, test) {
    var t = new TestCase(testName);
    try {
        test(t);
        console.log("[" + t.GetName() + "] OK");
    }
    catch (error) {
        var info = error;
        info.stackMessage = info.stack;
        info.errorMessage = info.message;
        console.error("[" + t.GetName() + "] " + JSON.stringify(info));
    }
};
exports.Test = Test;
