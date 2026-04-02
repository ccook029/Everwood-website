import FadeInUp from "../ui/FadeInUp";

const steps = [
  {
    number: "01",
    heading: "Choose Your Sauna",
    description:
      "Browse our collections or take our quiz to find the perfect fit.",
  },
  {
    number: "02",
    heading: "Crafted & Shipped Free",
    description:
      "Your sauna is crafted to order and shipped free anywhere in Canada or the continental US.",
  },
  {
    number: "03",
    heading: "Easy Assembly",
    description:
      "Most models assemble in under 60 minutes. No special tools needed.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl text-center">
            How It Works
          </h2>
        </FadeInUp>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {steps.map((step, i) => (
            <FadeInUp key={step.number} delay={i * 0.12}>
              <div className="text-center">
                <span className="font-heading text-5xl font-bold text-cedar/20">
                  {step.number}
                </span>
                <h3 className="mt-4 font-heading text-xl font-semibold text-charcoal">
                  {step.heading}
                </h3>
                <p className="mt-3 text-sm text-charcoal/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
