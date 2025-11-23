import React, { useState, useEffect } from "react"; 
import {
  Package,
  Globe,
  ArrowRight,
  Menu,
  X,
  Plane,
  Ship,
  Truck,
  Target,
  ChevronDown,
  Star,
  Sparkles,
  Zap,
  TrendingUp,
} from "lucide-react";

const withBase = (p) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${p.replace(/^\//, "")}`;

export default function EaseMyShipping() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [sectionStyles, setSectionStyles] = useState({});

  const heroImages = [
    withBase("images/hero-ship.jpg"),
    withBase("images/port.jpg"),
    withBase("images/truck.jpg"),
    withBase("images/cta-bg.jpg"),
  ];

  const [heroIndex, setHeroIndex] = useState(0);

  const brandLogos = [
    { src: withBase("logos/biba.png"), alt: "BIBA", size: "h-14" },
    { src: withBase("logos/apml.png"), alt: "APML", size: "h-16" },
    { src: withBase("logos/stag.png"), alt: "STAG Global", size: "h-12" },
    { src: withBase("logos/cls.png"), alt: "CLS", size: "h-14" },
    { src: withBase("logos/semco.png"), alt: "SEMCO", size: "h-10" },
    { src: withBase("logos/kailash.png"), alt: "Kailash", size: "h-16" },
    { src: withBase("logos/tt.png"), alt: "T.T.", size: "h-14" },
  ];

  const services = [
    {
      title: "Courier Services",
      desc: "Fast and reliable delivery for documents and small parcels. Direct accounts with DHL, Aramex, Xpress Bees, Bluedart, and Movin.",
      icon: Truck,
      color: "from-cyan-500 to-blue-500",
      image: heroImages[2],
    },
    {
      title: "Air Freight",
      desc: "Quick and efficient transportation of your goods across any distance when time is of the essence.",
      icon: Plane,
      color: "from-purple-500 to-pink-500",
      image: heroImages[0],
    },
    {
      title: "Sea Freight",
      desc: "Cost-effective solutions for larger shipments with comprehensive tracking and handling.",
      icon: Ship,
      color: "from-blue-500 to-cyan-500",
      image: heroImages[1],
    },
    {
      title: "Domestic B2B & B2C",
      desc: "Complete domestic logistics services including B2C, D2C and B2B solutions.",
      icon: Package,
      color: "from-violet-500 to-purple-500",
      image: heroImages[3],
    },
  ];

  const whyUs = [
    {
      num: "01",
      title: "Reliability",
      desc: "Consistently meeting delivery deadlines, ensuring goods reach destinations on time, every time.",
      icon: Target,
    },
    {
      num: "02",
      title: "Comprehensive",
      desc: "Full range of logistics services tailored to your specific needs.",
      icon: Globe,
    },
    {
      num: "03",
      title: "Technology",
      desc: "Cutting-edge tracking giving you real-time visibility and control.",
      icon: Zap,
    },
    {
      num: "04",
      title: "Cost-Effective",
      desc: "Competitive pricing and efficient strategies to minimize costs.",
      icon: TrendingUp,
    },
    {
      num: "05",
      title: "Experience",
      desc: "Years of expertise handling complex logistics challenges.",
      icon: Star,
    },
    {
      num: "06",
      title: "Customer-Centric",
      desc: "Personalized service and responsive support for your requirements.",
      icon: Sparkles,
    },
    {
      num: "07",
      title: "Global Reach",
      desc: "Extensive network managing logistics on a worldwide scale.",
      icon: Globe,
    },
    {
      num: "08",
      title: "Sustainability",
      desc: "Green logistics solutions reducing carbon footprints.",
      icon: Package,
    },
  ];

  const testimonials = [
    {
      name: "Ananya Singh",
      role: "Head of Operations",
      company: "BIBA",
      quote:
        "EaseMyShipping has taken over our logistics completely. Our team now spends time on strategy, not tracking parcels.",
    },
    {
      name: "Rahul Mehta",
      role: "Founder",
      company: "STAG Global",
      quote:
        "From domestic B2B to urgent air freight, they've been consistently reliable and transparent with every shipment.",
    },
    {
      name: "Kavita Sharma",
      role: "Supply Chain Lead",
      company: "APML",
      quote:
        "Real-time visibility, proactive communication, and zero last-minute surprises. They genuinely behave like a partner.",
    },
    {
      name: "Rohit Verma",
      role: "Logistics Manager",
      company: "SEMCO",
      quote:
        "They simplified multi-city dispatches for us. One dashboard, one team, and our SLAs finally stopped breaking.",
    },
    {
      name: "Priya Nair",
      role: "D2C Lead",
      company: "T.T.",
      quote:
        "Our B2C and D2C orders move smoother now. Returns, exchanges and bulk shipments are all handled without chaos.",
    },
    {
      name: "Manish Gupta",
      role: "Director",
      company: "Kailash Group",
      quote:
        "We get predictable timelines, proactive alerts, and no last-minute surprises. It feels like an in-house logistics arm.",
    },
  ];

  const faqs = [
    {
      q: "What types of services do you offer?",
      a: "We offer a comprehensive range of logistics services, including transportation, warehousing, inventory management, supply chain consulting, customs brokerage, freight forwarding, and last-mile delivery.",
    },
    {
      q: "How do you ensure the safety of my goods?",
      a: "We prioritize safety through high-quality packaging, secure handling procedures, and vehicles equipped with the latest safety technology. Our team is trained in best practices for handling various types of cargo.",
    },
    {
      q: "Can I track my shipments in real-time?",
      a: "Yes, we provide real-time tracking for all shipments through our advanced tracking system accessible via our online portal.",
    },
    {
      q: "What areas do you serve?",
      a: "We offer both domestic and international logistics services with a global network managing shipments across multiple regions.",
    },
    {
      q: "How do you handle customs clearance?",
      a: "Our experienced customs brokerage team manages all aspects of customs clearance, ensuring compliance with international regulations and minimizing delays.",
    },
    {
      q: "What are your pricing options?",
      a: "Our pricing is customized based on specific client needs. We offer competitive rates and flexible payment options.",
    },
  ];

  useEffect(() => {
  let ticking = false;

  const updateScroll = () => {
    const currentY = window.scrollY;
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? currentY / totalHeight : 0;

    setScrollY(currentY);
    setScrollProgress(progress);

    // 🟦 On mobile, skip the heavy 3D card transforms to keep it smooth
    if (window.innerWidth < 768) {
      ticking = false;
      return;
    }

    const slides = document.querySelectorAll(".slide-section");
    const vh = window.innerHeight || 1;
    const newStyles = {};

    slides.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const centerOffset = (center - vh / 2) / vh;

      const scale = 1 - Math.min(Math.abs(centerOffset) * 0.06, 0.1);
      const translateY = centerOffset * -40;
      const rotateX = centerOffset * 6;

      const distanceFromCenter = Math.abs(centerOffset);
      const zIndex =
        distanceFromCenter < 0.3 ? 100 : 50 - Math.floor(distanceFromCenter * 10);

      if (el.id) {
        newStyles[el.id] = {
          transform: `translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`,
          opacity: 1,
          zIndex: zIndex,
        };
      }
    });

    setSectionStyles(newStyles);
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScroll);
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  updateScroll(); // run once on mount

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!heroImages.length) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const offsetX = (e.clientX - innerWidth / 2) / 40;
    const offsetY = (e.clientY - innerHeight / 2) / 40;
    setMousePosition({ x: offsetX, y: offsetY });
  };

  const heroParallax = {
    transform: `translate3d(${mousePosition.x}px, ${
      mousePosition.y + scrollY * -0.05
    }px, 0)`,
    transition: "transform 0.2s ease-out",
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    let offsetTop = 0;
    let currentEl = el;
    while (currentEl) {
      offsetTop += currentEl.offsetTop;
      currentEl = currentEl.offsetParent;
    }

    const navHeight = 88;
    const scrollToPosition = offsetTop - navHeight - 20;

    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-slate-950 text-slate-50 relative overflow-x-hidden">
      {/* PARALLAX STAR BACKGROUND */}
      <div id="stars" className="stars-layer"></div>
      <div id="stars2" className="stars-layer"></div>
      <div id="stars3" className="stars-layer"></div>

      {/* FLOATING ORBS */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] animate-floatOrb1" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-floatOrb2" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] animate-floatOrb3" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-lg font-bold">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/50">
              <Package className="w-5 h-5 text-white" />
            </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent text-base sm:text-lg">
              EaseMyShipping
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm">
            {["about", "services", "why", "faq", "contact"].map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => scrollToSection(section)}
                className="relative hover:text-blue-400 transition-colors group capitalize"
              >
                {section === "why"
                  ? "Why Us"
                  : section === "faq"
                  ? "FAQ"
                  : section}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <button className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105">
              Get Quote
            </button>
          </div>

          <button
            className="md:hidden text-slate-100"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="h-1 w-full bg-slate-900/50 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"
            style={{
              transform: `scaleX(${0.02 + scrollProgress * 0.98})`,
              transformOrigin: "left",
              transition: "transform 0.15s ease-out",
            }}
          />
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl pt-20 sm:pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-xl font-semibold">
            {["about", "services", "why", "faq", "contact"].map((section) => (
              <button
                key={section}
                type="button"
                className="text-left hover:text-blue-400 transition-all capitalize"
                onClick={() => {
                  scrollToSection(section);
                  setMobileMenuOpen(false);
                }}
              >
                {section === "why"
                  ? "Why Us"
                  : section === "faq"
                  ? "FAQ"
                  : section}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* HERO WITH SLIDESHOW */}
      <section
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-28 sm:pt-32 pb-20 sm:pb-24 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* background slideshow */}
        <div className="absolute inset-0 overflow-hidden">
          {heroImages.map((src, i) => (
            <div
              key={src + i}
              className={`hero-bg-slide absolute inset-0 ${
                i === heroIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.75), rgba(15,23,42,0.92)), url('${src}')`,
              }}
            />
          ))}
        </div>

        <div className="absolute -left-40 top-10 w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] bg-blue-500/14 blur-[130px] rounded-full animate-pulse" />

        <div
          className="relative max-w-6xl mx-auto text-center space-y-6 sm:space-y-8"
          style={heroParallax}
        >
          <div
            className="inline-block mb-3 sm:mb-4 opacity-0 animate-fadeInUp"
            style={{
              animationDelay: "0.15s",
              animationFillMode: "forwards",
            }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 border border-slate-700 rounded-full text-[11px] sm:text-xs text-blue-200 font-medium shadow-lg">
              <Star className="w-4 h-4 text-blue-300" />
              <span>Trusted by brands that can't afford delays</span>
            </div>
          </div>

          <h1
            className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-3 sm:mb-4 opacity-0 animate-fadeInUp"
            style={{
              animationDelay: "0.3s",
              animationFillMode: "forwards",
            }}
          >
            Ship Smarter,
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Grow Faster
            </span>
          </h1>

          <p
            className="hero-subtitle text-base sm:text-lg md:text-2xl text-slate-200 max-w-3xl mx-auto mb-6 sm:mb-8 opacity-0 animate-fadeInUp"
            style={{
              animationDelay: "0.45s",
              animationFillMode: "forwards",
            }}
          >
            From courier to air and sea freight—we handle logistics end-to-end so
            your team can focus on building the business, not chasing shipments.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center opacity-0 animate-fadeInUp"
            style={{
              animationDelay: "0.6s",
              animationFillMode: "forwards",
            }}
          >
            <button className="group px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm rounded-full hover:shadow-xl hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 hover:scale-105">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-7 sm:px-8 py-3.5 sm:py-4 border border-slate-300/70 text-sm rounded-full hover:bg-slate-900/60 transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400/50 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full animate-scroll-indicator" />
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-slate-800 bg-slate-950/95">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs sm:text-sm md:text-base tracking-[0.25em] text-slate-300 mb-8 sm:mb-10 uppercase">
            TRUSTED BY
          </p>

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-slate-950 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-slate-950 to-transparent z-10" />

            <div className="marquee-outer">
              <div className="marquee-track">
                {[...brandLogos, ...brandLogos].map((brand, i) => (
                  <div
                    key={i}
                    className="mx-6 sm:mx-12 flex items-center justify-center"
                  >
                    <img
                      src={brand.src}
                      alt={brand.alt}
                      className={`${brand.size} md:h-20 object-contain opacity-80 hover:opacity-100 transition-opacity`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDES */}
      <div className="layered-container">
        {/* ABOUT */}
        <section
          id="about"
          className="slide-section bg-slate-950"
          style={{ zIndex: 2, ...(sectionStyles["about"] || {}) }}
        >
          <div className="inner-slide py-16 sm:py-20 px-4 sm:px-6 md:px-10">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
              <div
                data-animate
                id="about-content"
                className={
                  (isVisible["about-content"]
                    ? "animate-fadeInUp "
                    : "opacity-0 ") + "space-y-5 md:space-y-8"
                }
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  About Us
                </h2>

                <p className="text-lg sm:text-xl md:text-2xl text-slate-200 leading-relaxed max-w-xl">
                  We exist to take logistics off your plate—so your team can stop
                  firefighting shipments and focus on building the business.
                </p>

                <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl">
                  From first-mile pickup to international freight, we design and run
                  shipping flows that feel predictable, transparent and calm—even
                  when your volumes grow and routes get complex.
                </p>

                <div className="grid md:grid-cols-2 gap-5 pt-3 sm:pt-4 md:pt-6">
                  <div
                    data-animate
                    id="mission"
                    className={
                      (isVisible["mission"]
                        ? "animate-fadeInUp "
                        : "opacity-0 ") +
                      "p-5 sm:p-6 md:p-7 border border-slate-800 rounded-2xl bg-slate-900/70 hover:border-blue-500/80 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/25 transition-all"
                    }
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-blue-500/50">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">
                      Our Mission
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      To become your silent logistics engine—reliable enough that your
                      customers never have to think about where their order is.
                    </p>
                  </div>

                  <div
                    data-animate
                    id="vision"
                    className={
                      (isVisible["vision"]
                        ? "animate-fadeInUp "
                        : "opacity-0 ") +
                      "p-5 sm:p-6 md:p-7 border border-slate-800 rounded-2xl bg-slate-900/50 hover:border-cyan-500/80 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-500/20 transition-all"
                    }
                    style={{ animationDelay: "0.1s" }}
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-cyan-500/50">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">
                      Our Vision
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      A world where scaling a brand never means losing visibility,
                      control or sleep over your shipping and warehousing.
                    </p>
                  </div>
                </div>
              </div>

              <div
                data-animate
                id="about-visual"
                className={
                  (isVisible["about-visual"]
                    ? "animate-fadeInUp "
                    : "opacity-0 ") +
                  "relative flex items-center justify-center"
                }
              >
                <div className="absolute -right-6 sm:-right-10 -top-10 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl rounded-full pointer-events-none animate-pulse" />
                <div
                  className="relative h-64 sm:h-80 md:h-96 lg:h-[26rem] w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/60 group hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(15,23,42,0.9), rgba(15,23,42,0.05)), url('${withBase(
                      "images/port.jpg"
                    )}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-x-4 sm:inset-x-6 bottom-4 sm:bottom-6 rounded-2xl bg-slate-950/80 border border-slate-700/60 px-3 sm:px-4 md:px-5 py-3 md:py-4 backdrop-blur-md group-hover:scale-105 transition-transform">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-blue-200 text-[10px] sm:text-[11px] md:text-xs tracking-wide mb-1 uppercase">
                          Orchestrated logistics
                        </p>
                        <p className="text-[10px] sm:text-[11px] md:text-xs leading-relaxed text-slate-200">
                          Multi-modal freight, real-time tracking and coordinated
                          handoffs—bundled into one calm, predictable experience for
                          your ops team.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section
          id="services"
          className="slide-section bg-slate-900"
          style={{ zIndex: 3, ...(sectionStyles["services"] || {}) }}
        >
          <div className="inner-slide py-14 sm:py-16 px-4 sm:px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-3 sm:mb-4">
                  <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[11px] sm:text-xs font-medium uppercase tracking-wider">
                    Our Solutions
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Our Services
                </h2>
                <p className="text-base sm:text-lg text-slate-300">
                  Complete logistics solutions for every need
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {services.map((service, i) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={i}
                      data-animate
                      id={`service-${i}`}
                      className={
                        (isVisible[`service-${i}`]
                          ? "animate-fadeInUp "
                          : "opacity-0 ") + ""
                      }
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="group relative p-7 sm:p-8 md:p-10 bg-slate-950/90 border border-slate-800 rounded-3xl hover:border-transparent transition-all hover:-translate-y-3 hover:shadow-2xl backdrop-blur-sm overflow-hidden h-full">
                        <div
                          className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"
                          style={{
                            backgroundImage: `url('${service.image}')`,
                          }}
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                        />
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10">
                          <div
                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}
                          >
                            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            {service.desc}
                          </p>
                          <div className="mt-5 sm:mt-6 flex items-center text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs sm:text-sm font-medium">
                              Learn more
                            </span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section
          id="why"
          className="slide-section bg-slate-950"
          style={{ zIndex: 4, ...(sectionStyles["why"] || {}) }}
        >
          <div className="inner-slide py-14 sm:py-16 px-4 sm:px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-3 sm:mb-4">
                  <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] sm:text-xs font-medium uppercase tracking-wider">
                    Why Choose Us
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 bg-clip-text text-transparent">
                  Why Choose Us
                </h2>
                <p className="text-base sm:text-lg text-slate-300">
                  8 reasons we are the best in the business
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {whyUs.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      data-animate
                      id={`why-${i}`}
                      className={
                        (isVisible[`why-${i}`]
                          ? "animate-fadeInUp "
                          : "opacity-0 ") + ""
                      }
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      <div className="group relative h-full p-6 sm:p-7 border border-slate-800/50 rounded-2xl bg-slate-900/50 hover:bg-slate-900/80 backdrop-blur-sm transition-all hover:-translate-y-2 hover:shadow-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-0 right-0 w-28 sm:w-32 h-28 sm:h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent opacity-20 group-hover:opacity-100 transition-opacity">
                              {item.num}
                            </div>
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Icon className="w-5 h-5 text-blue-300" />
                            </div>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-blue-300 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="slide-section bg-slate-900"
          style={{ zIndex: 5, ...(sectionStyles["faq"] || {}) }}
        >
          <div className="inner-slide py-14 sm:py-16 px-4 sm:px-6 md:px-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-3 sm:mb-4">
                  <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] sm:text-xs font-medium uppercase tracking-wider">
                    Questions &amp; Answers
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
                  FAQ
                </h2>
                <p className="text-base sm:text-lg text-slate-300">
                  Got questions? We have answers
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    data-animate
                    id={`faq-${i}`}
                    className={
                      (isVisible[`faq-${i}`]
                        ? "animate-fadeInUp "
                        : "opacity-0 ") + ""
                    }
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <div className="group bg-slate-950/70 border border-slate-800/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10">
                      <button
                        className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                        onClick={() =>
                          setActiveFAQ((prev) => (prev === i ? null : i))
                        }
                      >
                        <span className="text-base sm:text-lg font-semibold group-hover:text-blue-300 transition-colors">
                          {faq.q}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center transition-all ${
                            activeFAQ === i
                              ? "rotate-180 bg-blue-500/20"
                              : ""
                          }`}
                        >
                          <ChevronDown className="w-5 h-5 text-blue-400" />
                        </div>
                      </button>
                      {activeFAQ === i && (
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-300 text-sm leading-relaxed animate-fadeIn border-t border-slate-800/50 pt-3 sm:pt-4">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          id="testimonials"
          className="slide-section bg-slate-950"
          style={{ zIndex: 6, ...(sectionStyles["testimonials"] || {}) }}
        >
          <div className="inner-slide py-14 sm:py-16 px-4 sm:px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-3 sm:mb-4">
                  <span className="px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[11px] sm:text-xs font-medium uppercase tracking-wider">
                    Testimonials
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
                  What Our Clients Say
                </h2>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
                  Growing brands, manufacturers and exporters rely on us to keep
                  their supply chains moving.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    data-animate
                    id={`testimonial-${i}`}
                    className={
                      (isVisible[`testimonial-${i}`]
                        ? "animate-fadeInUp "
                        : "opacity-0 ") + ""
                    }
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    <div className="group relative h-full p-7 sm:p-8 rounded-3xl border border-slate-800/50 bg-slate-900/70 hover:bg-slate-900/90 backdrop-blur-sm transition-all hover:-translate-y-3 hover:shadow-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute -right-10 -bottom-10 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="relative z-10">
                        <div className="flex gap-1 mb-3 sm:mb-4">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <p className="text-sm sm:text-base text-slate-100 leading-relaxed mb-5 sm:mb-6 italic">
                          "{t.quote}"
                        </p>
                        <div className="border-t border-slate-800/50 pt-3 sm:pt-4 flex items-center gap-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/50">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <span className="block text-sm font-semibold text-slate-100">
                              {t.name}
                            </span>
                            <span className="block text-xs text-slate-400">
                              {t.role} · {t.company}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="slide-section bg-slate-900"
          style={{ zIndex: 7, ...(sectionStyles["contact"] || {}) }}
        >
          <div className="inner-slide py-16 sm:py-20 px-4 sm:px-6 md:px-10">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-12 items-stretch">
              <div
                data-animate
                id="contact-copy"
                className={
                  (isVisible["contact-copy"]
                    ? "animate-fadeInUp "
                    : "opacity-0 ") +
                  "space-y-6 sm:space-y-8 flex flex-col justify-center"
                }
              >
                <div>
                  <div className="inline-block mb-3 sm:mb-4">
                    <span className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-[11px] sm:text-xs font-medium uppercase tracking-wider">
                      Get in Touch
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-green-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                    Talk to Our Team
                  </h2>
                </div>

                <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed">
                  Share your shipping volume, routes and constraints—we'll show you
                  exactly how we can simplify operations and reduce logistics
                  stress.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-blue-500/50 transition-all group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/50">
                      <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[11px] sm:text-xs uppercase tracking-wide mb-1">
                        Email
                      </span>
                      <span className="text-slate-100 font-medium text-sm sm:text-base break-all">
                        support@easemyshipping.com
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-green-500/50 transition-all group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/50">
                      <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[11px] sm:text-xs uppercase tracking-wide mb-1">
                        Phone / WhatsApp
                      </span>
                      <span className="text-slate-100 font-medium text-sm sm:text-base">
                        +91-98XX-XXX-XXX
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 sm:gap-4 pt-3 sm:pt-4">
                  <button className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm sm:text-base font-medium rounded-full overflow-hidden shadow-xl shadow-blue-500/50 hover:shadow-blue-400/70 transition-all hover:scale-105">
                    <span className="relative z-10 flex items-center gap-2">
                      Book a Discovery Call
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button className="px-7 sm:px-8 py-3.5 sm:py-4 border-2 border-slate-500/50 text-sm sm:text-base font-medium rounded-full hover:border-green-400 hover:text-green-300 transition-all hover:scale-105 backdrop-blur-sm">
                    Chat on WhatsApp
                  </button>
                </div>
              </div>

              <div
                data-animate
                id="contact-form"
                className={
                  (isVisible["contact-form"]
                    ? "animate-fadeInUp "
                    : "opacity-0 ") + "flex"
                }
                style={{ animationDelay: "0.2s" }}
              >
                <div className="relative w-full rounded-3xl border border-slate-800/50 bg-slate-950/90 backdrop-blur-xl shadow-2xl p-6 sm:p-8 overflow-hidden">
                  <div className="absolute -right-16 sm:-right-20 -top-16 sm:-top-20 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl rounded-full" />

                  <div className="relative z-10 space-y-5 sm:space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                        Share a few details
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400">
                        Our team will get back within one business day with
                        relevant options—no spam, no generic pitches.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] sm:text-xs text-slate-400 mb-2 font-medium">
                          Name
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-xl bg-slate-900/80 border border-slate-700/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] sm:text-xs text-slate-400 mb-2 font-medium">
                          Work Email
                        </label>
                        <input
                          type="email"
                          className="w-full rounded-xl bg-slate-900/80 border border-slate-700/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
                          placeholder="you@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] sm:text-xs text-slate-400 mb-2 font-medium">
                          What do you want to ship?
                        </label>
                        <textarea
                          rows={4}
                          className="w-full rounded-xl bg-slate-900/80 border border-slate-700/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none placeholder:text-slate-500"
                          placeholder="e.g. 20–30 B2B pallets per week, pan-India + exports"
                        />
                      </div>
                    </div>

                    <button className="group relative w-full py-3.5 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm sm:text-base font-medium rounded-xl overflow-hidden shadow-xl shadow-blue-500/50 hover:shadow-blue-400/70 transition-all hover:scale-105">
                      <span className="relative z-10">Submit Inquiry</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <p className="text-[10px] sm:text-xs text-slate-500 text-center">
                      By submitting, you agree to be contacted about logistics
                      solutions. We respect your inbox.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <section
        id="cta"
        className="relative w-full py-24 sm:py-32 px-4 sm:px-6 flex items-center justify-center text-center overflow-hidden"
        style={{ zIndex: 999 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.7), rgba(15,23,42,0.95)), url('${withBase(
              "images/cta-bg.jpg"
            )}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/40" />
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-[360px] sm:w-[500px] md:w-[600px] h-[360px] sm:h-[500px] md:h-[600px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[100px] sm:blur-[120px] rounded-full animate-pulse" />
        </div>

        <div className="relative max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-ctaFadeUp">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 text-[11px] sm:text-xs font-medium uppercase tracking-wider backdrop-blur-sm">
              Start Your Journey
            </span>
          </div>

          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div
              className="absolute inset-0 animate-grid-flow"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 1px, transparent 1px)",
                backgroundSize: "100px 100px",
              }}
            />
          </div>

          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-[260px] sm:w-[320px] h-[260px] sm:h-[320px] bg-blue-500/20 blur-3xl rounded-full animate-pulse-glow" />
          </div>

          <h2 className="cta-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Ready to Ship?
          </h2>

          <p className="cta-text text-base sm:text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Let us revolutionize your logistics. Get a custom quote in just 60
            seconds.
          </p>

          <button className="group relative px-9 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 text-white text-sm sm:text-lg font-medium rounded-full overflow-hidden shadow-2xl shadow-blue-500/50 hover:shadow-blue-400/70 transition-all hover:scale-110">
            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
              Get Your Quote
              <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 group-hover:translate-x-2 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-slate-800/50 py-12 sm:py-16 px-4 sm:px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  EaseMyShipping
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xs">
                Making logistics simple, efficient, and futuristic.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2.5 sm:space-y-3 text-slate-400 text-xs sm:text-sm">
                {["about", "services", "why", "faq", "contact"].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollToSection(link)}
                      className="hover:text-blue-400 transition-colors capitalize hover:translate-x-1 inline-block"
                    >
                      {link === "why"
                        ? "Why Us"
                        : link === "faq"
                        ? "FAQ"
                        : link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-2.5 sm:space-y-3 text-slate-400 text-xs sm:text-sm">
                <li>Courier Services</li>
                <li>Air Freight</li>
                <li>Sea Freight</li>
                <li>Domestic B2B &amp; B2C</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">
                Contact
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xs">
                Get in touch with our team for personalized logistics solutions.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-5 sm:pt-8 text-center">
            <p className="text-slate-500 text-[11px] sm:text-xs">
              © {new Date().getFullYear()} EaseMyShipping. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* STYLES */}
      <style>{`
        html, body {
          scroll-behavior: smooth;
        }

        .hero-bg-slide {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transition: opacity 1.6s ease-in-out;
        }

        /* PARALLAX STAR BACKGROUND */
        .stars-layer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        #stars {
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: 611px 1961px #FFF, 1651px 1727px #FFF, 893px 910px #FFF, 1643px 1822px #FFF, 1085px 113px #FFF, 1936px 11px #FFF, 1641px 103px #FFF, 310px 1635px #FFF, 898px 2px #FFF, 693px 1356px #FFF, 16px 1702px #FFF, 1338px 1260px #FFF, 388px 382px #FFF, 1537px 1081px #FFF, 1135px 1540px #FFF, 37px 1009px #FFF, 1988px 1176px #FFF, 1155px 318px #FFF, 1654px 759px #FFF, 1106px 190px #FFF, 1962px 33px #FFF, 280px 502px #FFF, 168px 1846px #FFF, 1627px 400px #FFF, 127px 1829px #FFF, 1898px 13px #FFF, 1928px 119px #FFF, 1709px 1161px #FFF, 870px 92px #FFF, 209px 1410px #FFF, 942px 561px #FFF, 1481px 335px #FFF, 413px 946px #FFF, 900px 391px #FFF, 712px 323px #FFF, 1460px 72px #FFF, 1360px 530px #FFF, 1112px 373px #FFF, 802px 1441px #FFF, 1620px 564px #FFF, 1095px 1733px #FFF, 626px 1264px #FFF, 254px 1233px #FFF, 314px 843px #FFF, 1774px 822px #FFF, 845px 627px #FFF, 790px 1704px #FFF, 1357px 1472px #FFF, 76px 1171px #FFF, 349px 1306px #FFF, 521px 545px #FFF, 822px 1121px #FFF, 569px 435px #FFF, 453px 1920px #FFF, 1522px 241px #FFF, 1217px 1246px #FFF, 203px 344px #FFF, 1284px 1761px #FFF, 494px 1395px #FFF, 142px 1441px #FFF, 502px 762px #FFF, 273px 294px #FFF, 1193px 919px #FFF, 1141px 403px #FFF, 1453px 1276px #FFF, 1442px 1700px #FFF, 594px 1827px #FFF, 432px 35px #FFF, 1376px 1524px #FFF, 1338px 1335px #FFF, 1060px 1778px #FFF, 1623px 121px #FFF, 1416px 1808px #FFF, 1975px 1753px #FFF, 1538px 1437px #FFF, 914px 120px #FFF, 493px 1362px #FFF, 1672px 1324px #FFF, 1256px 1524px #FFF, 1802px 1562px #FFF, 1073px 1511px #FFF, 1068px 286px #FFF, 1910px 309px #FFF, 692px 1109px #FFF, 1628px 1879px #FFF, 871px 611px #FFF, 1476px 1423px #FFF, 347px 1600px #FFF, 485px 1418px #FFF, 685px 965px #FFF, 471px 828px #FFF, 432px 538px #FFF, 709px 584px #FFF, 913px 1729px #FFF, 1294px 858px #FFF, 51px 135px #FFF, 505px 51px #FFF, 156px 80px #FFF;
          animation: animStar 50s linear infinite;
        }

        #stars:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: 611px 1961px #FFF, 1651px 1727px #FFF, 893px 910px #FFF, 1643px 1822px #FFF, 1085px 113px #FFF, 1936px 11px #FFF, 1641px 103px #FFF, 310px 1635px #FFF, 898px 2px #FFF, 693px 1356px #FFF, 16px 1702px #FFF, 1338px 1260px #FFF, 388px 382px #FFF, 1537px 1081px #FFF, 1135px 1540px #FFF, 37px 1009px #FFF, 1988px 1176px #FFF, 1155px 318px #FFF, 1654px 759px #FFF, 1106px 190px #FFF, 1962px 33px #FFF, 280px 502px #FFF, 168px 1846px #FFF, 1627px 400px #FFF, 127px 1829px #FFF, 1898px 13px #FFF, 1928px 119px #FFF, 1709px 1161px #FFF, 870px 92px #FFF, 209px 1410px #FFF, 942px 561px #FFF, 1481px 335px #FFF, 413px 946px #FFF, 900px 391px #FFF, 712px 323px #FFF, 1460px 72px #FFF, 1360px 530px #FFF, 1112px 373px #FFF, 802px 1441px #FFF, 1620px 564px #FFF, 1095px 1733px #FFF, 626px 1264px #FFF, 254px 1233px #FFF, 314px 843px #FFF, 1774px 822px #FFF, 845px 627px #FFF, 790px 1704px #FFF, 1357px 1472px #FFF, 76px 1171px #FFF, 349px 1306px #FFF, 521px 545px #FFF, 822px 1121px #FFF, 569px 435px #FFF, 453px 1920px #FFF, 1522px 241px #FFF, 1217px 1246px #FFF, 203px 344px #FFF, 1284px 1761px #FFF, 494px 1395px #FFF, 142px 1441px #FFF, 502px 762px #FFF, 273px 294px #FFF, 1193px 919px #FFF, 1141px 403px #FFF, 1453px 1276px #FFF, 1442px 1700px #FFF, 594px 1827px #FFF, 432px 35px #FFF, 1376px 1524px #FFF, 1338px 1335px #FFF, 1060px 1778px #FFF, 1623px 121px #FFF, 1416px 1808px #FFF, 1975px 1753px #FFF, 1538px 1437px #FFF, 914px 120px #FFF, 493px 1362px #FFF, 1672px 1324px #FFF, 1256px 1524px #FFF, 1802px 1562px #FFF, 1073px 1511px #FFF, 1068px 286px #FFF, 1910px 309px #FFF, 692px 1109px #FFF, 1628px 1879px #FFF, 871px 611px #FFF, 1476px 1423px #FFF, 347px 1600px #FFF, 485px 1418px #FFF, 685px 965px #FFF, 471px 828px #FFF, 432px 538px #FFF, 709px 584px #FFF, 913px 1729px #FFF, 1294px 858px #FFF, 51px 135px #FFF, 505px 51px #FFF, 156px 80px #FFF;
        }

        #stars2 {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: 1148px 1341px #FFF, 140px 984px #FFF, 1610px 303px #FFF, 1948px 1277px #FFF, 1947px 1144px #FFF, 40px 1751px #FFF, 242px 60px #FFF, 244px 169px #FFF, 732px 1478px #FFF, 872px 523px #FFF, 1548px 1248px #FFF, 1863px 321px #FFF, 954px 1293px #FFF, 845px 967px #FFF, 1623px 1094px #FFF, 122px 1502px #FFF, 592px 628px #FFF, 4px 61px #FFF, 486px 1474px #FFF, 413px 1821px #FFF, 1931px 1367px #FFF, 1854px 1451px #FFF, 1369px 1099px #FFF, 1340px 1612px #FFF, 1265px 935px #FFF, 1951px 1238px #FFF, 538px 1826px #FFF, 1551px 697px #FFF, 703px 1693px #FFF, 1563px 1952px #FFF, 1647px 38px #FFF, 1000px 695px #FFF, 414px 1696px #FFF, 1355px 934px #FFF, 1633px 452px #FFF, 263px 1147px #FFF, 512px 1285px #FFF, 1466px 791px #FFF, 25px 105px #FFF, 1784px 1872px #FFF, 677px 1290px #FFF, 1190px 747px #FFF, 1434px 764px #FFF, 1410px 953px #FFF, 113px 1706px #FFF, 531px 227px #FFF, 1912px 1393px #FFF, 35px 349px #FFF, 1034px 164px #FFF, 157px 232px #FFF;
          animation: animStar 100s linear infinite;
        }

        #stars2:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: 1148px 1341px #FFF, 140px 984px #FFF, 1610px 303px #FFF, 1948px 1277px #FFF, 1947px 1144px #FFF, 40px 1751px #FFF, 242px 60px #FFF, 244px 169px #FFF, 732px 1478px #FFF, 872px 523px #FFF, 1548px 1248px #FFF, 1863px 321px #FFF, 954px 1293px #FFF, 845px 967px #FFF, 1623px 1094px #FFF, 122px 1502px #FFF, 592px 628px #FFF, 4px 61px #FFF, 486px 1474px #FFF, 413px 1821px #FFF, 1931px 1367px #FFF, 1854px 1451px #FFF, 1369px 1099px #FFF, 1340px 1612px #FFF, 1265px 935px #FFF, 1951px 1238px #FFF, 538px 1826px #FFF, 1551px 697px #FFF, 703px 1693px #FFF, 1563px 1952px #FFF, 1647px 38px #FFF, 1000px 695px #FFF, 414px 1696px #FFF, 1355px 934px #FFF, 1633px 452px #FFF, 263px 1147px #FFF, 512px 1285px #FFF, 1466px 791px #FFF, 25px 105px #FFF, 1784px 1872px #FFF, 677px 1290px #FFF, 1190px 747px #FFF, 1434px 764px #FFF, 1410px 953px #FFF, 113px 1706px #FFF, 531px 227px #FFF, 1912px 1393px #FFF, 35px 349px #FFF, 1034px 164px #FFF, 157px 232px #FFF;
        }

        #stars3 {
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: 1747px 1274px #FFF, 431px 1533px #FFF, 1118px 1108px #FFF, 536px 1763px #FFF, 702px 1108px #FFF, 137px 243px #FFF, 812px 662px #FFF, 625px 653px #FFF, 78px 1389px #FFF, 1392px 800px #FFF, 679px 677px #FFF, 1432px 35px #FFF, 695px 745px #FFF, 941px 1987px #FFF, 1336px 1418px #FFF, 1109px 300px #FFF, 578px 980px #FFF, 901px 1679px #FFF, 413px 174px #FFF, 1758px 1911px #FFF, 1040px 711px #FFF, 155px 1319px #FFF, 997px 1457px #FFF, 1753px 179px #FFF, 1614px 690px #FFF, 1755px 854px #FFF, 1118px 1712px #FFF, 232px 1794px #FFF, 1583px 745px #FFF, 939px 1887px #FFF, 270px 585px #FFF, 1099px 1663px #FFF, 890px 845px #FFF, 1733px 236px #FFF, 1610px 101px #FFF, 384px 722px #FFF, 903px 167px #FFF, 332px 124px #FFF, 633px 710px #FFF, 1519px 486px #FFF;
          animation: animStar 150s linear infinite;
        }

        #stars3:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: 1747px 1274px #FFF, 431px 1533px #FFF, 1118px 1108px #FFF, 536px 1763px #FFF, 702px 1108px #FFF, 137px 243px #FFF, 812px 662px #FFF, 625px 653px #FFF, 78px 1389px #FFF, 1392px 800px #FFF, 679px 677px #FFF, 1432px 35px #FFF, 695px 745px #FFF, 941px 1987px #FFF, 1336px 1418px #FFF, 1109px 300px #FFF, 578px 980px #FFF, 901px 1679px #FFF, 413px 174px #FFF, 1758px 1911px #FFF, 1040px 711px #FFF, 155px 1319px #FFF, 997px 1457px #FFF, 1753px 179px #FFF, 1614px 690px #FFF, 1755px 854px #FFF, 1118px 1712px #FFF, 232px 1794px #FFF, 1583px 745px #FFF, 939px 1887px #FFF, 270px 585px #FFF, 1099px 1663px #FFF, 890px 845px #FFF, 1733px 236px #FFF, 1610px 101px #FFF, 384px 722px #FFF, 903px 167px #FFF, 332px 124px #FFF, 633px 710px #FFF, 1519px 486px #FFF;
        }

        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }

        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(0.9); }
          66% { transform: translate(30px, -20px) scale(1.1); }
        }

        @keyframes floatOrb3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -40px) scale(1.05); }
        }

        .animate-floatOrb1 { animation: floatOrb1 20s ease-in-out infinite; }
        .animate-floatOrb2 { animation: floatOrb2 25s ease-in-out infinite; }
        .animate-floatOrb3 { animation: floatOrb3 30s ease-in-out infinite; }

        .layered-container {
          position: relative;
          perspective: 1400px;
          perspective-origin: center 15%;
          padding: 3rem 0 5rem;
        }

        .slide-section {
          position: sticky;
          top: 5.5rem;
          min-height: calc(100vh - 6rem);
          display: flex;
          align-items: flex-start;
          transform-style: preserve-3d;
          transition: transform 0.28s ease-out, opacity 0.28s ease-out;
          margin: 0 auto 6rem;
          max-width: 1380px;
          border-radius: 28px;
          box-shadow: 0 28px 80px rgba(15,23,42,0.85);
          border: 1px solid rgba(148,163,184,0.18);
          overflow: visible;
          position: relative;
          z-index: auto;
        }

        .slide-section > * {
          position: relative;
          z-index: 1;
        }

        .inner-slide {
          width: 100%;
          transform-origin: top center;
          padding-top: 2rem;
          padding-bottom: 4rem;
          position: relative;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes ctaFadeUp {
          0% { opacity: 0; transform: translateY(40px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .animate-ctaFadeUp {
          animation: ctaFadeUp 1.3s ease-out forwards;
        }

        .marquee-outer {
          overflow: hidden;
          width: 100%;
        }

        .marquee-track {
          display: flex;
          align-items: center;
          gap: 4rem;
          width: max-content;
          animation: marquee 45s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* MOBILE / TABLET OPTIMIZATIONS */
        @media (max-width: 1024px) {
          .layered-container {
            perspective: none;
            padding: 2rem 0 3rem;
          }

          .slide-section {
            position: static;
            top: auto;
            min-height: auto;
            margin: 0 0 3rem 0;
            max-width: 100%;
            border-radius: 1.5rem;
            box-shadow: 0 18px 40px rgba(15,23,42,0.75);
            transform: none !important;
            opacity: 1 !important;
          }

          .inner-slide {
            padding-top: 2.5rem;
            padding-bottom: 3rem;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 2.2rem;
            line-height: 1.15;
          }

          .hero-subtitle {
            font-size: 0.98rem;
          }

          .cta-title {
            font-size: 2.3rem;
            line-height: 1.2;
          }

          .cta-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
