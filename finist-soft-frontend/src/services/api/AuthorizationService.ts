import { CancelablePromise } from "./core/CancelablePromise";
import { OpenAPI } from "./core/OpenAPI";
import { request as __request } from "./core/request";
import { LoginRequest } from "./requests/LoginRequest";
import { UserState } from "./responses/UserState";

export class AuthorizationService {
    public static SignInAsync(
        request: LoginRequest
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: "POST",
            url: `/authorization/signIn`,
            body: request,
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    public static GetStateAsync(): CancelablePromise<UserState> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/authorization/state",
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            }
        })
    }
}