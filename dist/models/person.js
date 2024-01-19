"use strict";
class Person {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
    login(email, password) {
        if (email == password) {
            return null;
        }
        return this;
    }
}
class Admin extends Person {
    constructor(firstName, lastName, email, password) {
        super(firstName, lastName, email, password);
    }
    get fullName() {
        return `Admin: ${this.firstName} ${this.lastName}`;
    }
}
