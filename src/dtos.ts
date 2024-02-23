import { isEmail, isNotEmpty } from "class-validator";

export class SignInDto{

    username: string;

    password: string;
}

export class CreateWalletDTO {
    name: string;
    currencyId: string;
}

export class TransactDTO {
    amount: number
    password: string
}

export class registerUserDTO {
    
    username: string;

    email: string;

    password: string;
}