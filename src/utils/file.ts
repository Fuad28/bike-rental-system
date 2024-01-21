import * as fs from "node:fs/promises";
import { CustomErrorType, FileData } from "./types";
import * as path from "path";

const currentDir = __dirname;

export class FileManager {
	static async writeToFile(fileName: string, data: any): Promise<void> {
		try {
			const [directoryPath, filePath] = await FileManager.getFilePath(fileName);
			let fileData = await FileManager._readFile(directoryPath, filePath);
			fileData.data.push(data);
			let fileDataString = JSON.stringify(fileData);
			await fs.writeFile(filePath, fileDataString);
		} catch (err) {
			const error = err as CustomErrorType;
			console.error(`Error writing to file: ${error.message}`);
		}
	}

	static async _readFile(directoryPath: string, filePath: string): Promise<FileData> {
		let data: string;

		try {
			await fs.access(directoryPath, fs.constants.F_OK);
			data = await fs.readFile(filePath, "utf-8");
			return JSON.parse(data);
		} catch (err) {
			const error = err as CustomErrorType;

			if (error.code == "ENOENT") {
				fs.mkdir(directoryPath, { recursive: true });
				const defaultJsonData = JSON.stringify({ data: [] });
				await fs.writeFile(filePath, defaultJsonData);
				return FileManager._readFile(directoryPath, filePath);
			} else {
				throw new Error(error.message);
			}
		}
	}

	static async getFilePath(fileName: string): Promise<[string, string]> {
		const directoryPath: string = path.join(currentDir, "data");
		const filePath: string = path.join(directoryPath, fileName);

		return [directoryPath, filePath];
	}

	static async getFromFile<T>(fileName: string, key: string, value: string): Promise<T> {
		const [directoryPath, filePath] = await FileManager.getFilePath(fileName);
		let fileData = (await FileManager._readFile(directoryPath, filePath)).data;

		return fileData.find((item: any) => item[key] === value);
	}
}
