import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type DatePickerProps = {
    toggleButton: React.ReactNode,
    date: Date,
    onSelect: (selection: Date|undefined) => void
}

export default function DatePicker({ toggleButton, date, onSelect }: DatePickerProps) {
    return (
        <Popover>
          <PopoverTrigger asChild>
            { toggleButton }
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
    )
}
