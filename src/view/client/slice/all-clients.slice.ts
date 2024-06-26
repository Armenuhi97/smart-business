import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, UserDetail } from "../models/user.model";
import { ServerResponse } from "../../../models/serve-response.model";
import API, { pageCount } from "../../../services/API";
import { ParamsWithId } from "../../../models/params.model";
import { getRoleRequest } from "../../../utils/request/request";
import { Roles } from "../../../utils/roles";
import moment from "moment";
import { IAdd } from "../../../models/action.model";
import { IAddAccountant } from "../models/add-accountant.model";

const initialState: ServerResponse<UserDetail[]> = {
    results: [],
    count: 0,
}

export const getAllUsers = createAsyncThunk(
    'get/all/users',
    async (data: ParamsWithId) => {
        const response = await getRoleRequest(data, Roles.client);
        return response.data
    }
)

export const addAccountantForClient = createAsyncThunk(
    'get/add/accountant',
    async (data: IAdd<IAddAccountant>) => {
        const response = await API.post(`add-accountant/`, data.sendData);
        if (response.status === 200 || response.status === 201) {
            if (data.createSuccessfully)
                data.createSuccessfully();
        }
        return response.data;
    }
)

export const getMyClients = createAsyncThunk(
    'get/get-my-clients',
    async (data: ParamsWithId) => {
        const response = await API.get(`get-my-clients/`, {
            params: {
                ...data,
                offset: (data.page - 1) * pageCount,
                limit: pageCount
            }
        });
        return response.data
    }
)

const allUsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        isDeletedAction: (state: ServerResponse<UserDetail[]>, action: PayloadAction<{ id: number | string, is_deleted: boolean }>) => {
            state.results = state.results.map((data: UserDetail) => {
                if (data.id === action.payload.id) {

                    return {
                        ...data,
                        is_deleted: action.payload.is_deleted
                    }
                }
                return data;
            })

            return state;
        }
    },
    extraReducers(builder) {
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.results = action.payload.results.map((el: IUser) => {
                return {
                    ...el,
                    birth_date: moment(el.birth_date).format('YYYY-MM-DD')
                }
            });
            state.count = action.payload.count;
        })
    },
});

export default allUsersSlice.reducer;
export const { isDeletedAction } = allUsersSlice.actions;