export type OutUserData = {
	readonly id: number;
	firstName: string;
	lastName: string;
	email: string;
	isAdmin: boolean;
};

export type InUserData = OutUserData & { readonly password: string };

export type CustomErrorType = {
	code: string;
	message: string;
	stack?: string;
};

export type FileData = {
	data: any;
};
