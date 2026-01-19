'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper, Card, Button } from '@/components/ui'
import { pricing, siteConfig } from '@/data/content'

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="pricing">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Simple <span className="text-gradient">Pricing</span>
        </h2>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
          Transparent pricing that scales with your hiring needs
        </p>
      </div>

      <div ref={ref} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {pricing.map((plan, index) => (
          <motion.div
            key={plan.tier}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={plan.highlighted ? 'md:-mt-4 md:mb-4' : ''}
          >
            <Card
              className={`h-full flex flex-col ${
                plan.highlighted
                  ? 'border-primary ring-2 ring-primary/20'
                  : ''
              }`}
              hover={false}
            >
              {plan.highlighted && (
                <div className="px-3 py-1 text-xs font-semibold rounded-full gradient-primary text-secondary-dark w-fit mb-4">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.tier}</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-text-secondary-light dark:text-text-secondary-dark ml-2">
                  {plan.unit}
                </span>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span className="text-text-secondary-light dark:text-text-secondary-dark">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                href={siteConfig.calendlyUrl}
                external
                variant={plan.highlighted ? 'primary' : 'secondary'}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
