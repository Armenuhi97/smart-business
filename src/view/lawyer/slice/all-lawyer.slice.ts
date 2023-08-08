import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServerResponse } from "../../../models/serve-response.model";
import API, { pageCount } from "../../../services/API";
import { IParams } from "../../../models/params.model";
import { ILawyer } from "../models/lawyer.model";
import { getRoleRequest } from "../../../utils/request/request";
import { Roles } from "../../../utils/roles";

const initialState: ServerResponse<ILawyer[]> = {
    results: [],
    count: 0,
}

export const getAllLawyer = createAsyncThunk(
    'get/all/lawyers',
    async (data: IParams) => {
        const response  = await getRoleRequest(data, Roles.lawyer);
        return response.data
    }
)

const allLawyerSlice = createSlice({
    name: 'lawyers',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllLawyer.fulfilled, (state, action) => {
            state.results = action.payload;
            state.count = action.payload.count;
        })
    },
});

export default allLawyerSlice.reducer;