import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex: number;
}

const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4"
      onClick={handleBackdropClick}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all duration-200 backdrop-blur-sm"
        aria-label="Close image viewer"
      >
        <X className="h-6 w-6 text-white" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}

      <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`View ${currentIndex + 1} of ${images.length}`}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          loading="eager"
          decoding="async"
        />
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
          <p className="text-white text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageZoomModal;
