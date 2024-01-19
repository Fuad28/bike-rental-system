import { createInterface } from "readline/promises";

console.log("Hellooo");
async function start() {
	console.log("Welcome to the bike rental shop. Please login to proceed.");
	let email = await getUserInput("What;s your email: ");
	console.log(`Email is ${email}`);
}

async function getUserInput(query: string) {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	let answer = await rl.question(query);
	rl.close();

	return answer;
}

start().then(() => console.log("Finished!"));
