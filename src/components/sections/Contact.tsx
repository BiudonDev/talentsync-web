import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'
import { SectionWrapper, Button } from '@/components/ui'
import { siteConfig } from '@/data/content'

const CONTACT_LINK =
  'flex items-center gap-3 px-6 py-3 rounded-xl bg-surface hover:shadow-lg motion-safe:transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

// Server component (Rule 10). Two links and a button need no runtime.
export default function Contact() {
  return (
    <SectionWrapper id="contact" band>
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4">
          Let&apos;s <span className="text-gradient">Work Together</span>
        </h2>

        {/* Client feedback item 7, verbatim. */}
        <p className="text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty mb-4">
          Ready to hire an exceptional engineer or outsource your next software project?
        </p>
        <p className="text-base sm:text-lg leading-relaxed text-text-secondary text-pretty mb-8">
          Tell us what you need, and we&apos;ll recommend the right engagement model and prepare a
          tailored proposal.
        </p>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={`mailto:${siteConfig.email}`} className={CONTACT_LINK}>
              <span className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <HiOutlineMail className="w-5 h-5 text-secondary-dark" aria-hidden="true" />
              </span>
              <span className="font-medium">{siteConfig.email}</span>
            </a>

            <a href={`tel:${siteConfig.phone}`} className={CONTACT_LINK}>
              <span className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <HiOutlinePhone className="w-5 h-5 text-secondary-dark" aria-hidden="true" />
              </span>
              <span className="font-medium">{siteConfig.phone}</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href={siteConfig.calendlyUrl} external>
              Book a meeting
            </Button>
            <Button variant="secondary" href={siteConfig.quoteHref}>
              {siteConfig.quoteLabel}
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
