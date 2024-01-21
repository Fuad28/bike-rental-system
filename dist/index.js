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
const utils_1 = require("./utils");
const user_1 = require("./models/user");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Welcome to the bike rental shop. Please login to proceed.");
        const firstName = yield (0, utils_1.getUserInput)("What's your first name: ");
        const lastName = yield (0, utils_1.getUserInput)("What's your last name: ");
        const email = yield (0, utils_1.getUserInput)("What's your email: ");
        const password = yield (0, utils_1.getUserInput)("What's your password: ");
        user_1.User.register(firstName, lastName, email, password);
    });
}
start().then(() => console.log("Finished!"));
