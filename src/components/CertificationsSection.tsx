import { useRef } from 'react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

interface Certificate {
  id: number;
  image?: string;
  file: string;
  title: string;
  description: string;
}

const CERTIFICATES: Certificate[] = [
  { 
    id: 1, 
    image: "/certifications/Intermediate Python.PNG",
    file: "/certifications/Intermediate%20Python.pdf", 
    title: "Intermediate Python",
    description: "DataCamp certification for advanced Python techniques."
  },
  { 
    id: 2, 
    image: "/certifications/Statistical Thinking in Python (Part 1).PNG",
    file: "/certifications/Statistical%20Thinking%20in%20Python%20(Part%201).pdf", 
    title: "Statistical Thinking in Python",
    description: "DataCamp certification for statistical thinking and EDA."
  },
  { 
    id: 3, 
    file: "https://github.com/hafsamaryam08", 
    title: "Agentic AI Bootcamp",
    description: "Applied LangGraph & Langchain concepts in repository."
  },
  { 
    id: 4, 
    file: "https://github.com/hafsamaryam08", 
    title: "Harvard CS50x",
    description: "Problem sets and foundational CS coursework."
  }
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="relative w-full bg-black py-20 min-h-screen flex items-center">
      <div className="relative z-10 w-full flex flex-col">
        <FadeIn y={20}>
          <div className="mb-10 md:mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Certifications
            </h2>
            <div className="mt-4 h-px w-20 bg-white/30 rounded-full" />
            <p className="mt-6 max-w-2xl text-sm md:text-base text-white/60">
              Verified credentials and professional achievements.
            </p>
            <div className="mt-6 flex items-center gap-2 text-white/40 text-xs md:text-sm font-medium tracking-widest uppercase animate-pulse">
              <span>Swipe to explore</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </FadeIn>

        <div 
          className="relative w-full overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="flex gap-6 sm:gap-8 px-12 sm:px-20 md:px-32 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {CERTIFICATES.map((cert, idx) => (
              <FadeIn key={cert.id} delay={idx * 0.1} y={30} className="snap-center h-full flex">
                <div 
                  className="group relative flex flex-col shrink-0 h-full w-[280px] sm:w-[340px] md:w-[380px] cursor-pointer overflow-hidden rounded-[15px] border border-white/10 bg-[#111111] p-4 md:p-5 transition-all duration-500 hover:scale-[1.02] hover:z-50 hover:bg-[#151515] hover:border-[#10b981]/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]"
                onClick={() => window.open(cert.file, '_blank')}
              >
                <div className="relative h-48 sm:h-56 md:h-64 w-full flex flex-col items-center justify-center overflow-hidden rounded-lg bg-black/40 mb-4 border border-white/5 shadow-inner group-hover:border-white/20 transition-all duration-500">
                  {cert.image ? (
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="max-h-full max-w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      draggable={false}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-[#10b981] opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                      <svg className="w-16 h-16 sm:w-20 sm:h-20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      <span className="text-white/50 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors duration-500">GitHub Repo</span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center">
                     <div className="scale-90 opacity-0 transform transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                       <span className="rounded-full bg-white/10 border border-white/30 px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white shadow-xl flex items-center gap-2">
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                         </svg>
                         {!cert.image ? 'View Repo' : 'View PDF'}
                       </span>
                     </div>
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col gap-1.5 px-2">
                  <h3 className="text-white font-bold text-sm sm:text-base tracking-wide line-clamp-1" title={cert.title}>{cert.title}</h3>
                  <p className="text-white/50 text-xs sm:text-sm line-clamp-2" title={cert.description}>{cert.description}</p>
                </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
