"use client";

import { useCallback, useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useReducedMotion } from "framer-motion";

interface GlobeAnimationProps {
    className?: string;
}

export function GlobeAnimation({ className }: GlobeAnimationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const phiRef = useRef(0);
    const shouldReduceMotion = useReducedMotion();

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

        const globe = createGlobe(canvas, {
            devicePixelRatio: 2,
            width: canvas.width,
            height: canvas.height,
            phi: 0,
            theta: 0.25,
            dark: 1,
            diffuse: 2,
            mapSamples: 16000,
            mapBrightness: 2,
            baseColor: [0.08, 0.15, 0.4],
            markerColor: [0.3, 0.5, 1],
            glowColor: [0.15, 0.3, 0.8],
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
    }, [onResize, shouldReduceMotion]);

    return (
        <div className={className}>
            <canvas
                ref={canvasRef}
                className="w-full aspect-square opacity-0 transition-opacity duration-1000"
                style={{
                    contain: "layout paint size",
                    maxWidth: "100%",
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
