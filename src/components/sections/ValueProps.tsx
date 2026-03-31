import { Truck, Shield, Wrench, TreePine } from "lucide-react";
import FadeInUp from "../ui/FadeInUp";

const props = [
  { icon: Truck, label: "Free North American Shipping" },
  { icon: Shield, label: "2-Year Warranty" },
  { icon: Wrench, label: "Easy Assembly" },
  { icon: TreePine, label: "Premium Materials" },
];

export default function ValueProps() {
  return (
    <section className="bg-charcoal py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {props.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-3">
                <Icon className="h-7 w-7 text-cedar" strokeWidth={1.5} />
                <span className="text-sm font-medium text-cream/90">{label}</span>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
