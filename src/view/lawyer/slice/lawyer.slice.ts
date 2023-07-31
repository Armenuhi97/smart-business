import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import API from "../../../services/API";
import { IAdd, IDelete, IModify } from "../../../models/action.model";
import { ILawyer } from "../models/lawyer.model";


const initialState: { lawyer: ILawyer } = {
    lawyer: {} as ILawyer
}

export const getLawyerById = createAsyncThunk(
    'get/lawyer-by-id/',
    async (id: number) => {
        const response = await API.get(`lawyer/${id}`)
        return response.data
    }
)
export const addLawyer = createAsyncThunk(
    'add/lawyer',
    async (data: IAdd<ILawyer>) => {
        const response = await API.post('auth/registration/role', data.sendData);
        if (response.data === 'This lawyername is already Exist') {
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
export const deleteLawyer = createAsyncThunk(
    'delete/lawyer',
    async (data: IDelete) => {
        const response = await API.delete(`lawyer/${data.id}`);
        if (response.status === 200 || response.status === 201) {
            data.deleteSuccessfully(data.page);
        }
        return response.data;
    }
)
export const modifyLawyer = createAsyncThunk(
    'modify/lawyer',
    async (data: IModify<ILawyer>) => {
        const response = await API.put(`lawyer/edit/${data.id}`, data.sendObject);
        if (response.status === 200 || response.status === 201) {

            if (data.updateSuccessfully)
                data.updateSuccessfully();
        }
        return response.data;
    }
)
const lawyerByIdSlice = createSlice({
    name: 'lawyer-by-id',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getLawyerById.fulfilled, (state, action) => {
            state.lawyer = action.payload.lawyer;
        })
    },
});

export default lawyerByIdSlice.reducer;