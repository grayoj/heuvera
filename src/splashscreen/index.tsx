"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Use next/navigation instead of next/router

const SplashScreen = () => {
    const router = useRouter(); // ✅ This now works in the app directory

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/marketplace/explore");
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div>
            <h1>Welcome to the App!</h1>
            <p>Redirecting in 5 seconds...</p>
        </div>
    );
};

export default SplashScreen;
