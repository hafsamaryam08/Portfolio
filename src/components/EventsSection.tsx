import FadeIn from './FadeIn';

interface PortfolioEvent {
  id: number;
  image: string;
  title: string;
  description: string;
}

const EVENTS: PortfolioEvent[] = [
  {
    id: 1,
    image: "/events/notion.jfif",
    title: "Notion Community Launch",
    description: "Attended the official Notion Community Launch, exploring innovation, productivity workflows, and networking with tech enthusiasts."
  },
  {
    id: 2,
    image: "/events/tegathon.jfif",
    title: "Tegathon 2.0",
    description: "Participated in Tegathon 2.0 organized by GDSC. Engaged in GitHub-driven activities and tackled real-world problem statements."
  },
  {
    id: 3,
    image: "/events/gdsc.jfif",
    title: "GDSC Community Day",
    description: "Joined a massive collaborative event by GDSC, Microsoft Learn Student Ambassadors, and the Computer Science Society for technical sessions."
  }
];

const EventsSection = () => {
  return (
    <section id="events" className="relative w-full bg-[#0C0C0C] py-20 flex flex-col items-center">
      <div className="relative z-10 w-full flex flex-col">
        <FadeIn y={20}>
          <div className="mb-10 md:mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Events
            </h2>
            <div className="mt-4 h-px w-20 bg-[#10b981]/50 rounded-full" />
            <p className="mt-6 max-w-2xl text-sm md:text-base text-white/60">
              Tech conferences, meetups, and hackathons I've attended.
            </p>
          </div>
        </FadeIn>

        <div
          className="relative w-full overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="flex gap-6 sm:gap-8 px-12 sm:px-20 md:px-32 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {EVENTS.map((event, idx) => (
              <FadeIn key={event.id} delay={idx * 0.1} y={30} className="snap-center h-full flex">
                <div
                  className="group relative flex flex-col shrink-0 h-full w-[280px] sm:w-[340px] md:w-[380px] overflow-hidden rounded-[15px] border border-white/10 bg-[#111111] p-4 md:p-5 transition-all duration-500 hover:scale-[1.02] hover:z-50 hover:bg-[#151515] hover:border-[#10b981]/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]"
                >
                  <div className="relative h-48 sm:h-56 md:h-64 w-full flex flex-col items-center justify-center overflow-hidden rounded-lg bg-black/40 mb-4 border border-white/5 shadow-inner group-hover:border-white/20 transition-all duration-500">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="max-h-full max-w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        draggable={false}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-[#10b981] opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                        <svg className="w-12 h-12 sm:w-16 sm:h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-white/50 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors duration-500">Add Photo</span>
                      </div>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col gap-1.5 px-2">
                    <h3 className="text-white font-bold text-sm sm:text-base tracking-wide line-clamp-1" title={event.title}>{event.title}</h3>
                    <p className="text-white/50 text-xs sm:text-sm line-clamp-2" title={event.description}>{event.description}</p>
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

export default EventsSection;
