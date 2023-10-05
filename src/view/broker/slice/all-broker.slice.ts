import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServerResponse } from "../../../models/serve-response.model";
import API, { pageCount } from "../../../services/API";
import { IParams } from "../../../models/params.model";
import { IBroker } from "../models/broker.model";
import { getRoleRequest } from "../../../utils/request/request";
import { Roles } from "../../../utils/roles";

const initialState: ServerResponse<IBroker[]> = {
    results: [],
    count: 0,
}

export const getAllBroker = createAsyncThunk(
    'get/all/brokers',
    async (data: IParams) => {
        const response = await getRoleRequest(data, Roles.broker);
        return response.data;
    }
)

const allBrokerSlice = createSlice({
    name: 'brokers',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllBroker.fulfilled, (state, action) => {
            state.results = action.payload.results;
            state.count = action.payload.count;
        })
    },
});

export default allBrokerSlice.reducer;