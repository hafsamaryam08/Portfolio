import { useRef } from 'react';
import FadeIn from './FadeIn';

const EducationSection = () => {
  return (
    <section id="education" className="relative w-full bg-[#0C0C0C] py-24 flex items-center justify-center overflow-hidden">
      {/* Background glowing orb */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#10b981]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 flex flex-col items-center">
        <FadeIn y={20}>
          <div className="mb-12 md:mb-16 flex flex-col items-center text-center">
            <span className="text-[#10b981] text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-2">
              ACADEMY
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              Education & Studies
            </h2>
            <div className="mt-6 h-px w-20 bg-white/30 rounded-full" />
          </div>
        </FadeIn>

        <FadeIn y={30} delay={0.1} className="w-full">
          <div className="group relative w-full flex flex-col lg:flex-row gap-8 lg:gap-12 rounded-[24px] border border-white/10 bg-[#111111]/80 backdrop-blur-xl p-8 lg:p-12 transition-all duration-500 hover:border-[#10b981]/30 hover:shadow-[0_0_50px_rgba(16,185,129,0.1)]">

            {/* Left Side - Degree Info */}
            <div className="flex flex-col flex-1 gap-6">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] shrink-0">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="inline-block px-3 py-1 rounded-md bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-xs font-bold uppercase tracking-widest w-fit">
                    Bachelor of Science
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                    BS Computer Science
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-white/60 text-sm sm:text-base font-medium">
                    <span className="text-white/80">COMSATS University Islamabad</span>
                    <span className="hidden sm:inline text-white/30"></span>
                    {/* <span>Bahawalnagar Campus</span> */}
                  </div>
                  <div className="text-[#10b981]/80 text-sm sm:text-base font-semibold mt-1">
                    Timeline: 2022 – 2026
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 w-fit">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#10b981]/20 text-[#10b981]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                    Cumulative GPA
                  </span>
                  <span className="text-white text-xl sm:text-2xl font-black tracking-tight">
                    3.61 <span className="text-white/30 text-lg">/ 4.00</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Divider for Desktop */}
            <div className="hidden lg:block w-px bg-white/10" />

            {/* Divider for Mobile */}
            <div className="block lg:hidden h-px w-full bg-white/10" />

            {/* Right Side - Coursework */}
            <div className="flex flex-col flex-1 gap-6">
              <div className="flex items-center gap-3 text-[#10b981]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h4 className="text-sm sm:text-base font-bold uppercase tracking-[0.15em]">
                  Key Coursework
                </h4>
              </div>

              <ul className="flex flex-col gap-4 pl-2">
                {[
                  "Object-Oriented Programming (OOP)",
                  "Data Structures & Algorithms (DSA)",
                  "Database Management Systems (DBMS)",
                  "Web & Mobile Application Development",
                  "Artificial Intelligence & Machine Learning"
                ].map((course, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0 shadow-[0_0_8px_#10b981]" />
                    <span className="text-white/70 text-sm sm:text-base font-medium">
                      {course}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default EducationSection;
