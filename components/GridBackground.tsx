"use client"

import { useEffect } from "react"

export default function GridBackground() {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--x", `${e.clientX}px`)
      document.documentElement.style.setProperty("--y", `${e.clientY}px`)
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <>
      {/* Grid */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none
        bg-[conic-gradient(from_270deg_at_bottom_1px_right_1px,#141414_25%,transparent_0)]
        [background-size:60px_60px]"
      />

      {/* Hot Orange Glow - Primary Radial Gradient */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none
        bg-[radial-gradient(320px_at_var(--x)_var(--y),rgba(255,90,0,0.35),transparent_65%)]"
      />

      {/* Hot Orange + Cursor Crosshair */}
      <div
        className="fixed top-[var(--y)] left-[var(--x)]
        -translate-x-1/2 -translate-y-1/2
        text-orange-500 text-2xl font-semibold
        pointer-events-none z-50
        drop-shadow-[0_0_10px_rgba(255,90,0,0.9)]"
      >
        +
      </div>
    </>
  )
}
