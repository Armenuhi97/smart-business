import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAccountant } from "../models/accountant.model";
import { ServerResponse } from "../../../models/serve-response.model";
import API, { pageCount } from "../../../services/API";
import { IParams } from "../../../models/params.model";

const initialState: ServerResponse<IAccountant[]> = {
    results: [],
    count: 0,
}

export const getAllAccountant = createAsyncThunk(
    'get/all/users',
    async (data: IParams) => {
        const response = await API.get(`accountant/all/`,
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

const allAccountantSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllAccountant.fulfilled, (state, action) => {
            state.results = action.payload.results;
            state.count = action.payload.count;
        })
    },
});

export default allAccountantSlice.reducer;