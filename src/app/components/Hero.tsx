'use client'

import { useEffect, useState } from "react";

export default function Hero() {
    const [showLine, setShowLine] = useState(false);
    useEffect(() => {
        setShowLine(true);
    }, []);
    return (
        <section className="text-center mt-24">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
                Schediling{' '}
                <span className={"text-blue-700 cool-underline " + (showLine?'show-underline': '')}>
                    made simple
                </span>
                <br />
                for people like you
            </h1>
            <p className="text-gray-600">
                Most scheduling apps are simple but ours is even more simple. <br />
                On top of this, it's open source and you can see the code.
            </p>
        </section>
    );
}