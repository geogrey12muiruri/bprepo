"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface SheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    side?: "left" | "right";
}

export function Sheet({ isOpen, onClose, children, side = "right" }: SheetProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!mounted) return null;

    const content = (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[140] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer Panel */}
            <div
                className={`fixed top-0 bottom-0 z-[150] w-[85vw] max-w-[400px] bg-white shadow-2xl transition-transform duration-500 cubic-[0.16,1,0.3,1] ${side === "right" ? "right-0" : "left-0"
                    } ${isOpen
                        ? "translate-x-0"
                        : side === "right"
                            ? "translate-x-full"
                            : "-translate-x-full"
                    }`}
                role="dialog"
                aria-modal="true"
            >
                <div className="h-full flex flex-col drawer-content">
                    {children}
                </div>
            </div>
        </>
    );

    return createPortal(content, document.body);
}
