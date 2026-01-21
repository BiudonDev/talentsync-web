'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionWrapper, Card } from '@/components/ui'
import { caseStudies } from '@/data/content'

export default function CaseStudies() {
  const highlighted = caseStudies.find((s) => s.highlight)
  const others = caseStudies.filter((s) => !s.highlight)

  return (
    <SectionWrapper id="case-studies" className="bg-background-dark py-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Our <span className="text-gradient">Clients</span>
        </h2>
        <p className="text-xl text-text-secondary-dark max-w-2xl mx-auto">
          Driving success across industries — from global sports clubs to fast-growing startups
        </p>
      </motion.div>

      {/* Spotlight: FC Barcelona */}
      {highlighted && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Card className="border-primary ring-2 ring-primary/20 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src={highlighted.image}
                  alt={highlighted.company}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-2">
                <span className="px-4 py-2 text-sm font-semibold rounded-full gradient-primary text-secondary-dark mb-4 inline-block">
                  Spotlight Partnership
                </span>
                <h3 className="text-3xl font-bold mb-3">{highlighted.company}</h3>
                <p className="text-lg text-text-secondary-dark mb-6">
                  {highlighted.industry}
                </p>
                <ul className="space-y-3">
                  {highlighted.results.map((result, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-lg text-text-secondary-dark"
                    >
                      <span className="text-primary mt-1 font-bold text-xl">✓</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Other clients - horizontal scroll on mobile, grid on desktop */}
      <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        <div className="flex gap-4" style={{ width: 'max-content' }}>
          {others.map((study, index) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="w-72 flex-shrink-0"
            >
              <Card className="h-full overflow-hidden group">
                <div
                  className="relative aspect-video mb-4 rounded-lg overflow-hidden"
                  style={{ backgroundColor: study.logoBg || 'transparent' }}
                >
                  <Image
                    src={study.image}
                    alt={study.company}
                    fill
                    className={`transition-transform duration-300 group-hover:scale-105 ${
                      study.logoContain ? `object-contain ${study.logoPadding || 'p-4'}` : 'object-cover'
                    }`}
                    loading="lazy"
                  />
                </div>
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary text-secondary-dark mb-2">
                  {study.industry}
                </span>
                <h3 className="text-xl font-bold mb-3">{study.company}</h3>
                <ul className="space-y-2">
                  {study.results.map((result, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-text-secondary-dark"
                    >
                      <span className="text-primary mt-0.5">✓</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Other clients - grid on tablet/desktop */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {others.map((study, index) => (
          <motion.div
            key={study.company}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Card className="h-full overflow-hidden group">
              <div
                className="relative aspect-video mb-4 rounded-lg overflow-hidden"
                style={{ backgroundColor: study.logoBg || 'transparent' }}
              >
                <Image
                  src={study.image}
                  alt={study.company}
                  fill
                  className={`transition-transform duration-300 group-hover:scale-105 ${
                    study.logoContain ? `object-contain ${study.logoPadding || 'p-4'}` : 'object-cover'
                  }`}
                  loading="lazy"
                />
              </div>
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary text-secondary-dark mb-2">
                {study.industry}
              </span>
              <h3 className="text-xl font-bold mb-3">{study.company}</h3>
              <ul className="space-y-2">
                {study.results.map((result, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-text-secondary-dark"
                  >
                    <span className="text-primary mt-0.5">✓</span>
                    {result}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
