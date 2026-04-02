"use client";

import { useState } from "react";
import { Product } from "../../../data/types";

interface ProductTabsProps {
  product: Product;
}

const TAB_NAMES = ["Description", "Specifications", "What's Included", "Shipping & Assembly", "Warranty"];

const standardIncludes = [
  "Instruction manual",
  "Hardware kit with all fasteners",
  "Assembly tools (basic models)",
  "User guide and care instructions",
];

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex overflow-x-auto border-b border-stone/50 gap-0 scrollbar-hide">
        {TAB_NAMES.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`whitespace-nowrap px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === i
                ? "border-cedar text-cedar"
                : "border-transparent text-charcoal/50 hover:text-charcoal"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-8 min-h-[200px]">
        {/* Description */}
        {activeTab === 0 && (
          <div className="prose prose-sm max-w-none text-charcoal/80 leading-relaxed">
            {product.description.split(". ").reduce<string[]>((acc, sentence, i, arr) => {
              if (i % 2 === 0) {
                const pair = sentence + (arr[i + 1] ? ". " + arr[i + 1] + "." : ".");
                acc.push(pair);
              }
              return acc;
            }, []).map((para, i) => (
              <p key={i} className="mb-4">{para}</p>
            ))}
          </div>
        )}

        {/* Specifications */}
        {activeTab === 1 && (
          <div className="overflow-hidden rounded-lg border border-stone/50">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Capacity", product.capacity],
                  ["Dimensions (Imperial)", product.dimensions.imperial],
                  ["Dimensions (Metric)", product.dimensions.metric],
                  ["Heater Type", product.heaterType],
                  ["Power", product.power],
                  ["Electrical Requirements", product.electrical],
                  ...(product.material ? [["Material", product.material]] : []),
                  ["Weight", "TBD"],
                  ["SKU", product.internalSku],
                ].map(([label, value], i) => (
                  <tr key={label} className={i % 2 === 0 ? "bg-white" : "bg-cream"}>
                    <td className="px-4 py-3 font-medium text-charcoal w-1/3">{label}</td>
                    <td className="px-4 py-3 text-charcoal/70">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* What's Included */}
        {activeTab === 2 && (
          <div>
            {product.includes && product.includes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-heading text-base font-semibold text-charcoal mb-3">
                  Model-Specific Items
                </h3>
                <ul className="space-y-2">
                  {product.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-charcoal/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-cedar flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h3 className="font-heading text-base font-semibold text-charcoal mb-3">
                Included with Every Sauna
              </h3>
              <ul className="space-y-2">
                {standardIncludes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-charcoal/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Shipping & Assembly */}
        {activeTab === 3 && (
          <div className="space-y-4 text-sm text-charcoal/80 leading-relaxed">
            <p>
              <strong className="text-charcoal">Free shipping</strong> is included on all orders across Canada and the continental United States. No hidden fees, no minimum order requirements.
            </p>
            <p>
              Smaller indoor models ship via standard freight and typically arrive within 2-3 weeks of your order date. Larger models, barrel saunas, and outdoor cabins ship via LTL freight with a delivery window of 3-4 weeks. You will receive tracking information and a delivery appointment window once your order ships.
            </p>
            <p>
              All saunas include detailed assembly instructions with step-by-step diagrams. Most indoor infrared models can be assembled by two adults in 30-60 minutes using basic household tools. Barrel saunas and outdoor cabins may require 2-4 hours and an extra set of hands.
            </p>
            <p>
              <strong className="text-charcoal">Important:</strong> Models requiring 240V power will need a dedicated circuit installed by a licensed electrician. We recommend arranging electrical work before your sauna arrives.
            </p>
          </div>
        )}

        {/* Warranty */}
        {activeTab === 4 && (
          <div className="space-y-4 text-sm text-charcoal/80 leading-relaxed">
            <p>
              Every Everwood sauna is backed by our <strong className="text-charcoal">1-Year Limited Warranty</strong>, covering defects in materials and workmanship under normal residential use.
            </p>
            <p>
              <strong className="text-charcoal">What is covered:</strong> Structural components, heater elements, electrical controls, stove components, and wood panels. If any covered component fails due to a manufacturing defect within 12 months of your purchase date, we will repair or replace it at no cost to you.
            </p>
            <p>
              <strong className="text-charcoal">What is not covered:</strong> Normal wear and tear, cosmetic changes to natural wood (including patina development on outdoor models), damage caused by improper installation or use, and modifications made to the original product.
            </p>
            <p>
              To make a warranty claim, contact our support team with your order number and a description of the issue. Most claims are resolved within 5-7 business days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
