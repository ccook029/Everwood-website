"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../../data/products";
import { Product } from "../../data/types";

interface QuizAnswer {
  location: string | null;
  capacity: string | null;
  heatType: string | null;
  budget: string | null;
}

const questions = [
  {
    key: "location" as const,
    question: "Where will you put your sauna?",
    options: [
      { label: "Indoor", value: "Indoor", description: "Spare room, basement, garage, or bathroom" },
      { label: "Outdoor", value: "Outdoor", description: "Backyard, patio, deck, or garden" },
      { label: "Not sure yet", value: "any", description: "I want to see all options" },
    ],
  },
  {
    key: "capacity" as const,
    question: "How many people will typically use it?",
    options: [
      { label: "Just me", value: "1", description: "Solo sessions, compact footprint" },
      { label: "2 people", value: "2", description: "Perfect for couples or extra room" },
      { label: "3-4 people", value: "3-4", description: "Family or small group sessions" },
      { label: "5+", value: "5+", description: "Entertaining and large gatherings" },
    ],
  },
  {
    key: "heatType" as const,
    question: "What type of heat do you prefer?",
    options: [
      { label: "Gentle infrared", value: "infrared", description: "Lower temps, deep penetration, quick warm-up" },
      { label: "Intense steam", value: "steam", description: "Classic Finnish sauna, high heat and humidity" },
      { label: "Both", value: "dual", description: "Switch between infrared and steam" },
      { label: "Not sure", value: "any", description: "Recommend what's best for me" },
    ],
  },
  {
    key: "budget" as const,
    question: "What's your budget?",
    options: [
      { label: "Under $3,500", value: "low", description: "Great entry-level options available" },
      { label: "$3,500 - $6,000", value: "mid", description: "Our most popular price range" },
      { label: "$6,000+", value: "high", description: "Premium and flagship models" },
    ],
  },
];

function getRecommendations(answers: QuizAnswer): Product[] {
  let filtered = [...products];

  // Filter by location
  if (answers.location && answers.location !== "any") {
    filtered = filtered.filter((p) => p.category === answers.location);
  }

  // Filter by capacity
  if (answers.capacity) {
    switch (answers.capacity) {
      case "1":
        filtered = filtered.filter((p) => p.capacityMin <= 1 && p.capacityMax <= 2);
        break;
      case "2":
        filtered = filtered.filter((p) => p.capacityMax >= 2 && p.capacityMin <= 2);
        break;
      case "3-4":
        filtered = filtered.filter((p) => p.capacityMax >= 3 && p.capacityMin <= 4);
        break;
      case "5+":
        filtered = filtered.filter((p) => p.capacityMax >= 5);
        break;
    }
  }

  // Filter by heat type
  if (answers.heatType && answers.heatType !== "any") {
    switch (answers.heatType) {
      case "infrared":
        filtered = filtered.filter(
          (p) => p.tags.includes("infrared") && !p.tags.includes("dual-system")
        );
        break;
      case "steam":
        filtered = filtered.filter(
          (p) =>
            (p.tags.includes("steam") || p.tags.includes("barrel") || p.tags.includes("outdoor")) &&
            !p.tags.includes("dual-system") &&
            !p.tags.includes("infrared")
        );
        break;
      case "dual":
        filtered = filtered.filter((p) => p.tags.includes("dual-system"));
        break;
    }
  }

  // Sort by budget preference
  if (answers.budget) {
    switch (answers.budget) {
      case "low":
        filtered = filtered.filter((p) => p.price < 3500);
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "mid":
        filtered = filtered.filter((p) => p.price >= 3500 && p.price <= 6000);
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "high":
        filtered = filtered.filter((p) => p.price > 6000);
        filtered.sort((a, b) => a.price - b.price);
        break;
    }
  }

  // If no exact matches, relax budget filter
  if (filtered.length === 0) {
    filtered = [...products];
    if (answers.location && answers.location !== "any") {
      filtered = filtered.filter((p) => p.category === answers.location);
    }
    if (answers.heatType && answers.heatType !== "any") {
      switch (answers.heatType) {
        case "infrared":
          filtered = filtered.filter((p) => p.tags.includes("infrared"));
          break;
        case "steam":
          filtered = filtered.filter(
            (p) => p.tags.includes("steam") || p.tags.includes("barrel")
          );
          break;
        case "dual":
          filtered = filtered.filter((p) => p.tags.includes("dual-system"));
          break;
      }
    }
    filtered.sort((a, b) => a.price - b.price);
  }

  // Still no matches — return featured products
  if (filtered.length === 0) {
    filtered = products.filter((p) => p.isFeatured);
  }

  return filtered.slice(0, 2);
}

export default function SaunaQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer>({
    location: null,
    capacity: null,
    heatType: null,
    budget: null,
  });
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[step];
  const totalSteps = questions.length;

  function handleSelect(value: string) {
    const key = currentQuestion.key;
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  }

  function handleBack() {
    if (showResults) {
      setShowResults(false);
    } else if (step > 0) {
      setStep(step - 1);
    }
  }

  function handleReset() {
    setStep(0);
    setAnswers({ location: null, capacity: null, heatType: null, budget: null });
    setShowResults(false);
  }

  const recommendations = showResults ? getRecommendations(answers) : [];

  return (
    <div className="rounded-2xl border border-stone/50 bg-warmWhite p-6 sm:p-10">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-charcoal/50 font-body mb-2">
          <span>{showResults ? "Results" : `Question ${step + 1} of ${totalSteps}`}</span>
          {(step > 0 || showResults) && (
            <button
              onClick={handleBack}
              className="text-cedar hover:text-cedar/80 transition-colors"
            >
              &larr; Back
            </button>
          )}
        </div>
        <div className="h-1.5 bg-stone/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cedar rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: showResults ? "100%" : `${((step + 1) / totalSteps) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key={`question-${step}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-6">
              {currentQuestion.question}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="group text-left rounded-xl border-2 border-stone/30 bg-white p-5 transition-all hover:border-cedar hover:shadow-md focus:outline-none focus:ring-2 focus:ring-cedar/50"
                >
                  <span className="block font-heading text-lg font-semibold text-charcoal group-hover:text-cedar transition-colors">
                    {option.label}
                  </span>
                  <span className="block mt-1 text-sm text-charcoal/50 font-body">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-2">
              {recommendations.length > 0
                ? "We recommend these saunas for you"
                : "No exact match found"}
            </h3>
            <p className="text-charcoal/50 font-body mb-8">
              Based on your preferences, {recommendations.length > 0
                ? "here are our top picks."
                : "try adjusting your preferences or browse our full collection."}
            </p>

            {recommendations.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 mb-8">
                {recommendations.map((product) => (
                  <div
                    key={product.slug}
                    className="rounded-xl border border-stone/40 bg-white overflow-hidden"
                  >
                    {/* Placeholder image area */}
                    <div className="aspect-[4/3] bg-stone/20 flex items-center justify-center">
                      <span className="text-charcoal/30 text-sm font-body">Product Image</span>
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-body text-cedar uppercase tracking-wider mb-1">
                        {product.collection}
                      </p>
                      <h4 className="font-heading text-lg font-bold text-charcoal">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="font-heading text-xl font-bold text-charcoal">
                          ${product.price.toLocaleString()}
                        </span>
                        {product.compareAtPrice > product.price && (
                          <span className="text-sm text-charcoal/40 line-through">
                            ${product.compareAtPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3 text-xs font-body text-charcoal/60">
                        <span className="bg-cream px-2 py-0.5 rounded">{product.capacity}</span>
                        <span className="bg-cream px-2 py-0.5 rounded">{product.category}</span>
                        <span className="bg-cream px-2 py-0.5 rounded">{product.electrical}</span>
                      </div>
                      <a
                        href={`/products/${product.slug}`}
                        className="mt-4 block w-full text-center rounded-lg bg-cedar px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cedar/90 font-body"
                      >
                        View Product
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleReset}
                className="rounded-lg border-2 border-cedar px-6 py-2.5 text-sm font-semibold text-cedar transition-colors hover:bg-cedar hover:text-white font-body"
              >
                Retake Quiz
              </button>
              <a
                href="/shop"
                className="rounded-lg bg-charcoal px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-charcoal/90 font-body"
              >
                Browse All Saunas
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
