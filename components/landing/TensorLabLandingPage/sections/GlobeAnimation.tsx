"use client";

import { useCallback, useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/app/providers/ThemeProvider";

interface GlobeAnimationProps {
    className?: string;
}

export function GlobeAnimation({ className }: GlobeAnimationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const phiRef = useRef(0);
    const shouldReduceMotion = useReducedMotion();
    const { isDark } = useTheme();

    const onResize = useCallback(() => {
        if (canvasRef.current) {
            const width = canvasRef.current.offsetWidth;
            canvasRef.current.width = width * 2;
            canvasRef.current.height = width * 2;
        }
    }, []);

    useEffect(() => {
        window.addEventListener("resize", onResize);
        onResize();

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Theme-aware colors
        const config = isDark
            ? {
                dark: 1,
                baseColor: [0.08, 0.15, 0.4] as [number, number, number],
                markerColor: [0.3, 0.5, 1] as [number, number, number],
                glowColor: [0.15, 0.3, 0.8] as [number, number, number],
                mapBrightness: 2,
            }
            : {
                dark: 0,
                baseColor: [0.94, 0.95, 0.98] as [number, number, number],
                markerColor: [0.6, 0.7, 0.95] as [number, number, number],
                glowColor: [0.96, 0.97, 1] as [number, number, number],
                mapBrightness: 2,
            };

        const dpr = Math.min(window.devicePixelRatio, 1.5);
        const globe = createGlobe(canvas, {
            devicePixelRatio: dpr,
            width: canvas.width,
            height: canvas.height,
            phi: phiRef.current,
            theta: 0.25,
            dark: config.dark,
            diffuse: 2,
            mapSamples: 8000,
            mapBrightness: config.mapBrightness,
            baseColor: config.baseColor,
            markerColor: config.markerColor,
            glowColor: config.glowColor,
            scale: 1,
            offset: [0, 0],
            markers: [],
            onRender: (state) => {
                if (!shouldReduceMotion) {
                    state.phi = phiRef.current;
                    phiRef.current += 0.003;
                }

                if (pointerInteracting.current !== null) {
                    state.phi = phiRef.current + pointerInteractionMovement.current;
                }

                state.width = canvas.width;
                state.height = canvas.height;
            },
        });

        // Fade in canvas
        setTimeout(() => {
            if (canvas) canvas.style.opacity = "1";
        }, 100);

        return () => {
            globe.destroy();
            window.removeEventListener("resize", onResize);
        };
    }, [onResize, shouldReduceMotion, isDark]);

    return (
        <div className={className} style={{ willChange: "transform" }}>
            <canvas
                ref={canvasRef}
                className="w-full aspect-square opacity-0 transition-opacity duration-1000"
                style={{
                    contain: "layout paint size",
                    maxWidth: "100%",
                    willChange: "transform",
                }}
                onPointerDown={(e) => {
                    pointerInteracting.current =
                        e.clientX - pointerInteractionMovement.current;
                    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null;
                    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null;
                    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
                }}
                onMouseMove={(e) => {
                    if (pointerInteracting.current !== null) {
                        const delta = e.clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta / 100;
                    }
                }}
                onTouchMove={(e) => {
                    if (pointerInteracting.current !== null && e.touches[0]) {
                        const delta = e.touches[0].clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta / 100;
                    }
                }}
            />
        </div>
    );
}
