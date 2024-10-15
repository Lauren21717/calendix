'use client';
import axios from "axios";
import { format } from "date-fns";
import { FormEvent, useState } from "react";


type PageProps = {
    params: {
        username: string;
        "booking-uri": string;
        "booking-time": string;
    }
}

export default function BookingFormPage(props: PageProps) {
    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [guestNotes, setGuestNotes] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const username = props.params.username;
    const bookingUri = props.params["booking-uri"];
    const bookingTime = new Date(decodeURIComponent(props.params["booking-time"]));

    async function handleFormSubmit(ev: FormEvent) {
        ev.preventDefault();
        const data = axios.post('/api/bookings', { guestName, guestEmail, guestNotes, username, bookingUri, bookingTime });
        await axios.post('/api/bookings', data);
        setConfirmed(true);
    }

    return (
        <div className="text-left p-8 w-[400px]">
            <h2 className="text-gray-600 text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                {format(bookingTime, "EEEE, MMMM d, HH:mm")}
            </h2>

            {confirmed && (
                <div>
                    <p className="text-gray-800 text-lg">Thanks for your booking!</p>
                </div>
            )}

            {!confirmed && (
                <form onSubmit={handleFormSubmit}>
                    <label>
                        <span>Your name*</span>
                        <input
                            value={guestName}
                            onChange={ev => setGuestName(ev.target.value)}
                            type="text"
                            placeholder="John Doe" 
                            required />
                    </label>
                    <label>
                        <span>Your Email*</span>
                        <input
                            value={guestEmail}
                            onChange={ev => setGuestEmail(ev.target.value)}
                            type="email"
                            placeholder="test@example.com"
                            required />
                    </label>
                    <label>
                        <span>Any Additional info</span>
                        <textarea
                            value={guestNotes}
                            onChange={ev => setGuestNotes(ev.target.value)}
                            placeholder="Any relevant information (optional)" />
                    </label>
                    <div className="text-right">
                        <button className="btn-blue">
                            Confirm Booking
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}