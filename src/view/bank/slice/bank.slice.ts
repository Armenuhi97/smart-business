import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBank } from "../model/bank.model";
import { ServerResponse } from "../../../models/serve-response.model";
import { IParams } from "../../../models/params.model";
import API, { pageCount } from "../../../services/API";
import { IAdd, IDelete, IModify } from "../../../models/action.model";

const initialState: ServerResponse<IBank[]> = {
    results: [],
    count: 0,
}

export const getBank = createAsyncThunk(
    'get/bank',
    async (data: IParams) => {
        const response = await API.get(`bank/`,
            // {
            //     params: {             
            //         // limit: pageCount,
            //         // offset: (data.page - 1) * 100

            //     }           
            // }
            )
        return response.data
    }
)

export const getBankById = createAsyncThunk(
    'get/bank-by-id/',
    async (id: number) => {
        const response = await API.get(`bank/${id}/`)
        return response.data
    }
)
export const addBank = createAsyncThunk(
    'add/bank',
    async (data: IAdd<IBank>) => {
        const response = await API.post('bank/', data.sendData);
    
            if ((response.status === 200 || response.status === 201) && !!data.createSuccessfully) {
                data.createSuccessfully();
            }
        return response.data;
    }
)
export const deleteBank = createAsyncThunk(
    'delete/bank',
    async (data: IDelete) => {
        const response = await API.delete(`bank/${data.id}/`);        
        if (response.status === 200 || response.status === 201  || response.status === 204) {
            data.deleteSuccessfully(data.page);
        }
        return response.data;
    }
)
export const modifyBank = createAsyncThunk(
    'modify/bank',
    async (data: IModify<IBank>) => {
        const response = await API.put(`bank/${data.id}/`, data.sendObject);
        if (response.status === 200 || response.status === 201) {

            if (data.updateSuccessfully)
                data.updateSuccessfully();
        }
        return response.data;
    }
)

const allBanksSlice = createSlice({
    name: 'banks',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getBank.fulfilled, (state, action) => {
            state.results = action.payload;
            // state.count = action.payload.length;
        })
    },
});

export default allBanksSlice.reducer;