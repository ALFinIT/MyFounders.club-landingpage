/**
 * Reusable Framer Motion animation variants for Apple-style scroll reveals
 * Elegant, smooth, premium feel without flashiness
 */

export const animationVariants = {
  // Fade in + slide up smoothly
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // smooth easing
      },
    },
  },

  // Simple fade in (for text overlays, backgrounds)
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  },

  // Stagger container for grouped elements (cards, list items)
  staggerContainer: {
    hidden: { opacity: 1 }, // Start visible in case scroll reveal doesn't trigger
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
        duration: 0.5,
      },
    },
  },

  // Child element variant for staggerred animations
  staggerItem: {
    hidden: { opacity: 1, y: 0 }, // Start visible immediately on mobile
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },

  // Scale + fade for images (subtle zoom)
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },

  // Slide from left (for sidebar-like content)
  slideInLeft: {
    hidden: { opacity: 0, x: -24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },

  // Slide from right (for sidebar-like content)
  slideInRight: {
    hidden: { opacity: 0, x: 24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
}

/**
 * Viewport config for scroll reveal triggers
 * Triggers once when element is visible in viewport
 * Mobile-optimized to ensure elements appear
 */
export const scrollRevealConfig = {
  once: true,
  amount: 0.1, // trigger when ~10% of element is visible (mobile-friendly, lower threshold)
  // No margin on mobile - let elements appear naturally
}
