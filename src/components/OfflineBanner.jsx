import { useState, useEffect } from "react";

export default function OfflineBanner() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [wasOffline, setWasOffline] = useState(false);
    const [showBackOnline, setShowBackOnline] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            if (wasOffline) {
                setShowBackOnline(true);
                setTimeout(() => setShowBackOnline(false), 3000);
            }
        };
        const handleOffline = () => {
            setIsOnline(false);
            setWasOffline(true);
            setShowBackOnline(false);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, [wasOffline]);

    const visible = !isOnline || showBackOnline;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                maxWidth: 480,
                zIndex: 500,
                pointerEvents: visible ? "all" : "none",
            }}>
            {/* Offline banner */}
            <div
                style={{
                    background: "#292524",
                    color: "#E7E5E4",
                    padding: "11px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    transform: !isOnline
                        ? "translateY(0)"
                        : "translateY(-100%)",
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    willChange: "transform",
                }}>
                <div
                    style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#EF4444",
                        flexShrink: 0,
                        boxShadow: "0 0 0 3px rgba(239,68,68,0.2)",
                    }}
                />
                <div style={{ flex: 1 }}>
                    <p
                        style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: "#F5F5F4",
                            margin: 0,
                            lineHeight: 1.3,
                        }}>
                        You're offline
                    </p>
                    <p
                        style={{
                            fontSize: 11,
                            fontWeight: 300,
                            color: "#A8A29E",
                            margin: 0,
                            marginTop: 1,
                        }}>
                        Showing saved content — all sections still work
                    </p>
                </div>
                <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#78716C'
                    strokeWidth='2'
                    strokeLinecap='round'>
                    <line x1='1' y1='1' x2='23' y2='23' />
                    <path d='M16.72 11.06A10.94 10.94 0 0 1 19 12.55' />
                    <path d='M5 12.55a10.94 10.94 0 0 1 5.17-2.39' />
                    <path d='M10.71 5.05A16 16 0 0 1 22.56 9' />
                    <path d='M1.42 9a15.91 15.91 0 0 1 4.7-2.88' />
                    <path d='M8.53 16.11a6 6 0 0 1 6.95 0' />
                    <line x1='12' y1='20' x2='12.01' y2='20' />
                </svg>
            </div>

            {/* Back online confirmation */}
            <div
                style={{
                    background: "#166534",
                    color: "#DCFCE7",
                    padding: "11px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    transform: showBackOnline
                        ? "translateY(0)"
                        : "translateY(-100%)",
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    willChange: "transform",
                }}>
                <div
                    style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#4ADE80",
                        flexShrink: 0,
                    }}
                />
                <p
                    style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#DCFCE7",
                        margin: 0,
                    }}>
                    Back online
                </p>
            </div>
        </div>
    );
}
