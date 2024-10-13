'use client';
import { weekdaysShortNames } from "@/libs/shared";
import { BookingTimes } from "@/libs/types";
import { addDays, addMonths, format, getDay, isLastDayOfMonth, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function TimePicker({ bookingTimes }: { bookingTimes: BookingTimes }) {
    const currentDate = new Date();
    const [activeMonthDate, setActiveMonthDate] = useState(currentDate);
    const [activeMonthIndex, setActiveMonthIndex] = useState(activeMonthDate.getMonth());
    const [activeYear, setActiveYear] = useState(activeMonthDate.getFullYear());
    const firstDayOfCurrentMonth = new Date(activeYear, activeMonthIndex, 1);
    const firstDayOfCurrentMonthWeekdayIndex = getDay(firstDayOfCurrentMonth);
    const emptyDaysCount = firstDayOfCurrentMonthWeekdayIndex === 0 ? 6 : firstDayOfCurrentMonthWeekdayIndex - 1;
    const emptyDaysArr = (new Array(emptyDaysCount)).fill('', 0, emptyDaysCount);
    const daysNumbers = [firstDayOfCurrentMonth];

    do {
        const lastAddedDay = daysNumbers[daysNumbers.length - 1];
        daysNumbers.push(addDays(lastAddedDay, 1));
    } while (!isLastDayOfMonth(daysNumbers[daysNumbers.length - 1]));

    function prevMonth() {
        setActiveMonthDate(prev => {
            const newActiveMonthDate = subMonths(prev, 1);
            setActiveMonthIndex(newActiveMonthDate.getMonth());
            setActiveYear(newActiveMonthDate.getFullYear());
            return newActiveMonthDate;
        });
    };

    function nextMonth() {
        setActiveMonthDate(prev => {
            const newActiveMonthDate = addMonths(prev, 1);
            setActiveMonthIndex(newActiveMonthDate.getMonth());
            setActiveYear(newActiveMonthDate.getFullYear());
            return newActiveMonthDate;
        });
    }

    return (
        <div className="flex gap-4">
            <div className="grow">
                <div className="flex items-center">
                    <span className="grow">
                        {format(new Date(activeYear, activeMonthIndex), "MMMM")} {activeYear}:
                    </span>
                    <button onClick={prevMonth}>
                        <ChevronLeft />
                    </button>
                    <button onClick={nextMonth}>
                        <ChevronRight />
                    </button>
                </div>

                <div className="inline-grid gap-2 grid-cols-7 mt-2">
                    {weekdaysShortNames.map((weekdaysShortNames) => (
                        <div className="text-center uppercase text-sm text-gray-500 font-bold">
                            {weekdaysShortNames}
                        </div>
                    ))}
                    {emptyDaysArr.map(empty => (
                        <div></div>
                    ))}
                    {daysNumbers.map(n => (
                        <div className="text-center text-sm text-gray-500 font-bold">
                            <div className="bg-gray-300 w-8 h-8 rounded-full inline-flex items-center justify-center">
                                {format(n, 'd')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="border border-black">
                time buttons
            </div>
        </div>
    );
}