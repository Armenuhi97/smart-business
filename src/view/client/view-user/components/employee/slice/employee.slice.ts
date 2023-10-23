import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServerResponse } from "../../../../../../models/serve-response.model";
import { IParams, WithClientId } from "../../../../../../models/params.model";
import API, { pageCount } from "../../../../../../services/API";
import { IAdd, IDelete, IModify } from "../../../../../../models/action.model";
import { IEmployeeObjectType } from "../model/employee.model";

const initialState: ServerResponse<IEmployeeObjectType[]> = {
    results: [],
    count: 0,
}

export const getUserEmployees = createAsyncThunk(
    'get/employee',
    async (data: WithClientId) => {
        const response = await API.get(`get-my-workers/`,
            {
                params: {
                    // skip: data.isAll ? 0 : (data!.page! - 1) * 10,
                    // take: data.isAll ? 100 : pageCount,
                    client_id: data.clientId,
                    limit: pageCount,
                    offset: (data.page - 1) * 100
                    // query: data.query,
                    // role: data.roleId
                }
            })
        return response.data
    }
)

export const getEmployeeById = createAsyncThunk(
    'get/employee-by-id/',
    async (id: number) => {
        const response = await API.get(`employee/${id}`)
        return response.data
    }
)
export const addEmployee = createAsyncThunk(
    'add/employee',
    async (data: IAdd<IEmployeeObjectType>) => {
        const response = await API.post('auth/registration/role', data.sendData);
        // if (response.data === 'This employeename is already Exist') {
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
export const deleteEmployee = createAsyncThunk(
    'delete/employee',
    async (data: IDelete) => {
        const response = await API.delete(`employee/${data.id}`);
        if (response.status === 200 || response.status === 201) {
            data.deleteSuccessfully(data.page);
        }
        return response.data;
    }
)
export const modifyEmployee = createAsyncThunk(
    'modify/employee',
    async (data: IModify<IEmployeeObjectType>) => {
        const response = await API.put(`employee/edit/${data.id}`, data.sendObject);
        if (response.status === 200 || response.status === 201) {

            if (data.updateSuccessfully)
                data.updateSuccessfully();
        }
        return response.data;
    }
)

const allEmployeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUserEmployees.fulfilled, (state, action) => {
            state.results = action.payload.results;
            state.count = action.payload.count;
        })
    },
});

export default allEmployeesSlice.reducer;