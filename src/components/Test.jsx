import React, { useState, useRef, useEffect } from "react";
import "./test.css"; // Assuming you have a CSS file for styling

export const Test = () => {
  const images = [
    "/images/southindian.jpg",
    "/images/northindian.jpg",
    "/images/chinese.jpg",
    "/images/italian.jpg",
    "/images/american.jpg",
    "/images/indian.jpg",
    "/images/mexican.jpg",
    "/images/japanese.jpg",
    "/images/tandoori.jpg",
    "/images/dalbati.jpg",
    "/images/odisha.jpg",
    "/images/vadapav.jpg",
    "/images/biriyani.jpg",
  ];

  const [centerIndex, setCenterIndex] = useState(0);
  const containerRef = useRef(null);

  // Image width (450px) + gap (10px)
  const itemWidth = 450 + 10;
  const totalImages = images.length;
  
  // Calculate the total scrollable width based on image count and width
  const totalScrollWidth = totalImages * itemWidth;

  const scrollGallery = (offset) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const newScrollLeft = container.scrollLeft + offset;

      // Prevent scrolling beyond boundaries
      container.scrollLeft = Math.max(0, Math.min(newScrollLeft, totalScrollWidth - container.offsetWidth));
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const visibleImages = Math.ceil(container.offsetWidth / itemWidth);
      const currentScrollPosition = container.scrollLeft;
      const firstVisibleIndex = Math.floor(currentScrollPosition / itemWidth);
      setCenterIndex(firstVisibleIndex);
    }
  };

  const handleLeftClick = () => {
    if (containerRef.current) {
      scrollGallery(-itemWidth); 
    }
  };

  const handleRightClick = () => {
    if (containerRef.current) {
      scrollGallery(itemWidth); 
    }
  };

  // Handle initial page load
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      
      // Initialize scroll position so 4 images are visible at once
      container.scrollLeft = itemWidth * 2; // Start after the first two images
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="carousel-container" style={{ position: 'relative' }}>
      {/* Left scroll button */}
      <button
        className="carousel-button left"
        onClick={handleLeftClick}
        disabled={containerRef.current && containerRef.current.scrollLeft === 0}
        style={{
          position: "absolute",
          left: "0",
          zIndex: 10,
        }}
      >
        &lt;
      </button>

      <div
        className="scrollable-gallery"
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "10px",
          width: "100%",
        }}
      >
        {/* Render images */}
        {images.map((src, index) => (
          <div key={index} className="image-containerf" style={{ flexShrink: 0 }}>
            <img src={src} alt={`Image ${index}`} style={{ width: "450px", height: "auto", objectFit: 'cover' }} /> 
          </div>
        ))}
      </div>

      {/* Right scroll button */}
      <button
        className="carousel-button right"
        onClick={handleRightClick}
        disabled={containerRef.current && containerRef.current.scrollLeft === totalScrollWidth - containerRef.current.offsetWidth}
        style={{
          position: "absolute",
          right: "0",
          zIndex: 10,
        }}
      >
        &gt;
      </button>
    </div>
  );
};