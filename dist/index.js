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
const flows_1 = require("./flows");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Welcome to the bike rental shop. Please signup/login to proceed.\n");
        let response = yield (0, utils_1.getUserInput)("A: login\nB: Signup\n");
        switch (response.toUpperCase()) {
            case "A":
                yield (0, flows_1.loginFlow)();
                break;
            case "B":
                yield (0, flows_1.registerFlow)();
                break;
            default:
                console.log("Invalid input. Try again.\n\n");
                start();
        }
    });
}
start().then(() => console.log("\n\n\nFinished!"));
