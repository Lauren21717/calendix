'use client';
import { weekdaysShortNames } from "@/libs/shared";
import { BookingTimes, WeekdayName } from "@/libs/types";
import clsx from "clsx";
import {
    addDays, addMinutes, addMonths,
    format, getDay, isBefore, isEqual,
    isFuture, isLastDayOfMonth, isToday,
    subMonths
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function TimePicker({
    bookingTimes,
    length,
}: {
    bookingTimes: BookingTimes;
    length: number;
}) {
    const currentDate = new Date();
    const [activeMonthDate, setActiveMonthDate] = useState(currentDate);
    const [activeMonthIndex, setActiveMonthIndex] = useState(activeMonthDate.getMonth());
    const [activeYear, setActiveYear] = useState(activeMonthDate.getFullYear());
    const [selectedDay, setSelectedDay] = useState<null | Date>(null);

    const firstDayOfCurrentMonth = new Date(activeYear, activeMonthIndex, 1);
    const firstDayOfCurrentMonthWeekdayIndex = getDay(firstDayOfCurrentMonth);
    const emptyDaysCount = firstDayOfCurrentMonthWeekdayIndex === 0 ? 6 : firstDayOfCurrentMonthWeekdayIndex - 1;
    const emptyDaysArr = (new Array(emptyDaysCount)).fill('', 0, emptyDaysCount);
    const daysNumbers = [firstDayOfCurrentMonth];

    do {
        const lastAddedDay = daysNumbers[daysNumbers.length - 1];
        daysNumbers.push(addDays(lastAddedDay, 1));
    } while (!isLastDayOfMonth(daysNumbers[daysNumbers.length - 1]));

    let selectedDayConfig = null;
    const bookingHours = [];
    if (selectedDay) {
        const weekdayNameIndex = format(selectedDay, "EEEE").toLowerCase() as WeekdayName;
        selectedDayConfig = bookingTimes?.[weekdayNameIndex];
        if (selectedDayConfig) {

            const [hoursFrom, minutesFrom] = selectedDayConfig.from.split(':');
            const selectedDayFrom = new Date(selectedDay);
            selectedDayFrom.setHours(parseInt(hoursFrom));
            selectedDayFrom.setMinutes(parseInt(minutesFrom));

            const selectedDayTo = new Date(selectedDay);
            const [hoursTo, minutesTo] = selectedDayConfig.to.split(':');
            selectedDayTo.setHours(parseInt(hoursTo));
            selectedDayTo.setMinutes(parseInt(minutesTo));

            let a = selectedDayFrom;
            do {
                bookingHours.push(a);
                a = addMinutes(a, 30);
            } while (isBefore(addMinutes(a, length), selectedDayTo));
        }
    }

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

    function handleDayClick(day: Date) {
        setSelectedDay(day);
    }

    return (
        <div className="flex">
            <div className="p-8">
                <div className="flex items-center">
                    <span className="grow">
                        {format(new Date(activeYear, activeMonthIndex), "MMMM")} {activeYear}
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
                    {daysNumbers.map(n => {
                        const weekdayNameIndex = format(n, "EEEE").toLowerCase() as WeekdayName;
                        const weekdayConfig = bookingTimes?.[weekdayNameIndex];
                        const isActiveInBookingTimes = weekdayConfig?.active;
                        const canBeBooked = isFuture(n) && isActiveInBookingTimes;
                        const isSelected = selectedDay && isEqual(n, selectedDay);

                        return (
                            <div className="text-center text-sm text-gray-400 font-bold">
                                <button
                                    disabled={!canBeBooked}
                                    onClick={() => handleDayClick(n)}
                                    className={clsx(
                                        "w-8 h-8 rounded-full inline-flex items-center justify-center",
                                        canBeBooked && !isSelected ? "bg-blue-200 text-blue-700" : "",
                                        isSelected ? "bg-blue-500 text-white" : "",
                                        isToday(n) && !isSelected ? "bg-gray-200 text-gray-500" : "",
                                    )}
                                >
                                    {format(n, 'd')}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedDay && (
                <div className="pt-8 pl-2 overflow-auto pr-8 w-48">
                    <p className="text-left text-sm">
                        {format(selectedDay, "EEEE, MMMM d")}
                    </p>

                    <div className="grid gap-1 mt-2 max-h-52">
                        {bookingHours.map(bookingTime => (
                            <div>
                                <button className="w-full block border-2 rounded-lg border-blue-600 text-blue-600 font-semibold">
                                    {format(bookingTime, 'HH:mm')}
                                </button>
                            </div>
                        ))}
                        <div className="mb-8">&nbsp;</div>
                    </div>
                </div>
            )}
        </div>
    );
}