import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServerResponse } from "../../../models/serve-response.model";
import API, { pageCount } from "../../../services/API";
import { IParams } from "../../../models/params.model";
import { IBroker } from "../models/broker.model";

const initialState: ServerResponse<IBroker[]> = {
    results: [],
    count: 0,
}

export const getAllBroker = createAsyncThunk(
    'get/all/brokers',
    async (data: IParams) => {
        const response = await API.get(`broker/all/`,
            {
                params: {
                    // skip: data.isAll ? 0 : (data!.page! - 1) * 10,
                    // take: data.isAll ? 100 : pageCount,
                    limit: pageCount,
                    offset: (data.page - 1) * 100
                    // query: data.query,
                    // role: data.roleId
                }
            })
        return response.data
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