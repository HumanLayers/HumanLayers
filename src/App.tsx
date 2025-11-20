import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Github, Twitter, Cpu, Shield, Brain, Sparkles, Activity } from 'lucide-react';
import LayerVisualizer from './components/LayerVisualizer';
import PromptLab from './components/PromptLab';
import { LayerData } from './types';

// -- Components --

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/5' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
           {/* Custom Typographic Logo */}
          <span className="text-xl tracking-[0.1em] text-white transition-opacity hover:opacity-80">
             <span className="font-bold">HUMAN</span>
             <span className="font-light text-gray-300">LAYERS</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="relative text-sm font-medium text-gray-400 hover:text-white transition-colors group py-2">
            Layers
            {location.pathname === '/' && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-px bg-primary shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
            )}
          </Link>
          <Link to="/explanation" className="relative text-sm font-medium text-gray-400 hover:text-white transition-colors group py-2">
            The Layer
            {location.pathname === '/explanation' && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-px bg-primary shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
            )}
          </Link>
          <Link to="/prompts" className="relative text-sm font-medium text-gray-400 hover:text-white transition-colors group py-2">
            Prompt Lab
            {location.pathname === '/prompts' && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-px bg-primary shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
            )}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-b border-white/10 overflow-hidden backdrop-blur-xl"
          >
            <div className="flex flex-col p-6 gap-6 items-center text-center">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-xl font-light tracking-wider text-white">Layers</Link>
              <Link to="/explanation" onClick={() => setIsOpen(false)} className="text-xl font-light tracking-wider text-white">The Layer</Link>
              <Link to="/prompts" onClick={() => setIsOpen(false)} className="text-xl font-light tracking-wider text-white">Prompt Lab</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
    <footer className="py-12 border-t border-white/5 bg-black text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-start gap-2">
                 <span className="font-bold tracking-widest text-gray-300 uppercase text-xs">
                    <span className="font-bold">HUMAN</span>LAYERS
                 </span>
                 <p className="text-xs text-gray-600">The Missing Link in Artificial Intelligence.</p>
            </div>
            
            <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-medium text-gray-400 flex items-center gap-1.5">
                    Made with <span className="text-red-500 animate-pulse">❤️</span> by Kshiteej Mali
                </p>
                <span className="text-[10px] uppercase tracking-widest text-gray-700">HumanLayers™ &copy; 2025</span>
            </div>

            <div className="flex gap-6 opacity-50 hover:opacity-100 transition-opacity">
                <Github size={16} className="cursor-pointer" />
                <Twitter size={16} className="cursor-pointer" />
            </div>
        </div>
    </footer>
);

// -- Interactive Explanation Page --

const ExplanationPage = () => {
    const steps = [
        {
            id: 1,
            icon: <Cpu className="text-gray-400" />,
            title: "Raw Model Output",
            desc: "Models like GPT-4 or Gemini are statistical engines. They predict the next token based on massive datasets. Left unchecked, they can be hallucinating, biased, or simply unhelpful.",
            color: "bg-gray-800",
            borderColor: "border-gray-700"
        },
        {
            id: 2,
            icon: <Shield className="text-secondary" />,
            title: "Safety & Alignment",
            desc: "The first pass of the Human Layer. We intercept the prompt and the response. We check for PII, toxicity, and jailbreak attempts. We align the intent with safety guidelines.",
            color: "bg-secondary/10",
            borderColor: "border-secondary/30"
        },
        {
            id: 3,
            icon: <Brain className="text-primary" />,
            title: "Context & Memory",
            desc: "AI has no memory. We provide it. We inject relevant context, user history, and vectorized knowledge (RAG) so the model knows WHO you are and WHAT you're working on.",
            color: "bg-primary/10",
            borderColor: "border-primary/30"
        },
        {
            id: 4,
            icon: <Sparkles className="text-accent" />,
            title: "Human-Ready Output",
            desc: "The final pass. We format the data, render UI components, and present the AI's intelligence in a way that feels natural, intuitive, and perfectly usable.",
            color: "bg-accent/10",
            borderColor: "border-accent/30"
        }
    ];

    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="min-h-screen pt-28 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
                    >
                        Inside <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Layer 4</span>
                    </motion.h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        The journey from raw compute to human connection. Interact with the stack to see how we bridge the gap.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Interactive Steps */}
                    <div className="space-y-4">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => setActiveStep(idx)}
                                className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden group ${activeStep === idx ? `${step.borderColor} ${step.color}` : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                            >
                                <div className="flex items-start gap-4 relative z-10">
                                    <div className={`p-3 rounded-lg ${activeStep === idx ? 'bg-black/20' : 'bg-black/40'} transition-colors`}>
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h3 className={`text-xl font-bold mb-2 ${activeStep === idx ? 'text-white' : 'text-gray-300'}`}>{step.title}</h3>
                                        <p className={`text-sm leading-relaxed ${activeStep === idx ? 'text-gray-200' : 'text-gray-500'}`}>{step.desc}</p>
                                    </div>
                                </div>
                                {activeStep === idx && (
                                    <motion.div 
                                        layoutId="active-glow"
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-20"
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '100%' }}
                                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Visual Representation */}
                    <div className="relative h-[600px] bg-black rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center p-8">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.1),transparent_70%)]" />
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                transition={{ duration: 0.5 }}
                                className="relative z-10 text-center w-full"
                            >
                                {activeStep === 0 && (
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="w-32 h-32 rounded-full border-4 border-dashed border-gray-700 animate-[spin_10s_linear_infinite] flex items-center justify-center">
                                            <Cpu size={48} className="text-gray-500" />
                                        </div>
                                        <div className="font-mono text-green-500 text-xs bg-black p-4 rounded-lg border border-gray-800 w-full max-w-xs text-left mx-auto">
                                            {`> token_pred: 0.92\n> output: "kill process"\n> context: null\n> safety: UNCHECKED`}
                                        </div>
                                    </div>
                                )}
                                {activeStep === 1 && (
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="w-40 h-40 rounded-full bg-secondary/10 border border-secondary flex items-center justify-center relative">
                                            <Shield size={64} className="text-secondary" />
                                            <motion.div 
                                                className="absolute inset-0 border-2 border-secondary rounded-full"
                                                animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                            />
                                        </div>
                                        <div className="text-secondary font-bold tracking-widest">SCANNING... SECURE</div>
                                    </div>
                                )}
                                {activeStep === 2 && (
                                    <div className="flex flex-col items-center gap-6">
                                         <div className="grid grid-cols-2 gap-4">
                                            {[1,2,3,4].map(i => (
                                                <motion.div 
                                                    key={i}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-center"
                                                >
                                                    <Activity size={24} className="text-primary" />
                                                </motion.div>
                                            ))}
                                         </div>
                                         <div className="text-primary font-mono text-sm">Vector Database: Connected</div>
                                    </div>
                                )}
                                {activeStep === 3 && (
                                    <div className="flex flex-col items-center gap-6">
                                        <motion.div 
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                            className="w-full max-w-xs h-64 glass rounded-2xl border border-accent/50 p-6 flex flex-col gap-4 mx-auto"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                                                <Sparkles size={24} className="text-accent" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-2 w-full bg-white/10 rounded-full" />
                                                <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                                                <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                                            </div>
                                            <div className="mt-auto px-4 py-2 bg-accent text-black text-sm font-bold rounded-lg text-center">
                                                Aligned Action
                                            </div>
                                        </motion.div>
                                        <p className="text-accent tracking-widest uppercase text-sm">Ready for User</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

// -- Landing Page Sections --

const Hero = () => {
  const [selectedLayer, setSelectedLayer] = useState<LayerData | null>(null);

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* 3D Background */}
      <LayerVisualizer onLayerSelect={setSelectedLayer} />

      {/* Overlay Content */}
      <div className="z-10 pointer-events-none text-center space-y-8 max-w-4xl px-6 mt-[-50px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-black/50 text-gray-300 text-[10px] font-mono uppercase tracking-[0.2em] backdrop-blur-md">
            System Status: Online
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mix-blend-overlay">
            <span className="font-bold">HUMAN</span><span className="font-light">LAYERS</span>
          </h1>
          <p className="text-lg md:text-2xl text-primary/80 font-light tracking-wide mt-2">
            Layer 4 of the AI Stack
          </p>
        </motion.div>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base md:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed font-light"
        >
            The critical interface that makes Artificial Intelligence safe, reliable, and human-aligned.
        </motion.p>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="pt-4 pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-6"
        >
             <Link to="/explanation" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors text-sm tracking-wide">
                Explore The Layer
             </Link>
             <Link to="/prompts" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
                Try Prompt Lab <ChevronRight size={14} />
             </Link>
        </motion.div>
      </div>

      {/* Selected Layer Modal */}
      <AnimatePresence>
        {selectedLayer && (
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="absolute right-8 top-1/3 w-80 glass p-8 rounded-3xl border-l-2 z-20 pointer-events-auto backdrop-blur-xl bg-black/80"
                style={{ borderLeftColor: selectedLayer.color }}
            >
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl font-bold tracking-tight" style={{ color: selectedLayer.color }}>{selectedLayer.name}</h3>
                    <button onClick={() => setSelectedLayer(null)} className="text-gray-500 hover:text-white"><X size={18} /></button>
                </div>
                <div className="w-12 h-1 bg-white/10 mb-4 rounded-full" />
                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">{selectedLayer.description}</p>
                <p className="text-gray-200 leading-relaxed text-sm font-light">
                    {selectedLayer.details}
                </p>
            </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Features = () => {
    const features = [
        { title: "Intent Translation", desc: "We convert vague human desires into precise prompt architecture automatically.", icon: <Brain size={20} /> },
        { title: "Safety Rails", desc: "Real-time intervention preventing hallucinations and misalignment before output.", icon: <Shield size={20} /> },
        { title: "Memory Matrix", desc: "Persistent context across sessions without token limit overflow.", icon: <Cpu size={20} /> },
    ];

    return (
        <section className="py-32 bg-surface relative z-10">
             <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all hover:bg-white/[0.07]"
                        >
                            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mb-6 border border-white/10 text-gray-400">
                                {f.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-3 text-white">{f.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
             </div>
        </section>
    );
}

const LandingPage = () => (
    <>
        <Hero />
        <Features />
    </>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white font-sans selection:bg-primary selection:text-black">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explanation" element={<ExplanationPage />} />
          <Route path="/prompts" element={<PromptLab />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;