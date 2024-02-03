export type BankAccount = {
    id: string;
    userId: string;
    accountType: BankAccountType;
    accountNumber: string;
}

export enum BankAccountType {
    Urgent = 0,
    OnDemand = 1,
    Card = 2
}