'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe, Layers, Zap, Play, Instagram, Twitter, Linkedin, Plus, ArrowUpRight, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-6 md:px-12 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'mix-blend-difference'}`}>
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl md:text-3xl font-extrabold tracking-tighter uppercase text-white">Ordinary</span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            <a href="#services" className="hover:text-[#FF3333] transition-colors">Services</a>
            <a href="#infra" className="hover:text-[#FF3333] transition-colors">Infra</a>
            <a href="#work" className="hover:text-[#FF3333] transition-colors">Work</a>
          </div>
          <button className="bg-white text-black px-4 md:px-6 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF3333] hover:text-white transition-all">
            Connect
          </button>
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <motion.div 
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[90] bg-black flex flex-col items-center justify-center gap-8 p-12 md:hidden"
      >
        <div className="flex flex-col items-center gap-8 text-2xl font-display font-extrabold uppercase tracking-tighter">
          <a href="#services" onClick={() => setIsOpen(false)} className="hover:text-[#FF3333]">Services</a>
          <a href="#infra" onClick={() => setIsOpen(false)} className="hover:text-[#FF3333]">Infra</a>
          <a href="#work" onClick={() => setIsOpen(false)} className="hover:text-[#FF3333]">Work</a>
        </div>
      </motion.div>
    </>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on the title
      gsap.to(titleRef.current, {
        y: 150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Initial reveal
      gsap.from(".hero-line", {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-8">
          <span className="hero-line text-[10px] font-bold uppercase tracking-[0.5em] text-[#FF3333]">
            The Ordinary Group Inc. / 2026
          </span>
          <p className="hero-line max-w-xs text-xs uppercase tracking-widest leading-relaxed opacity-40">
            Media & Technology / Visual Infrastructure™ / Branding / Motion / Production
          </p>
        </div>

        <h1 ref={titleRef} className="hero-line font-display text-huge font-extrabold uppercase mb-12">
          Visual <br />
          <span className="text-outline">Infra</span> <br />
          Structure
        </h1>

        <div className="hero-line flex flex-col md:flex-row gap-12 items-start md:items-center">
          <button className="group relative bg-[#FF3333] text-white px-12 py-6 text-sm font-bold uppercase tracking-widest overflow-hidden">
            <span className="relative z-10">Start the Engine</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="absolute inset-0 flex items-center justify-center text-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-bold uppercase tracking-widest">Start the Engine</span>
          </button>
          
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Watch Showreel</span>
          </div>
        </div>
      </div>

      {/* Background Large Text */}
      <div className="absolute -bottom-20 -right-20 text-[30vw] font-display font-black text-white/[0.02] uppercase pointer-events-none select-none">
        Ordinary
      </div>
    </section>
  );
};

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const services = [
    { title: "Branding", desc: "We build visual systems that don't just look good—they perform. Scalable, aggressive, and enduring identities." },
    { title: "Motion Design", desc: "High-velocity visual storytelling. We move at the speed of culture to keep your brand relevant." },
    { title: "Managed Content", desc: "Fully managed production pipelines for social and marketing. We are your visual department." }
  ];

  return (
    <section id="services" ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 bg-white text-black relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24 gap-8">
          <h2 className="font-display text-5xl md:text-8xl font-extrabold uppercase tracking-tighter leading-none">
            Managed <br /> <span className="text-[#FF3333]">Output</span>
          </h2>
          <p className="max-w-sm text-base md:text-lg font-medium leading-tight opacity-70">
            We don&apos;t do &quot;one-offs&quot;. We build infrastructure. Systems that allow you to produce high-quality visual content at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10">
          {services.map((s, i) => (
            <div key={i} className="service-card bg-white p-8 md:p-12 group hover:bg-[#FF3333] hover:text-white transition-colors duration-500">
              <span className="text-[10px] font-bold uppercase tracking-widest mb-8 md:mb-12 block opacity-40 group-hover:opacity-100">0{i + 1}</span>
              <h3 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4 md:mb-6">{s.title}</h3>
              <p className="text-sm leading-relaxed mb-8 md:mb-12 opacity-60 group-hover:opacity-100">{s.desc}</p>
              <ArrowUpRight className="w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InfraSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(progressRef.current, {
        width: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      gsap.from(".infra-text", {
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="infra" ref={containerRef} className="min-h-screen flex items-center py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#FF3333] -z-10" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div>
          <h2 className="infra-text font-display text-5xl md:text-9xl font-extrabold uppercase tracking-tighter leading-[0.85] mb-8 md:mb-12 text-black">
            Visual <br /> Infra <br /> Structure™
          </h2>
          <p className="infra-text text-xl md:text-3xl font-bold text-white leading-tight mb-8 md:mb-12">
            Ordinary defines visual infrastructure as the interconnected systems of design, motion, and content that allow a business to communicate its value consistently across all platforms.
          </p>
          <div className="infra-text flex flex-wrap gap-3 md:gap-4">
            {['Scalable', 'Managed', 'Integrated', 'Aggressive'].map((tag, i) => (
              <span key={i} className="px-4 md:px-6 py-2 border-2 border-black text-black font-bold uppercase tracking-widest text-[10px] md:text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="relative aspect-square bg-black p-8 md:p-12 flex items-center justify-center overflow-hidden max-w-md mx-auto lg:max-w-none w-full">
           <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full border-[10px] md:border-[20px] border-white/10 animate-pulse" />
           </div>
           <Layers className="w-20 h-20 md:w-32 md:h-32 text-[#FF3333]" />
           <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 right-8 md:right-12">
              <div className="h-1.5 md:h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  ref={progressRef}
                  className="h-full bg-[#FF3333] w-full"
                />
              </div>
              <div className="flex justify-between mt-3 md:mt-4 font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-white/40">
                <span>System Load</span>
                <span>99.9% Uptime</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const Work = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".work-item").forEach((item) => {
        gsap.from(item.querySelector(".work-image"), {
          scale: 1.2,
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const projects = [
    { id: 1, title: "Visual_System_v1.0", tags: "Identity / Motion / Strategy" },
    { id: 2, title: "Digital_Ecosystem", tags: "Web / Product / UI" },
    { id: 3, title: "Motion_Architecture", tags: "Animation / 3D / VFX" },
    { id: 4, title: "Brand_Infrastructure", tags: "Strategy / Design / Scale" },
  ];

  return (
    <section id="work" ref={containerRef} className="py-0 overflow-hidden">
      <div className="px-6 md:px-12 py-24 border-b border-white/10">
        <div className="flex justify-between items-end">
          <h2 className="font-display text-6xl md:text-8xl font-extrabold uppercase tracking-tighter">Archive</h2>
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">Selected_Works [04]</span>
        </div>
      </div>

      <div className="flex flex-col">
        {projects.map((p, i) => (
          <div 
            key={i}
            className="work-item relative w-full h-[70vh] md:h-[100vh] group cursor-pointer overflow-hidden border-b border-white/10"
          >
            {/* Image Container */}
            <div className="work-image absolute inset-0 w-full h-full">
              <Image 
                src={`https://picsum.photos/seed/designhouse-${p.id}/1920/1080`} 
                alt={p.title} 
                fill
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-[#FF3333]/80 transition-all duration-500" />
            </div>

            {/* Centered Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
              <div className="overflow-hidden">
                <h3 className="font-display text-4xl md:text-8xl font-extrabold uppercase tracking-tighter translate-y-0 md:translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  {p.title}
                </h3>
              </div>
              <div className="overflow-hidden mt-4">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] opacity-100 md:opacity-0 group-hover:opacity-100 translate-y-0 md:translate-y-full group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {p.tags}
                </p>
              </div>
            </div>

            {/* Bottom Left Index */}
            <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 z-10 font-mono text-xs opacity-100 md:opacity-40 group-hover:opacity-100 transition-opacity">
              [0{p.id}]
            </div>

            {/* Top Right Arrow */}
            <div className="absolute top-8 md:top-12 right-8 md:right-12 z-10 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-0 md:-translate-x-4 translate-y-0 md:translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
              <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 px-6 md:px-12 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <h3 className="font-display text-5xl font-extrabold uppercase tracking-tighter mb-8">Ordinary Group Inc.</h3>
            <p className="max-w-sm text-sm font-medium leading-relaxed opacity-60 mb-12">
              A media and technology company developing the visual infrastructure for tomorrow&apos;s leaders. We don&apos;t just design; we build systems.
            </p>
            <div className="flex gap-6">
              <a href="#" className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-[#FF3333] hover:border-[#FF3333] hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-[#FF3333] hover:border-[#FF3333] hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-[#FF3333] hover:border-[#FF3333] hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 opacity-40">Navigation</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-[#FF3333]">Home</a></li>
              <li><a href="#services" className="hover:text-[#FF3333]">Services</a></li>
              <li><a href="#infra" className="hover:text-[#FF3333]">Infrastructure</a></li>
              <li><a href="#work" className="hover:text-[#FF3333]">Work</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 opacity-40">Legal</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-[#FF3333]">Privacy</a></li>
              <li><a href="#" className="hover:text-[#FF3333]">Terms</a></li>
              <li><a href="#" className="hover:text-[#FF3333]">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em]">
          <p>© 2026 The Ordinary Group Inc.</p>
          <p className="text-[#FF3333]">Visual Infrastructure™ is a registered trademark.</p>
        </div>
      </div>
    </footer>
  );
};

// --- Main Page ---

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Services />
      <InfraSection />
      <Work />
      
      {/* Final CTA */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-white text-black text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-5xl md:text-9xl font-extrabold uppercase tracking-tighter leading-none mb-8 md:mb-12">
            Build <br /> <span className="text-[#FF3333]">Better</span>
          </h2>
          <p className="text-lg md:text-2xl font-bold mb-8 md:mb-12 opacity-70">
            Stop doing one-offs. Start building infrastructure.
          </p>
          <button className="bg-black text-white px-10 md:px-16 py-6 md:py-8 text-xs md:sm font-bold uppercase tracking-widest hover:bg-[#FF3333] transition-colors w-full md:w-auto">
            Contact the Group
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
