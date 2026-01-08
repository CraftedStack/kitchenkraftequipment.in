'use client';

import { useEffect, useRef, useState } from 'react';

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  preventScroll?: boolean;
}

interface TouchState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  startTime: number;
  isActive: boolean;
}

export function useSwipeGesture(options: SwipeGestureOptions = {}) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    preventScroll = false
  } = options;

  const touchState = useRef<TouchState>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    startTime: 0,
    isActive: false
  });

  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    touchState.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      startTime: Date.now(),
      isActive: true
    };
    setIsSwiping(false);

    if (preventScroll) {
      e.preventDefault();
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!touchState.current.isActive) return;

    const touch = e.touches[0];
    touchState.current.currentX = touch.clientX;
    touchState.current.currentY = touch.clientY;

    const deltaX = Math.abs(touchState.current.currentX - touchState.current.startX);
    const deltaY = Math.abs(touchState.current.currentY - touchState.current.startY);

    // Set swiping state if movement exceeds threshold
    if (deltaX > threshold || deltaY > threshold) {
      setIsSwiping(true);
    }

    // Prevent scroll if horizontal swipe is detected and preventScroll is enabled
    if (preventScroll && deltaX > deltaY) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchState.current.isActive) return;

    const deltaX = touchState.current.currentX - touchState.current.startX;
    const deltaY = touchState.current.currentY - touchState.current.startY;
    const deltaTime = Date.now() - touchState.current.startTime;

    // Only trigger swipe if it was fast enough (less than 300ms) and exceeded threshold
    if (deltaTime < 300) {
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Horizontal swipes
      if (absDeltaX > threshold && absDeltaX > absDeltaY) {
        if (deltaX > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      }
      // Vertical swipes
      else if (absDeltaY > threshold && absDeltaY > absDeltaX) {
        if (deltaY > 0) {
          onSwipeDown?.();
        } else {
          onSwipeUp?.();
        }
      }
    }

    // Reset state
    touchState.current.isActive = false;
    setIsSwiping(false);

    if (preventScroll) {
      e.preventDefault();
    }
  };

  const bindSwipeEvents = (element: HTMLElement | null) => {
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: !preventScroll });
    element.addEventListener('touchmove', handleTouchMove, { passive: !preventScroll });
    element.addEventListener('touchend', handleTouchEnd, { passive: !preventScroll });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  };

  return {
    bindSwipeEvents,
    isSwiping,
    touchState: touchState.current
  };
}

// Hook for React refs
export function useSwipeGestureRef(options: SwipeGestureOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const { bindSwipeEvents, isSwiping, touchState } = useSwipeGesture(options);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      return bindSwipeEvents(element);
    }
  }, [bindSwipeEvents]);

  return {
    ref: elementRef,
    isSwiping,
    touchState
  };
}

// Utility hook for carousel/slider components
export function useSwipeCarousel(
  currentIndex: number,
  totalItems: number,
  onIndexChange: (index: number) => void,
  options: Omit<SwipeGestureOptions, 'onSwipeLeft' | 'onSwipeRight'> = {}
) {
  const goToNext = () => {
    const nextIndex = currentIndex < totalItems - 1 ? currentIndex + 1 : 0;
    onIndexChange(nextIndex);
  };

  const goToPrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : totalItems - 1;
    onIndexChange(prevIndex);
  };

  return useSwipeGestureRef({
    ...options,
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious
  });
}