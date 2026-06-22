'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaCompress } from 'react-icons/fa';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface MobileImageViewerProps {
  images: string[];
  alt: string;
  initialIndex?: number;
  className?: string;
  onClose?: () => void;
}

interface TouchState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  isDragging: boolean;
  scale: number;
  translateX: number;
  translateY: number;
}

export default function MobileImageViewer({
  images,
  alt,
  initialIndex = 0,
  className = '',
  onClose
}: MobileImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchState, setTouchState] = useState<TouchState>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    isDragging: false,
    scale: 1,
    translateX: 0,
    translateY: 0
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'Escape':
          e.preventDefault();
          onClose?.();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length]);

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetImageTransform();
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetImageTransform();
  }, [images.length]);

  const resetImageTransform = () => {
    setTouchState(prev => ({
      ...prev,
      scale: 1,
      translateX: 0,
      translateY: 0
    }));
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setTouchState(prev => ({
        ...prev,
        startX: touch.clientX,
        startY: touch.clientY,
        currentX: touch.clientX,
        currentY: touch.clientY,
        isDragging: true
      }));
    } else if (e.touches.length === 2) {
      // Handle pinch-to-zoom start
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      setTouchState(prev => ({
        ...prev,
        startDistance: distance,
        isDragging: false
      }));
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 1 && touchState.isDragging) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchState.startX;
      const deltaY = touch.clientY - touchState.startY;

      if (touchState.scale > 1) {
        // Pan when zoomed in
        setTouchState(prev => ({
          ...prev,
          translateX: prev.translateX + (touch.clientX - prev.currentX),
          translateY: prev.translateY + (touch.clientY - prev.currentY),
          currentX: touch.clientX,
          currentY: touch.clientY
        }));
      } else {
        // Swipe to navigate when not zoomed
        setTouchState(prev => ({
          ...prev,
          currentX: touch.clientX,
          currentY: touch.clientY
        }));
      }
    } else if (e.touches.length === 2) {
      // Handle pinch-to-zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      if (touchState.startDistance) {
        const scale = Math.max(1, Math.min(3, (distance / touchState.startDistance) * touchState.scale));
        setTouchState(prev => ({
          ...prev,
          scale
        }));
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchState.isDragging && touchState.scale <= 1) {
      const deltaX = touchState.currentX - touchState.startX;
      const threshold = 50;

      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && currentIndex > 0) {
          goToPrevious();
        } else if (deltaX < 0 && currentIndex < images.length - 1) {
          goToNext();
        }
      }
    }

    setTouchState(prev => ({
      ...prev,
      isDragging: false,
      startDistance: undefined
    }));
  };

  // Double tap to zoom
  const handleDoubleClick = () => {
    if (touchState.scale > 1) {
      resetImageTransform();
    } else {
      setTouchState(prev => ({
        ...prev,
        scale: 2,
        translateX: 0,
        translateY: 0
      }));
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (images.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`mobile-image-viewer ${isFullscreen ? 'fullscreen' : ''} ${className}`}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/70 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">
              {currentIndex + 1} of {images.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
            </button>
            
            <button
              onClick={onClose}
              className="btn-close btn-close-on-dark p-2 rounded-full"
              aria-label="Close viewer"
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Image Container */}
      <div
        ref={imageRef}
        className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
        style={{
          transform: `scale(${touchState.scale}) translate(${touchState.translateX}px, ${touchState.translateY}px)`,
          transition: touchState.isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        <OptimizedImage
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-contain select-none"
          draggable={false}
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Previous image"
          >
            <FaChevronLeft size={20} />
          </button>
          
          <button
            onClick={goToNext}
            disabled={currentIndex === images.length - 1}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors ${
              currentIndex === images.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Next image"
          >
            <FaChevronRight size={20} />
          </button>
        </>
      )}

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  resetImageTransform();
                }}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentIndex 
                    ? 'border-white' 
                    : 'border-transparent hover:border-white/50'
                }`}
              >
                <OptimizedImage
                  src={image}
                  alt={`${alt} thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  quality={60}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Zoom Indicator */}
      {touchState.scale > 1 && (
        <div className="absolute top-20 right-4 z-20 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {Math.round(touchState.scale * 100)}%
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 bg-black/70 text-white px-4 py-2 rounded-full text-sm opacity-70">
        {touchState.scale > 1 ? 'Drag to pan • Double tap to reset' : 'Swipe to navigate • Double tap to zoom'}
      </div>

      <style jsx>{`
        .mobile-image-viewer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 50;
          background: black;
          touch-action: none;
          user-select: none;
        }

        .mobile-image-viewer.fullscreen {
          z-index: 9999;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

// Mobile Image Gallery Component
export function MobileImageGallery({
  images,
  alt,
  className = ''
}: {
  images: string[];
  alt: string;
  className?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showViewer, setShowViewer] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className={`aspect-square bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <>
      <div className={`mobile-image-gallery ${className}`}>
        {/* Main Image */}
        <div 
          className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
          onClick={() => setShowViewer(true)}
        >
          <OptimizedImage
            src={images[selectedIndex]}
            alt={`${alt} - Image ${selectedIndex + 1}`}
            fill
            priority
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          
          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              {selectedIndex + 1}/{images.length}
            </div>
          )}
          
          {/* Expand Icon */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white p-2 rounded-full">
            <FaExpand size={12} />
          </div>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex space-x-2 mt-3 overflow-x-auto scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === selectedIndex 
                    ? 'border-blue-600' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <OptimizedImage
                  src={image}
                  alt={`${alt} thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  quality={60}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Viewer */}
      {showViewer && (
        <MobileImageViewer
          images={images}
          alt={alt}
          initialIndex={selectedIndex}
          onClose={() => setShowViewer(false)}
        />
      )}
    </>
  );
}