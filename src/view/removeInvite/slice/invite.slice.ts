import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServerResponse } from "../../../models/serve-response.model";
import API, { pageCount } from "../../../services/API";
import { IParams } from "../../../models/params.model";
import { IInvite, InviteBody } from "../models/invite.model";

const initialState: ServerResponse<IInvite[]> = {
    results: [],
    count: 0,
}

export const getAllInvites = createAsyncThunk(
    'get/all/invites',
    async (data: IParams) => {
        const response = await API.get(`invite/`,
            {
                params: {
                    page: data.page,
                    limit: pageCount,
                    offset: (data.page - 1) * pageCount
                }
            })
        return response.data;
    }
)


// export const removeInvite = createAsyncThunk(
//     'remove/invite',
//     async (data: InviteBody) => {
//         const response = await API.post(`change-invite-status/${data.id}`,
//             data.sendData)
//         return response.data;
//     }
// )
export const removeInvite = createAsyncThunk(
    'change/invite/status',
    async (data: InviteBody) => {
        const response = await API.post(`change-invite-status/${data.id}/`, data.sendData);
        if ((response.status === 200 || response.status === 201) && !!data.createSuccessfully) {
            data.createSuccessfully();
        }
        return response.data;
    }
)
const allInviteSlice = createSlice({
    name: 'invites',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllInvites.fulfilled, (state, action) => {
            state.results = action.payload.results;
            state.count = action.payload.count;
        })
    },
});

export default allInviteSlice.reducer;