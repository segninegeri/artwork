"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { Plus, Minus, Grid, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GridView, { Artwork } from "./GridView";

// Artwork data
const artworks: Artwork[] = [
  {
    id: 1,
    title: "Floating Tea Dreams",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2_2025-03-13_16-05-26.jpg-8PIIuQQnTACk2cP023J7LkUG0qhc7V.jpeg",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2_2025-03-13_16-05-26.jpg-8PIIuQQnTACk2cP023J7LkUG0qhc7V.jpeg",
    description:
      "A surreal exploration of tranquility, where reality and dreams merge over a cup of tea. The artwork captures a moment of peaceful suspension, with traditional objects dancing in a contemporary space.",
  },
  {
    id: 2,
    title: "Moonlit Contemplation",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_4_2025-03-13_16-05-26.jpg-oF7PRHU9F8GmwwbMk7LClMBfAhZfRU.jpeg",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_4_2025-03-13_16-05-26.jpg-oF7PRHU9F8GmwwbMk7LClMBfAhZfRU.jpeg",
    description:
      "A serene portrait capturing the quiet strength of reflection, adorned in luxurious fabrics that bridge tradition and modernity against the backdrop of a luminous moon.",
  },
  {
    id: 3,
    title: "Forest Sanctuary",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_3_2025-03-13_16-05-26.jpg-3HhZJ9lbtINJpNM7Kdxv0asbmSiAQH.jpeg",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_3_2025-03-13_16-05-26.jpg-3HhZJ9lbtINJpNM7Kdxv0asbmSiAQH.jpeg",
    description:
      "An ethereal figure stands in solitude, draped in pure white against a vibrant forest backdrop, creating a powerful contrast between serenity and nature's wild beauty.",
  },
  {
    id: 4,
    title: "Golden Domes Reverie",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5_2025-03-13_16-05-26.jpg-SmNQSGL5GEf3NQCRXPtH35nb9SFalV.jpeg",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5_2025-03-13_16-05-26.jpg-SmNQSGL5GEf3NQCRXPtH35nb9SFalV.jpeg",
    description:
      "A contemplative scene merging human presence with architectural grandeur, where golden domes pierce the sky as a solitary figure rests in quiet observation.",
  },
];

export default function ArtGallery() {
  // State
  const [selectedArt, setSelectedArt] = useState<Artwork>(artworks[0]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isGridView, setIsGridView] = useState(false);

  // Refs
  const backgroundRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);
  const descriptionContainerRef = useRef<HTMLDivElement>(null);
  const descriptionTitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionTextRef = useRef<HTMLParagraphElement>(null);
  const orderButtonRef = useRef<HTMLButtonElement>(null);
  const gridButtonRef = useRef<HTMLButtonElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Initial animations
  useEffect(() => {
    gsap.to(backgroundRef.current, {
      opacity: 1,
      duration: 1,
      delay: 0.2,
      ease: "power2.inOut",
    });
    gsap.fromTo(
      gridButtonRef.current,
      { opacity: 0, scale: 0.5, rotation: 180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.7)",
      }
    );
    animateDescription();
    animateButton();
  }, []);

  // Animate description and button when artwork changes
  useEffect(() => {
    if (!isGridView) {
      animateDescription();
      animateButton();
    }
  }, [selectedArt, isGridView]);

  // Animation functions
  const animateDescription = () => {
    if (
      !descriptionContainerRef.current ||
      !descriptionTitleRef.current ||
      !descriptionTextRef.current
    )
      return;

    gsap.set([descriptionTitleRef.current, descriptionTextRef.current], {
      opacity: 0,
      y: 20,
    });
    gsap.fromTo(
      descriptionContainerRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
    );
    gsap.to([descriptionTitleRef.current, descriptionTextRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2,
      delay: 0.3,
      ease: "power2.out",
    });
  };

  const animateButton = () => {
    if (!orderButtonRef.current) return;

    gsap.set(orderButtonRef.current, { scale: 0.9, opacity: 0 });
    gsap.to(orderButtonRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      delay: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
    gsap.to(orderButtonRef.current, {
      boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
      repeat: -1,
      yoyo: true,
      duration: 1.5,
    });
  };

  // Handle artwork selection
  const handleArtworkSelect = (artwork: Artwork) => {
    if (artwork.id === selectedArt.id) return;

    if (isGridView) {
      toggleGridView();
      setTimeout(() => {
        setSelectedArt(artwork);
        setZoomLevel(1);
      }, 600);
      return;
    }

    const timeline = gsap.timeline();
    timeline.to(mainImageRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: "power2.inOut",
    });
    timeline.to([descriptionTitleRef.current, descriptionTextRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.inOut",
    });
    timeline.call(() => {
      setSelectedArt(artwork);
      setZoomLevel(1);
    });
    timeline.call(() => {
      gsap.fromTo(
        backgroundRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.inOut" }
      );
    });
    timeline.call(() => {
      gsap.fromTo(
        mainImageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }
      );
      animateDescription();
    });
  };

  // Zoom functionality
  const handleZoom = (direction: "in" | "out") => {
    if (!mainImageRef.current) return;

    const newZoom =
      direction === "in"
        ? Math.min(zoomLevel + 0.1, 1.5)
        : Math.max(zoomLevel - 0.1, 1);
    setZoomLevel(newZoom);
    gsap.to(mainImageRef.current, {
      scale: newZoom,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  // Toggle grid view
  const toggleGridView = () => {
    const timeline = gsap.timeline();
    timeline.to(gridButtonRef.current, {
      rotation: !isGridView ? 90 : 0,
      scale: 1.2,
      duration: 0.4,
      ease: "back.out(1.7)",
    });
    timeline.to(gridButtonRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });

    if (isGridView) {
      timeline.to(gridContainerRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => setIsGridView(false),
      });
    } else {
      timeline.to(
        mainImageRef.current,
        { opacity: 0, scale: 0.9, duration: 0.4, ease: "power2.inOut" },
        0
      );
      timeline.to(
        descriptionContainerRef.current,
        { opacity: 0, x: 50, duration: 0.4, ease: "power2.inOut" },
        0
      );
      timeline.to(
        orderButtonRef.current,
        { opacity: 0, y: 20, duration: 0.4, ease: "power2.inOut" },
        0
      );
      timeline.call(() => {
        setIsGridView(true);
        gsap.set(gridContainerRef.current, { opacity: 0 });
      });
      timeline.to(gridContainerRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#1a1a1a]">
      {/* Background Image */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${selectedArt.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px) brightness(0.5)",
        }}
      />

      {/* Grid Button */}
      <div className="absolute top-6 right-6 z-30">
        <Button
          ref={gridButtonRef}
          variant="outline"
          size="icon"
          onClick={toggleGridView}
          className="h-10 w-10 rounded-full glass-morphism bg-transparent hover:bg-white/10 transition-all duration-300 hover:scale-110"
        >
          {isGridView ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <Grid className="h-5 w-5 text-white" />
          )}
        </Button>
      </div>

      {/* Grid View */}
      {isGridView && (
        <GridView
          ref={gridContainerRef}
          artworks={artworks}
          onSelectArtwork={handleArtworkSelect}
        />
      )}

      {/* Detail View */}
      {!isGridView && (
        <>
          {/* Sidebar Thumbnails */}
          <div className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 space-y-8 z-10">
            <div className="space-y-4 md:space-y-6">
              {artworks.map((artwork) => (
                <div key={artwork.id} className="">
                  <h3 className="text-lg md:text-xl font-medium text-white/90 hidden md:block">
                    {artwork.title}
                  </h3>
                  <button
                    onClick={() => handleArtworkSelect(artwork)}
                    className={`group relative h-16 w-16 md:h-32 md:w-32 overflow-hidden rounded-lg transition-all duration-300 ${
                      selectedArt.id === artwork.id
                        ? ""
                        : "opacity-60 hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={artwork.thumbnail || "/placeholder.svg"}
                      alt={artwork.title}
                      fill
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Main Image */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 md:px-0 overflow-hidden">
            <div className="relative group">
              <Image
                ref={mainImageRef}
                src={selectedArt.image || "/placeholder.svg"}
                alt={selectedArt.title}
                width={900}
                height={800}
                className="max-h-[60vh] max-w-[80vw] md:max-h-[70vh] md:max-w-[50vw] rounded-lg object-contain transform-gpu"
                style={{ transformOrigin: "center center" }}
              />
              <div className="absolute top-4 left-0 right-0 flex justify-center group-hover:opacity-100 md:group-hover:opacity-100 opacity-100 sm:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 md:group-hover:translate-y-0 translate-y-0 sm:translate-y-0">
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-white-500 rounded-full"></div>
                  <button className="glass-morphism text-xl flex py-3 bg-gray-500/20 text-white hover:bg-gray-500/30 active:bg-gray-500/40 border border-gray-400/30 rounded-xl px-3 shadow-md transition-all duration-300">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    <span>Purchase Artwork</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleZoom("in")}
              disabled={zoomLevel >= 1.5}
              className="h-12 w-12 rounded-full glass-morphism bg-transparent hover:bg-white/10 text-white"
            >
              <Plus className="h-5 w-5 text-white" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleZoom("out")}
              disabled={zoomLevel <= 1}
              className="h-12 w-12 rounded-full glass-morphism bg-transparent hover:bg-white/10 text-white"
            >
              <Minus className="h-5 w-5 text-white" />
            </Button>
          </div>

          {/* Description */}
          <div
            ref={descriptionContainerRef}
            className="absolute bottom-2 sm:bottom-8 right-2 sm:right-8 max-w-[90vw] sm:max-w-md rounded-lg bg-black/40 p-4 sm:p-6 backdrop-blur-sm z-10"
          >
            <h2
              ref={descriptionTitleRef}
              className="mb-1 sm:mb-2 text-lg sm:text-xl font-semibold text-white"
            >
              {selectedArt.title}
            </h2>
            <p ref={descriptionTextRef} className="text-xl text-white/90">
              {selectedArt.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
