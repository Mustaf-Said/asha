"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const guidanceItems = [
  {
    title: "Nursing Students",
    description:
      "Nursing students are individuals enrolled in academic programs (typically 3-year, 180-credit Bachelor's degrees) designed to prepare them for licensure as registered nurses. They engage in a blend of theoretical classroom learning—covering anatomy, pharmacology, and nursing theory—and practical, on-site clinical experience in hospitals or primary care. ",
  },
  {
    title: "Career Development",
    description:
      "Career development is the lifelong, proactive process of managing your professional growth by setting goals, acquiring new skills, gaining experience, and making strategic decisions to align your work with personal fulfillment and career advancement, involving self-assessment, planning, learning, networking, and adapting to changing work environments.",
  },
  {
    title: "Leadership",
    description:
      "Leadership is the ability to influence and guide a group toward a shared goal, involving vision, motivation, and enabling others to achieve more together than they could alone, through actions like strategic thinking, communication, and fostering trust, and it's a skill anyone can develop, not just those with formal titles. Effective leaders build alignment and commitment, encourage innovation, and often focus on ethical practices, distinguishing themselves from mere management by challenging the status quo rather than just maintaining it.",
  },
  {
    title: "Wellbeing",
    description:
      "Well-being is what is ultimately good for a person. Also called welfare and quality of life, it is a measure of how well life is going for someone. It is a central goal of many individual and societal endeavors. Subjective well-being refers to how a person feels about and evaluates their life.",
  },
  {
    title: "International Nursing",
    description:
      "Explore the exciting role of International Travel Nursing, involving temporary assignments in global healthcare settings. These nurses adapt to various systems and cultures, often filling critical gaps during staff shortages or special projects. Ideal for adaptable and culturally competent individuals, this career offers a unique opportunity to impact healthcare worldwide.",
  },
];

export default function GuidanceHeader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % guidanceItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-slate-100 py-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/*   <h2 className="text-3xl font-semibold text-slate-900">
          Nursing Guidance
        </h2> */}

        <div className="relative mt-4 h-50 overflow-hidden text-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0  rounded-2xl shadow-lg px-10"
            >
              <h3 className="text-2xl font-semibold text-emerald-700">
                {guidanceItems[index].title}
              </h3>
              <p className="mt-4 text-slate-600 leading-relaxed">
                {guidanceItems[index].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
