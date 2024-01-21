import { enums } from ".";

export type InUserData = {
	readonly id: number;
	firstName: string;
	lastName: string;
	email: string;
	readonly password: string;
	isAdmin: boolean;
};

export type CustomErrorType = {
	code: string;
	message: string;
	stack?: string;
};

export type FileData = {
	data: any;
};

export type BikeData = {
	createdAt: Date;
	orderID: string;
	rentalPlan: enums.rentalPlanEnum;
	quantity: number;
	isReturned: boolean;
};
