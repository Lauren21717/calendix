'use server';

import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { session } from "@/app/libs/session";



export default async function Header() {
    const email = await session().get('email');
    return (
        <header className="flex gap-4 justify-between py-4 text-gray-600 font-light">
            <div className="flex items-center gap-10">
                <Link href={'/'} className="text-blue-600 font-bold text-2xl flex gap-2 items-center">
                    <CalendarDays size={24} />
                    Calendix
                </Link>
                <nav className="flex gap-4">
                    <Link href={'/features'}>Features</Link>
                    <Link href={'/about'}>About</Link>
                    <Link href={'/pricing'}>Pricing</Link>
                </nav>
            </div>
            {email && (
                <nav className="flex items-center gap-4">
                    <Link href={'/about'} className="bg-blue-600 text-white py-2 px-4 rounded-full">
                        Dashboard
                    </Link>
                    <Link href={'/api/logout'}>Logout</Link>
                </nav>
            )}
            {!email && (
                <nav className="flex items-center gap-4">
                    <Link href={'/features'}>Sign in</Link>
                    <Link href={'/about'} className="bg-blue-600 text-white py-2 px-4 rounded-full">Get started</Link>
                </nav>
            )}

        </header>
    );
}