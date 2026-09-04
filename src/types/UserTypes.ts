export interface Address {
    id?: number;
    name:string;
    mobile:string;
    pinCode:string;
    address:string;
    locality:string;
    city:string;
    state:string;
}

export enum UserRole {
    ROLE_CUSTOMER = "ROLE_CUSTOMER",
    ROLE_ADMIN = "ROLE_ADMIN",
    ROLE_SELLER = "ROLE_SELLER"
}

export interface User {
  id: number;

  fullName: string;

  email: string;

  mobile: string;

  role?: string;

  image?: string;

  addresses?: Address[];

  createdAt?: string;

  updatedAt?: string;
}

export interface UserState {
    user : User | null;
    loading:boolean;
    error : string | null;
    profileUpdated:boolean;
}