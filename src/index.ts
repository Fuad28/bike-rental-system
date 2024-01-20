import { getUserInput } from "./utils";
import * as fs from "fs/promises";
import { CustomErrorType } from "./utils/types";
import * as path from "path";

async function start() {
	await _readFile("data/user.json");

	console.log("Welcome to the bike rental shop. Please login to proceed.");
	const email: string = await getUserInput("What's your email: ");
	const password: string = await getUserInput("What's your password: ");

	console.log(`Email is ${email}`);
}

const currentDir = __dirname;

async function _readFile(filePath: string): Promise<string | null> {
	filePath = path.join(currentDir, ...filePath.split("/"));
	let data: string;

	try {
		const flags = fs.constants.F_OK | fs.constants.W_OK;
		console.log("hereeeeeeeeeeee 1");
		console.log(`O_CRAT: ${fs.constants.O_CREAT}`);
		await fs.access(filePath, flags);
		console.log("hereeeeeeeeeeee 2");
		data = await fs.readFile(filePath, "utf-8");
		return JSON.parse(data);
	} catch (err) {
		const error = err as CustomErrorType;

		console.log("hereeeeeeeeeeee 3");

		if (error.code == "ENOENT") {
			console.log("hereeeeeeeeeeee 4");
			let defaultJsonData = JSON.stringify({ data: [] });

			await fs.writeFile(filePath, defaultJsonData);
			console.log("hereeeeeeeeeeee 5");
			data = await fs.readFile(filePath, "utf-8");
			return JSON.parse(data);
		} else {
			console.error(`Error reading file: ${error.message}`);
			return null;
		}
	}
}

start().then(() => console.log("Finished!"));
