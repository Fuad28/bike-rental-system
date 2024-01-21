import * as bcrypt from "bcrypt";

import { InUserData } from "../utils/types";
import { userDataFile } from "../utils/constants";
import { FileManager } from "../utils";

export class User {
	constructor(
		public firstName: string,
		public lastName: string,
		public email: string,
		public isAdmin: boolean = false
	) {}

	static async register(
		firstName: string,
		lastName: string,
		email: string,
		password: string
	): Promise<User> {
		password = await bcrypt.hash(password, 10);
		await FileManager.writeToFile(userDataFile, {
			firstName,
			lastName,
			email,
			password,
			isAdmin: false,
		});

		return new User(firstName, lastName, email);
	}

	static async login(email: string, password: string): Promise<User | Error> {
		let user = await FileManager.getFromFile<InUserData>(userDataFile, "email", email);

		if (!user) {
			throw new Error("Invalid login credentials");
		}

		let validPassword: boolean = await bcrypt.compare(password, user.password);

		if (validPassword) {
			return new User(user.firstName, user.lastName, user.email, user.isAdmin);
		} else {
			throw new Error("Invalid login credentials");
		}
	}
}
