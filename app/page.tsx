import { ConferenceCard } from "@/components/conference-card";
import { WhatsAppSignup } from "@/components/whatsapp-signup";
import { ConferenceMapClient as ConferenceMap } from "@/components/conference-map-client";

const conferences = [
  {
    id: "ddd-north",
    name: "DDD North",
    location: "University of Hull",
    city: "Hull",
    date: new Date("2026-02-28"),
    website: "https://www.dddnorth.co.uk/",
    coordinates: { lat: 53.771680, lng: -0.368120 },
    images: [
      "ddd-conferences/ddd-north-1.jpg",
      "ddd-conferences/ddd-north-2.jpg",
      "ddd-conferences/ddd-north-3.jpg",
      "ddd-conferences/ddd-north-4.jpg",
    ],
    social: [
      {
        platform: "X (Twitter)",
        handle: "@dddnorth",
        url: "https://x.com/dddnorth/",
      },
      {
        platform: "Facebook",
        handle: "dddnorth",
        url: "https://www.facebook.com/dddnorth/",
      },
      {
        platform: "Bluesky",
        handle: "@dddnorth.bsky.social",
        url: "https://bsky.app/profile/did:plc:xzqaftegb7zt5uetbkwihbhn/",
      },
    ],
    hotels: [
      {
        name: "Travelodge Hull - Central",
        url: "https://www.travelodge.co.uk/hotels/505/Hull-Central-hotel",
        image:
          "https://media.travelodge.co.uk/image/upload/c_fill,h_470,w_850/Rebase/Top%20of%20the%20page/GB0944_Hull_Central_EXT.webp",
        rating: 3.9,
      },
      {
        name: "Premier Inn - City Centre",
        url: "https://www.premierinn.com/gb/en/hotels/england/east-riding-of-yorkshire/hull/hull-city-centre.html",
        image:
          "https://www.visithull.org/wp-content/uploads/2019/09/Premier-Inn-Hull.jpg",
        rating: 4.2,
      },
      {
        name: "Holiday Inn Express - City Centre",
        url: "https://www.booking.com/hotel/gb/express-by-holiday-inn-hull-city-centre.en-gb.html",
        image:
          "https://digital.ihg.com/is/image/ihg/holiday-inn-express-kingston-upon-hull-2533239719-4x3",
        rating: 4.1,
      },
    ],
  },
  {
    id: "ddd-south-west",
    name: "DDD South West",
    location: "Engine Shed",
    city: "Bristol",
    date: new Date("2026-05-16"),
    website: "https://dddsouthwest.com/",
    coordinates: { lat: 51.448845, lng: -2.583569 },
    images: [
      "ddd-conferences/ddd-southwest-1.jpg",
      "ddd-conferences/ddd-southwest-2.jpg",
      "ddd-conferences/ddd-southwest-3.jpg",
      "ddd-conferences/ddd-southwest-4.jpg",
      "ddd-conferences/ddd-southwest-5.jpg",
      "ddd-conferences/ddd-southwest-6.jpg",
    ],
    social: [
      {
        platform: "X (Twitter)",
        handle: "@dddsouthwest",
        url: "https://x.com/dddsouthwest/",
      },
      {
        platform: "Bluesky",
        handle: "@dddsouthwest.com",
        url: "https://bsky.app/profile/did:plc:xzqaftegb7zt5uetbkwihbhn/",
      },
    ],
    hotels: [
      {
        name: "Premier Inn - City Centre (Lewins Mead)",
        url: "https://www.premierinn.com/gb/en/hotels/england/bristol/bristol/bristol-city-centre-finzels-reach.html",
        image:
          "https://lh3.googleusercontent.com/p/AF1QipPaHoc92PWXrO2RGsN_ErZpTgXEQAt36RMxHlX_=s680-w680-h510-rw",
        rating: 4.3,
      },
      {
        name: "Travelodge - Central Mitchell Lane",
        url: "https://www.travelodge.co.uk/hotels/521/Bristol-Central-Mitchell-Lane-hotel",
        image:
          "https://media-cdn.tripadvisor.com/media/photo-s/2d/f4/c5/2b/exterior.jpg",
        rating: 4.0,
      },
      {
        name: "Holiday Inn Express - City Centre",
        url: "https://www.booking.com/hotel/gb/ebhibristolcitycentre.en-gb.html",
        image:
          "https://bynder.onthebeach.co.uk/cdn-cgi/image/width=1400,quality=70,fit=cover,format=auto/m/306613f8a6929a12/original/Holiday-Inn-Express-Bristol-City-Centre-United-Kingdom-Bristol-General-view-8.jpg",
        rating: 4.2,
      },
    ],
  },
  {
    id: "ddd-east-midlands",
    name: "DDD East Midlands",
    location: "Nottingham Trent University",
    city: "Nottingham",
    date: null,
    website: "https://dddeastmidlands.com/",
    coordinates: { lat: 52.956862, lng: -1.152904 },
    images: [
      "ddd-conferences/ddd-eastmidlands-1.jpg",
      "ddd-conferences/ddd-eastmidlands-2.jpg",
      "ddd-conferences/ddd-eastmidlands-3.jpg",
      "ddd-conferences/ddd-eastmidlands-4.jpg",
      "ddd-conferences/ddd-eastmidlands-5.jpg",
    ],
    social: [
      {
        platform: "X (Twitter)",
        handle: "@dddeastmidlands",
        url: "https://x.com/dddeastmidlands",
      },
      {
        platform: "Instagram",
        handle: "@dddeastmidlands",
        url: "https://www.instagram.com/dddeastmidlands/",
      },
      {
        platform: "LinkedIn",
        handle: "DDD East Midlands Limited",
        url: "https://www.linkedin.com/company/ddd-east-midlands-limited/",
      },
    ],
    hotels: [],
  },
  {
    id: "ddd-east-anglia",
    name: "DDD East Anglia",
    location: "Hills Road Sixth Form College",
    city: "Cambridge",
    date: null,
    website: "https://dddeastmidlands.com/",
    coordinates: { lat: 52.188142, lng: 0.136258 },
    images: [
      "ddd-conferences/ddd-eastanglia-1.jpg",
      "ddd-conferences/ddd-eastanglia-2.jpg",
      "ddd-conferences/ddd-eastanglia-3.jpg",
      "ddd-conferences/ddd-eastanglia-4.jpg",
    ],
    social: [
      {
        platform: "X (Twitter)",
        handle: "@DDDEastAnglia",
        url: "https://x.com/DDDEastAnglia",
      },
      {
        platform: "Facebook",
        handle: "dddeastanglia",
        url: "https://www.facebook.com/dddeastanglia/",
      },
    ],
    hotels: [],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              DDD Conferences
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Developer Developer Developer conferences across the UK. Connect
              with fellow developers, find accommodation, and join our WhatsApp
              communities.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Conference Locations Map */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Conference Locations
            </h2>
            <p className="text-lg text-gray-600">
              Discover DDD conferences across the United Kingdom
            </p>
          </div>
          <ConferenceMap conferences={conferences} />
        </div>

        {/* Conferences Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Upcoming Conferences
            </h2>
            <p className="text-lg text-gray-600">
              Explore our conferences, venues, and recommended accommodations
            </p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {conferences.map((conference) => (
              <ConferenceCard key={conference.id} conference={conference} />
            ))}
          </div>
        </div>

        {/* WhatsApp Community Signup */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our WhatsApp Communities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with fellow developers before and after events. Coordinate
              meetups, share meals, and build lasting connections in the
              developer community.
            </p>
          </div>
          <WhatsAppSignup conferences={conferences} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-lg">
            © 2024 DDD Conferences. Connecting developers across the UK.
          </p>
        </div>
      </footer>
    </div>
  );
}
