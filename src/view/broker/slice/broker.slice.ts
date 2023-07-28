import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import API from "../../../services/API";
import { IAdd, IDelete, IModify } from "../../../models/action.model";
import { IBroker } from "../models/broker.model";


const initialState: { broker: IBroker } = {
    broker: {} as IBroker
}

export const getBrokerById = createAsyncThunk(
    'get/broker-by-id/',
    async (id: number) => {
        const response = await API.get(`broker/${id}`)
        return response.data
    }
)
export const addBroker = createAsyncThunk(
    'add/broker',
    async (data: IAdd<IBroker>) => {
        const response = await API.post('auth/registration/role', data.sendData);
        if (response.data === 'This brokername is already Exist') {
            toast.error(response.data, {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            if ((response.status === 200 || response.status === 201) && !!data.createSuccessfully) {
                data.createSuccessfully();
            }
        }
        return response.data;
    }
)
export const deleteBroker = createAsyncThunk(
    'delete/broker',
    async (data: IDelete) => {
        const response = await API.delete(`broker/${data.id}`);
        if (response.status === 200 || response.status === 201) {
            data.deleteSuccessfully(data.page);
        }
        return response.data;
    }
)
export const modifyBroker = createAsyncThunk(
    'modify/broker',
    async (data: IModify<IBroker>) => {
        const response = await API.put(`broker/edit/${data.id}`, data.sendObject);
        if (response.status === 200 || response.status === 201) {

            if (data.updateSuccessfully)
                data.updateSuccessfully();
        }
        return response.data;
    }
)
const brokerByIdSlice = createSlice({
    name: 'broker-by-id',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getBrokerById.fulfilled, (state, action) => {
            state.broker = action.payload.broker;
        })
    },
});

export default brokerByIdSlice.reducer;