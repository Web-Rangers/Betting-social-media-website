import React, { forwardRef, ReactNode, RefObject, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
    onChange: (date: Date) => void
}

const DateInput: React.FC<DateInputProps> = (props) => {
    const { onChange } = props
    const [startDate, setStartDate] = useState<Date>(new Date())

    function handleChange(date: Date) {
        setStartDate(date)
        onChange(date)
    }

    return (
        <DatePicker
            onChange={handleChange}
            selected={startDate}
            popperClassName='datePickerPopper'
        />
    )
}

export default DateInput
