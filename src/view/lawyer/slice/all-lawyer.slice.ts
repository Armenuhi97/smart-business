import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServerResponse } from "../../../models/serve-response.model";
import API, { pageCount } from "../../../services/API";
import { IParams } from "../../../models/params.model";
import { ILawyer } from "../models/lawyer.model";

const initialState: ServerResponse<ILawyer[]> = {
    results: [],
    count: 0,
}

export const getAllLawyer = createAsyncThunk(
    'get/all/lawyers',
    async (data: IParams) => {
        const response = await API.get(`lawyer/all/`,
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

const allLawyerSlice = createSlice({
    name: 'lawyers',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllLawyer.fulfilled, (state, action) => {
            state.results = action.payload.results;
            state.count = action.payload.count;
        })
    },
});

export default allLawyerSlice.reducer;