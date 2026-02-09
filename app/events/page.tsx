'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

interface Event {
  id: string
  name: string
  description: string
  cover_url: string
  event_url: string
  date?: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null)

  useEffect(() => {
    // Fetch events from Luma API
    // Using the public Luma URL: https://luma.com/myfounders.club
    // For now, we'll show a placeholder structure
    // In production, integrate with Luma API or webhooks
    
    const fetchEvents = async () => {
      try {
        // Placeholder - In production connect to Luma API
        // For now, create a hardcoded list that links to Luma
        const mockEvents: Event[] = Array.from({ length: 12 }).map((_, i) => ({
          id: String(i + 1),
          name: [`Founders Circle Networking`, `Pitch Competition`, `Mentor Masterclass`, `Gulf Startup Summit`, `Investor Breakfast`, `Founder Fireside`, `Product Showcase`, `Scale Workshop`, `Regional Meetup`, `Investor AMA`, `Founder Retreat`, `Growth Sprint`][i] || `Event ${i + 1}`,
          description: [`Connect with like-minded founders and investors`, `Showcase your startup to angel investors`, `Learn growth strategies from industry leaders`, `Annual gathering of founders, investors and partners`, `Morning investor networking`, `Intimate founder conversations`, `Showcase product demos`, `Hands-on growth workshop`, `Meet founders in your region`, `Ask-me-anything with investors`, `Multi-day founder retreat`, `Intensive growth sprint`][i] || 'Event description',
          cover_url: [
            'https://images.unsplash.com/photo-1523225088030-7b3b7d4f8b6f?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1522199710521-72d69614c702?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1515165562835-c2d5f6f6f9f9?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1509475826633-fed577a2c71b?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop'
          ][i % 12],
          event_url: 'https://luma.com/myfounders.club',
          date: ['Feb 15, 2026','Feb 20, 2026','Feb 25, 2026','Mar 5, 2026','Mar 10, 2026','Mar 15, 2026','Mar 20, 2026','Apr 1, 2026','Apr 5, 2026','Apr 10, 2026','Apr 15, 2026','Apr 20, 2026'][i % 12]
        }))
        setEvents(mockEvents)
      } catch (err) {
        console.error('Error fetching events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <motion.div
      className="min-h-screen bg-page pt-32 pb-20 px-4 sm:px-6 lg:px-8 transition-smooth"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header: simple text back link */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="text-white text-sm hover:text-orange-400 transition-colors">
          &lt;- Back
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            My Founders Club Events
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4">
              Join us for exclusive networking events, pitch competitions, and masterclasses. Connect with the Gulf startup ecosystem.
            </p>

          {/* Horizontal Luma Card (clickable) */}
          <a
            href="https://luma.com/myfounders.club"
            target="_blank"
            rel="noopener noreferrer"
            className="group block mb-10 overflow-hidden rounded-2xl"
            aria-label="View All Events on Luma"
          >
            <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1600&h=600&fit=crop"
                alt="Luma Events"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute left-6 bottom-6 text-white">
                <h3 className="text-2xl font-bold">View All Events on Luma</h3>
                <p className="text-sm text-white/80">Real-time event listings, RSVP and more on our Luma community.</p>
              </div>
            </div>
          </a>

          {/* Featured horizontal cards - 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {events.slice(0, 4).map((ev) => (
              <a
                key={ev.id}
                href={ev.event_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden bg-black/40 border border-white/10 rounded-t-2xl"
              >
                <div className="flex flex-col md:flex-row items-stretch">
                  <div className="w-full md:w-1/2 relative overflow-hidden rounded-t-2xl md:rounded-tl-2xl md:rounded-bl-none">
                    <img src={ev.cover_url} alt={ev.name} className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 w-full md:w-1/2 flex flex-col justify-center">
                    <h4 className="text-xl font-bold text-white mb-2">{ev.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{ev.description}</p>
                    <div className="text-xs text-white/80">{ev.date}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Events Gallery */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-400">Loading events...</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {events.map((event) => (
              <motion.a
                key={event.id}
                href={event.event_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredEventId(event.id)}
                onHoverEnd={() => setHoveredEventId(null)}
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden rounded-t-2xl">
                  <img
                    src={event.cover_url}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />

                  {/* Hover Info */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredEventId === event.id ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-gray-300 text-sm mb-2">{event.date}</p>
                    <p className="text-gray-200 text-sm leading-relaxed mb-4">{event.description}</p>
                    <div className="flex items-center gap-2 text-orange-400 font-semibold text-sm">
                      View Event
                      <ExternalLink size={16} />
                    </div>
                  </motion.div>
                </div>

                {/* Event Title - Always Visible */}
                <div className="p-4 bg-gradient-to-br from-gray-900 to-black border border-white/10">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Luma Embed Info */}
        <motion.div
          className="mt-20 p-8 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-4">
            All events are managed and hosted on <span className="font-semibold text-white">Luma Community</span>
          </p>
          <a
            href="https://luma.com/myfounders.club"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold transition-colors"
          >
            Visit our Luma page for real-time updates
            <ExternalLink size={18} />
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}
