import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAdd } from "../models/action.model";
import API from "../services/API";

export const uploadFile = createAsyncThunk(
    'upload/file/for/message',
    async (data: IAdd<FormData>) => {
        const response = await API.post('files/', data.sendData);
        if ((response.status === 200 || response.status === 201) && !!data.createSuccessfully) {
            data.createSuccessfully(response.data);
        }
        return response.data;
    }
)