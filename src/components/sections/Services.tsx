'use client'

import { motion } from 'framer-motion'
import {
  HiOutlineUserGroup,
  HiOutlineCurrencyDollar,
  HiOutlinePuzzle,
  HiOutlineCode,
  HiOutlineCloud,
  HiOutlineChip,
} from 'react-icons/hi'
import { SectionWrapper, Card } from '@/components/ui'
import { services } from '@/data/content'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HiOutlineUserGroup,
  HiOutlineCurrencyDollar,
  HiOutlinePuzzle,
  HiOutlineCode,
  HiOutlineCloud,
  HiOutlineChip,
}

export default function Services() {
  return (
    <SectionWrapper id="services" band>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-6">
          The TalentSync <span className="text-gradient">Advantage</span>
        </h2>
        <p className="text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty max-w-3xl mx-auto">
          Based in Chișinău, Moldova — operating across thriving Eastern European tech markets with deep local expertise.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon]
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full group hover:border-primary/50">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                  {Icon && <Icon className="w-7 h-7 text-secondary-dark" aria-hidden="true" />}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary text-pretty">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
