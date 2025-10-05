"use Client"
import { Pen, Sparkles, Zap, Users, Download, Layers } from 'lucide-react';
import { useState, useEffect } from 'react';

function DashBoard() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pen className="w-7 h-7 text-blue-600" strokeWidth={2.5} />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              DrawFlow
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
              Features
            </a>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all hover:scale-105 font-medium shadow-lg shadow-blue-600/30">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center animate-fade-in"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-8 animate-bounce-subtle">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Now with real-time collaboration</span>
            </div>

            <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent leading-tight">
              Sketch Ideas,<br />Share Instantly
            </h1>

            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              A powerful, intuitive drawing tool for brainstorming, wireframing, and visual collaboration.
              Create beautiful diagrams in seconds.
            </p>

            <div className="flex items-center justify-center gap-4">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all hover:scale-105 font-semibold text-lg shadow-xl shadow-blue-600/40 hover:shadow-2xl hover:shadow-blue-600/50">
                Start Drawing
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 rounded-full hover:bg-slate-50 transition-all hover:scale-105 font-semibold text-lg shadow-lg border border-slate-200">
                View Demo
              </button>
            </div>
          </div>

          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent pointer-events-none z-10"></div>
            <div
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-float"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01) * 10}px)`,
              }}
            >
              <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-2xl animate-float-delayed rotate-12"></div>
                <div className="absolute bottom-10 right-10 w-40 h-24 bg-cyan-200 rounded-full animate-float"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-blue-400 rounded-3xl animate-pulse-slow rotate-45"></div>
                <Pen className="w-24 h-24 text-blue-600 z-10" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-slate-900">Everything you need</h2>
            <p className="text-xl text-slate-600">Powerful features for creative minds</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Instant load times and smooth performance, even with complex drawings',
                color: 'from-yellow-400 to-orange-500',
              },
              {
                icon: Users,
                title: 'Real-time Collaboration',
                description: 'Work together seamlessly with your team in real-time',
                color: 'from-blue-400 to-cyan-500',
              },
              {
                icon: Download,
                title: 'Export Anywhere',
                description: 'Export to PNG, SVG, or share with a simple link',
                color: 'from-green-400 to-emerald-500',
              },
              {
                icon: Layers,
                title: 'Infinite Canvas',
                description: 'Never run out of space with our unlimited drawing canvas',
                color: 'from-purple-400 to-pink-500',
              },
              {
                icon: Sparkles,
                title: 'Hand-drawn Style',
                description: 'Beautiful hand-drawn aesthetic that brings your ideas to life',
                color: 'from-rose-400 to-red-500',
              },
              {
                icon: Pen,
                title: 'Intuitive Tools',
                description: 'Simple yet powerful drawing tools for every use case',
                color: 'from-indigo-400 to-blue-500',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 hover:border-blue-300 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                style={{
                  animation: `fade-in-up 0.6s ease-out ${index * 0.1}s backwards`,
                }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to start creating?</h2>
          <p className="text-xl mb-10 text-blue-100">Join thousands of creators who trust DrawFlow for their visual work</p>
          <button className="px-10 py-4 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-all hover:scale-105 font-semibold text-lg shadow-2xl">
            Start Drawing Now
          </button>
        </div>
      </section>

      <footer className="py-12 px-6 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Pen className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold text-white">DrawFlow</span>
          </div>
          <p>© 2025 DrawFlow. Sketch your imagination.</p>
        </div>
      </footer>
    </div>
  );
}

export default DashBoard;
