'use client'
import React, {useState} from "react";

export default function Form() {
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
    // State to toggle between Info and Form on Mobile
    const [mobileTab, setMobileTab] = useState<"info" | "form">("form");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("submitting");
        setTimeout(() => {
            setFormStatus("success");
            setTimeout(() => setFormStatus("idle"), 3000);
        }, 1500);
    };

    return (
        <div>Form</div>
    )
}
