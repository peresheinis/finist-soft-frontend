import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../services/api/responses/UserState";

type UsersState = {
    currentUser: UserState | undefined;
};

const initialState: UsersState = {
    currentUser: undefined,
};

const userSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState | undefined>) {
            state.currentUser = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;