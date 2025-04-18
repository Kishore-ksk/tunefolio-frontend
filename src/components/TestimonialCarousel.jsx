import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    message: "TuneFolio isn't just a website—it's a supportive community of passionate musicians dedicated to helping each other succeed. From the moment I joined. The platform's diverse range of talent and genres ensures that there's something for everyone, and the feedback I've received has been instrumental in honing my skills. Thanks to TuneFolio.",
    name: "Shubham Pawar",
    role: "Singer",
    image: "/assets/shubham-pawar-SanJsOPdLtU-unsplash.jpg",
  },
  {
    message: "Thanks to TuneFolio, I've had the opportunity to showcase my musical talent to a global audience like never before. The platform's user-friendly interface, extensive reach, and supportive community have helped me connect with fellow musicians, gain valuable feedback, and even land exciting opportunities in the industry.",
    name: "Jithesh Sharma",
    role: "Keyboardist",
    image: "/assets/himanshu-dewangan-k9tUQNeOfx0-unsplash.jpg",
  },
  {
    message: "TuneFolio has been instrumental in elevating my music career. With its sleek design and easy-to-use features, I've been able to effortlessly share my music with fans and industry professionals alike. The platform's networking capabilities have opened doors to collaborations and performance opportunities I never thought possible.",
    name: "Ayushi",
    role: "Violinist",
    image: "/assets/shubham-patel-0BScoftQ6to-unsplash.jpg",
  }

];

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const nextCard = () => {
    setDirection("next");
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevCard = () => {
    setDirection("prev");
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleCardClick = (index) => {
    if (index === (activeIndex + 1) % testimonials.length) {
      setDirection("next");

      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    } else if (index === (activeIndex - 1 + testimonials.length) % testimonials.length) {
      setDirection("prev");

      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  return (
    <div className="py-24 bg-[#0D0D0D] text-white overflow-hidden">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">What People Are Saying</h2>
      {/* Arrows */}
      <div className='flex justify-center gap-64'>
        <button
          onClick={prevCard}
          className=" bg-[#1a1a1a] hover:bg-[#70CCE2] hover:text-black p-2 rounded-full"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextCard}
          className=" bg-[#1a1a1a] hover:bg-[#70CCE2] hover:text-black p-2 rounded-full"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="relative flex justify-center items-center gap-6 h-[350px]">
        {testimonials.map((t, i) => {
          const offset = (i - activeIndex + testimonials.length) % testimonials.length;

          let transformStyle = "";

          const leftIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
          const rightIndex = (activeIndex + 1) % testimonials.length;

          if (i === activeIndex) {
            transformStyle = "translate-x-0 scale-100 w-[300px] sm:w-[500px] top-6 bg-[#70CCE2] text-black opacity-100 z-30";
          } else if (i === rightIndex) {
            transformStyle = "translate-x-[120%] scale-90 w-[500px] opacity-40 hover:opacity-70 z-10";
          } else if (i === leftIndex) {
            transformStyle = "translate-x-[-120%] scale-90 w-[500px] opacity-40 hover:opacity-70 z-10";
          } else {
            transformStyle = "hidden";
          }


          return (
            <div
              key={i}
              onClick={() => handleCardClick(i)}
              className={`absolute transition-all duration-700 ease-in-out cursor-pointer w-[280px] bg-[#1a1a1a] rounded-xl p-6 text-center ${transformStyle}`}
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 mx-auto rounded-full object-cover mb-4 border-2 border-[#70CCE2]"
              />
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className="text-sm">{t.role}</p>
              <p className="text-sm mt-3 ">{t.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestimonialCarousel;