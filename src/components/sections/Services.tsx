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
    <SectionWrapper id="services" className="bg-background-dark">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          The TalentSync <span className="text-gradient">Advantage</span>
        </h2>
        <p className="text-xl text-text-secondary-dark max-w-3xl mx-auto">
          Based in Chișinău, Moldova — operating across thriving Eastern European tech markets with deep local expertise.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
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
              <Card className="h-full group hover:border-primary/50 p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl gradient-primary flex items-center justify-center mb-3 sm:mb-6">
                  {Icon && <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-secondary-dark" />}
                </div>
                <h3 className="text-sm sm:text-2xl font-bold mb-1 sm:mb-3">{service.title}</h3>
                <p className="text-xs sm:text-lg text-text-secondary-dark leading-relaxed line-clamp-2 sm:line-clamp-none">
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
