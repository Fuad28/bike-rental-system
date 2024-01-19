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
const promises_1 = require("readline/promises");
console.log("Hellooo");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Welcome to the bike rental shop. Please login to proceed.");
        let email = yield getUserInout("What;s your email: ");
        console.log(`Email is ${email}`);
    });
}
function getUserInout(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const rl = (0, promises_1.createInterface)({
            input: process.stdin,
            output: process.stdout,
        });
        try {
            return yield rl.question(query);
        }
        finally {
            rl.close();
        }
    });
}
start().then(() => console.log("Finished!"));
