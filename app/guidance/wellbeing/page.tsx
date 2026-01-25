"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "Introduction",
    items: ["The reality of stress in nursing", "Why wellbeing matters in healthcare"],
  },
  {
    title: "What Is Burnout?",
    items: ["Definition", "Emotional exhaustion", "Reduced professional effectiveness"],
  },
  {
    title: "Common Causes of Burnout",
    items: ["High workload", "Emotional demands", "Shift work", "Lack of support"],
  },
  {
    title: "Early Warning Signs",
    items: ["Physical symptoms", "Emotional changes", "Behavioral signs"],
  },
  {
    title: "Strategies for Burnout Prevention",
    items: ["Setting boundaries", "Stress management techniques", "Work-life balance", "Peer support"],
  },
  {
    title: "Mental Health and Self-Care",
    items: ["Importance of rest and recovery", "Mindfulness and reflection", "Seeking professional support"],
  },
  {
    title: "Building a Sustainable Nursing Career",
    items: ["Career adjustments", "Continuous learning", "Finding purpose in nursing"],
  },
  {
    title: "When to Seek Help",
    items: ["Recognizing when support is needed", "Available resources", "Talking to supervisors or professionals"],
  },
];

export default function WellbeingPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4">Nurse Wellbeing Guide</h1>
        <p className="text-lg text-slate-600 mb-12">Prevent burnout, protect your mental health, and build a sustainable nursing career.</p>
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
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-teal-500"
          >
            <h2 className="text-2xl font-semibold text-teal-900 mb-4">{section.title}</h2>
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-slate-700"
                >
                  <span className="text-teal-500 font-bold mt-1">•</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}

        <motion.div variants={itemVariants} className="bg-blue-100 rounded-lg p-6 mt-12">
          <h3 className="text-xl font-semibold text-blue-900 mb-3">Next Steps</h3>
          <ul className="space-y-2 text-blue-800">
            <li>✓ Schedule regular rest and recovery</li>
            <li>✓ Build a peer support circle</li>
            <li>✓ Ask for professional help early</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}