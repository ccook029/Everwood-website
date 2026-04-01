"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import Logo from "../ui/Logo";
import { useCart } from "../../context/CartContext";

const collections = [
  { name: "Solace Series", href: "/collections/solace-series" },
  { name: "Glow Series", href: "/collections/glow-series" },
  { name: "Summit Series", href: "/collections/summit-series" },
  { name: "Timberline Series", href: "/collections/timberline-series" },
  { name: "Harmony Series", href: "/collections/harmony-series" },
  { name: "Lodge Series", href: "/collections/lodge-series" },
];

const navLinks = [
  { name: "Shop", href: "/shop" },
  { name: "Collections", href: "/collections", dropdown: collections },
  { name: "Buying Guide", href: "/guide" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const { cartCount, openDrawer } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-sm"
          : "bg-cream"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 text-sm font-body font-medium text-charcoal/80 hover:text-charcoal transition-colors">
                    {link.name}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                      <div className="rounded-lg bg-warmWhite shadow-lg ring-1 ring-stone/20 py-2 min-w-[200px]">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm font-body text-charcoal/80 hover:bg-cream hover:text-charcoal transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-body font-medium text-charcoal/80 hover:text-charcoal transition-colors"
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-4">
            {/* Cart */}
            <button onClick={openDrawer} className="relative" aria-label="Open cart">
              <ShoppingBag className="h-5 w-5 text-charcoal" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-cedar text-[10px] font-bold text-white">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-6 w-6 text-charcoal" />
              ) : (
                <Menu className="h-6 w-6 text-charcoal" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-out nav */}
      <div
        className={`fixed inset-0 top-16 z-40 transform transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute inset-0 bg-charcoal/20" onClick={() => setMobileOpen(false)} />
        <nav className="relative ml-auto h-full w-72 bg-warmWhite shadow-xl overflow-y-auto">
          <div className="flex flex-col py-6 px-6 gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name}>
                  <button
                    onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                    className="flex w-full items-center justify-between py-3 text-base font-body font-medium text-charcoal"
                  >
                    {link.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        mobileCollectionsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileCollectionsOpen && (
                    <div className="ml-4 flex flex-col gap-1 pb-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="py-2 text-sm font-body text-charcoal/70 hover:text-charcoal"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-base font-body font-medium text-charcoal"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
