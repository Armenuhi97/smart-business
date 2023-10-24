import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, UserDetail } from "../models/user.model";
import { ServerResponse } from "../../../models/serve-response.model";
import API, { pageCount } from "../../../services/API";
import { IParams, ParamsWithId } from "../../../models/params.model";
import { getRoleRequest } from "../../../utils/request/request";
import { Roles } from "../../../utils/roles";
import moment from "moment";

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

export const getMyClients = createAsyncThunk(
    'get/get-my-clients',
    async (data: ParamsWithId) => {
        const response = await API.get(`get-my-clients/`, {
            params: {
                ...data,
                offset: (data.page - 1) * pageCount,
                limit:pageCount
            }
        });
        return response.data
    }
)

const allUsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
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