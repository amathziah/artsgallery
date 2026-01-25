import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1599661046289-e318d6d48ed1?q=80&w=2070&auto=format&fit=crop", 
      title: "The Sculpture Park Jaipur",
      subtitle: "A long-term public art project at Madhavendra Palace",
      ctaText: "Visit Sculpture Park",
      ctaLink: "https://www.thesculpturepark.org/",
      isExternal: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1549892782-b7d159f8c374?q=80&w=2037&auto=format&fit=crop", 
      title: "Bikaner House",
      subtitle: "Advancing critical dialogue through visual art",
      ctaText: "View Programs",
      ctaLink: "#programs",
      isExternal: false
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1507643179173-617d6c6f6752?q=80&w=2068&auto=format&fit=crop", 
      title: "Supporting Curatorial Inquiry",
      subtitle: "Research-led engagement and institutional collaboration",
      ctaText: "About Us",
      ctaLink: "#about",
      isExternal: false
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); 
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>
      ))}
      
      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-8 leading-none">
          {slides[currentSlide].title}
        </h1>
        <div className="w-24 h-px bg-white/60 mx-auto mb-8"></div>
        <p className="text-lg md:text-2xl font-light mb-14 tracking-wide text-white/90 max-w-3xl mx-auto">
          {slides[currentSlide].subtitle}
        </p>
        
        <a 
          href={slides[currentSlide].ctaLink} 
          target={slides[currentSlide].isExternal ? "_blank" : "_self"}
          rel={slides[currentSlide].isExternal ? "noopener noreferrer" : ""}
          className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black hover:bg-black hover:text-white border-2 border-white transition-all duration-300 uppercase tracking-[0.25em] text-xs font-semibold"
        >
          {slides[currentSlide].ctaText}
          {slides[currentSlide].isExternal && <ExternalLink size={14} />}
        </a>
      </div>

      <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center items-center gap-6">
        <button onClick={prevSlide} className="p-2 text-white/60 hover:text-white transition-colors">
          <ChevronLeft size={32} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-10' : 'bg-white/30 w-2'}`}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="p-2 text-white/60 hover:text-white transition-colors">
          <ChevronRight size={32} />
        </button>
      </div>
    </header>
  );
};

export default Hero;
