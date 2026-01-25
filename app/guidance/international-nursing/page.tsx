"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "Introduction",
    items: [
      "Growing global demand for nurses",
      "Why nurses choose to work abroad",
    ],
  },
  {
    title: "Benefits of International Nursing",
    items: ["Professional experience", "Cultural exchange", "Career opportunities", "Personal growth"],
  },
  {
    title: "General Requirements to Work Abroad",
    items: ["Nursing license recognition", "Language requirements", "Work permits and visas", "Clinical experience"],
  },
  {
    title: "Licensing and Registration Process",
    items: ["Credential evaluation", "Exams and assessments", "Timeframes and costs", "Common challenges"],
  },
  {
    title: "Popular Destinations for Nurses",
    items: [
      "Kort oversikt (kan bli egna sidor):",
      "Europe",
      "United Kingdom",
      "Australia",
      "Middle East",
      "Scandinavia",
    ],
  },
  {
    title: "Challenges and Considerations",
    items: ["Cultural differences", "Healthcare system differences", "Cost of relocation", "Family considerations"],
  },
  {
    title: "Preparing for a Smooth Transition",
    items: ["Documentation checklist", "Language preparation", "Financial planning", "Support networks"],
  },
  {
    title: "Final Advice",
    items: ["Plan early", "Use reliable sources", "Connect with nurses who have worked abroad"],
  },
];

export default function InternationalNursing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">International Nursing Guide</h1>
        <p className="text-lg text-slate-600 mb-12">Plan your move abroad with key requirements, destinations, and practical steps.</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-8"
      >
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-500"
          >
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">{section.title}</h2>
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-slate-700"
                >
                  <span className="text-blue-500 font-bold mt-1">•</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}

        <motion.div variants={itemVariants} className="bg-blue-100 rounded-lg p-6 mt-12">
          <h3 className="text-xl font-semibold text-blue-900 mb-3">Next Steps</h3>
          <ul className="space-y-2 text-blue-800">
            <li>✓ Gather your documents early</li>
            <li>✓ Verify licensing and visa timelines</li>
            <li>✓ Connect with nurses already working abroad</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
