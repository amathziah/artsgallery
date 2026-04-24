import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import bikanerHeroImage from '../assets/bikaner-hero.png';

const BACKEND = 'http://localhost:5001';
const resolveImg = (url) => {
  if (!url) return bikanerHeroImage;
  return url.startsWith('/') ? `${BACKEND}${url}` : url;
};

const Hero = ({ slides: propSlides }) => {
  const slides = propSlides && propSlides.length > 0 ? propSlides : [];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (slides.length === 0) return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900 flex items-end pb-24 px-6 md:px-12">
      <div className="container mx-auto max-w-6xl text-white">
        <h1 className="text-4xl md:text-6xl font-light mb-4">Welcome</h1>
        <p className="text-xl md:text-2xl font-light">Saat Saath Arts Foundation</p>
      </div>
    </div>
  );

  const slide = slides[currentSlide];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img src={resolveImg(slide.imageUrl)} alt={slide.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative h-full flex flex-col justify-end pb-24 px-6 md:px-12 text-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4 max-w-4xl leading-tight">
            {slide.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl font-light">
            {slide.subtitle}
          </p>
          <a
            href={slide.ctaLink}
            target={slide.isExternal ? '_blank' : '_self'}
            rel={slide.isExternal ? 'noopener noreferrer' : ''}
            className="inline-block px-8 py-4 bg-white text-black hover:bg-white/90 transition-colors font-semibold uppercase tracking-widest text-sm"
          >
            {slide.ctaText}
          </a>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={32} />
      </button>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
