import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Calendar,
  ExternalLink,
  Star,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { ImageCarousel } from "@/components/image-carousel";

interface Hotel {
  name: string;
  url: string;
  image: string;
  rating: number;
}

interface SocialLink {
  platform: string;
  handle: string;
  url: string;
}

interface Conference {
  id: string;
  name: string;
  location: string;
  city: string;
  date: Date | null;
  website: string;
  coordinates: { lat: number; lng: number };
  images: string[];
  social: SocialLink[];
  hotels: Hotel[];
}

interface ConferenceCardProps {
  conference: Conference;
}

const getSocialIcon = (platform: string) => {
  const platformLower = platform.toLowerCase();
  if (platformLower.includes("twitter") || platformLower.includes("x (")) {
    return <Twitter className="h-4 w-4" />;
  } else if (platformLower.includes("facebook")) {
    return <Facebook className="h-4 w-4" />;
  } else if (platformLower.includes("instagram")) {
    return <Instagram className="h-4 w-4" />;
  } else if (platformLower.includes("linkedin")) {
    return <Linkedin className="h-4 w-4" />;
  } else if (platformLower.includes("bluesky")) {
    return (
      <img src="/icons/bluesky-icon.svg" alt="Bluesky" className="h-4 w-4" />
    );
  }
  return <ExternalLink className="h-4 w-4" />;
};

export function ConferenceCard({ conference }: ConferenceCardProps) {
  return (
    <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Carousel */}
      <div className="relative">
        <ImageCarousel images={conference.images} alt={conference.name} />
      </div>

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
              {conference.name}
            </CardTitle>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                <span className="text-base">
                  {conference.location}, {conference.city}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-3 text-green-600" />
                <span className="text-base">
                  {conference.date ? conference.date.toDateString() : "TBA"}
                </span>
              </div>
            </div>
          </div>
          <Badge
            variant={conference.date === null ? "secondary" : "default"}
            className="text-sm px-3 py-1"
          >
            {conference.date === null ? "Coming Soon" : "Scheduled"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Website Link */}
        <Button
          asChild
          variant="outline"
          className="w-full h-12 text-base font-medium bg-transparent"
        >
          <a
            href={conference.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Visit Conference Website
          </a>
        </Button>

        {/* Social Media Links */}
        {conference.social && conference.social.length > 0 && (
          <div>
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">📱</span>
              <h3 className="text-xl font-semibold text-gray-900">Socials</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {conference.social.map((social, index) => (
                <Button
                  key={index}
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0 bg-transparent hover:bg-gray-50"
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${social.platform}: ${social.handle}`}
                  >
                    <div className="flex items-center space-x-2">
                      {getSocialIcon(social.platform)}
                      <span className="text-sm font-medium">
                        {social.platform}
                      </span>
                    </div>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Hotels Section */}
        {conference.hotels && conference.hotels.length > 0 && (
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🏨</span>
              <h3 className="text-xl font-semibold text-gray-900">
                Recommended Hotels
              </h3>
            </div>
            <div className="grid gap-4">
              {conference.hotels.map((hotel, index) => (
                <a
                  key={index}
                  href={
                    hotel.url !== "#" &&
                    hotel.name !== "TBC" &&
                    !hotel.name.includes("N/A")
                      ? hotel.url
                      : undefined
                  }
                  target={
                    hotel.url !== "#" &&
                    hotel.name !== "TBC" &&
                    !hotel.name.includes("N/A")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    hotel.url !== "#" &&
                    hotel.name !== "TBC" &&
                    !hotel.name.includes("N/A")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`bg-gray-50 rounded-lg p-4 transition-colors block ${
                    hotel.url !== "#" &&
                    hotel.name !== "TBC" &&
                    !hotel.name.includes("N/A")
                      ? "hover:bg-gray-100 cursor-pointer"
                      : "cursor-default"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={hotel.image || "/placeholder.svg"}
                        alt={hotel.name}
                        className="w-20 h-16 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 truncate">
                            {hotel.name}
                          </h4>
                          {hotel.rating > 0 && (
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600 ml-1">
                                {hotel.rating}
                              </span>
                            </div>
                          )}
                        </div>
                        {hotel.url !== "#" &&
                        hotel.name !== "TBC" &&
                        !hotel.name.includes("N/A") ? (
                          <ExternalLink className="h-4 w-4 flex-shrink-0 text-gray-600" />
                        ) : hotel.name.includes("TBC") ? (
                          <Badge
                            variant="secondary"
                            className="text-xs flex-shrink-0"
                          >
                            TBC
                          </Badge>
                        ) : hotel.name.includes("N/A") ? (
                          <Badge
                            variant="outline"
                            className="text-xs flex-shrink-0"
                          >
                            Online
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
