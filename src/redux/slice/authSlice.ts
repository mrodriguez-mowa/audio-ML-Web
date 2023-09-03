import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState:AuthUser = {
    isAuth: false,
    userId: 0,
    user: "",
    isAdmin: false
}  


interface AuthUser {
    isAuth: boolean,
    userId: number,
    user: string,
    isAdmin: boolean
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signInResult: (state: AuthUser, action: PayloadAction<AuthUser>) => {
            state.isAdmin = action.payload.isAdmin,
            state.user = action.payload.user,
            state.userId = action.payload.userId,
            state.isAuth = action.payload.isAuth
        },
        authLocalStorage: (state: AuthUser) => {
            localStorage.setItem("isAdmin", state.isAdmin.toString()),
            localStorage.setItem("user", state.user),
            localStorage.setItem("userId", state.userId.toString()),
            localStorage.setItem("isAuth", state.isAuth.toString() == "true" ? "true" : "false" )
        },
        logout: () => {
            localStorage.removeItem("isAdmin")
            localStorage.removeItem("isAuth")
            localStorage.removeItem("userId")
            localStorage.removeItem("user")
        }
    }
})

export const { signInResult, authLocalStorage, logout } = authSlice.actions;

export default authSlice.reducer;
