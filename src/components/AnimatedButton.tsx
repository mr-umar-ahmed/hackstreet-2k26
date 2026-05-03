// src/components/AnimatedButton.tsx
"use client";

import React from 'react';

interface AnimatedButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function AnimatedButton({ text, href, onClick, className = "", type = "button" }: AnimatedButtonProps) {
  const content = (
    <>
      <div className="cyber-button__line"></div>
      <div className="cyber-button__line"></div>
      <span className="cyber-button__text">{text}</span>
      <div className="cyber-button__drow1"></div>
      <div className="cyber-button__drow2"></div>
    </>
  );

  // Render as anchor tag if href is provided, otherwise render as button
  if (href) {
    return (
      <a href={href} className={`cyber-button type--cyber ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`cyber-button type--cyber ${className}`}>
      {content}
    </button>
  );
}