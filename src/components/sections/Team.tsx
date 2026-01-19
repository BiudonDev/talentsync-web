'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper } from '@/components/ui'
import { team } from '@/data/content'

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="team">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Meet the <span className="text-gradient">Team</span>
        </h2>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
          The people behind your successful hires
        </p>
      </div>

      <div ref={ref} className="flex flex-wrap justify-center gap-8">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center group"
          >
            {/* Avatar */}
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 group-hover:scale-105 flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>

            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              {member.role}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
