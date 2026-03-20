import { useState, useEffect } from "react";

const STORAGE_KEY = "malta_app_onboarded";

const steps = [
    {
        icon: (
            <svg
                width='28'
                height='28'
                viewBox='0 0 24 24'
                fill='none'
                stroke='white'
                strokeWidth='1.8'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <line x1='1' y1='1' x2='23' y2='23' />
                <path d='M16.72 11.06A10.94 10.94 0 0 1 19 12.55' />
                <path d='M5 12.55a10.94 10.94 0 0 1 5.17-2.39' />
                <path d='M10.71 5.05A16 16 0 0 1 22.56 9' />
                <path d='M1.42 9a15.91 15.91 0 0 1 4.7-2.88' />
                <path d='M8.53 16.11a6 6 0 0 1 6.95 0' />
                <line x1='12' y1='20' x2='12.01' y2='20' />
            </svg>
        ),
        title: "Works without internet",
        body: "Everything — maps, transport, emergency numbers — is saved to your device on first open. No signal needed.",
    },
    {
        icon: (
            <svg
                width='28'
                height='28'
                viewBox='0 0 24 24'
                fill='none'
                stroke='white'
                strokeWidth='1.8'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
                <path d='M7 11V7a5 5 0 0 1 10 0v4' />
            </svg>
        ),
        title: "No login needed",
        body: "Open the app and go. No account, no password, no sign-up. Your device, your guide.",
    },
    {
        icon: (
            <svg
                width='28'
                height='28'
                viewBox='0 0 24 24'
                fill='none'
                stroke='white'
                strokeWidth='1.8'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M12 2L2 7v10c0 5 10 5 10 5s10 0 10-5V7L12 2z' />
                <line x1='12' y1='8' x2='12' y2='13' />
                <circle cx='12' cy='16' r='0.5' fill='white' />
            </svg>
        ),
        title: "Emergency info is one tap away",
        body: "Tap the red strip on the home screen or the Info tab at any time to reach emergency numbers instantly.",
    },
    {
        icon: (
            <svg
                width='28'
                height='28'
                viewBox='0 0 24 24'
                fill='none'
                stroke='white'
                strokeWidth='1.8'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <circle cx='12' cy='12' r='10' />
                <polyline points='12 6 12 12 16 14' />
            </svg>
        ),
        title: "Built for your course stay",
        body: "Transport directions, nearby places, and maps are all oriented from your course venue in Valletta.",
    },
];

export default function Onboarding() {
    const [visible, setVisible] = useState(false);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const done = localStorage.getItem(STORAGE_KEY);
        if (!done) setVisible(true);
    }, []);

    const handleDismiss = () => {
        setExiting(true);
        setTimeout(() => {
            localStorage.setItem(STORAGE_KEY, "true");
            setVisible(false);
        }, 380);
    };

    if (!visible) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 900,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
            }}>
            {/* Backdrop */}
            <div
                onClick={handleDismiss}
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(28,25,23,0.6)",
                    opacity: exiting ? 0 : 1,
                    transition: "opacity 0.35s ease",
                }}
            />

            {/* Sheet */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 480,
                    background: "var(--cream)",
                    borderRadius: "28px 28px 0 0",
                    padding: "0 0 40px",
                    transform: exiting ? "translateY(100%)" : "translateY(0)",
                    transition: "transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)",
                    willChange: "transform",
                    overflow: "hidden",
                }}>
                {/* Red hero strip */}
                <div
                    style={{
                        background: "var(--red)",
                        padding: "32px 28px 28px",
                        position: "relative",
                        overflow: "hidden",
                    }}>
                    {/* Subtle pattern */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            opacity: 0.08,
                            backgroundImage:
                                "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                            backgroundSize: "14px 14px",
                        }}
                    />
                    {/* George Cross hint */}
                    <div
                        style={{
                            position: "absolute",
                            top: 16,
                            right: 24,
                            opacity: 0.15,
                        }}>
                        <div
                            style={{
                                position: "absolute",
                                width: 5,
                                height: 44,
                                left: 19,
                                top: 0,
                                background: "white",
                                borderRadius: 2,
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                width: 44,
                                height: 5,
                                top: 19,
                                left: 0,
                                background: "white",
                                borderRadius: 2,
                            }}
                        />
                    </div>

                    <div style={{ position: "relative" }}>
                        <p
                            style={{
                                fontSize: 11,
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.65)",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                marginBottom: 6,
                            }}>
                            Welcome
                        </p>
                        <h1
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: 36,
                                fontWeight: 500,
                                color: "white",
                                lineHeight: 1.1,
                                letterSpacing: "-0.01em",
                            }}>
                            Your Malta
                            <br />
                            Guide
                        </h1>
                        <p
                            style={{
                                fontSize: 13,
                                color: "rgba(255,255,255,0.72)",
                                fontWeight: 300,
                                marginTop: 8,
                            }}>
                            A few things to know before you start
                        </p>
                    </div>
                </div>

                {/* Steps */}
                <div style={{ padding: "24px 24px 0" }}>
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                gap: 14,
                                paddingBottom: 18,
                                marginBottom: i < steps.length - 1 ? 18 : 0,
                                borderBottom:
                                    i < steps.length - 1
                                        ? "1px solid var(--border)"
                                        : "none",
                            }}>
                            <div
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: "var(--r-md)",
                                    background: "var(--red)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}>
                                {step.icon}
                            </div>
                            <div style={{ flex: 1, paddingTop: 2 }}>
                                <p
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 500,
                                        color: "var(--ink)",
                                        marginBottom: 4,
                                    }}>
                                    {step.title}
                                </p>
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: "var(--ink-3)",
                                        fontWeight: 300,
                                        lineHeight: 1.6,
                                    }}>
                                    {step.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div style={{ padding: "24px 24px 0" }}>
                    <button
                        onClick={handleDismiss}
                        style={{
                            width: "100%",
                            padding: "16px",
                            background: "var(--red)",
                            color: "white",
                            border: "none",
                            borderRadius: "var(--r-md)",
                            fontSize: 16,
                            fontWeight: 500,
                            fontFamily: "var(--font-body)",
                            cursor: "pointer",
                            letterSpacing: "0.01em",
                        }}>
                        Get started
                    </button>
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: 11,
                            color: "var(--ink-4)",
                            marginTop: 10,
                            fontWeight: 300,
                        }}>
                        This message won't appear again
                    </p>
                </div>
            </div>
        </div>
    );
}
