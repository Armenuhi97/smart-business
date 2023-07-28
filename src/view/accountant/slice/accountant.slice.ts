import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import API from "../../../services/API";
import { IAdd, IDelete, IModify } from "../../../models/action.model";
import { IAccountant } from "../models/accountant.model";


const initialState: { accountant: IAccountant } = {
    accountant: {} as IAccountant
}

export const getAccountantById = createAsyncThunk(
    'get/accountant-by-id/',
    async (id: number) => {
        const response = await API.get(`accountant/${id}`)
        return response.data
    }
)
export const addAccountant = createAsyncThunk(
    'add/accountant',
    async (data: IAdd<IAccountant>) => {
        const response = await API.post('auth/registration/role', data.sendData);
        if (response.data === 'This accountantname is already Exist') {
            toast.error(response.data, {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            if ((response.status === 200 || response.status === 201) && !!data.createSuccessfully) {
                data.createSuccessfully();
            }
        }
        return response.data;
    }
)
export const deleteAccountant = createAsyncThunk(
    'delete/accountant',
    async (data: IDelete) => {
        const response = await API.delete(`accountant/${data.id}`);
        if (response.status === 200 || response.status === 201) {
            data.deleteSuccessfully(data.page);
        }
        return response.data;
    }
)
export const modifyAccountant = createAsyncThunk(
    'modify/accountant',
    async (data: IModify<IAccountant>) => {
        const response = await API.put(`accountant/edit/${data.id}`, data.sendObject);
        if (response.status === 200 || response.status === 201) {

            if (data.updateSuccessfully)
                data.updateSuccessfully();
        }
        return response.data;
    }
)
const accountantByIdSlice = createSlice({
    name: 'accountant-by-id',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAccountantById.fulfilled, (state, action) => {
            state.accountant = action.payload.accountant;
        })
    },
});

export default accountantByIdSlice.reducer;