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

        <p className="text-lg sm:text-xl leading-relaxed text-text-secondary text-pretty mb-8">
          Ready to find your next great hire? Get in touch and let&apos;s discuss
          how we can help build your team.
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

          <Button href={siteConfig.calendlyUrl} external>
            Book A Meeting
          </Button>
        </div>
      </div>
    </SectionWrapper>
  )
}
