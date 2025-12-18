import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getCloudinaryUrl } from "@/lib/cloudinary-loader";
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

interface AfterParty {
  name: string;
  description: string;
  location: string;
  time: string;
  ticketUrl: string;
  image: string;
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
  afterParties?: AfterParty[];
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
      <Image src="/icons/bluesky-icon.svg" alt="Bluesky" width={16} height={16} className="h-4 w-4" />
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
          <Accordion type="single" collapsible className="w-full" defaultValue="socials">
            <AccordionItem value="socials">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📱</span>
                  <h3 className="text-xl font-semibold text-gray-900">Socials</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2 pt-2">
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* Hotels Section */}
        {conference.hotels && conference.hotels.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="hotels">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🏨</span>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Recommended Hotels
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 pt-2">
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
                    <div className="flex-shrink-0 relative w-20 h-16">
                      <Image
                        src={getCloudinaryUrl(hotel.image || "/placeholder.svg")}
                        alt={hotel.name}
                        fill
                        sizes="80px"
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0 pr-2">
                          <h4 className="font-medium text-gray-900 break-words">
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* After Parties Section */}
        {conference.afterParties && conference.afterParties.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="after-parties">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🎉</span>
                  <h3 className="text-xl font-semibold text-gray-900">
                    After Parties
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 pt-2">
                  {conference.afterParties.map((party, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100"
                >
                  <div className="flex gap-4 mb-3">
                    <div className="flex-shrink-0 relative w-24 h-24 rounded-lg overflow-hidden">
                      <Image
                        src={getCloudinaryUrl(party.image)}
                        alt={party.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">
                        {party.name}
                      </h4>
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span>{party.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span>{party.time}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    {party.description}
                  </p>
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <a
                      href={party.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Get Tickets
                    </a>
                  </Button>
                </div>
              ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
