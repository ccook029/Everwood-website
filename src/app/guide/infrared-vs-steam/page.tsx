import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import FadeInUp from "@/components/ui/FadeInUp";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Infrared Sauna vs Steam Sauna: Which Is Right for You?",
  description:
    "A complete comparison of infrared and traditional steam saunas. Learn the differences in heat, health benefits, cost, and installation.",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mt-12 mb-4">
      {children}
    </h2>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="my-8 aspect-video w-full rounded-lg bg-stone/50 flex items-center justify-center">
      <span className="text-charcoal/40 text-sm font-body">{label}</span>
    </div>
  );
}

const comparisonRows = [
  { feature: "Temperature Range", infrared: "45\u201365\u00B0C (113\u2013150\u00B0F)", steam: "70\u2013100\u00B0C (158\u2013212\u00B0F)" },
  { feature: "Humidity", infrared: "Low (dry heat)", steam: "High (20\u201340% or löyly bursts)" },
  { feature: "Heat\u2011Up Time", infrared: "15\u201320 minutes", steam: "30\u201345 minutes" },
  { feature: "Session Length", infrared: "30\u201345 minutes", steam: "15\u201325 minutes" },
  { feature: "Power Draw", infrared: "1\u20132.5 kW", steam: "3\u20139 kW" },
  { feature: "Cost per Session", infrared: "$0.50\u2013$1.00", steam: "$1.00\u2013$3.00" },
  { feature: "Electrical Requirement", infrared: "Standard 120V outlet (most models)", steam: "Dedicated 240V circuit" },
  { feature: "Minimum Footprint", infrared: "3\u2032 \u00D7 3\u2032 (closet\u2011sized)", steam: "4\u2032 \u00D7 4\u2032 or larger" },
  { feature: "Maintenance", infrared: "Low \u2014 wipe down after use", steam: "Moderate \u2014 stones, seals, wood treatment" },
  { feature: "Starting Price", infrared: "From $2,799", steam: "From $3,999" },
  { feature: "Best For", infrared: "Daily therapy, chronic pain, gentle detox", steam: "Authentic ritual, respiratory health, intense sweat" },
];

export default function InfraredVsSteamPage() {
  return (
    <main className="bg-warmWhite">
      <PageHero
        heading="Infrared Sauna vs Steam Sauna: Which Is Right for You?"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Buying Guide", href: "/guide" },
          { label: "Infrared vs Steam", href: "/guide/infrared-vs-steam" },
        ]}
      />

      {/* Article body */}
      <article className="mx-auto max-w-prose px-4 sm:px-6 py-16 sm:py-20 font-body text-charcoal leading-relaxed">
        {/* ── Introduction ── */}
        <FadeInUp>
          <p className="text-lg leading-loose">
            If you are shopping for your first home sauna, there is a good chance
            you have already run into the great debate: infrared or steam? It is
            easily the most common question we hear from first-time buyers, and
            for good reason. The two technologies look similar on the outside
            &mdash; a warm wooden cabin you step into and emerge feeling
            rejuvenated &mdash; but beneath the surface they deliver fundamentally
            different experiences. Understanding those differences is the fastest
            way to make sure the sauna you bring home is one you will actually
            use, day after day, for years to come.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <Placeholder label="Image: side-by-side infrared and steam sauna interiors" />
        </FadeInUp>

        {/* ── How Each Works ── */}
        <FadeInUp>
          <SectionHeading>How Each Type of Sauna Works</SectionHeading>
          <p className="mb-4 leading-loose">
            An <strong>infrared sauna</strong> uses carbon or ceramic heating
            panels that emit far-infrared light waves &mdash; the same
            wavelengths you feel as warmth from the sun, minus the harmful
            ultraviolet radiation. Rather than superheating the air around you,
            these waves penetrate your skin by up to 3&ndash;4 centimetres,
            warming your body directly from the inside out. The cabin itself stays
            relatively cool, and there is very little humidity. Think of it as a
            warm embrace rather than a wall of heat.
          </p>
          <p className="leading-loose">
            A <strong>traditional steam sauna</strong> (sometimes called a
            Finnish sauna) takes the opposite approach. An electric stove heats a
            bed of volcanic stones to extreme temperatures. When you pour water
            over the stones &mdash; what Finns call <em>löyly</em> &mdash; a
            burst of dense steam fills the room, driving up both temperature and
            humidity in seconds. The air itself becomes the heat-delivery
            mechanism, enveloping you in an intense, wet warmth that has defined
            the sauna experience for thousands of years.
          </p>
        </FadeInUp>

        {/* ── Temperature & Experience ── */}
        <FadeInUp>
          <SectionHeading>Temperature and the Bathing Experience</SectionHeading>
          <p className="mb-4 leading-loose">
            Because infrared saunas heat your body directly, they operate at
            noticeably lower air temperatures &mdash; typically between{" "}
            <strong>45&ndash;65&thinsp;&deg;C (113&ndash;150&thinsp;&deg;F)</strong>.
            Many people find this dry, gentle warmth surprisingly comfortable,
            even for sessions lasting 30 to 45 minutes. Breathing is easy, and
            the experience feels meditative rather than overwhelming. For those
            who find traditional saunas &ldquo;too hot,&rdquo; infrared is often
            a revelation.
          </p>
          <p className="leading-loose">
            Steam saunas run significantly hotter, with air temperatures ranging
            from{" "}
            <strong>70&ndash;100&thinsp;&deg;C (158&ndash;212&thinsp;&deg;F)</strong>.
            Add a ladle of water to the stones, and the perceived temperature
            spikes even further as humidity saturates the air. Sessions tend to be
            shorter &mdash; 15 to 25 minutes is standard &mdash; and bathers
            often step out for a cool-down plunge or shower between rounds. It is
            the classic &ldquo;heat wave&rdquo; sauna experience: dramatic,
            invigorating, and deeply rooted in Nordic tradition.
          </p>
        </FadeInUp>

        {/* ── Health Benefits ── */}
        <FadeInUp>
          <SectionHeading>Health Benefits Comparison</SectionHeading>
          <p className="mb-4 leading-loose">
            The good news is that both types of sauna deliver meaningful health
            benefits. Regular use of either has been linked to improved
            cardiovascular function, reduced muscle soreness after exercise, lower
            perceived stress, and better sleep quality. Where the two diverge is
            in the specifics.
          </p>
          <p className="mb-4 leading-loose">
            Infrared light&rsquo;s ability to penetrate deeper into soft tissue
            makes it particularly appealing for people managing{" "}
            <strong>chronic pain conditions</strong> such as arthritis,
            fibromyalgia, and lower-back pain. Several peer-reviewed studies
            suggest that far-infrared therapy can reduce inflammation markers and
            increase circulation at a cellular level. Because sessions are longer
            and lower-intensity, many users incorporate an infrared sauna into
            their daily routine the way they might a morning stretch or evening
            meditation.
          </p>
          <p className="leading-loose">
            Steam saunas excel at <strong>respiratory clearing</strong>. The hot,
            humid air opens airways, loosens congestion, and can provide
            meaningful relief for allergy and sinus sufferers. The intense heat
            also triggers a profuse, deep sweat that many dermatologists credit
            with flushing impurities from the skin. If you are training hard or
            recovering from a workout, the contrast between a hot steam session
            and a cold plunge is one of the most effective recovery protocols
            available outside of a sports-medicine clinic.
          </p>
        </FadeInUp>

        {/* ── Energy & Running Costs ── */}
        <FadeInUp>
          <SectionHeading>Energy Use and Running Costs</SectionHeading>
          <p className="mb-4 leading-loose">
            Infrared saunas are the clear winner on efficiency. Most residential
            models draw between <strong>1 and 2.5&thinsp;kW</strong>, which
            translates to roughly <strong>$0.50&ndash;$1.00 per session</strong>{" "}
            at average North American electricity rates. They also reach
            operating temperature in about 15&ndash;20 minutes, so there is
            little wasted preheat energy.
          </p>
          <p className="leading-loose">
            Steam saunas require substantially more power. A residential heater
            typically draws <strong>3&ndash;9&thinsp;kW</strong>, pushing
            per-session costs to roughly{" "}
            <strong>$1.00&ndash;$3.00</strong>. Preheat times are longer, too
            &mdash; plan on 30 to 45 minutes before the room is fully up to
            temperature. Over the course of a year of regular use, the difference
            can add up to several hundred dollars, a factor worth considering if
            you plan to sauna daily.
          </p>
        </FadeInUp>

        {/* ── Space & Installation ── */}
        <FadeInUp>
          <SectionHeading>Space and Installation Requirements</SectionHeading>
          <p className="mb-4 leading-loose">
            One of infrared&rsquo;s biggest practical advantages is its small
            footprint. Many one- or two-person infrared cabins fit comfortably in
            a walk-in closet, a corner of a basement, or even a large bathroom.
            Because most models run on a standard{" "}
            <strong>120&thinsp;V household outlet</strong>, installation is often
            as simple as finding a flat surface and plugging in. No electrician
            required.
          </p>
          <p className="leading-loose">
            Steam saunas need more room and more infrastructure. The cabin itself
            is generally larger to accommodate the heater and stone bed, and every
            steam unit requires a <strong>dedicated 240&thinsp;V circuit</strong>{" "}
            installed by a licensed electrician. You will also need to think about
            moisture management &mdash; proper ventilation, vapour barriers, and
            a floor drain or waterproof flooring are essential to protect the
            surrounding structure from long-term humidity exposure.
          </p>
        </FadeInUp>

        {/* ── Maintenance ── */}
        <FadeInUp>
          <SectionHeading>Maintenance</SectionHeading>
          <p className="mb-4 leading-loose">
            Infrared saunas are about as low-maintenance as a home wellness
            product can be. After each session, a quick wipe-down of the bench
            and backrest with a damp cloth is all that is needed. There are no
            stones to replace, no water reservoir to manage, and no moisture
            seeping into the wood. Most owners spend less than five minutes on
            upkeep per week.
          </p>
          <p className="leading-loose">
            Steam saunas require a bit more attention. Heater stones degrade over
            time and should be inspected and rearranged every few months, with a
            full replacement roughly once a year. The high humidity means the wood
            interior benefits from periodic treatment with a sauna-safe sealant,
            and door gaskets and vent components should be checked seasonally for
            wear. None of this is onerous, but it is a step up from the
            set-and-forget simplicity of infrared.
          </p>
        </FadeInUp>

        {/* ── Cost Comparison ── */}
        <FadeInUp>
          <SectionHeading>Upfront Cost Comparison</SectionHeading>
          <p className="mb-4 leading-loose">
            Quality infrared saunas start at around{" "}
            <strong>$2,799</strong> for a well-built one- to two-person cabin
            with low-EMF carbon heaters and premium Canadian cedar construction.
            Because most plug into a standard outlet, installation costs are
            typically zero beyond delivery.
          </p>
          <p className="leading-loose">
            Traditional steam saunas start at roughly{" "}
            <strong>$3,999</strong> for a comparable footprint, with prices
            climbing for larger rooms or barrel-style outdoor builds. Factor in an
            additional <strong>$300&ndash;$800</strong> for a licensed electrician
            to install the 240&thinsp;V circuit, and potentially more if you need
            ventilation work or waterproofing in the chosen location. The total
            investment is higher, but for many enthusiasts the authentic steam
            experience is well worth the premium.
          </p>
        </FadeInUp>

        {/* ── Comparison Table ── */}
        <FadeInUp>
          <SectionHeading>Side-by-Side Comparison</SectionHeading>
          <div className="my-8 overflow-x-auto rounded-lg border border-stone">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-charcoal text-cream">
                  <th className="text-left px-4 py-3 font-heading font-semibold">
                    Feature
                  </th>
                  <th className="text-left px-4 py-3 font-heading font-semibold">
                    Infrared
                  </th>
                  <th className="text-left px-4 py-3 font-heading font-semibold">
                    Steam
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-cream/60" : "bg-warmWhite"}
                  >
                    <td className="px-4 py-3 font-semibold">{row.feature}</td>
                    <td className="px-4 py-3">{row.infrared}</td>
                    <td className="px-4 py-3">{row.steam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeInUp>

        {/* ── The Verdict ── */}
        <FadeInUp>
          <SectionHeading>The Verdict</SectionHeading>
          <p className="mb-4 leading-loose">
            Here is the honest truth: there is no wrong answer. Both infrared and
            steam saunas are genuine investments in your health and well-being,
            and both will reward you with years of restorative sessions if you
            choose the one that fits your lifestyle.
          </p>
          <p className="mb-4 leading-loose">
            <strong>Choose infrared</strong> if you want a gentle, daily-use
            therapy tool that slots easily into your routine. It is ideal for
            chronic pain management, meditation-style relaxation, and situations
            where space or electrical capacity is limited.
          </p>
          <p className="mb-4 leading-loose">
            <strong>Choose steam</strong> if you crave the authentic, centuries-old
            sauna ritual &mdash; the sizzle of water on hot stones, the rush of
            löyly, and the contrast of intense heat followed by a cool plunge. It
            is the choice for purists, athletes, and anyone who wants the most
            immersive bathing experience possible.
          </p>
          <p className="leading-loose">
            And if you truly cannot decide? Our{" "}
            <Link
              href="/collections/harmony-series"
              className="text-cedar underline underline-offset-2 hover:text-cedar/80 transition-colors"
            >
              Harmony Series
            </Link>{" "}
            combines both infrared panels and a traditional heater in a single
            cabin, letting you switch between modes &mdash; or blend them &mdash;
            depending on what your body needs that day. It is the best of both
            worlds, and it is more popular than you might think.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <Placeholder label="Image: Harmony Series dual sauna in lifestyle setting" />
        </FadeInUp>

        {/* ── CTA Cards ── */}
        <FadeInUp>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {/* Infrared */}
            <Link
              href="/collections/solace-series"
              className="group rounded-lg border border-stone bg-cream/40 p-6 text-center transition-shadow hover:shadow-md"
            >
              <div className="mx-auto mb-4 aspect-square w-16 rounded-full bg-stone/40 flex items-center justify-center">
                <span className="text-2xl" aria-hidden="true">&#9728;</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-charcoal mb-2">
                Explore Infrared Saunas
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                Browse the{" "}
                <span className="text-cedar font-medium">Solace Series</span>{" "}
                and{" "}
                <span className="text-cedar font-medium">
                  Glow Series
                </span>{" "}
                for premium infrared cabins.
              </p>
            </Link>

            {/* Steam */}
            <Link
              href="/collections/summit-series"
              className="group rounded-lg border border-stone bg-cream/40 p-6 text-center transition-shadow hover:shadow-md"
            >
              <div className="mx-auto mb-4 aspect-square w-16 rounded-full bg-stone/40 flex items-center justify-center">
                <span className="text-2xl" aria-hidden="true">&#9729;</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-charcoal mb-2">
                Explore Steam Saunas
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                Discover the{" "}
                <span className="text-cedar font-medium">Summit Series</span>{" "}
                for authentic traditional steam saunas.
              </p>
            </Link>

            {/* Dual */}
            <Link
              href="/collections/harmony-series"
              className="group rounded-lg border border-stone bg-cream/40 p-6 text-center transition-shadow hover:shadow-md"
            >
              <div className="mx-auto mb-4 aspect-square w-16 rounded-full bg-stone/40 flex items-center justify-center">
                <span className="text-2xl" aria-hidden="true">&#9733;</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-charcoal mb-2">
                Best of Both Worlds
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                The{" "}
                <span className="text-cedar font-medium">Harmony Series</span>{" "}
                combines infrared and steam in one cabin.
              </p>
            </Link>
          </div>
        </FadeInUp>
      </article>
    </main>
  );
}
