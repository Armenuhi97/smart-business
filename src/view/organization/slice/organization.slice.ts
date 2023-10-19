import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrganization } from "../model/organozation.model";
import { ServerResponse } from "../../../models/serve-response.model";
import { IParams } from "../../../models/params.model";
import API, { pageCount } from "../../../services/API";
import { IAdd, IDelete, IModify } from "../../../models/action.model";

const initialState: ServerResponse<IOrganization[]> = {
    results: [],
    count: 0,
}
export interface IUserCompanyParams extends IParams {
    clientId: number | undefined;
}
export const getUserOrganizations = createAsyncThunk(
    'get/organization/organization',
    async (data: IUserCompanyParams) => {
        console.log(data);
        
        const response = await API.get(`company/`,
            {
                params: {
                    // skip: data.isAll ? 0 : (data!.page! - 1) * 10,
                    // take: data.isAll ? 100 : pageCount,
                    client_id: data.clientId?.toString(),
                    limit: pageCount,
                    offset: (data.page - 1) * 100
                    // query: data.query,
                    // role: data.roleId
                }
            })
        return response.data
    }
)

export const getOrganizationById = createAsyncThunk(
    'get/organization-by-id/',
    async (id: number) => {
        const response = await API.get(`organization/${id}`)
        return response.data
    }
)
export const addOrganization = createAsyncThunk(
    'add/organization',
    async (data: IAdd<IOrganization>) => {
        const response = await API.post('auth/registration/role', data.sendData);
        // if (response.data === 'This organizationname is already Exist') {
        //     toast.error(response.data, {
        //         position: toast.POSITION.TOP_RIGHT
        //     });
        // } else {
        if ((response.status === 200 || response.status === 201) && !!data.createSuccessfully) {
            data.createSuccessfully();
        }
        // }
        return response.data;
    }
)
export const deleteOrganization = createAsyncThunk(
    'delete/organization',
    async (data: IDelete) => {
        const response = await API.delete(`organization/${data.id}`);
        if (response.status === 200 || response.status === 201) {
            data.deleteSuccessfully(data.page);
        }
        return response.data;
    }
)
export const modifyOrganization = createAsyncThunk(
    'modify/organization',
    async (data: IModify<IOrganization>) => {
        const response = await API.put(`organization/edit/${data.id}`, data.sendObject);
        if (response.status === 200 || response.status === 201) {

            if (data.updateSuccessfully)
                data.updateSuccessfully();
        }
        return response.data;
    }
)

const allOrganizationsSlice = createSlice({
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

export default allOrganizationsSlice.reducer;