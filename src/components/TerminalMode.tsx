import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

const TerminalMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [isHafsAiInstalled, setIsHafsAiInstalled] = useState(() => sessionStorage.getItem('hafsai_installed') === 'true');
  const [bootText, setBootText] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // KNOWLEDGE BASE FOR TERMINAL AI
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
      response: "> QUERY MATCH: 'EXPERIENCE & EDUCATION'\n> EDUCATION: BS Computer Science at COMSATS University Islamabad, Bahawalnagar Campus.\n> OBJECTIVE: Eager to build intelligent, real-world solutions in an AI/ML or software engineering role.\n> COURSEWORK: Agentic AI Bootcamp, Intro to Python, CS50x."
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

  // Boot sequence logic
  useEffect(() => {
    if (isOpen) {
      setIsBooting(true);
      setHistory([]);
      let step = 0;
      const bootLines = [
        'Booting Neural_Interface_Node_01...',
        'Loading monochrome aesthetic modules... OK',
        'Mounting virtual filesystems... OK',
        'Starting neural network interface... OK',
        'Establishing secure connection... OK',
        'Access granted.'
      ];

      const interval = setInterval(() => {
        if (step < bootLines.length) {
          setBootText((prev) => prev + (prev ? '\n' : '') + bootLines[step]);
          step++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsBooting(false);
            setBootText('');
            inputRef.current?.focus();
          }, 100);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Focus input
  useEffect(() => {
    if (isOpen && !isBooting) {
      inputRef.current?.focus();
    }
  }, [isOpen, isBooting]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, bootText]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setInput('');

    if (!cmd) return;

    let output: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div className="text-white/70">
            Available commands:<br />
            <span className="text-white font-bold">whoami</span> - Display biography<br />
            <span className="text-white font-bold">ls</span> - List directory contents<br />
            <span className="text-white font-bold">cat &lt;file&gt;</span> - View file contents<br />
            <span className="text-white font-bold">hafsai &lt;query&gt;</span> - Ask the HafsAI assistant<br />
            <span className="text-white font-bold">clear</span> - Clear terminal<br />
            <span className="text-white font-bold">exit</span> - Close terminal mode
          </div>
        );
        break;
      case 'whoami':
        output = (
          <div className="flex flex-col sm:flex-row gap-6 mt-4 mb-4">
            <div className="shrink-0 relative group">
              <img
                src="/profile.jpg"
                alt="Hafsa Maryam"
                className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-sm border-2 border-white/20 opacity-80 group-hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-white/5 mix-blend-overlay pointer-events-none" />
              {/* Scanline over image */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02),rgba(255,255,255,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-50" />
            </div>
            <div className="flex flex-col text-[#D7E2EA]/80 gap-1 font-mono">
              <div className="text-white font-bold text-lg mb-2">hafsa@portfolio-os</div>
              <div>-------------------</div>
              <div><span className="text-white/50 font-bold">OS:</span> HafsaOS v1.0.0</div>
              <div><span className="text-white/50 font-bold">Host:</span> Neural_Interface_Node_01</div>
              <div><span className="text-white/50 font-bold">Kernel:</span> 5.15.0-generic (Cybernetics)</div>
              <div><span className="text-white/50 font-bold">Uptime:</span> Unknown</div>
              <div><span className="text-white/50 font-bold">Packages:</span> 4096 (npm), 256 (pip)</div>
              <div><span className="text-white/50 font-bold">Shell:</span> bash 5.1.16</div>
              <div><span className="text-white/50 font-bold">Role:</span> AI/ML & Full-Stack Dev</div>
              <div><span className="text-white/50 font-bold">Location:</span> Bahawalnagar, Pakistan</div>
              <div className="mt-2 flex gap-2 opacity-50">
                <span className="bg-[#111] w-4 h-4 inline-block" />
                <span className="bg-[#333] w-4 h-4 inline-block" />
                <span className="bg-[#555] w-4 h-4 inline-block" />
                <span className="bg-[#777] w-4 h-4 inline-block" />
                <span className="bg-[#999] w-4 h-4 inline-block" />
                <span className="bg-[#bbb] w-4 h-4 inline-block" />
                <span className="bg-[#ddd] w-4 h-4 inline-block" />
                <span className="bg-white w-4 h-4 inline-block" />
              </div>
            </div>
          </div>
        );
        break;
      case 'ls':
        output = (
          <div className="flex gap-4">
            <span className="text-white font-bold">projects/</span>
            <span className="text-white font-bold">skills/</span>
            <span className="text-white/70">resume.pdf</span>
            <span className="text-white/70">contact.txt</span>
          </div>
        );
        break;
      case 'cat resume.pdf':
        output = 'Error: Cannot print binary file to terminal. Please use the GUI to download.';
        break;
      case 'cat contact.txt':
        output = 'Email: hafsamaryam.823@gmail.com\nLinkedIn: /in/hafsa-maryam08';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        setIsOpen(false);
        return;
      default:
        if (cmd.startsWith('cat ')) {
          output = `cat: ${cmd.slice(4)}: Permission denied`;
        } else if (cmd === 'sudo' || cmd.startsWith('sudo ')) {
          output = 'hafsa is not in the sudoers file. This incident will be reported to the cyber police.';
        } else if (cmd === 'date') {
          output = new Date().toString();
        } else if (cmd === 'matrix') {
          output = 'Wake up, Neo... The Matrix has you...';
        } else if (cmd.includes('install hafsai')) {
          setIsBusy(true);
          setHistory((prev) => [...prev, { command: input, output: '' }]);

          const installSequence = [
            '> Resolving dependencies...',
            '> Fetching packages from hafsai-registry...',
            '> Downloading hafsai-core-v1.0.0 [====================] 100%',
            '> Extracting neural models...',
            '> Compiling quantum pathways...',
            '> HafsAI successfully installed!',
            'Type "hafsai" to initialize the AI assistant.'
          ];

          for (let i = 0; i < installSequence.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 400));
            setHistory(prev => {
              const newHistory = [...prev];
              if (newHistory.length === 0) return newHistory;
              const lastIdx = newHistory.length - 1;
              newHistory[lastIdx] = {
                ...newHistory[lastIdx],
                output: (
                  <div className="flex flex-col gap-1 mt-1 text-white/60">
                    {installSequence.slice(0, i + 1).map((line, idx) => (
                      <span key={idx} className={line.includes('successfully') ? 'text-white font-bold' : ''}>
                        {line}
                      </span>
                    ))}
                    {i < installSequence.length - 1 && <span className="animate-pulse text-white">_</span>}
                  </div>
                )
              };
              return newHistory;
            });
          }
          sessionStorage.setItem('hafsai_installed', 'true');
          setIsHafsAiInstalled(true);
          setIsBusy(false);
          return;
        } else if (cmd === 'hafsai' || cmd.startsWith('hafsai ')) {
          if (!isHafsAiInstalled) {
            output = (
              <span className="text-white/60">
                Error: HafsAI is not installed. Please run <span className="text-white font-bold">"sudo install hafsai"</span> first.
              </span>
            );
          } else if (cmd === 'hafsai') {
            output = '> GREETING PROTOCOL: ENGAGED\n> Hello. I am HafsAI. Usage: hafsai <query>\n> Example: hafsai projects, hafsai skills, hafsai contact';
          } else {
            const query = cmd.slice(7).toLowerCase();
            let found = false;

            for (const kb of KNOWLEDGE_BASE) {
              if (kb.keywords.some(kw => query.includes(kw))) {
                output = kb.response;
                found = true;
                break;
              }
            }

            if (!found) {
              output = DEFAULT_RESPONSE;
            }
          }
        } else {
          output = `Command not found: ${cmd}. Type 'help' for available commands.`;
        }
    }

    setHistory((prev) => [...prev, { command: input, output }]);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[76px] right-4 sm:bottom-20 sm:right-6 z-[60] flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 hover:scale-110 hover:border-white/50 hover:bg-black/80 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] group"
        title="Open Terminal"
      >
        <TerminalIcon className="h-5 w-5 text-white/50 transition-colors group-hover:text-white" />
      </button>

      {/* Terminal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6 cursor-default">
          {/* Minimalist Glass Window */}
          <div className="w-full max-w-5xl h-[85vh] bg-[#0C0C0C]/95 backdrop-blur-3xl rounded-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.02)] flex flex-col overflow-hidden relative">

            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02] select-none">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/40 cursor-pointer transition-colors" onClick={() => setIsOpen(false)} title="Close" />
                <div className="h-3 w-3 rounded-full border border-white/10 bg-transparent" />
                <div className="h-3 w-3 rounded-full border border-white/10 bg-transparent" />
              </div>
              <div className="text-white/40 text-xs font-mono uppercase tracking-[0.2em]">Neural_Terminal_v2</div>
              <div className="w-16"></div> {/* Spacer for centering */}
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 font-mono text-sm sm:text-base text-[#D7E2EA]/80 cursor-text custom-scrollbar" onClick={() => !isBooting && inputRef.current?.focus()}>

              {isBooting ? (
                <div className="whitespace-pre-wrap">{bootText}<span className="animate-pulse">_</span></div>
              ) : (
                <>
                  <div className="mb-8 whitespace-pre-wrap select-none text-white font-bold animate-[fadeIn_0.5s_ease-out]">
                    <span className="text-white/60 font-normal">Welcome to Neural Terminal</span><br />
                    <span className="text-white/60 font-normal">Type <span className="text-white">'help'</span> to see available commands.</span><br />
                    <br />
                  </div>

                  <div className="flex-1">
                    {history.map((entry, i) => (
                      <div key={i} className="mb-5">
                        <div className="flex items-center gap-2 select-none flex-wrap opacity-70">
                          <span className="text-white font-bold">guest@portfolio</span>
                          <span className="text-white/50">:</span>
                          <span className="text-white/80 font-bold">~</span>
                          <span className="text-white/50">$</span>
                          <span className="text-white font-medium">{entry.command}</span>
                        </div>
                        <div className="mt-2 whitespace-pre-wrap text-white/70 leading-relaxed font-light">
                          {entry.output}
                        </div>
                      </div>
                    ))}

                    <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4 flex-wrap opacity-70 focus-within:opacity-100 transition-opacity">
                      <span className="text-white font-bold select-none">guest@portfolio</span>
                      <span className="text-white/50 select-none">:</span>
                      <span className="text-white/80 font-bold select-none">~</span>
                      <span className="text-white/50 select-none">$</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isBusy}
                        className={`flex-1 min-w-[200px] bg-transparent border-none outline-none font-mono shadow-none focus:ring-0 p-0 font-medium ${isBusy ? 'text-white/30' : 'text-white'}`}
                        autoComplete="off"
                        spellCheck="false"
                        autoFocus
                      />
                    </form>
                    <div ref={bottomRef} className="h-8" />
                  </div>
                </>
              )}
            </div>

            {/* Minimal Scanline effect overlaid on terminal window */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(255,255,255,1)_50%)] bg-[length:100%_4px] z-0 mix-blend-overlay"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default TerminalMode;
