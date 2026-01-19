'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  HiOutlineUserGroup,
  HiOutlineLightBulb,
  HiOutlineCog,
  HiOutlineChartBar,
  HiOutlineGlobe,
  HiOutlineShieldCheck,
} from 'react-icons/hi'
import { SectionWrapper, Card } from '@/components/ui'
import { services } from '@/data/content'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HiOutlineUserGroup,
  HiOutlineLightBulb,
  HiOutlineCog,
  HiOutlineChartBar,
  HiOutlineGlobe,
  HiOutlineShieldCheck,
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="services" className="bg-background-light dark:bg-background-dark">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Our <span className="text-gradient">Services</span>
        </h2>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
          Comprehensive recruitment solutions tailored to your needs
        </p>
      </div>

      <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon]
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  {Icon && <Icon className="w-6 h-6 text-secondary-dark" />}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
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
