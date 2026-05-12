import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { assets } from "../assets/assets";

import "swiper/css";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    title: "Pioneers",
    desc1:
      "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
    desc2:
      "We're on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
    image: assets.legacy1,
    bg: "bg-black",
    rotation: 5,
  },
  {
    id: 2,
    title: "Award Winning",
    desc1:
      "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
    image: assets.legacy2,
    bg: "bg-green-200",
    rotation: 10,
  },
  {
    id: 3,
    title: "Speed",
    desc1:
      "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms. We've created a service which takes ideas to result within 60 minutes.",
    image: assets.legacy3,
    bg: "bg-white",
    rotation: 15,
  },
];

export default function ShowcaseCard() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate cards one by one
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        tl.to(
          card,
          {
            y: "-120vh",
            rotation: -90,
            duration: 1,
            ease: "power1.inOut",
          },
          index * 1.5
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden lg:h-screen"
    >
      {/* Desktop View */}
      <div className="hidden lg:flex flex-col items-center justify-center h-full w-full relative">
        {/* Background Text */}
        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-gray-900 whitespace-nowrap select-none pointer-events-none text-2xl">
          Legacy In The Making
        </h2>

        {/* Cards Stack */}
        <div className="relative h-[60vh] aspect-square z-10">
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`absolute inset-0 ${card.bg} rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg overflow-hidden`}
              style={{
                transform: `rotate(${card.rotation}deg)`,
                zIndex: cards.length - index,
              }}
            >
              {/* Image */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden mb-4 border border-white/10 flex-shrink-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                <h3
                  className={`text-[40px] font-medium mb-3 leading-tight ${
                    card.bg === "bg-black"
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  {card.title}
                </h3>

                <div className="space-y-4">
                  <p
                    className={`${
                      card.bg === "bg-black"
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                  >
                    {card.desc1}
                  </p>

                  {card.desc2 && (
                    <p
                      className={`${
                        card.bg === "bg-black"
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {card.desc2}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden py-10 px-0 flex flex-col min-h-screen">
        {/* Header */}
        <div className="px-6 text-center mb-6">
          <h2 className="text-gray-900 text-base font-medium">
            Legacy In The Making
          </h2>
        </div>

        {/* Swiper */}
        <div className="flex-grow flex items-center px-4">
          <Swiper
            modules={[Pagination]}
            loop={true}
            spaceBetween={24}
            slidesPerView={1}
            centeredSlides={true}
            pagination={{
              type: "progressbar",
              el: ".legacy-tracker",
            }}
            className="w-full h-full px-6"
          >
            {[...cards, ...cards].map((card, idx) => (
              <SwiperSlide key={`${card.id}-${idx}`}>
                <div
                  className={`${card.bg} rounded-2xl p-5 h-[500px] flex flex-col items-center text-center relative overflow-hidden`}
                >
                  {/* Image */}
                  <div className="w-full aspect-[5/3] rounded-xl overflow-hidden mb-6 border border-white/10 flex-shrink-0">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    <h3
                      className={`text-[30px] font-medium mb-4 ${
                        card.bg === "bg-black"
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {card.title}
                    </h3>

                    <div className="space-y-3">
                      <p
                        className={`text-sm ${
                          card.bg === "bg-black"
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        {card.desc1}
                      </p>

                      {card.desc2 && (
                        <p
                          className={`text-sm ${
                            card.bg === "bg-black"
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          {card.desc2}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 mb-10 px-4">
          <div className="w-full h-[4px] bg-gray-100 relative overflow-hidden legacy-tracker" />
        </div>
      </div>

      <style jsx global>{`
        .legacy-tracker.swiper-pagination-progressbar {
          position: relative !important;
          background: #f3f4f6 !important;
        }

        .legacy-tracker .swiper-pagination-progressbar-fill {
          background: #000 !important;
          transition-duration: 300ms !important;
        }
      `}</style>
    </section>
  );
}