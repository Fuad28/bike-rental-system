// import { hash, compare } from "bcrypt-ts";

// import { InUserData, OutUserData } from "../utils";
// import { FileManager } from "../utils";

// class Person {
// 	private password: string = "";

// 	constructor(
// 		public firstName: string,
// 		public lastName: string,
// 		public email: string,
// 		public isAdmin: boolean = false
// 	) {}

// 	static async register(
// 		firstName: string,
// 		lastName: string,
// 		email: string,
// 		password: string
// 	): Promise<Person> {
// 		const hashed_pword = await hash(password, 10);
// 		this.
// 		FileManager.writeToFile();

// 		return new Person(firstName, lastName, email);
// 	}

// 	static async login(
// 		email: string,
// 		password: string
// 	): Promise<Person | Error> {
// 		// retrieve user with email from storage
// 		let db_password = "";

// 		let validPassword: boolean = await compare(password, db_password);

// 		if (validPassword) {
// 			let firstName = "";
// 			let lastName = "";

// 			return new Person(firstName, lastName, email);
// 		} else {
// 			//throw an error
// 			return new Error("Invalid login credentials");
// 		}
// 	}

// 	get data(): InUserData {
// 		return {
// 			id: 1,
// 			firstName: this.firstName,
// 			lastName: this.lastName,
// 			email: this.email,
// 			password: this.password,
// 			isAdmin: false,
// 		};
// 	}
// }

// // class Admin extends Person {
// // 	/*
// // 	1. Can add bike
// // 	2. Can change bike proce
// // 	3. Can open/ close store
// // 	4. Can authorize or reject rental request

// // 	*/
// // 	constructor(
// // 		firstName: string,
// // 		lastName: string,
// // 		email: string,
// // 		password: string
// // 	) {
// // 		super(firstName, lastName, email, password);
// // 	}

// // 	get fullName() {
// // 		return `Admin: ${this.firstName} ${this.lastName}`;
// // 	}
// // }
