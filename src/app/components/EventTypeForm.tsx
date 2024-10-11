'use client';
import TimeSelect from "@/app/components/TimeSelect";
import { BookingTimes, WeekdayName } from "@/libs/types";
import axios from "axios";
import clsx from "clsx";
import { useState } from "react";

const weekdaysNames: WeekdayName[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function EventTypeForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [length, setLength] = useState(30);
    const [bookingTimes, setBookingTimes] = useState<BookingTimes>({});

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await axios.post('/api/event-types', {
            title, description, length, bookingTimes
        });
        console.log({response});
    }

    function handleBookingTimeChange(
        day: WeekdayName,
        val: string | boolean,
        prop: 'from' | 'to' | 'active'
    ) {
        setBookingTimes(oldBookingTimes => {
            const newBookingTimes: BookingTimes = { ...oldBookingTimes };
            if (!newBookingTimes[day]) {
                newBookingTimes[day] = { from: '00:00', to: '00:00' };
            }
            newBookingTimes[day][prop] = val;
            return newBookingTimes;
        });
    }

    return (
        <form className="p-2 bg-gray-200 rounded-lg" onSubmit={handleSubmit}>
            create new event type:
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label>
                        <span>title</span>
                        <input
                            type="text"
                            placeholder="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </label>
                    <label>
                        <span>description</span>
                        <textarea
                            placeholder="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        <span>event length (minutes)</span>
                        <input
                            type="number"
                            placeholder="30"
                            value={length}
                            onChange={e => setLength(parseInt(e.target.value))}
                        />
                    </label>
                </div>
                <div>
                    <span className="label">availability</span>
                    <div className="grid gap-2">
                        {weekdaysNames.map(day => {
                            const from = bookingTimes?.[day]?.from;
                            const to = bookingTimes?.[day]?.to;
                            const active = bookingTimes?.[day]?.active;
                            return (
                                <div className="grid grid-cols-2 gap-2 items-cemter">
                                    <label className="flex gap-1 capitalize !mb-0 !p-0">
                                        <input
                                            type="checkbox"
                                            value={1}
                                            checked={bookingTimes?.[day]?.active}
                                            onChange={ev => handleBookingTimeChange(day, ev.target.checked, 'active')}
                                        />
                                        {day}
                                    </label>

                                    <div className={clsx(
                                        "inline-flex gap-2 items-center ml-2",
                                        active ? '' : 'opacity-40'
                                    )}>
                                        <TimeSelect
                                            value={bookingTimes?.[day]?.from || '00:00'}
                                            onChange={val => handleBookingTimeChange(day, val, 'from')}
                                            step={30} />
                                        <span>-</span>
                                        <TimeSelect
                                            value={bookingTimes?.[day]?.to || '00:00'}
                                            onChange={val => handleBookingTimeChange(day, val, 'to')}
                                            step={30} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button type="submit" className="btn-blue !px-8">
                    Save
                </button>
            </div>
        </form>
    );
}