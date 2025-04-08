import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type DatePickerProps = {
    toggleButton: React.ReactNode,
    selected: Date,
    onSelect: (selection: Date|undefined) => void
}

export default function DatePicker({ toggleButton, selected, onSelect }: DatePickerProps) {
    return (
        <Popover modal>
          <PopoverTrigger asChild>
            { toggleButton }
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selected}
              onSelect={onSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
    )
}
