import { getUserInput } from "../utils/user";
import { User } from "../models/user";

let email: string;
let password: string;
let firstName: string;
let lastName: string;
let user: User | Error;

export async function loginFlow(): Promise<User | Error> {
	email = await getUserInput("What's your email: ");
	password = await getUserInput("What's your password: ");

	return await User.login(email, password);
}

export async function registerFlow(): Promise<User> {
	firstName = await getUserInput("What's your first name: ");
	lastName = await getUserInput("What's your last name: ");
	email = await getUserInput("What's your email: ");
	password = await getUserInput("What's your password: ");

	return await User.register(firstName, lastName, email, password);
}

export async function authFlow(): Promise<User | Error | null> {
	let response: string = await getUserInput("A: login\nB: Signup\n");

	switch (response.toUpperCase()) {
		case "A":
			return await loginFlow();

		case "B":
			return await registerFlow();

		default:
			return null;
	}
}
