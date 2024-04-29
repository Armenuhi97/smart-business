import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServerResponse } from "../../../models/serve-response.model";
import { IMeasurement } from "../model/measurement.model";
import { IParams } from "../../../models/params.model";
import API from "../../../services/API";
import { IAdd, IDelete, IModify } from "../../../models/action.model";

const initialState: ServerResponse<IMeasurement[]> = {
    count: 0,
    results: []
}
export const getMeasurement = createAsyncThunk(
    'get/measurement',
    async (data: IParams) => {
        const response = await API.get('measurement/');
        return response.data;
    }
)
export const modifyMeasurement = createAsyncThunk(
    'modify/measurement',
    async (data: IModify<IMeasurement>) => {
        const response = await API.put(`measurement/${data.id}/`, data.sendObject);
        if (response.status === 200 || response.status === 201) {
            if (data.updateSuccessfully)
                data.updateSuccessfully();
        }
        return response.data;
    }
)
export const addMeasurement = createAsyncThunk(
    'add/measurement',
    async (data: IAdd<IMeasurement>) => {
        const response = await API.post('measurement/', data.sendData);

        if ((response.status === 200 || response.status === 201) && !!data.createSuccessfully) {
            data.createSuccessfully();
        }
        return response.data;
    }
)
export const deleteMeasurement = createAsyncThunk(
    'delete/measurement',
    async (data: IDelete) => {
        const response = await API.delete(`measurement/${data.id}/`);
        if (response.status === 200 || response.status === 201 || response.status === 204) {
            data.deleteSuccessfully(data.page);
        }
        return response.data;
    }
)
const allMeasurementSlice = createSlice({
    name: 'measurement',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getMeasurement.fulfilled, (state, action) => {
            state.results = action.payload;
        })
    }
})

export default allMeasurementSlice.reducer;
