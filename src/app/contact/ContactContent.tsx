"use client";

import { useState, FormEvent } from "react";
import { Mail, Phone, Clock, CheckCircle } from "lucide-react";
import FadeInUp from "../../components/ui/FadeInUp";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const subjects = [
  "General Inquiry",
  "Product Question",
  "Order Status",
  "Warranty Claim",
  "Wholesale/B2B",
  "Other",
];

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactContent() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  function validateField(name: keyof FormData, value: string): string | undefined {
    switch (name) {
      case "firstName":
        return value.trim() ? undefined : "First name is required.";
      case "lastName":
        return value.trim() ? undefined : "Last name is required.";
      case "email":
        if (!value.trim()) return "Email is required.";
        if (!validateEmail(value)) return "Please enter a valid email address.";
        return undefined;
      case "subject":
        return value ? undefined : "Please select a subject.";
      case "message":
        return value.trim() ? undefined : "Message is required.";
      default:
        return undefined;
    }
  }

  function handleBlur(name: keyof FormData) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  function handleChange(
    name: keyof FormData,
    value: string
  ) {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const requiredFields: (keyof FormData)[] = [
      "firstName",
      "lastName",
      "email",
      "subject",
      "message",
    ];

    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};

    for (const field of requiredFields) {
      newTouched[field] = true;
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    }

    setTouched((prev) => ({ ...prev, ...newTouched }));
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  }

  const inputClasses = (name: keyof FormErrors) =>
    `w-full rounded-lg border px-4 py-3 text-charcoal bg-white placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-cedar/50 transition-colors ${
      touched[name] && errors[name]
        ? "border-red-500 focus:ring-red-300"
        : "border-stone"
    }`;

  if (submitted) {
    return (
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <FadeInUp>
            <CheckCircle className="mx-auto h-16 w-16 text-forest mb-6" />
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-4">
              Thanks for reaching out!
            </h2>
            <p className="text-charcoal/70 text-lg">
              We&apos;ll get back to you within 24 hours.
            </p>
          </FadeInUp>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <FadeInUp className="lg:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-charcoal mb-1"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className={inputClasses("firstName")}
                    placeholder="Jane"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    onBlur={() => handleBlur("firstName")}
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-charcoal mb-1"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className={inputClasses("lastName")}
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    onBlur={() => handleBlur("lastName")}
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-charcoal mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className={inputClasses("email")}
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-charcoal mb-1"
                >
                  Phone <span className="text-charcoal/40">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={`w-full rounded-lg border border-stone px-4 py-3 text-charcoal bg-white placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-cedar/50 transition-colors`}
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-charcoal mb-1"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  className={inputClasses("subject")}
                  value={formData.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  onBlur={() => handleBlur("subject")}
                >
                  <option value="">Select a subject...</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {touched.subject && errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-charcoal mb-1"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={inputClasses("message")}
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                />
                {touched.message && errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-cedar text-white font-semibold px-8 py-3 rounded-lg hover:bg-cedar/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </FadeInUp>

          {/* Contact Info Sidebar */}
          <FadeInUp className="lg:col-span-2" delay={0.15}>
            <div className="bg-warmWhite rounded-lg p-8 space-y-8">
              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-cedar mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-heading font-semibold text-charcoal mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@everwoodsauna.com"
                    className="text-charcoal/70 hover:text-cedar transition-colors"
                  >
                    hello@everwoodsauna.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-cedar mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-heading font-semibold text-charcoal mb-1">
                    Phone
                  </h3>
                  <a
                    href="tel:18005550199"
                    className="text-charcoal/70 hover:text-cedar transition-colors"
                  >
                    1-800-555-0199
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-cedar mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-heading font-semibold text-charcoal mb-1">
                    Business Hours
                  </h3>
                  <p className="text-charcoal/70">
                    Monday&ndash;Friday, 9am&ndash;6pm EST
                  </p>
                  <p className="text-charcoal/70">
                    Saturday, 10am&ndash;4pm EST
                  </p>
                </div>
              </div>

              <div className="border-t border-stone/50 pt-6">
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  We typically respond within 24 hours.
                </p>
                <p className="text-charcoal/50 text-sm mt-3 leading-relaxed">
                  For order-related inquiries, please have your order number
                  ready.
                </p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
