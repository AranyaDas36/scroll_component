import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const content = [
  {
    paragraph: "Pixel-perfect sites, every time",
    text: "Build exactly what each client wants with unstyled HTML elements and full control of CSS properties — plus shareable libraries to make your design system accessible across your org.",
    image: "https://cdn.prod.website-files.com/5dbfba8e8b3107b9aa912e57/6740c104975def691f2cf69f_Comments%20-%20develop.webp",
  },
  {
    paragraph: "Complex animations, without the cost",
    text: "Create engaging, unique sites with scroll-based and multi-step interactions. Plus, easily work with Spline, 3D, Lottie, and dotLottie files — no developer needed.",
    image: "https://cdn.prod.website-files.com/5dbfba8e8b3107b9aa912e57/6740bfc71457df69dec72044_Styling%20-%20Spatial.webp",
  },
  {
    paragraph: "The true power of content, unlocked",
    text: "Power multichannel campaigns with a visual CMS and the ability to programmatically serve content both in and out of Webflow — plus empower clients to easily add, edit, and manage content over time.",
    image: "https://cdn.prod.website-files.com/5dbfba8e8b3107b9aa912e57/6740c2e457d15653cc10a544_Interactions%20-%20Castle.webp",
  },
  {
    paragraph: "Collaborate and hand off client work, faster",
    text: "Work better with clients (and internally), iterate faster, and orchestrate seamless handoffs with commenting, advanced roles and permissions, page branching, and more.",
    image: "https://cdn.prod.website-files.com/5dbfba8e8b3107b9aa912e57/6740c280e1ba7926f3fe85db_CMS%20-%20Travelogic.webp",
  },
];

export const ScrollImageTransition = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageIndex = useTransform(scrollYProgress, [0, 1], [0, content.length ]);

  useEffect(() => {
    const unsubscribe = imageIndex.onChange((v) => setCurrentIndex(Math.round(v)));
    return () => unsubscribe();
  }, [imageIndex]);

  return (
    <div ref={containerRef} className="h-[500vh] bg-gray-50">
      <div className="sticky top-0 flex h-screen w-full">
        {/* Left Section */}
        <div className="w-1/2 p-12 flex flex-col justify-center bg-gray-50 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {content.map((item, index) => (
              index === currentIndex && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 300 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-x-12 flex flex-col"
                >
                  <motion.h1 
                    className="text-4xl font-extrabold text-gray-900 mb-6 w-1/2 px-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    {item.paragraph}
                  </motion.h1>
                  <motion.p 
                    className="text-lg leading-7 text-gray-600 w-1/2 px-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    {item.text}
                  </motion.p>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Right Section */}
        {/* Right Section */}
        <div className="relative w-1/2 h-screen px-10">
        {content.map((item, index) => (
            <motion.img
            key={index}
            src={item.image}
            alt={`Image ${index + 1}`}
            className="absolute inset-0 m-auto w-[90%] h-[90%] object-cover rounded-md shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            />
        ))}
        </div>
      </div>
    </div>
  );
};

