import { getUserInput } from "./utils";

async function start() {
	console.log("Welcome to the bike rental shop. Please login to proceed.");
	const email: string = await getUserInput("What's your email: ");
	const password: string = await getUserInput("What's your password: ");

	console.log(`Email is ${email}`);
}

const currentDir = __dirname;

start().then(() => console.log("Finished!"));
