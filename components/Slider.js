import React, { useState, useEffect } from 'react';
import ChevronIcon from '../public/ChevronIcon';

const sliderData = [
  { id: 1, img: "/concertCover/twice.jpg", title: "TWICE 5TH WORLD TOUR" },
  { id: 2, img: "/concertCover/bazzi.jpg", title: "The Infinite Dream" },
  { id: 3, img: "/concertCover/coldplay.png", title: "MUSIC of the SPHERES" },
  { id: 4, img: "/concertCover/ed.jpg", title: "The +–=÷× Dream" },
  { id: 5, img: "/concertCover/lauv.jpg", title: "I Met You When I Was 18" },
];

const ImageSlider = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = sliderData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [maxSteps]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <div 
        className="flex flex-row h-full transition-transform duration-500 ease-in-out"
        style={{
          width: `${100 * maxSteps}%`,
          transform: `translateX(-${activeStep * (100 / maxSteps)}%)`,
        }}
      >
        {sliderData.map((slide) => (
          <div
            key={slide.id}
            className="flex-shrink-0 h-full overflow-hidden"
            style={{ width: `${100 / maxSteps}%` }}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover object-top"
            />
          </div>
        ))}
      </div>

      {/* Arrow and Pagination Controls */}
      <div className="absolute bottom-[2%] left-0 right-0 flex justify-center items-center z-10">
        <button
          className="mr-4 text-white"
          onClick={handleBack}
          aria-label="Previous slide"
        >
          <ChevronIcon />
        </button>

        {sliderData.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full mx-1 cursor-pointer ${
              index === activeStep ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setActiveStep(index)}
          />
        ))}

        <button
          className="ml-4 text-white"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <ChevronIcon className="rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;