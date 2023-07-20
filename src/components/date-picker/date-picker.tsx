import React from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.scss';

function MyDatePicker({ selectValue, setField }: any) {
    return <DatePicker wrapperClassName="datePicker" selected={selectValue ? selectValue as Date : null} dateFormat="dd/MM/yyyy"
        onChange={(e: Date) => setField(e)} />

}
export default MyDatePicker;