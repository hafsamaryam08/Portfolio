import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, Cpu, User, X, Activity, Zap } from 'lucide-react';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isTyping?: boolean;
};

const KNOWLEDGE_BASE = [
  {
    keywords: ['project', 'work', 'build', 'ardent', 'kaffen', 'anime'],
    response: "> QUERY MATCH: 'PROJECTS'\n> Hafsa has architected several high-performance platforms:\n> 1. [ARdent Study]: AI-powered learning platform with 3D visualization and OCR.\n> 2. [Kaffen - Cafe & Restaurant]: Full-stack MVC restaurant app in Laravel.\n> 3. [Anime Recommender System]: AI content-based recommender deployed on Streamlit."
  },
  {
    keywords: ['skill', 'tech', 'stack', 'language', 'framework', 'react', 'python', 'laravel', 'database'],
    response: "> QUERY MATCH: 'SKILLS'\n> FRONTEND: React.js, React Native, HTML5/CSS3, SASS, Bootstrap\n> BACKEND: Node.js, Express, PHP, Laravel\n> DATABASES: Neo4j (Graph), PostgreSQL, MySQL\n> AI/ML: Scikit-Learn, NumPy, Pandas, Generative AI APIs (Gemini, OpenAI), OCR\n> LANGUAGES: Python, Java, PHP, Dart, C++."
  },
  {
    keywords: ['experience', 'education', 'background', 'university', 'comsats', 'internship'],
    response: "> QUERY MATCH: 'EXPERIENCE & EDUCATION'\n> EDUCATION: BS Computer Science at COMSATS University Islamabad, Sahiwal Campus.\n> OBJECTIVE: Eager to build intelligent, real-world solutions in an AI/ML or software engineering role.\n> COURSEWORK: Agentic AI Bootcamp, Intro to Python, CS50x."
  },
  {
    keywords: ['contact', 'email', 'phone', 'hire', 'reach', 'github', 'linkedin'],
    response: "> QUERY MATCH: 'CONTACT_INFO'\n> EMAIL: hafsamaryam.823@gmail.com\n> PHONE: +92 311 7864771\n> LINKEDIN: linkedin.com/in/hafsa-maryam08\n> GITHUB: github.com/hafsamaryam08"
  },
  {
    keywords: ['age', 'dob', 'date of birth', 'born', 'birthday', 'old', 'birth'],
    response: "> QUERY MATCH: 'PERSONAL_INFO'\n> DATE OF BIRTH: CLASSIFIED\n> AGE: Unknown"
  },
  {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'who', 'system'],
    response: "> GREETING PROTOCOL: ENGAGED\n> Hello. I am an AI architected by Hafsa. Query me regarding her [PROJECTS], [SKILLS], or [CONTACT] info."
  }
];

const DEFAULT_RESPONSE = "> ERROR: QUERY NOT RECOGNIZED.\n> Please restrict queries to parameters: ['projects', 'skills', 'education', 'contact'].";

export default function NeuralInterfaceSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'ai', 
      text: "> Welcome. I am a custom AI engineered by Hafsa Maryam. Ask me about her projects, skills, or experience.", 
      isTyping: true 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isAiTyping, isOpen]);

  // Handle typing effect for the first message
  useEffect(() => {
    if (messages[0].isTyping) {
      const timer = setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === '1' ? { ...m, isTyping: false } : m));
        setIsAiTyping(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isAiTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsAiTyping(true);

    // AI Response logic
    const fetchGroqResponse = async () => {
      // Load API key from environment variable to prevent GitHub auto-revocation
      const apiKey = (import.meta as any).env.VITE_GROQ_API_KEY;

      // If no API key, fallback to local knowledge base
      if (!apiKey) {
        setTimeout(() => {
          const inputLower = userMsg.text.toLowerCase();
          let match = KNOWLEDGE_BASE.find(kb => kb.keywords.some(kw => inputLower.includes(kw)));
          const responseText = match ? match.response : DEFAULT_RESPONSE;
          
          const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: responseText,
            isTyping: true
          };

          setMessages(prev => [...prev, aiMsg]);
          
          setTimeout(() => {
            setMessages(prev => prev.map(m => m.id === aiMsg.id ? { ...m, isTyping: false } : m));
            setIsAiTyping(false);
          }, responseText.length * 20 + 1000);
        }, 800);
        return;
      }

      // Live Groq AI Integration
      try {
        const systemPrompt = `You are HafsAI, a high-tech AI portfolio assistant for Hafsa Maryam.
Your job is to answer questions about Hafsa's experience, skills, and projects in a professional, slightly cyberpunk tone. 
Start every response with "> " to match the terminal aesthetic. Keep answers concise, highly accurate, and directly address the user's question. Do not hallucinate. If you don't know, say "> ERROR: DATA NOT FOUND IN DATABANKS."

Here is Hafsa's exact, up-to-date CV data:

HAFSA MARYAM
Computer Science Graduate | AI/ML & Full-Stack Developer
Sahiwal, Pakistan • +92 311 7864771 • hafsamaryam.823@gmail.com • linkedin.com/in/hafsa-maryam08 • github.com/hafsamaryam08

PROFESSIONAL SUMMARY
Computer Science graduate (CGPA 3.61) with practical experience in AI/ML, full-stack development, and building intelligent applications. Led the development of ARdent Study, an AI-powered learning platform using Python, React, Node.js, and Neo4j, featuring OCR-based concept extraction, a knowledge graph, and 3D visualization. Eager to build intelligent, real-world solutions in an AI/ML or software engineering role.

TECHNICAL SKILLS
- Programming Languages: Python, Java, PHP, Dart, C++
- AI & Data Science: Generative AI APIs (Gemini, OpenAI), OCR (Tesseract), Scikit-Learn, NumPy, Pandas, Machine Learning Algorithms
- Web & Mobile Development: React.js, React Native, Node.js, Express, Three.js, Laravel, Flutter, HTML5, CSS3, SASS, Bootstrap
- Databases: Neo4j (Graph Database), PostgreSQL, MySQL
- Tools & Version Control: Git, GitHub, VS Code

PROJECTS
1. ARdent Study (AR-Powered Contextual Learning Companion)
   - Tech: Python, React, Node.js, Neo4j, OCR (Tesseract), Gemini API, Three.js
   - Built an AI-powered learning platform that uses OCR and Gemini API to extract/summarize concepts from textbook pages. Implemented a 3D visualizer using Three.js and a knowledge graph using Neo4j for personalized study recommendations.

2. Kaffen - Cafe & Restaurant
   - Tech: PHP, Laravel, MySQL
   - Built a robust restaurant web application using PHP, Laravel, and MySQL following the MVC design pattern. Designed relational database schemas and developed user-facing interactive features including reservations and blog management.

3. Anime Recommender System
   - Tech: Python, Scikit-learn, NumPy, Pandas, Streamlit
   - Built a content-based recommendation system in Python using Scikit-learn on a Kaggle dataset. Applied cosine similarity to compare anime based on genres, descriptions, and synopses. Deployed a Streamlit dashboard.

EDUCATION
- Bachelor of Science in Computer Science — COMSATS University Islamabad, Sahiwal Campus (2022 - 2026) | CGPA: 3.61/4.00

COURSEWORK
- Complete Agentic AI Bootcamp With LangGraph and LangChain (Udemy, 2025)
- Introduction to Python (DataCamp, 2024)
- CS50x (edX, 2023)
`;

        const groqMessages = [
          { role: 'system', content: systemPrompt },
          ...messages.filter(m => !m.isTyping).map(m => ({ role: m.sender === 'ai' ? 'assistant' : 'user', content: m.text })),
          { role: 'user', content: userMsg.text }
        ];

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: groqMessages,
            temperature: 0.7,
            max_tokens: 300,
          })
        });

        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        let aiText = data.choices[0]?.message?.content || "> ERROR: NEURAL LINK FAILED.";
        
        // Ensure it starts with terminal prefix
        if (!aiText.startsWith('>')) aiText = "> " + aiText.replace(/\n/g, '\n> ');

        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiText,
          isTyping: true
        };

        setMessages(prev => [...prev, aiMsg]);
        
        setTimeout(() => {
          setMessages(prev => prev.map(m => m.id === aiMsg.id ? { ...m, isTyping: false } : m));
          setIsAiTyping(false);
        }, 1500);

      } catch (error) {
        console.error("Groq API Error:", error);
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "> ERROR: AI NEURAL LINK DISCONNECTED. REVERTING TO LOCAL DATABANKS.",
          isTyping: true
        };
        setMessages(prev => [...prev, errorMsg]);
        
        setTimeout(() => {
          setMessages(prev => prev.map(m => m.id === errorMsg.id ? { ...m, isTyping: false } : m));
          setIsAiTyping(false);
        }, 1500);
      }
    };

    fetchGroqResponse();
  };

  return (
    <>
      {/* Floating Action Button - Highly Animated AI Core */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 group inline-flex items-center justify-center rounded-full h-10 w-10 sm:h-auto sm:w-auto sm:px-5 sm:py-2.5 text-[11px] font-black tracking-widest text-white transition-all duration-300 hover:scale-110 cursor-pointer overflow-hidden isolate"
      >
        {/* Dark Base */}
        <div className="absolute inset-0 -z-30 bg-black" />
        
        {/* Spinning Gradient Border (Glitter/Powered Effect) */}
        <div className="absolute inset-[-150%] -z-20 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(0,0,0,0)_0%,rgba(255,255,255,0.9)_50%,rgba(0,0,0,0)_100%)]" />
        
        {/* Inner Glass Pill */}
        <div className="absolute inset-[2px] -z-10 rounded-full bg-black/90 backdrop-blur-xl transition-colors group-hover:bg-black/70" />

        {/* Outer Glow */}
        <div className="absolute inset-0 -z-40 rounded-full opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]" />

        <Cpu className="w-4 h-4 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] transition-transform group-hover:rotate-180 duration-700" />
        <span className="hidden sm:inline relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] group-hover:text-white transition-colors">HafsAI</span>
        <Zap className="hidden sm:inline w-3.5 h-3.5 text-white animate-pulse drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </button>

      {/* Sidebar Interface */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with CRT scanline effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 pointer-events-none" />
            </motion.div>

            {/* Chat Widget Panel */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-[130px] right-4 left-4 sm:bottom-24 sm:right-6 sm:left-auto z-50 h-[420px] max-h-[60dvh] sm:max-h-[70dvh] w-auto sm:w-[320px] bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.15)] flex flex-col overflow-hidden origin-bottom-right"
            >
              {/* Animated HUD Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />
              
              {/* Laser Scanline */}
              <div className="absolute inset-0 h-full w-full pointer-events-none overflow-hidden z-20">
                <div className="w-full h-[2px] bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-scanline" />
              </div>

              {/* Header */}
              <div className="relative z-30 flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-sm bg-white/5 border border-white/10 overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 animate-pulse" />
                    <Terminal className="w-5 h-5 text-white relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-[0.3em] text-[white] flex items-center gap-2">
                      HafsAI <Activity className="w-3 h-3 text-white/70" />
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping opacity-75 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                      <p className="text-[9px] font-mono text-white/80 tracking-widest">
                        HafsAI Core Online
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-sm bg-white/5 border border-white/10 text-[white] hover:bg-white/10 hover:text-white transition-all hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="relative z-10 flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar scroll-smooth">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, type: "spring" }}
                      className={`flex flex-col gap-2 max-w-[90%] ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}
                    >
                      {/* Sender Label */}
                      <div className={`flex items-center gap-2 text-[9px] font-mono tracking-widest ${msg.sender === 'user' ? 'justify-end text-white/60' : 'text-[white]'}`}>
                        {msg.sender === 'user' ? (
                          <>GUEST_USER <User className="w-3 h-3" /></>
                        ) : (
                          <><Cpu className="w-3 h-3" /> HafsAI</>
                        )}
                      </div>

                      {/* Message Body */}
                      <div className={`relative px-4 py-3 text-sm font-mono leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-white/5 backdrop-blur-sm border-r-2 border-white/30 text-white' 
                          : 'bg-white/10 backdrop-blur-sm border-l-2 border-white/50 text-[white]'
                      }`}>
                        {/* High-tech corner accents */}
                        <div className={`absolute top-0 w-2 h-px ${msg.sender === 'user' ? 'right-0 bg-white/50' : 'left-0 bg-white/80'}`} />
                        <div className={`absolute bottom-0 w-2 h-px ${msg.sender === 'user' ? 'right-0 bg-white/50' : 'left-0 bg-white/80'}`} />

                        {msg.isTyping ? (
                          <div className="flex items-center gap-2">
                            <span className="animate-pulse text-[white]">DECRYPTING_DATA</span>
                            <div className="flex gap-1">
                              <span className="w-1 h-3 bg-white/50 animate-[pulse_1s_infinite_0ms]" />
                              <span className="w-1 h-3 bg-white/50 animate-[pulse_1s_infinite_150ms]" />
                              <span className="w-1 h-3 bg-white/50 animate-[pulse_1s_infinite_300ms]" />
                            </div>
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap">
                            {msg.sender === 'ai' ? <ScrambledTypewriter text={msg.text} /> : msg.text}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} className="h-4" />
              </div>

              {/* Input Area */}
              <div className="relative z-20 p-4 border-t border-white/10 bg-white/5 backdrop-blur-md">
                <form onSubmit={handleSend} className="relative flex items-center group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/50 font-mono">
                    {'>'}
                  </div>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter command..."
                    disabled={isAiTyping}
                    className="w-full bg-black/40 backdrop-blur-md border border-white/10 py-3 pl-8 pr-14 text-sm font-mono text-[white] placeholder-white/30 focus:outline-none focus:border-white/50 focus:bg-white/5 transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isAiTyping}
                    className="absolute right-2 p-2 bg-white/5 text-white/80 border border-transparent hover:border-white/40 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:hover:border-transparent disabled:hover:bg-white/5 font-mono text-[10px] uppercase tracking-widest flex items-center gap-1"
                  >
                    EXEC
                  </button>
                  {/* Blinking cursor effect on focus */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </>
  );
}

// Scrambled Typewriter Effect for Cyberpunk vibe
function ScrambledTypewriter({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const chars = '!<>-_\\\\/[]{}—=+*^?#________';
  
  useEffect(() => {
    let iteration = 0;
    const maxIterations = text.length;
    
    const interval = setInterval(() => {
      setDisplayedText(prev => {
        return text
          .split('')
          .map((letter, index) => {
            if(index < iteration) {
              return text[index];
            }
            if (letter === ' ' || letter === '\n') return letter;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
      });
      
      iteration += 1/2; // Adjust speed here
      
      if(iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayedText(text);
      }
    }, 15);
    
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
}
