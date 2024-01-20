import * as fs from "node:fs/promises";
import { CustomErrorType, FileData } from "./types";
import * as path from "path";

const currentDir = __dirname;

export class FileManager {
	static async writeToFile(fileName: string, data: any): Promise<void> {
		try {
			const filePath = await FileManager.getFilePath(fileName);
			let fileData = await FileManager._readFile(filePath);
			fileData.data.push(data, null, 2);
			let fileDataString = JSON.stringify(fileData, null, 2);
			await fs.writeFile(filePath, fileDataString);
		} catch (err) {
			const error = err as CustomErrorType;
			console.error(`Error writing to file: ${error.message}`);
		}
	}

	static async _readFile(filePath: string): Promise<FileData> {
		let data: string;

		try {
			await fs.access(filePath, fs.constants.F_OK);
			data = await fs.readFile(filePath, "utf-8");
			return JSON.parse(data);
		} catch (err) {
			const error = err as CustomErrorType;

			if (error.code == "ENOENT") {
				fs.mkdir(filePath, { recursive: true });
				const defaultJsonData = JSON.stringify({ data: [] }, null, 2);
				await fs.writeFile(filePath, defaultJsonData);
				return FileManager._readFile(filePath);
			} else {
				throw new Error(error.message);
			}
		}
	}

	static async getFilePath(fileName: string): Promise<string> {
		return path.join(currentDir, "data", fileName);
	}

	static async getFromFile(fileName: string, key: string, value: string) {
		const filePath = await FileManager.getFilePath(fileName);
		let fileData = (await FileManager._readFile(filePath)).data;

		return fileData.find((item: any) => item[key] === value);
	}
}
