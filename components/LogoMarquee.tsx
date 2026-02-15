"use client"

import React from 'react'

export default function LogoMarquee({ count = 25, speedSeconds = 40 }: { count?: number; speedSeconds?: number }) {
  const logos = Array.from({ length: count }, (_, i) => `/images/brandlogos/logo${i + 1}.png`)

  return (
    <div className="logo-marquee w-full overflow-hidden py-8">
      <div className="marquee-track-wrap">
        <div className="marquee-track">
          {logos.map((src, idx) => (
            <div key={`a-${idx}`} className="logo-item-wrapper">
              <img src={src} alt={`brand-${idx + 1}`} className="logo-item" />
            </div>
          ))}

          {logos.map((src, idx) => (
            <div key={`b-${idx}`} className="logo-item-wrapper">
              <img src={src} alt={`brand-dup-${idx + 1}`} className="logo-item" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .logo-marquee { position: relative; }
        .marquee-track-wrap { overflow: hidden; }
        .marquee-track { display: flex; align-items: center; gap: 2.5rem; min-width: 200%; animation: marquee ${speedSeconds}s linear infinite; }
        .logo-item-wrapper { display: flex; align-items: center; justify-content: center; padding: 0.5rem; }
        .logo-item { height: 4.5rem; width: auto; object-fit: contain; display: block; }
        @media (min-width: 640px) { .logo-item { height: 5.5rem; } }
        @media (min-width: 768px) { .logo-item { height: 6.5rem; } }
        @media (min-width: 1024px) { .logo-item { height: 7.5rem; } }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
