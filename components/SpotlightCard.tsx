"use client";

import React, { useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

type SpotlightCardProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
  }
>;

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(37, 99, 235, 0.35)",
  tabIndex,
  onMouseMove,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const activeOpacity = 0.7;
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMoveInternal: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocusInternal = () => {
    setIsFocused(true);
    setOpacity(activeOpacity);
  };

  const handleBlurInternal = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnterInternal = () => {
    setOpacity(activeOpacity);
  };

  const handleMouseLeaveInternal = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      tabIndex={tabIndex ?? 0}
      onMouseMove={(e) => {
        onMouseMove?.(e);
        handleMouseMoveInternal(e);
      }}
      onFocus={(e) => {
        onFocus?.(e);
        handleFocusInternal();
      }}
      onBlur={(e) => {
        onBlur?.(e);
        handleBlurInternal();
      }}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        handleMouseEnterInternal();
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        handleMouseLeaveInternal();
      }}
      className={`relative overflow-hidden rounded-3xl border border-border bg-surface p-8 outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
      {...rest}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-normal transition-opacity duration-500 ease-in-out dark:mix-blend-soft-light"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 78%)`,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
