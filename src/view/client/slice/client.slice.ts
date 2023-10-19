import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IUser } from "../models/user.model";
import API from "../../../services/API";
import { IAdd, IDelete, IModify } from "../../../models/action.model";


const initialState: { user: IUser } = {
    user: {} as IUser
}

export const getUserById = createAsyncThunk(
    'get/user-by-id/',
    async (id: number) => {
        const response = await API.get(`user/${id}`)
        return response.data
    }
)
export const addUser = createAsyncThunk(
    'add/user',
    async (data: IAdd<IUser>) => {
        const response = await API.post('auth/registration/role', data.sendData);
        if (response.data === 'This username is already Exist') {
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
export const deleteUser = createAsyncThunk(
    'delete/user',
    async (data: IDelete) => {
        const response = await API.delete(`user/${data.id}`);
        if (response.status === 200 || response.status === 201) {
            data.deleteSuccessfully(data.page);
        }
        return response.data;
    }
)
export const modifyUser = createAsyncThunk(
    'modify/user',
    async (data: IModify<IUser>) => {
        const response = await API.put(`user/edit/${data.id}`, data.sendObject);
        if (response.status === 200 || response.status === 201) {

            if (data.updateSuccessfully)
                data.updateSuccessfully();
        }
        return response.data;
    }
)

export const getClientCompany = createAsyncThunk(
    'get/client/company',
    async (clientId: number) => {
        const response = await API.get(`company/`, { params: { client_id: clientId } });
        return response.data;
    }
)

export const getClientWorkers = createAsyncThunk(
    'get/client/workers',
    async (clientId: number) => {
        const response = await API.get(`get-my-workers/`, { params: { client_id: clientId } });
        return response.data;
    }
)

export const getUserDetails = createAsyncThunk(
    'get/client/detail',
    async (clientId: number) => {
        const response = await API.get(`user-detail/${clientId}/`);
        return response.data;
    }
)

const userByIdSlice = createSlice({
    name: 'user-by-id',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.user = action.payload.user;
        })
    },
});

export default userByIdSlice.reducer;