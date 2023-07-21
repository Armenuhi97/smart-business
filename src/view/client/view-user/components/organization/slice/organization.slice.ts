import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
;
import { IOrganization } from "../model/organozation.model";
import { ServerResponse } from "../../../../../../models/serve-response.model";
import { IParams } from "../../../../../../models/params.model";
import API, { pageCount } from "../../../../../../services/API";

const initialState: ServerResponse<IOrganization[]> = {
    results: [],
    count: 0,
}

export const getUserOrganizations = createAsyncThunk(
    'get/user/organization',
    async (data: IParams) => {
        const response = await API.get(`user/organization/${data.id}/`,
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

const allUsersSlice = createSlice({
    name: 'organizations',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUserOrganizations.fulfilled, (state, action) => {
            state.results = action.payload.results;
            state.count = action.payload.count;
        })
    },
});

export default allUsersSlice.reducer;