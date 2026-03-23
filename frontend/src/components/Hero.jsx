import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const sliderData = [
    {
      id: 1,
      title: "Organic & Healthy Choices",
      description:
        "Choose from a wide range of organic products to stay healthy and happy every day.",
      offer: "Limited Time: Free Delivery on Orders Over $50",
      buttonText1: "Browse Products",
      buttonText2: "Learn More",
      imgSrc: assets.hero_img,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="overflow-hidden relative w-full">
      {/* Slider Wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            {/* Text Section */}
            <div className="md:pl-8 mt-10 md:mt-0 flex-1">
              <p className="md:text-base text-orange-600 pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1>
              <p className="mt-2 text-gray-500 max-w-md text-sm">
                {slide.description}
              </p>

              <div className="flex items-center mt-4 md:mt-6 gap-4">
                <button
                  onClick={() => navigate("/collection")}
                  className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium"
                >
                  {slide.buttonText1}
                </button>

                <button
                  onClick={() => navigate("/collection")}
                  className="group flex items-center gap-2 px-6 py-2.5 font-medium"
                >
                  {slide.buttonText2}
                  <img
                    className="group-hover:translate-x-1 transition"
                    src={assets.arrow_icon}
                    alt="arrow icon"
                  />
                </button>
              </div>
            </div>

            {/* Image Section */}
            <div className="flex items-center justify-center flex-1">
              <img
                className="md:w-72 w-48 hover:scale-125 transition"
                src={slide.imgSrc}
                alt={`Slide ${index + 1} - ${slide.title}`}
                width={400}
                height={400}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;