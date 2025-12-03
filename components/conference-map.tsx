"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface Conference {
  id: string
  name: string
  city: string
  date: Date | null
  coordinates: { lat: number; lng: number }
}

interface ConferenceMapProps {
  conferences: Conference[]
}

export function ConferenceMap({ conferences }: ConferenceMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only initialize if we haven't already and container exists
    if (!mapContainerRef.current || mapRef.current) return

    // Initialize the map centered on the UK
    const map = L.map(mapContainerRef.current).setView([54.5, -4], 6)

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    // Custom icon for scheduled conferences (green)
    const scheduledIcon = L.divIcon({
      className: "custom-marker",
      html: `
        <div class="relative">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#16a34a" stroke="#15803d" stroke-width="2"/>
            <circle cx="12" cy="10" r="3" fill="white"/>
          </svg>
          <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    })

    // Custom icon for TBA conferences (amber)
    const tbaIcon = L.divIcon({
      className: "custom-marker",
      html: `
        <div class="relative">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
            <circle cx="12" cy="10" r="3" fill="white"/>
          </svg>
          <div class="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    })

    // Add markers for each conference
    conferences.forEach((conference) => {
      const isScheduled = conference.date !== null
      const marker = L.marker([conference.coordinates.lat, conference.coordinates.lng], {
        icon: isScheduled ? scheduledIcon : tbaIcon,
      }).addTo(map)

      // Add popup
      marker.bindPopup(`
        <div class="font-sans">
          <div class="font-semibold text-sm">${conference.name}</div>
          <div class="text-xs text-gray-600">${conference.city}</div>
          <div class="text-xs ${isScheduled ? 'text-green-600' : 'text-amber-600'} font-medium mt-1">
            ${isScheduled ? 'Scheduled' : 'TBA'}
          </div>
        </div>
      `)
    })

    // Fit bounds to show all markers
    if (conferences.length > 0) {
      const bounds = L.latLngBounds(
        conferences.map((c) => [c.coordinates.lat, c.coordinates.lng])
      )
      map.fitBounds(bounds, { padding: [50, 50] })
    }

    mapRef.current = map

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [conferences])

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <div ref={mapContainerRef} className="h-96 md:h-[600px] w-full z-0" />

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border z-[1000]">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-800">Scheduled</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-800">TBA</span>
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-2">Click markers for details</div>
          </div>

          {/* Conference List */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border max-w-xs z-[1000]">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Active Conferences</h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {conferences.map((conference) => {
                const isScheduled = conference.date !== null
                return (
                  <div key={conference.name} className="flex items-center space-x-3 text-sm">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${isScheduled ? 'bg-green-600' : 'bg-amber-500'}`}></div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 truncate">{conference.name}</div>
                      <div className="text-gray-600 text-xs">{conference.city}</div>
                    </div>
                    <Badge variant={isScheduled ? "default" : "secondary"} className="text-xs flex-shrink-0">
                      {isScheduled ? "Scheduled" : "TBA"}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
