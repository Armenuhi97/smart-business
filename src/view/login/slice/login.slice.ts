import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from '../../../services/API';
import { ILogin } from '../models/login.model';
export interface IAuth {
    access: string
}
export const initialState: IAuth = {
    access: ''
}
export const logIn = createAsyncThunk(
    'auth/login/admin',
    async (data: ILogin) => {
        const res = await API.post('auth/login/role',
            {
                username: data.username,
                password: data.password
            });
        if (res.status === 200 || res.status === 201 && res?.data?.access_token) {
            localStorage.setItem('access', res.data.access_token);
            data.loggedInSuccessfully();
        }
        return res.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(logIn.fulfilled, (state, action: PayloadAction<{ access_token: string }>) => {
            state.access = action.payload.access_token;
        })
    }

});
export default authSlice.reducer;