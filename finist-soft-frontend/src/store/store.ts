import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;