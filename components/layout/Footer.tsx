import Link from 'next/link';
import siteData from '@/data/site.json';
import { siteConfig } from '@/lib/config';
import { RingText } from '@/components/shared/RingText';

function RingArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 235 235" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M82.6 153.2C81.7 152.3 81.0 151.3 81.0 151.0C81.0 150.7 93.6 137.9 109.0 122.5C124.4 107.1 137.0 94.4 137.0 94.3C137.0 94.1 126.2 94.0 113.0 94.0L89.0 94.0L89.0 90.5L89.0 87.0L119.0 87.0L149.0 87.0L149.0 117.5L149.0 148.0L146.0 148.0L143.0 148.0L143.0 123.5C143.0 110.0 142.9 99.0 142.7 99.0C142.6 99.0 129.9 111.6 114.5 127.0C93.5 148.0 86.2 155.0 85.4 155.0C84.8 154.9 83.5 154.2 82.6 153.2Z"
      />
    </svg>
  );
}

function RingCta({
  label,
  className
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={['absolute right-5 top-28 h-[140px] w-[140px]', className]
        .filter(Boolean)
        .join(' ')}
      aria-label={label}
    >
      <RingText
        words={['Trabajemos juntos', 'Trabajemos juntos', 'Trabajemos juntos']}
        className="absolute inset-0 h-full w-full animate-spin text-white"
        style={{ animationDuration: '20s' }}
      />
      <RingArrow className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 text-red" />
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-bg  pt-8 md:pt-12 lg:px-7">
      <div className="mx-auto px-4 grid max-w-7xl grid-cols-1 items-start gap-6 md:grid-cols-[1fr_auto]">
        <div data-reveal>
          <p className="text-base text-white">{siteData.footer.cta}</p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-4 block break-all text-2xl text-white transition-colors hover:text-red"
          >
            {siteConfig.contactEmail}
          </a>
          <nav className="w-fit mt-6 flex flex-col gap-1" aria-label="Footer">
            {siteData.footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-light text-white transition-colors hover:text-red"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <Link
          href="/contactos"
          data-reveal="fade"
          className="flex-none"
          aria-label={siteData.footer.ringLabel}
        >
          <RingCta label={siteData.footer.ringLabel} />
        </Link>
      </div>

      <div className="mx-auto w-full max-w-7xl [container-type:inline-size]">
        <div data-reveal className="mt-[14cqw] leading-[0.6] relative flex justify-center">
          <p className="text-[24cqw] absolute -top-[0.40em] font-bold">Zentro</p>
        </div>
      </div>

      <div className="bg-bg relative z-10 mx-auto mt-6 pb-4 px-4 flex max-w-7xl flex-col items-center gap-4 border-t border-line/30 pt-6 text-base text-white md:flex-row md:justify-between">
        <p>{siteData.footer.copyright.replace('{year}', String(year))}</p>
        <div className="flex flex-wrap justify-center gap-4">
          {siteData.footer.bottomLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={
                link.href.startsWith('http') ? 'noopener noreferrer' : undefined
              }
              className="transition-colors hover:text-red"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

