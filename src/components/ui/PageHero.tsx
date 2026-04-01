import FadeInUp from "./FadeInUp";

interface PageHeroProps {
  heading: string;
  subtext?: string;
  breadcrumbs?: { label: string; href: string }[];
}

export default function PageHero({ heading, subtext, breadcrumbs }: PageHeroProps) {
  return (
    <div className="bg-charcoal py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs && (
          <nav className="flex items-center gap-2 text-sm text-cream/40 mb-6">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                <a href={crumb.href} className="hover:text-cream/70 transition-colors">
                  {crumb.label}
                </a>
              </span>
            ))}
          </nav>
        )}
        <FadeInUp>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
            {heading}
          </h1>
          {subtext && (
            <p className="mt-4 text-cream/60 max-w-2xl text-lg leading-relaxed">
              {subtext}
            </p>
          )}
        </FadeInUp>
      </div>
    </div>
  );
}
