import { getUserInput } from "./utils";
import { User } from "./models/user";

async function start() {
	console.log("Welcome to the bike rental shop. Please login to proceed.");
	const firstName: string = await getUserInput("What's your first name: ");
	const lastName: string = await getUserInput("What's your last name: ");
	const email: string = await getUserInput("What's your email: ");
	const password: string = await getUserInput("What's your password: ");
	User.register(firstName, lastName, email, password);
}

start().then(() => console.log("Finished!"));
