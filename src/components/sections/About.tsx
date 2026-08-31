'use client'

import { motion } from 'framer-motion'
import { HiOutlineClock, HiOutlineLocationMarker, HiOutlineUserGroup } from 'react-icons/hi'
import { SectionWrapper } from '@/components/ui'
import { ANTI_POSITIONING, CANONICAL_DESCRIPTION } from '@/data/content'

/**
 * The entity section: BLOCK A verbatim, then BLOCK D verbatim (02-page-content
 * Part 0). Both are imported from `content.ts` rather than typed here, because
 * `/about/` renders the same two strings and a paraphrase on either page costs
 * the entity-resolution job the homepage exists to do.
 *
 * The "60% Cost Savings" tile is gone — an unsubstantiated price-comparison
 * claim stated as a bare fact, with no baseline (D7, claims row 2). The
 * "1-2 weeks Time to Hire" tile is gone as a bare SLA and comes back qualified
 * by the dataset it is drawn from (claims row 6, and the Part 0 rule that speed
 * is never stated unqualified).
 */
const stats = [
  { icon: HiOutlineLocationMarker, value: 'Moldova', label: 'Headquarters' },
  { icon: HiOutlineUserGroup, value: '9', label: 'Engineers placed with European product teams' },
  { icon: HiOutlineClock, value: '1–2 weeks', label: 'Brief to signed offer, across our last five placements' },
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
                <p className="text-base sm:text-lg text-text-secondary text-pretty">{stat.label}</p>
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
            Senior Engineers for Teams That{' '}
            <span className="text-gradient">Keep Control</span>
          </h2>
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-text-secondary text-pretty">
            <p>{CANONICAL_DESCRIPTION}</p>
            <p>
              You keep control. We find and technically validate the engineer; you interview, you
              select, and you manage them inside your own team — without standing up a local entity,
              a payroll or a benefits scheme in another country.
            </p>
            <p className="font-medium text-text-primary">{ANTI_POSITIONING}</p>
            <p>
              Operational control means what it says: your repository, your sprint cadence, your
              architectural decisions. Who joins the team is your call, and so is what they work on.
            </p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
