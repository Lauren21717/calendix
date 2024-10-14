import { format } from "date-fns";


type PageProps = {
    params: {
        username: string;
        "booking-uri": string;
        "booking-time": string;
    }
}

export default function BookingFormPage(props: PageProps) {
    const username = props.params.username;
    const bookingUri = props.params["booking-uri"];
    const bookingTime = new Date(decodeURIComponent(props.params["booking-time"]));

    return (
        <div className="text-left p-8">
            <h2 className="text-gray-600 text-2xl font-bold mb-4 pb-2 border-b border-black/10">
                {format(bookingTime, "EEEE, MMMM d, HH:mm")}
            </h2>
            <form>
                <label>
                    <span>Your name</span>
                    <input type="text" placeholder="John Doe" />
                </label>
                <label>
                    <span>Your Email</span>
                    <input type="email" placeholder="test@example.com" />
                </label>
                <label>
                    <span>Any Additional info</span>
                    <textarea placeholder="Any relevant information (optional)" />
                </label>
                <div className="text-right">
                    <button className="btn-blue">
                        Confirm Booking
                    </button>
                </div>
            </form>
            <pre>
                {JSON.stringify({ username, bookingUri, bookingTime }, null, 2)}
            </pre>
        </div>
    );
}