import { Address } from "./UserTypes";

export type AccountStatus =
  | "PENDING_VERIFICATION"
  | "ACTIVE"
  | "SUSPENDED"
  | "DEACTIVATED"
  | "BANNED"
  | "CLOSED";

export interface Seller {
  id: number;
  GSTIN: string | null;
  accountStatus: AccountStatus;

  bankDetails: BankDetails;
  businessDetails: BusinessDetails;
  pickupAddress: Address;

  email: string;
  isEmailVerified: boolean;
  mobile: string;
  name: string | null;
  password?: string;
  role: string;
  sellerName: string | null;
}

export interface BankDetails {
  AccountNumber: string | null;
  accountHolderName: string;
  ifscCode: string;
}

export interface BusinessDetails {
  businessName: string;
  businessEmail?: string;
  businessMobile?: string;
  businessAddress?: string;
  logo?: string;
  banner?: string;
}

export interface SellerReport {
    id:number;
    seller:Seller;
    totalEarnings:number;
    totalSales:number;
    totalRefunds:number;
    totalTax:number;
    netEarnings:number;
    totalOrders:number;
    cancelOrders:number;
    totalTransactions:number;
}
