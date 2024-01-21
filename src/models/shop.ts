import { rentalPlanEnum } from "../utils/enums";
import { rentalRecordFile } from "../utils/constants";
import { FileManager } from "../utils/file";
import { BikeData } from "../utils/types";

export class BikeShop {
	constructor() {}

	static async rentBike(
		rentalPlan: rentalPlanEnum,
		quantity: number = 1
	): Promise<string | Error> {
		if (quantity <= 0) {
			throw new Error("quantity to be rented must be at least 1.");
		}

		if (BikeShop.quantityInStock < quantity) {
			throw new Error(`Only ${BikeShop.quantityInStock} bikes are in stock`);
		}

		let orderID = BikeShop.generateOrderId();

		await FileManager.writeToFile(rentalRecordFile, {
			createdAt: Date.now(),
			orderID: orderID,
			rentalPlan: rentalPlan,
			quantity: quantity,
			isReturned: false,
		});

		BikeShop.quantityInStock -= quantity;

		return `Success. Your order id is ${orderID}`;
	}

	static async returnBike(orderID: string): Promise<string> {
		let bikeRentalRecord = await FileManager.getFromFile<BikeData>(
			rentalRecordFile,
			"orderID",
			orderID
		);
		BikeShop.quantityInStock += bikeRentalRecord.quantity;

		return await BikeShop.generateInvoice(bikeRentalRecord);
	}

	static async generateInvoice(bikeRentalRecord: BikeData): Promise<string> {
		const [amount, discount, totalAmount] = BikeShop.computePrices(bikeRentalRecord);
		return `
        Here is your invoice:
        Date: ${bikeRentalRecord.createdAt.toDateString()}
        Time: ${bikeRentalRecord.createdAt.toTimeString()}
        Rental Plan: ${bikeRentalRecord.rentalPlan}
        Quantity: ${bikeRentalRecord.quantity}
        Amount: ${amount}
        Discount: ${discount}
        Total amount: ${totalAmount}
        `;
	}

	static computePrices(bikeRentalRecord: BikeData): [number, number, number] {
		const rentalRates = {
			[rentalPlanEnum.Hourly]: 5,
			[rentalPlanEnum.Daily]: 20,
			[rentalPlanEnum.Weekly]: 60,
		};
		let amount: number = 0;

		const rentalDays: number =
			(Date.now() - bikeRentalRecord.createdAt.getTime()) / (1000 * 60 * 60 * 24);
		const rentalPlanRate = rentalRates[bikeRentalRecord.rentalPlan];

		if (bikeRentalRecord.rentalPlan == rentalPlanEnum.Hourly) {
			amount = Math.round(rentalPlanRate * bikeRentalRecord.quantity * rentalDays * 24);
		} else if (bikeRentalRecord.rentalPlan == rentalPlanEnum.Daily) {
			amount = Math.round(rentalPlanRate * bikeRentalRecord.quantity * rentalDays);
		} else {
			amount = Math.round(rentalPlanRate * bikeRentalRecord.quantity * (rentalDays / 7));
		}

		let discount: number = 0;

		if (bikeRentalRecord.quantity >= 3 && bikeRentalRecord.quantity <= 5) {
			discount = 0.3 * amount;
		}

		let totalAmount = amount - discount;

		return [amount, discount, totalAmount];
	}

	static generateOrderId(): string {
		return Math.random().toString(36).substring(2, 7);
	}

	static async shopSummary(): Promise<string> {
		// number of bikes rented out
		// number of daily, weekly, monthly
		// amount made so far.
		return "";
	}

	static get quantityInStock(): number {
		return 0;
	}

	static set quantityInStock(value: number) {
		value;
	}
}
