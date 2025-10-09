import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex: number;
}

const ImageZoomModal: React.FC<ImageZoomModalProps> = ({ isOpen, onClose, images, initialIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scaleRef = useRef(1);
  const positionRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const initialPinchDistanceRef = useRef<number | null>(null);
  const initialScaleRef = useRef(1);
  const pinchCenterRef = useRef<{ x: number; y: number } | null>(null);
  const initialPositionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const [displayScale, setDisplayScale] = useState(1);

  const updateTransform = () => {
    if (imageRef.current) {
      const scale = scaleRef.current;
      const pos = positionRef.current;
      imageRef.current.style.transform = `scale(${scale}) translate(${pos.x / scale}px, ${pos.y / scale}px)`;
    }
  };

  const scheduleUpdate = () => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        updateTransform();
        rafRef.current = null;
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      scaleRef.current = 1;
      positionRef.current = { x: 0, y: 0 };
      setDisplayScale(1);
      document.body.style.overflow = 'hidden';
      if (imageRef.current) {
        imageRef.current.style.transform = 'scale(1) translate(0px, 0px)';
      }
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isOpen, initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case '0':
          handleReset();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const handleZoomIn = () => {
    scaleRef.current = Math.min(scaleRef.current + 0.5, 4);
    setDisplayScale(scaleRef.current);
    updateTransform();
  };

  const handleZoomOut = () => {
    scaleRef.current = Math.max(scaleRef.current - 0.5, 0.5);
    setDisplayScale(scaleRef.current);
    updateTransform();
  };

  const handleReset = () => {
    scaleRef.current = 1;
    positionRef.current = { x: 0, y: 0 };
    setDisplayScale(1);
    updateTransform();
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    handleReset();
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
    handleReset();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scaleRef.current > 1) {
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: e.clientX - positionRef.current.x,
        y: e.clientY - positionRef.current.y
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current && scaleRef.current > 1) {
      positionRef.current = {
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y
      };
      scheduleUpdate();
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const getTouchDistance = (touches: TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getTouchCenter = (touches: TouchList) => {
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2
    };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      const center = getTouchCenter(e.touches);
      initialPinchDistanceRef.current = distance;
      initialScaleRef.current = scaleRef.current;
      pinchCenterRef.current = center;
      initialPositionRef.current = { ...positionRef.current };
    } else if (e.touches.length === 1 && scaleRef.current > 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX - positionRef.current.x,
        y: e.touches[0].clientY - positionRef.current.y
      };
    } else if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistanceRef.current && pinchCenterRef.current) {
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches);
      const currentCenter = getTouchCenter(e.touches);
      const scaleChange = currentDistance / initialPinchDistanceRef.current;
      const newScale = Math.min(Math.max(initialScaleRef.current * scaleChange, 0.5), 4);

      const centerDeltaX = currentCenter.x - pinchCenterRef.current.x;
      const centerDeltaY = currentCenter.y - pinchCenterRef.current.y;

      scaleRef.current = newScale;
      positionRef.current = {
        x: initialPositionRef.current.x + centerDeltaX,
        y: initialPositionRef.current.y + centerDeltaY
      };

      setDisplayScale(newScale);
      scheduleUpdate();
    } else if (e.touches.length === 1 && touchStartRef.current && scaleRef.current > 1) {
      e.preventDefault();
      positionRef.current = {
        x: e.touches[0].clientX - touchStartRef.current.x,
        y: e.touches[0].clientY - touchStartRef.current.y
      };
      scheduleUpdate();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      initialPinchDistanceRef.current = null;
      pinchCenterRef.current = null;
      touchStartRef.current = null;
    } else if (e.touches.length === 1) {
      initialPinchDistanceRef.current = null;
      pinchCenterRef.current = null;
      if (scaleRef.current > 1) {
        touchStartRef.current = {
          x: e.touches[0].clientX - positionRef.current.x,
          y: e.touches[0].clientY - positionRef.current.y
        };
      }
    }
  };

  const handleSwipe = (e: React.TouchEvent) => {
    if (!touchStartRef.current || scaleRef.current > 1) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };

    const deltaX = touchEnd.x - touchStartRef.current.x;
    const deltaY = Math.abs(touchEnd.y - touchStartRef.current.y);

    if (Math.abs(deltaX) > 50 && deltaY < 50) {
      if (deltaX > 0) {
        handlePrevious();
      } else {
        handleNext();
      }
    }

    touchStartRef.current = null;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-md"
        aria-label="Close zoom view"
      >
        <X className="h-6 w-6 text-white" />
      </button>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoomOut();
          }}
          className="p-2 hover:bg-white/20 rounded-full transition-all duration-300"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-5 w-5 text-white" />
        </button>
        <span className="text-white text-sm font-medium min-w-[60px] text-center">
          {Math.round(displayScale * 100)}%
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoomIn();
          }}
          className="p-2 hover:bg-white/20 rounded-full transition-all duration-300"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-5 w-5 text-white" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
          }}
          className="p-2 hover:bg-white/20 rounded-full transition-all duration-300"
          aria-label="Reset zoom"
        >
          <RotateCcw className="h-5 w-5 text-white" />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
        <span className="text-white text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-md"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-md"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}

      <div
        ref={containerRef}
        className={`relative max-w-[90vw] max-h-[90vh] ${scaleRef.current > 1 ? 'cursor-move' : 'cursor-zoom-in'} touch-none`}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={(e) => {
          handleTouchEnd(e);
          handleSwipe(e);
        }}
      >
        <img
          ref={imageRef}
          src={images[currentIndex]}
          alt={`Highlight ${currentIndex + 1}`}
          className="max-w-full max-h-[90vh] object-contain select-none"
          style={{
            transformOrigin: 'center center',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default ImageZoomModal;
