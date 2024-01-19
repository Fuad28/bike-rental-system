abstract class Person {
	constructor(
		public firstName: string,
		public lastName: string,
		public email: string,
		public password: string
	) {}
}

class Admin extends Person {
	/*
	1. Can add bike
	2. Can change bike proce
	3. Can open/ close store
	4. Can authorize or reject rental request
	
	*/
	constructor(
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) {
		super(firstName, lastName, email, password);
	}

	get fullName() {
		return `Admin: ${this.firstName} ${this.lastName}`;
	}
}
