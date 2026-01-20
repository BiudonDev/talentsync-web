'use client'

import { motion } from 'framer-motion'
import { HiOutlineLocationMarker, HiOutlineCurrencyEuro, HiOutlineUserGroup } from 'react-icons/hi'
import { SectionWrapper } from '@/components/ui'

const stats = [
  { icon: HiOutlineLocationMarker, value: 'Moldova', label: 'Headquarters' },
  { icon: HiOutlineCurrencyEuro, value: '60%', label: 'Cost Savings' },
  { icon: HiOutlineUserGroup, value: '1-2 weeks', label: 'Time to Hire' },
]

export default function About() {
  return (
    <SectionWrapper id="about" className="bg-background-dark">
      <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-5 p-8 rounded-3xl bg-surface-dark border border-neutral-800"
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shrink-0">
                <stat.icon className="w-8 h-8 text-secondary-dark" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-lg text-text-secondary-dark">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
            Your Strategic Partner for <span className="text-gradient">Tech Talent</span>
          </h2>
          <div className="space-y-6 text-text-secondary-dark">
            <p className="text-xl leading-relaxed">
              Based in Chișinău, Moldova, TalentSync connects global companies with elite
              software developers from Eastern Europe&apos;s thriving tech markets.
            </p>
            <p className="text-xl leading-relaxed">
              We deliver exceptional quality at competitive rates — helping you save up to
              60% on hiring costs while maintaining top-tier technical excellence and
              cultural alignment with your team.
            </p>
            <p className="text-xl leading-relaxed">
              From JavaScript and Python to AWS and AI engineering, our vetted talent pool
              covers the entire modern tech stack, ready to scale your team in weeks, not months.
            </p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
