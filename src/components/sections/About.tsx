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
    <SectionWrapper id="about">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-5 p-6 sm:p-8 rounded-3xl bg-surface border border-border"
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shrink-0">
                <stat.icon className="w-8 h-8 text-secondary-dark" aria-hidden="true" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-base sm:text-lg text-text-secondary">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-8">
            Your Strategic Partner for <span className="text-gradient">Tech Talent</span>
          </h2>
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-text-secondary text-pretty">
            <p>
              Based in Chișinău, Moldova, TalentSync connects global companies with elite
              software developers from Eastern Europe&apos;s thriving tech markets.
            </p>
            <p>
              We deliver exceptional quality at competitive rates — helping you save up to
              60% on hiring costs while maintaining top-tier technical excellence and
              cultural alignment with your team.
            </p>
            <p>
              From JavaScript and Python to AWS and AI engineering, our vetted talent pool
              covers the entire modern tech stack, ready to scale your team in weeks, not months.
            </p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
