import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAccountant } from "../models/accountant.model";
import { ServerResponse } from "../../../models/serve-response.model";
import API, { pageCount } from "../../../services/API";
import { IParams } from "../../../models/params.model";
import { getRoleRequest } from "../../../utils/request/request";
import { Roles } from "../../../utils/roles";

const initialState: ServerResponse<IAccountant[]> = {
    results: [],
    count: 0,
}

export const getAllAccountant = createAsyncThunk(
    'get/all/accountant',
    async (data: IParams) => {
        const response = await getRoleRequest(data, Roles.accountant);
        return response.data
    }
)

const allAccountantSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        isActive: (state: ServerResponse<IAccountant[]>, action: PayloadAction<{ id: number }>) => {
            state.results = state.results.map((data: IAccountant) => {
                if (data.id === action.payload.id) {
                    return {
                        ...data,
                        is_acc_active: !data.is_acc_active
                    }
                } else {
                    return data;
                }
            })
            return state;
        }
    },
    extraReducers(builder) {
        builder.addCase(getAllAccountant.fulfilled, (state, action) => {
            state.results = action.payload.results;
            state.count = action.payload.count;
        })
    },
});
export const { isActive } = allAccountantSlice.actions;
export default allAccountantSlice.reducer;