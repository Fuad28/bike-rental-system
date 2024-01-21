"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFlow = exports.loginFlow = void 0;
const user_1 = require("./utils/user");
const user_2 = require("./models/user");
let email;
let password;
let firstName;
let lastName;
let user;
function loginFlow() {
    return __awaiter(this, void 0, void 0, function* () {
        email = yield (0, user_1.getUserInput)("What's your email: ");
        password = yield (0, user_1.getUserInput)("What's your password: ");
        return yield user_2.User.login(email, password);
    });
}
exports.loginFlow = loginFlow;
function registerFlow() {
    return __awaiter(this, void 0, void 0, function* () {
        firstName = yield (0, user_1.getUserInput)("What's your first name: ");
        lastName = yield (0, user_1.getUserInput)("What's your last name: ");
        email = yield (0, user_1.getUserInput)("What's your email: ");
        password = yield (0, user_1.getUserInput)("What's your password: ");
        return yield user_2.User.register(firstName, lastName, email, password);
    });
}
exports.registerFlow = registerFlow;
