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
const path = __importStar(require("path"));
const currentDir = __dirname;
class FileManager {
    static writeToFile(fileName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [directoryPath, filePath] = yield FileManager.getFilePath(fileName);
                let fileData = yield FileManager._readFile(directoryPath, filePath);
                fileData.data.push(data);
                let fileDataString = JSON.stringify(fileData);
                yield fs.writeFile(filePath, fileDataString);
            }
            catch (err) {
                const error = err;
                console.error(`Error writing to file: ${error.message}`);
            }
        });
    }
    static _readFile(directoryPath, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                yield fs.access(directoryPath, fs.constants.F_OK);
                data = yield fs.readFile(filePath, "utf-8");
                return JSON.parse(data);
            }
            catch (err) {
                const error = err;
                if (error.code == "ENOENT") {
                    fs.mkdir(directoryPath, { recursive: true });
                    const defaultJsonData = JSON.stringify({ data: [] });
                    yield fs.writeFile(filePath, defaultJsonData);
                    return FileManager._readFile(directoryPath, filePath);
                }
                else {
                    throw new Error(error.message);
                }
            }
        });
    }
    static getFilePath(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const directoryPath = path.join(currentDir, "data");
            const filePath = path.join(directoryPath, fileName);
            return [directoryPath, filePath];
        });
    }
    static getFromFile(fileName, key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const [directoryPath, filePath] = yield FileManager.getFilePath(fileName);
            let fileData = (yield FileManager._readFile(directoryPath, filePath)).data;
            return fileData.find((item) => item[key] === value);
        });
    }
}
exports.FileManager = FileManager;
