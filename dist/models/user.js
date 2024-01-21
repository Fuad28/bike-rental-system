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
exports.User = void 0;
const constants_1 = require("../utils/constants");
const utils_1 = require("../utils");
class User {
    constructor(firstName, lastName, email, isAdmin = false) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.isAdmin = isAdmin;
    }
    static register(firstName, lastName, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield utils_1.FileManager.writeToFile(constants_1.userDataFile, {
                firstName,
                lastName,
                email,
                password,
                isAdmin: false,
            });
            return new User(firstName, lastName, email);
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield utils_1.FileManager.getFromFile(constants_1.userDataFile, "email", email);
            password;
            let validPassword = true;
            if (validPassword) {
                return new User(user.firstName, user.lastName, user.email, user.isAdmin);
            }
            else {
                return new Error("Invalid login credentials");
            }
        });
    }
}
exports.User = User;
