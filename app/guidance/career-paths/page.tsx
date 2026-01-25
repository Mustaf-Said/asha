'use client';

import { motion } from 'framer-motion';

const sections = [
  {
    title: 'Introduction',
    items: [
      'Why nursing offers diverse career paths',
      'How career planning supports long-term satisfaction',
    ],
  },
  {
    title: 'Why Choosing the Right Career Path Matters',
    items: ['Job satisfaction', 'Work-life balance', 'Professional growth', 'Avoiding burnout'],
  },
  {
    title: 'Common Nursing Career Paths',
    items: [
      'Staff Nurse',
      'Specialist Nurse (ICU, Mental Health, Pediatrics)',
      'Nurse Educator',
      'Nurse Manager / Leader',
      'Research Nurse',
      'Advanced Practice Nurse',
    ],
  },
  {
    title: 'Education & Requirements',
    items: ['Basic nursing qualifications', 'Additional certifications', 'Continuing education', 'Clinical experience'],
  },
  {
    title: 'How to Choose the Right Path for You',
    items: ['Interests and strengths', 'Work environment preferences', 'Long-term goals', 'Lifestyle considerations'],
  },
  {
    title: 'Career Development Tips',
    items: ['Networking', 'Mentorship', 'Skills development', 'Staying updated in healthcare'],
  },
];

export default function CareerPaths() {
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
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Nursing Career Paths</h1>
        <p className="text-lg text-slate-600 mb-12">Explore diverse opportunities and find your ideal career trajectory</p>
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
            <li>✓ Reflect on your goals and interests</li>
            <li>✓ Explore specializations in detail</li>
            <li>✓ Connect with community discussions</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}