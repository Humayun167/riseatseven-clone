import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Helper function for seamless horizontal loop
const horizontalLoop = (items, config) => {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => {
      tl.totalTime(tl.rawTime() + tl.duration() * 100);
    },
  }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;

  gsap.set(items, {
    xPercent: (i, target) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(target, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(target, "x", "px")) / w) * 100 +
        (gsap.getProperty(target, "xPercent") || 0)
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
    (gsap.getProperty(items[length - 1], "scaleX") || 1) +
    (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") || 1);
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        { xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100) },
        {
          xPercent: xPercents[i],
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length);
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.animate(time, vars);
  }

  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true);
  if (config.reversed) {
    tl.vars.onReverseComplete?.();
    tl.reverse();
  }
  return tl;
};

export default function ScrollingHero() {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current && isHovered) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    if (cursorRef.current && !isHovered) {
      gsap.to(cursorRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        overwrite: "auto",
      });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered]);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const items = gsap.utils.toArray(marquee.children);
    const loop = horizontalLoop(items, {
      repeat: -1,
      speed: 1,
      paddingRight: 64,
    });

    let velocityTween = null;

    const scrollTrigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = self.getVelocity();

        if (velocityTween) velocityTween.kill();

        let targetTimeScale = 1;
        if (velocity > 0) {
          targetTimeScale = 1 + Math.abs(velocity / 150);
        } else if (velocity < 0) {
          targetTimeScale = -(1 + Math.abs(velocity / 150));
        }

        velocityTween = gsap.to(loop, {
          timeScale: targetTimeScale,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(loop, {
              timeScale: 1,
              duration: 1,
              ease: "power2.inOut"
            });
          }
        });
      }
    });

    return () => {
      loop.kill();
      scrollTrigger.kill();
      if (velocityTween) velocityTween.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-10 md:py-20 overflow-hidden select-none relative cursor-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Custom Cursor - Desktop Only */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 px-6 py-3 bg-mint rounded-full z-[999] pointer-events-none hidden lg:flex flex-row gap-2 justify-center items-center text-grey-900 text-center opacity-0 scale-0"
        style={{
          marginLeft: "-50px",
          marginTop: "-10px"
        }}
      >
        <span className="text-lg font-medium leading-tight">Send Us Your Brief</span>
        <i className="fa-solid fa-arrow-up-right text-xl" />
      </div>

      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap items-center"
      >
        {/* Item 1: Text */}
        <div className="px-8 md:px-16">
          <span className="text-[10vw] md:text-[15vw] font-medium leading-none text-grey-900 tracking-tighter">
            Chasing Consumers
          </span>
        </div>

        {/* Item 2: Image */}
        <div className="w-[12vw] md:w-[15vw] aspect-square bg-zinc-900 rounded-2xl md:rounded-3xl overflow-hidden flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=500&fit=crop"
            alt="Visual 1"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Item 3: Text */}
        <div className="px-8 md:px-16">
          <span className="text-[10vw] md:text-[15vw] font-medium leading-none text-grey-900 tracking-tighter">
            Not Algorithms
          </span>
        </div>

        {/* Item 4: Image */}
        <div className="w-[12vw] md:w-[15vw] aspect-square bg-zinc-900 rounded-2xl md:rounded-3xl overflow-hidden flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1551085254-e96b210db58a?w=500&h=500&fit=crop"
            alt="Visual 2"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Item 5: Text */}
        <div className="px-8 md:px-16">
          <span className="text-[10vw] md:text-[15vw] font-medium leading-none text-grey-900 tracking-tighter">
            Chasing Consumers
          </span>
        </div>

        {/* Item 6: Image */}
        <div className="w-[12vw] md:w-[15vw] aspect-square bg-zinc-900 rounded-2xl md:rounded-3xl overflow-hidden flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=500&fit=crop"
            alt="Visual 1"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Item 7: Text */}
        <div className="px-8 md:px-16">
          <span className="text-[10vw] md:text-[15vw] font-medium leading-none text-grey-900 tracking-tighter">
            Not Algorithms
          </span>
        </div>

        {/* Item 8: Image */}
        <div className="w-[12vw] md:w-[15vw] aspect-square bg-zinc-900 rounded-2xl md:rounded-3xl overflow-hidden flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1551085254-e96b210db58a?w=500&h=500&fit=crop"
            alt="Visual 2"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
