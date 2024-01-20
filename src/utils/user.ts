// import { createInterface } from "readline/promises";
import { createInterface } from "node:readline/promises";

export async function getUserInput(query: string) {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	let answer = await rl.question(query);
	rl.close();

	return answer;
}
