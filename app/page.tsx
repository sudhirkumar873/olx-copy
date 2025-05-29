"use client"
import {
  Search,
  Heart,
  ChevronDown,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Menu,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Globe,
  User,
  Star,
  Home,
  Bed,
  Bath,
  Square,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"
import type React from "react"

import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import Image from "next/image"
import { useState, useEffect, useCallback, useRef } from "react"

export default function OLXHomepage() {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [selectedLocation, setSelectedLocation] = useState("United States")
  const [selectedLanguage, setSelectedLanguage] = useState("ENGLISH")
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const locations = [
    { code: "🇺🇸", name: "United States" },
    { code: "🇨🇦", name: "Canada" },
    { code: "🇬🇧", name: "United Kingdom" },
    { code: "🇦🇺", name: "Australia" },
    { code: "🇩🇪", name: "Germany" },
    { code: "🇫🇷", name: "France" },
  ]

  const languages = [
    { code: "EN", name: "ENGLISH" },
    { code: "ES", name: "ESPAÑOL" },
    { code: "FR", name: "FRANÇAIS" },
    { code: "DE", name: "DEUTSCH" },
  ]

  const propertyCategories = [
    { icon: "🏠", name: "Houses for Sale" },
    { icon: "🏢", name: "Apartments for Sale" },
    { icon: "🏘️", name: "Houses for Rent" },
    { icon: "🏬", name: "Apartments for Rent" },
    { icon: "🏢", name: "Commercial Properties" },
    { icon: "🌾", name: "Land & Plots" },
    { icon: "🏖️", name: "Vacation Rentals" },
    { icon: "🏗️", name: "New Developments" },
  ]

  const banners = [
    {
      videoUrl: "/videos/veed-1.mp4",
      title: "Luxury Homes",
      subtitle: "Premium properties starting from",
      price: "$750,000",
      cta: "Explore Luxury",
      brand: "Elite Properties",
      gradient: "from-purple-600 to-purple-800",
    },
    {
      videoUrl: "/videos/veed-2.mp4",
      title: "Modern Apartments",
      subtitle: "Contemporary living from",
      price: "$350,000",
      cta: "View Apartments",
      brand: "Urban Living",
      gradient: "from-blue-600 to-blue-800",
    },
    {
      videoUrl: "/videos/veed-1.mp4",
      title: "Investment Properties",
      subtitle: "High-yield investments from",
      price: "$200,000",
      cta: "Start Investing",
      brand: "Smart Investments",
      gradient: "from-green-600 to-green-800",
    },
  ]

  const properties = [
    {
      id: 1,
      image: "/images/flat-1.jpg",
      title: "Modern 3BR House with Garden",
      price: "$485,000",
      details: "3 bed • 2 bath • 2,100 sq ft",
      location: "AUSTIN, TEXAS",
      time: "2 DAYS AGO",
      featured: true,
      type: "House",
    },
    {
      id: 2,
      image: "/images/flat-2.jpg",
      title: "Downtown Luxury Apartment",
      price: "$325,000",
      details: "2 bed • 2 bath • 1,200 sq ft",
      location: "MIAMI, FLORIDA",
      time: "1 WEEK AGO",
      featured: true,
      type: "Apartment",
    },
    {
      id: 3,
      image: "/images/flat-3.jpg",
      title: "Cozy Studio in City Center",
      price: "$180,000",
      details: "1 bed • 1 bath • 650 sq ft",
      location: "PORTLAND, OREGON",
      time: "TODAY",
      featured: false,
      type: "Studio",
    },
    {
      id: 4,
      image: "/images/flat-5.jpg",
      title: "Family Home with Pool",
      price: "$620,000",
      details: "4 bed • 3 bath • 2,800 sq ft",
      location: "PHOENIX, ARIZONA",
      time: "3 DAYS AGO",
      featured: false,
      type: "House",
    },
    {
      id: 5,
      image: "/images/flat-6.jpg",
      title: "Commercial Office Space",
      price: "$1,200,000",
      details: "Office • 5,000 sq ft",
      location: "DENVER, COLORADO",
      time: "1 WEEK AGO",
      featured: false,
      type: "Commercial",
    },
    {
      id: 6,
      image: "/images/flat-2.jpg",
      title: "Beachfront Condo",
      price: "$750,000",
      details: "2 bed • 2 bath • 1,400 sq ft",
      location: "SAN DIEGO, CALIFORNIA",
      time: "5 DAYS AGO",
      featured: false,
      type: "Condo",
    },
    {
      id: 7,
      image: "/images/flat-3.jpg",
      title: "Investment Land Plot",
      price: "$95,000",
      details: "2.5 acres • Residential zoning",
      location: "NASHVILLE, TENNESSEE",
      time: "1 WEEK AGO",
      featured: false,
      type: "Land",
    },
  ]

  const promotedContent = [
    {
      image: "/images/down-1.webp",
      brand: "PropertyTips",
      title: "First-Time Home Buyer's Complete Guide",
    },
    {
      image: "/images/down-2.webp",
      brand: "RealEstate Pro",
      title: "How to Get the Best Mortgage Rates in 2025",
    },
    {
      image: "/images/down-1.webp",
      brand: "Investment Weekly",
      title: "Top 10 Cities for Real Estate Investment This Year",
    },
    {
      image: "/images/down-2.webp",
      brand: "Home Design",
      title: "Modern Home Trends That Increase Property Value",
    },
    {
      image: "/images/down-1.webp",
      brand: "Market Analysis",
      title: "Real Estate Market Predictions for 2025",
    },
    {
      image: "/images/down-2.webp",
      brand: "Legal Guide",
      title: "Understanding Property Laws and Regulations",
    },
  ]

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentBannerIndex((prev) => (prev + 1) % banners.length)
      }
    }, 8000) // Longer interval for videos
    return () => clearInterval(interval)
  }, [banners.length, isPlaying])

  // Handle video playback when banner changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      if (isPlaying) {
        videoRef.current.play()
      }
    }
  }, [currentBannerIndex, isPlaying])

  const nextBanner = useCallback(() => {
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length)
  }, [banners.length])

  const prevBanner = useCallback(() => {
    setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }, [banners.length])

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }, [isMuted])

  const toggleFavorite = useCallback((propertyId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId)
      } else {
        newFavorites.add(propertyId)
      }
      return newFavorites
    })
  }, [])

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      console.log("Searching for properties:", searchQuery)
      // Implement search functionality here
    },
    [searchQuery],
  )

  const handleLocationSelect = useCallback((location: string) => {
    setSelectedLocation(location)
    setShowLocationDropdown(false)
  }, [])

  const handleLanguageSelect = useCallback((language: string) => {
    setSelectedLanguage(language)
    setShowLanguageDropdown(false)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest("[data-dropdown]")) {
        setShowLocationDropdown(false)
        setShowLanguageDropdown(false)
        setShowCategoryDropdown(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Location */}
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors">
                OLX Properties
              </div>
              <div
                data-dropdown
                className="flex items-center space-x-2 border border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:border-blue-500 transition-colors relative"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowLocationDropdown(!showLocationDropdown)
                  setShowLanguageDropdown(false)
                  setShowCategoryDropdown(false)
                }}
              >
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">{selectedLocation}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
                {showLocationDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {locations.map((location) => (
                      <div
                        key={location.name}
                        className="p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => handleLocationSelect(location.name)}
                      >
                        <span>{location.code}</span>
                        <span>{location.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-black text-white rounded-l-none hover:bg-gray-800 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <div
                data-dropdown
                className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors relative"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowLanguageDropdown(!showLanguageDropdown)
                  setShowLocationDropdown(false)
                  setShowCategoryDropdown(false)
                }}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{selectedLanguage}</span>
                <ChevronDown className="w-4 h-4" />
                {showLanguageDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {languages.map((language) => (
                      <div
                        key={language.code}
                        className="p-3 hover:bg-gray-100 cursor-pointer first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => handleLanguageSelect(language.name)}
                      >
                        {language.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Heart className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
              <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600 transition-colors">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Login</span>
              </div>
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500 font-medium px-6 transition-colors">
                + LIST PROPERTY
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center space-x-8 h-12 text-sm overflow-x-auto scrollbar-hide">
              <div
                data-dropdown
                className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors relative whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowCategoryDropdown(!showCategoryDropdown)
                  setShowLocationDropdown(false)
                  setShowLanguageDropdown(false)
                }}
              >
                <Menu className="w-4 h-4" />
                <span className="font-medium">ALL CATEGORIES</span>
                <ChevronDown className="w-4 h-4" />
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {propertyCategories.map((category, index) => (
                      <div
                        key={category.name}
                        className={`p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-3 ${
                          index === 0 ? "rounded-t-lg" : ""
                        } ${index === propertyCategories.length - 1 ? "rounded-b-lg" : "border-b border-gray-100"}`}
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {[
                "Houses for Sale",
                "Apartments for Sale",
                "Houses for Rent",
                "Apartments for Rent",
                "Commercial Properties",
                "Land & Plots",
                "Vacation Rentals",
              ].map((category) => (
                <span key={category} className="whitespace-nowrap cursor-pointer hover:text-blue-600 transition-colors">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Video Carousel */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="relative rounded-xl overflow-hidden h-80 shadow-2xl">
            {/* Video Background */}
            <div className="absolute inset-0">
              <video
                ref={videoRef}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover"
                src={banners[currentBannerIndex].videoUrl}
                onLoadedData={() => {
                  if (videoRef.current && isPlaying) {
                    videoRef.current.play()
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 p-8 text-white h-full flex flex-col justify-center">
              <h1 className="text-6xl font-bold mb-3 drop-shadow-lg">{banners[currentBannerIndex].title}</h1>
              <p className="text-xl mb-2 opacity-90 drop-shadow-md">{banners[currentBannerIndex].subtitle}</p>
              <p className="text-7xl font-bold mb-8 drop-shadow-lg text-yellow-400">
                {banners[currentBannerIndex].price}
              </p>
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold px-10 py-4 text-xl w-fit transition-all transform hover:scale-105 shadow-lg">
                {banners[currentBannerIndex].cta}
              </Button>
            </div>

            {/* Brand Badge */}
            <div className="absolute right-8 bottom-8 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white text-lg font-semibold">{banners[currentBannerIndex].brand}</span>
            </div>

            {/* Video Controls */}
            <div className="absolute top-4 right-4 flex space-x-2 z-20">
              <button
                onClick={togglePlayPause}
                className="bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all backdrop-blur-sm"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
              </button>
              <button
                onClick={toggleMute}
                className="bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all backdrop-blur-sm"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
              </button>
            </div>

            {/* Carousel Navigation */}
            <button
              onClick={prevBanner}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 z-20 transition-all"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextBanner}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 z-20 transition-all"
              aria-label="Next video"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBannerIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all ${
                    currentBannerIndex === index
                      ? "bg-yellow-400 scale-110"
                      : "bg-white/50 hover:bg-white/75 backdrop-blur-sm"
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div
                className="h-full bg-yellow-400 transition-all duration-1000 ease-linear"
                style={{
                  width: `${((currentBannerIndex + 1) / banners.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Property Listings */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Fresh property listings</h2>
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            View all properties
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {property.featured && (
                  <div className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
                    FEATURED
                  </div>
                )}
                <div className="absolute top-3 right-12 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {property.type}
                </div>
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      favorites.has(property.id) ? "text-red-500 fill-red-500" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
              <div className="p-5">
                <p className="text-2xl font-bold text-gray-900 mb-1">{property.price}</p>
                {property.details && (
                  <div className="flex items-center space-x-3 text-sm text-gray-600 mb-2">
                    {property.details.includes("bed") && <Bed className="w-4 h-4" />}
                    {property.details.includes("bath") && <Bath className="w-4 h-4" />}
                    {property.details.includes("sq ft") && <Square className="w-4 h-4" />}
                    <span>{property.details}</span>
                  </div>
                )}
                <p className="text-sm font-medium text-gray-800 mb-3 line-clamp-2">{property.title}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {property.location}
                  </span>
                  <span>{property.time}</span>
                </div>
              </div>
            </div>
          ))}

          {/* List Your Property Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 flex flex-col justify-center items-center text-center group hover:from-green-600 hover:to-green-700 transition-all duration-300">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Home className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Want to list your property?</h3>
            <p className="text-sm mb-6 opacity-90">
              Reach thousands of potential buyers and renters. List your property today!
            </p>
            <Button className="bg-white text-green-600 hover:bg-gray-100 font-medium px-6 transition-colors">
              List Property
            </Button>
          </div>
        </div>
      </section>

      {/* App Promotion */}
      <section className="bg-gradient-to-r from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            <div className="flex items-center space-x-8 mb-8 lg:mb-0">
              <div className="relative">
                <Image
                  src="/images/phone-app.webp"
                  alt="OLX Properties Mobile App"
                  width={200}
                  height={300}
                  className="h-80 w-auto drop-shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-4 text-gray-900">TRY THE OLX PROPERTIES APP</h2>
                <p className="text-xl text-gray-600 mb-6 max-w-md">
                  Find, buy, sell and rent properties using our mobile app. Your dream home is just a tap away.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    4.7 Rating
                  </span>
                  <span>5M+ Downloads</span>
                  <span>Real Estate #1</span>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-sm font-semibold mb-6 text-gray-700">GET YOUR APP TODAY</p>
              <div className="space-y-3">
                <Image
                  src="/images/playstore_2x.webp"
                  alt="Get it on Google Play"
                  width={140}
                  height={45}
                  className="h-12 w-auto hover:scale-105 transition-transform cursor-pointer"
                />
                <Image
                  src="/images/phone-app.webp"
                  alt="Download on App Store"
                  width={140}
                  height={45}
                  className="h-12 w-auto hover:scale-105 transition-transform cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promoted Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-gray-900">REAL ESTATE INSIGHTS</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">sponsored</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotedContent.map((content, index) => (
              <article
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={content.image || "/placeholder.svg"}
                    alt={content.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-blue-600 font-semibold mb-2 uppercase tracking-wide">{content.brand}</p>
                  <h3 className="text-sm font-medium text-gray-800 leading-relaxed group-hover:text-blue-600 transition-colors">
                    {content.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <h3 className="font-bold text-sm mb-6 text-gray-900">POPULAR CITIES</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">New York</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Los Angeles</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Chicago</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Miami</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-sm mb-6 text-gray-900">TRENDING LOCATIONS</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Austin</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Seattle</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Denver</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Phoenix</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-sm mb-6 text-gray-900">ABOUT US</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">About OLX Properties</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Press</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-sm mb-6 text-gray-900">SUPPORT</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Contact Us</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Safety Tips</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Privacy Policy</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-sm mb-6 text-gray-900">FOLLOW US</h3>
              <div className="flex space-x-4 mb-6">
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors p-2 bg-gray-100 rounded-full hover:bg-blue-100"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 transition-colors p-2 bg-gray-100 rounded-full hover:bg-pink-100"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-400 transition-colors p-2 bg-gray-100 rounded-full hover:bg-blue-100"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-700 transition-colors p-2 bg-gray-100 rounded-full hover:bg-blue-100"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <div className="space-y-3">
                <Image
                  src="/images/playstore_2x.webp"
                  alt="Get it on Google Play"
                  width={120}
                  height={40}
                  className="h-10 w-auto hover:scale-105 transition-transform cursor-pointer"
                />
                <Image
                  src="/images/phone-app.webp"
                  alt="Download on App Store"
                  width={120}
                  height={40}
                  className="h-10 w-auto hover:scale-105 transition-transform cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="bg-blue-600 text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0">
              <div className="flex items-center space-x-8">
                <span className="text-sm hover:text-blue-200 cursor-pointer transition-colors">Help</span>
                <span className="text-sm">•</span>
                <span className="text-sm hover:text-blue-200 cursor-pointer transition-colors">Sitemap</span>
              </div>
              <div className="flex items-center flex-wrap justify-center gap-6">
                <span className="text-lg font-bold hover:text-blue-200 cursor-pointer transition-colors">
                  OLX Properties
                </span>
                <span className="text-lg font-bold hover:text-blue-200 cursor-pointer transition-colors">
                  RealEstate
                </span>
                <span className="text-lg font-bold hover:text-blue-200 cursor-pointer transition-colors">
                  PropertyFinder
                </span>
                <span className="text-lg font-bold hover:text-blue-200 cursor-pointer transition-colors">
                  HomesForSale
                </span>
                <span className="text-lg font-bold hover:text-blue-200 cursor-pointer transition-colors">
                  RentalsHub
                </span>
              </div>
              <div className="text-sm text-blue-200">All rights reserved © 2006-2025 OLX Properties</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
