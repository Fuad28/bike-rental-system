"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.FileManager = void 0;
const fs = __importStar(require("node:fs/promises"));
class FileManager {
    static writeToFile(fileName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filePath = "../data/" + fileName;
                let jsonData = JSON.stringify(data, null, 2);
                let fileData = yield this._readFile(filePath);
                console.log(`FILEDAT: ${fileData}`);
            }
            catch (error) {
                console.error(`Error writing to file: ${error}`);
            }
            return data;
        });
    }
    static _readFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                console.log("hereeeeeeeeeeee 1");
                yield fs.access(filePath, fs.constants.O_CREAT);
                console.log("hereeeeeeeeeeee 2");
                data = yield fs.readFile(filePath, "utf-8");
                return JSON.parse(data);
            }
            catch (err) {
                const error = err;
                console.log("hereeeeeeeeeeee 3");
                if (error.code == "ENOENT") {
                    console.log("hereeeeeeeeeeee 4");
                    yield fs.writeFile(filePath, []);
                    console.log("hereeeeeeeeeeee 5");
                    data = yield fs.readFile(filePath, "utf-8");
                    return JSON.parse(data);
                }
                else {
                    console.error(`Error reading file: ${error.message}`);
                    return null;
                }
            }
        });
    }
    static getFromFile() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.FileManager = FileManager;
