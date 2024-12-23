import React, { useRef, useState, useEffect } from "react";

const VideoCarousel = ({ videos }) => {
  const carouselRef = useRef(null);
  const [carouselVideos, setCarouselVideos] = useState([
    videos[videos.length - 1], // Add the last video to the start for seamless looping
    ...videos,
    videos[0], // Add the first video to the end for seamless looping
  ]);
  const [currentIndex, setCurrentIndex] = useState(1); // Start with the actual first video
  const [videoWidth, setVideoWidth] = useState(250); // Default width for desktop

  const scrollToVideo = (index, smooth = true) => {
    const container = carouselRef.current;

    const offset =
      index * videoWidth - (container.offsetWidth / 2 - videoWidth / 2);

    container.scrollTo({
      left: offset,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  const handleLeftClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleRightClick = () => {
    if (currentIndex < carouselVideos.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    const container = carouselRef.current;

    // Scroll to the current video smoothly
    scrollToVideo(currentIndex);

    // Loop back to the last video if at the fake first video
    if (currentIndex === 0) {
      setTimeout(() => {
        setCurrentIndex(carouselVideos.length - 2); // Set to the actual last video
        scrollToVideo(carouselVideos.length - 2, false);
      }, 300); // Wait for the smooth scroll to finish
    }

    // Loop back to the first video if at the fake last video
    if (currentIndex === carouselVideos.length - 1) {
      setTimeout(() => {
        setCurrentIndex(1); // Set to the actual first video
        scrollToVideo(1, false);
      }, 300); // Wait for the smooth scroll to finish
    }

    // Update the "popping effect" and autoplay the center video
    const videoElements = Array.from(container.children);
    videoElements.forEach((video, index) => {
      const videoElement = video.querySelector("video");
      if (index === currentIndex) {
        video.style.transform = "scale(1.4)"; // Increased pop-out size
        video.style.opacity = "1";
        videoElement.play();
      } else {
        video.style.transform = "scale(0.9)"; // Slightly reduced size for non-centered videos
        video.style.opacity = "0.6";
        videoElement.pause();
      }
    });
  }, [currentIndex, carouselVideos.length, videoWidth]);

  useEffect(() => {
    // Set initial position to the first real video
    scrollToVideo(1, false);

    // Adjust video width for responsiveness
    const updateVideoWidth = () => {
      const isMobile = window.innerWidth < 768;
      setVideoWidth(isMobile ? window.innerWidth - 20 : 250); // Full width minus some padding for mobile
    };

    updateVideoWidth();
    window.addEventListener("resize", updateVideoWidth);

    return () => window.removeEventListener("resize", updateVideoWidth);
  }, []);

  return (
    <div
      className="carousel-container"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Left scroll button */}
      <button
        className="carousel-button left"
        onClick={handleLeftClick}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      >
        &lt;
      </button>

      <div
        className="scrollable-gallery"
        ref={carouselRef}
        style={{
          display: "flex",
          overflowX: "hidden",
          scrollBehavior: "smooth",
          gap: "10px",
        }}
      >
        {carouselVideos.map((video, index) => (
          <div
            key={index}
            className="video-container"
            style={{
              flex: `0 0 ${videoWidth}px`, // Dynamically calculated width
              transition: "transform 0.3s ease, opacity 0.3s ease",
            }}
          >
            <video
              src={video}
              controls
              muted
              className="w-full h-auto rounded shadow-md"
            ></video>
          </div>
        ))}
      </div>

      {/* Right scroll button */}
      <button
        className="carousel-button right"
        onClick={handleRightClick}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      >
        &gt;
      </button>
    </div>
  );
};

export default VideoCarousel;
