"use client";

import { useEffect, useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Define and export the type for artwork
export type Artwork = {
  id: number;
  title: string;
  image: string;
  description: string;
  thumbnail?: string; // Added thumbnail as an optional property
};

// Define the props for the GridView component
type GridViewProps = {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
};

// Use forwardRef to allow the parent to pass a ref to this component
const GridView = forwardRef<HTMLDivElement, GridViewProps>(
  ({ artworks, onSelectArtwork }, ref) => {
    // Refs for grid items
    const gridItemsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Animate grid items when the component mounts
    useEffect(() => {
      gridItemsRef.current.forEach(
        (item) =>
          item &&
          gsap.set(item, { opacity: 0, scale: 0.8, y: 50, rotationX: 15 })
      );
      setTimeout(() => {
        gsap.to(gridItemsRef.current.filter(Boolean), {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
      }, 100);
    }, []);

    return (
      <div
        ref={ref}
        className="absolute inset-0 z-20 flex items-center justify-center p-8 md:p-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-6xl">
          {artworks.map((artwork, index) => (
            <div
              key={artwork.id}
              ref={(el) => {
                gridItemsRef.current[index] = el;
              }}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square shadow-lg"
            >
              <Image
                src={artwork.image || "/placeholder.svg"}
                alt={artwork.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onClick={() => onSelectArtwork(artwork)}
                width={400}
                height={400}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                onClick={() => onSelectArtwork(artwork)}
              />
              <div className="absolute top-0 left-0 right-0 p-4 flex justify-center items-center">
                <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-white-500 rounded-full animate-pulse-slow"></div>
                  <Button
                    size="sm"
                    className="glass-morphism flex py-3 bg-gray-500/20 text-white border border-gray-400/30 rounded-xl px-3 shadow-md relative z-10 overflow-hidden transition-all duration-300 hover:bg-gray-500/30 active:bg-gray-500/40 active:scale-95 active:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-md rounded-xl z-0"></div>
                    <ShoppingCart className="h-5 w-5 mr-2 relative z-10" />
                    <span className="relative z-10">Purchase Artwork</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 active:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </Button>
                </div>
              </div>
              <div
                className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                onClick={() => onSelectArtwork(artwork)}
              >
                <h3 className="text-white font-semibold text-lg mb-1">
                  {artwork.title}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2">
                  {artwork.description}
                </p>
              </div>
              <div className="absolute inset-0 transition-all duration-500 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

GridView.displayName = "GridView";

export default GridView;
