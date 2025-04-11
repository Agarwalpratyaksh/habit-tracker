"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


type Props = {
    selectedDate: Record<string, boolean>,
    onToggleDate: (dateStr: string) => void
}

export default function HCalendar({selectedDate,onToggleDate}:Props) {
  
    // Filter only the selected dates
    const selected = Object.entries(selectedDate)
        .filter(([_, isSelected]) => isSelected)
        .map(([dateStr]) => {
            // Create proper Date objects in local timezone
            const date = new Date(dateStr)
            // Handle timezone offset to ensure correct day display
            return date
        })

    const handleSelect = (date: Date | undefined) => {
        if (!date) return
        
        // Format date consistently to match the format used in the habit tracker
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const dateStr = `${year}-${month}-${day}`
        
        onToggleDate(dateStr)
    }
    

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={'border-2 px-2 py-1'}
        >
          <CalendarIcon />
         
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
           mode="multiple"
           selected={selected}
           onDayClick={handleSelect}
           defaultMonth={new Date()}
           disabled={{ after: new Date(), before: new Date(0) }}
           showOutsideDays
           fixedWeeks
           classNames={{
               day_selected: `!bg-amber-300/20 !border-amber-300 text-white rounded-full`, // Highlight the selected day
              //  day_today: `rounded-full border-black`, // Add a border to today's date
              day_today: `!border-amber-500 !bg-white`, // Add a border to today's date
              // selected: `bg-amber-500 border-amber-500 text-white`, // Highlight the selected day

               
             }}
        />
      </PopoverContent>
    </Popover>
  )
}
