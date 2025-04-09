"use client"
import React from 'react'
import { DayPicker } from "react-day-picker"
import 'react-day-picker/dist/style.css'

type Props = {
    selectedDate: Record<string, boolean>,
    onToggleDate: (dateStr: string) => void
}

function HabitCalendar({ selectedDate, onToggleDate }: Props) {
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
        <div className="calendar-container">
            <style jsx global>{`
                .rdp {
                    --rdp-cell-size: min(38px, 10vw); /* Responsive cell size */
                    --rdp-accent-color: #10b981;
                    --rdp-background-color: #e5e7eb;
                    margin: 0;
                    font-size: 0.9rem;
                }
                @media (max-width: 640px) {
                    .rdp {
                        --rdp-cell-size: min(32px, 8.5vw);
                        font-size: 0.8rem;
                    }
                }
                .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
                    background-color: #add8e6;  /* Light blue fill */
                    color: white;  /* Ensures text remains white for contrast */
                    border: none;  /* Remove any border */
                }
                .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                    background-color: #f3f4f6;
                }
                .rdp-months {
                    justify-content: center;
                }
                .rdp-month {
                    width: 100%;
                }
                .rdp-caption {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0;
                }
                .rdp-caption_label {
                    font-size: 1rem;
                    font-weight: 500;
                }
                @media (max-width: 640px) {
                    .rdp-caption_label {
                        font-size: 0.9rem;
                    }
                }
            `}</style>
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 sm:p-4 max-w-[calc(100vw-40px)] sm:max-w-xs text-slate-700">
                <DayPicker
                    mode="multiple"
                    selected={selected}
                    onDayClick={handleSelect}
                    defaultMonth={new Date()}
                    disabled={{ after: new Date(), before: new Date(0) }}
                    showOutsideDays
                    fixedWeeks
                    classNames={{
                        selected: `bg-amber-500 border-amber-500 text-white rounded-full`, // Highlight the selected day
                        today: `rounded-full border-black`, // Add a border to today's date
                        
                        
                      }}
                />
            </div>
        </div>
    )
}

export default HabitCalendar