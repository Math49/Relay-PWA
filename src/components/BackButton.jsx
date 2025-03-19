"use client";
import Link from "next/link";

export default function BackButton({ path }) {
    return (
        <div>
            <Link href={path} className="p-4">
                <i className="fa-solid fa-arrow-left-long text-3xl C-text-black" aria-hidden="true"></i>
            </Link>
        </div>
    );
}
