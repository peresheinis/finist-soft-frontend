import { CancelablePromise } from "./core/CancelablePromise";
import { OpenAPI } from "./core/OpenAPI";
import { request as __request } from "./core/request";
import { BankAccount } from "./responses/BankAccount";

export class AccountsService {
    public static GetAllAsync(
    ): CancelablePromise<Array<BankAccount>> {
        return __request(OpenAPI, {
            method: "GET",
            url: `/accounts/`,
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }
}
