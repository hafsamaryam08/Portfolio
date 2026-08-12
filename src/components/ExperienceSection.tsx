import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';

interface Experience {
  id: number;
  badge: string;
  title: string;
  company: string;
  date: string;
  location: string;
  responsibilities: string[];
}

const EXPERIENCES: Experience[] = [
  {
    id: 1,
    badge: "Internship",
    title: "Elevvo Pathways",
    company: "Intern",
    date: "July 2025 – Aug 2025",
    location: "Remote",
    responsibilities: [
      "Engaged in comprehensive technical training and hands-on project development as part of the Elevvo Pathways program.",
      "Collaborated with cross-functional teams to design, develop, and optimize software solutions.",
      "Participated in agile methodologies, code reviews, and continuous integration workflows to ensure code quality."
    ]
  },
  {
    id: 2,
    badge: "Leadership",
    title: "Technical Team Member",
    company: "Google Developer Student Clubs (GDSC)",
    date: "Aug 2023 – Mar 2024",
    location: "COMSATS, Bahawalnagar",
    responsibilities: [
      "Participated in organizing developer workshops, bootcamps, and coding events to support the campus tech community.",
      "Facilitated technical sessions on emerging technologies including AI, Web Development, and Cloud computing.",
      "Mentored junior students and peers in programming fundamentals and software engineering best practices."
    ]
  },
  {
    id: 3,
    badge: "Creative",
    title: "Designing & Photography Member",
    company: "CFAS - COMSATS Fine Arts & Calligraphy Society",
    date: "2023 - 2025",
    location: "COMSATS, Bahawalnagar",
    responsibilities: [
      "Designed creative marketing materials, event posters, and digital assets for society events and exhibitions.",
      "Managed event photography and visual documentation, capturing key moments for social media and archival purposes.",
      "Collaborated with the creative team to establish a cohesive visual identity and brand for the society."
    ]
  },
  {
    id: 4,
    badge: "Ambassador",
    title: "Campus Ambassador",
    company: "Career Connect Pakistan",
    date: "2023 - 2024",
    location: "COMSATS, Bahawalnagar",
    responsibilities: [
      "Represented Career Connect Pakistan on campus, driving student engagement and participation in career development programs.",
      "Organized seminars, networking sessions, and career counseling drives to bridge the gap between students and industry professionals.",
      "Utilized social media and on-ground campaigns to increase awareness of upcoming opportunities and events."
    ]
  }
];

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative w-full bg-[#0C0C0C] py-24 flex justify-center overflow-hidden">
      <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 flex flex-col">
        <FadeIn y={20}>
          <div className="mb-16 flex flex-col items-start">
            <span className="text-[#10b981] text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-2">
              JOURNEY
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              Experience & Leadership
            </h2>
            <div className="mt-6 h-px w-32 bg-white/30 rounded-full" />
          </div>
        </FadeIn>

        <div ref={containerRef} className="relative flex flex-col gap-12 lg:gap-20">
          {/* Animated Timeline Line */}
          <div className="absolute left-4 md:left-[39px] top-4 bottom-4 w-px bg-white/10 hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-[#10b981] via-[#10b981] to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          {EXPERIENCES.map((exp, idx) => (
            <FadeIn key={exp.id} delay={0.2} y={30} className="relative flex flex-col md:flex-row gap-8 md:gap-12 w-full">

              {/* Timeline Dot */}
              <div className="hidden md:flex flex-col items-center mt-8 z-10">
                <div className="w-[80px] flex justify-center">
                  <div className="w-5 h-5 rounded-full bg-[#0C0C0C] border-2 border-[#10b981] flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                  </div>
                </div>
              </div>

              {/* Experience Card */}
              <div className="group relative w-full flex-1 flex flex-col gap-6 rounded-[24px] border border-white/10 bg-[#111111]/80 backdrop-blur-xl p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:border-[#10b981]/30 hover:shadow-[0_0_50px_rgba(16,185,129,0.1)] hover:-translate-y-1">

                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                  <div className="flex flex-col gap-3">
                    <span className="inline-block px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 text-[10px] sm:text-xs font-bold uppercase tracking-widest w-fit group-hover:bg-[#10b981]/10 group-hover:text-[#10b981] group-hover:border-[#10b981]/20 transition-colors">
                      {exp.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                      {exp.title}
                    </h3>
                    <div className="text-[#10b981] font-bold uppercase tracking-widest text-xs sm:text-sm">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-white/50 text-xs sm:text-sm font-medium xl:items-end">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {exp.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {exp.location}
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-white/10" />

                <ul className="flex flex-col gap-4">
                  {exp.responsibilities.map((task, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0 shadow-[0_0_8px_#10b981]" />
                      <span className="text-white/70 text-sm sm:text-base leading-relaxed">
                        {task}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
