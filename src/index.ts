import { authFlow } from "./flows/auth";
import { User } from "./models/user";

async function start() {
	console.log("Welcome to the bike rental shop. Please signup/login to proceed.\n");

	let user = await authFlow();

	if (!(user instanceof User)) {
		console.log("Invalid input. Try again.\n\n");
		return;
	}
}

start().then(() => console.log("\n\n\nFinished!"));
