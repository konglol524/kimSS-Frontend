import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

export default function DateReserve({onDateChange}:{onDateChange:Function}) {
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className='rounded-lg scale-[80%] bg-white' format='DD/MM/YYYY' onChange={(value)=>onDateChange(value)}/>
            </LocalizationProvider>
        </div>
    )
}