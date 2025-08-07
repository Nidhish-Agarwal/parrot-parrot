'use client'

import React, { useState, useEffect } from 'react';
import { Play, Users, Zap, ArrowRight, Settings, Star, Eye } from 'lucide-react';
import Link from 'next/link';

const ParrotLanding = () => {
  const [floatingParrots, setFloatingParrots] = useState([{ id: 0, x: 0, y: 0, delay: 0 }]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    "I cried laughing when the parrot turned 'my cat is sleepy' into 'tiny lion worships naps'.",
    "This game broke my friend group in the best way possible. We can't stop playing!",
    "The AI parrot is absolutely unhinged and I'm here for it. 10/10 would recommend."
  ];

  useEffect(() => {
    // Create floating parrot particles
    const parrots = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 2
    }));
    setFloatingParrots(parrots);

    // Rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <div className="text-2xl">🎭</div>,
      title: "AI Parrot Personalities",
      description: "Pirate, Shakespeare, Alien & more chaos modes"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Real-time Multiplayer",
      description: "Play with friends in custom rooms"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Smart Scoring System",
      description: "Levenshtein distance judges similarity"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Custom Game Settings",
      description: "Rounds, players, themes - your rules"
    }
  ];

  const howToPlaySteps = [
    {
      number: "1",
      emoji: "✍️",
      title: "Type a sentence",
      example: "\"The monkey stole my pizza at the zoo.\""
    },
    {
      number: "2", 
      emoji: "🦜",
      title: "AI Parrot rewrites it",
      example: "\"A jungle thief took cheesy circles under bird watch.\""
    },
    {
      number: "3",
      emoji: "🤔", 
      title: "Other players guess",
      example: "\"Someone stole pizza in a forest?\""
    },
    {
      number: "4",
      emoji: "🏆",
      title: "Closest guess wins!",
      example: "Points awarded by similarity"
    }
  ];

  const faqs = [
    { q: "Do I need to log in?", a: "Nope! Jump right in as a guest or create an account for stats." },
    { q: "Can I play solo?", a: "Yes! Try our daily challenge mode for single-player fun." },
    { q: "Is it free forever?", a: "Absolutely! Parrot chaos should be available to everyone." },
    { q: "Mobile friendly?", a: "100%! Play on any device, anywhere." },
    { q: "How is scoring calculated?", a: "We use smart similarity matching - closer guesses get more points!" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 relative overflow-hidden">
      {/* Floating Parrot Particles */}
      {floatingParrots.map((parrot) => (
        <div
          key={parrot.id}
          className="absolute text-2xl opacity-20 animate-bounce"
          style={{
            left: `${parrot.x}%`,
            top: `${parrot.y}%`,
            animationDelay: `${parrot.delay}s`,
            animationDuration: '3s'
          }}
        >
          🦜
        </div>
      ))}

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center text-2xl animate-pulse shadow-lg">
            🦜
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Parrot Parrot</h1>
            <p className="text-xs text-emerald-100">The AI Telephone Game</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href = "/login" className="px-4 py-2 text-white hover:text-emerald-200 transition-colors font-medium">
            Log In
          </Link>
          <Link href="/signup" className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-16 text-center">
        <div className="mb-8">
          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            🦜 The AI Telephone Game
            <span className="block text-4xl md:text-5xl bg-gradient-to-r from-yellow-300 to-red-400 bg-clip-text text-transparent">
              You Didn't Know You Needed
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
            Turn simple sentences into chaotic gibberish with the help of an AI parrot — then race against friends to guess the original. 
            <span className="font-bold text-yellow-200"> Laughter (and confusion) guaranteed.</span>
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
          <Link href="/signup" className="group px-10 py-5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center space-x-3">
            <Play className="w-6 h-6 group-hover:animate-pulse" />
            <span>Start Game</span>
          </Link>
        </div>

        {/* Player Count */}
        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="font-semibold">128 parrots currently squawking</span>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="relative z-10 bg-white/10 backdrop-blur-lg py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">How to Play</h3>
            <p className="text-xl text-white/80">Brain-dead simple, maximum chaos</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {howToPlaySteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.emoji}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-emerald-600 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.number}
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">{step.title}</h4>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                  <p className="text-white/90 italic text-sm">{step.example}</p>
                </div>
                {index < howToPlaySteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-4 text-white/50 text-2xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">See the Chaos in Action</h3>
            <p className="text-xl text-white/80">Real screenshots from real games</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Lobby Screen", desc: "Create or join rooms with friends" },
              { title: "Parrot at Work", desc: "Watch the AI transform your sentence" },
              { title: "Guess Time", desc: "Race to decode the gibberish" },
              { title: "Score Reveal", desc: "See who got closest (and parrot's commentary)" },
              { title: "Leaderboard", desc: "Climb the ranks of chaos masters" },
              { title: "Daily Challenge", desc: "Fresh madness every day" }
            ].map((screenshot, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                  <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4 flex items-center justify-center group-hover:from-gray-600 group-hover:to-gray-700 transition-all duration-300">
                    <div className="text-center text-white/70">
                      <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Screenshot Preview</p>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{screenshot.title}</h4>
                  <p className="text-white/80 text-sm">{screenshot.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 bg-white/10 backdrop-blur-lg py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">Why You'll Love It</h3>
            <p className="text-xl text-white/80">Features that make the chaos even better</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-red-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2 text-center">{feature.title}</h4>
                <p className="text-white/80 text-sm text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-white mb-12">Players Love the Chaos</h3>
          
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30">
            <div className="mb-6">
              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-xl text-white italic leading-relaxed">
                "{testimonials[currentTestimonial]}"
              </blockquote>
            </div>
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial ? 'bg-yellow-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 bg-white/10 backdrop-blur-lg py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Got Questions?</h3>
            <p className="text-xl text-white/80">We've got answers (probably)</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <h4 className="text-lg font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-white/80">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 backdrop-blur-lg rounded-3xl p-12 border border-yellow-400/30">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🦜 Ready to whisper into the chaos?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of players having the time of their lives!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/signup" className="group px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-bold text-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center space-x-3">
                <Play className="w-7 h-7 group-hover:animate-pulse" />
                <span>Start Playing Now</span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center text-lg">
              🦜
            </div>
            <span className="text-white font-semibold">Parrot Parrot</span>
          </div>
          <p className="text-white/60">Made with 🧠 and way too much caffeine</p>
        </div>
      </footer>
    </div>
  );
};

export default ParrotLanding;