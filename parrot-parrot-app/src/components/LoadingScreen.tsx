import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-8 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Background Parrots */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-20 text-4xl animate-bounce" style={{ animationDelay: '0s' }}>🦜</div>
        <div className="absolute top-40 right-32 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>🦜</div>
        <div className="absolute bottom-32 left-40 text-5xl animate-bounce" style={{ animationDelay: '1s' }}>🦜</div>
        <div className="absolute bottom-20 right-20 text-3xl animate-bounce" style={{ animationDelay: '1.5s' }}>🦜</div>
      </div>

      <div className="flex flex-col items-center relative z-10">
        {/* Main Parrot Spinner */}
        <div className="relative w-24 h-24 mb-8">
          {/* Outer tropical gradient ring */}
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              background: "conic-gradient(from 0deg, transparent, #22d3ee, #10b981, #f59e0b, #ef4444, transparent)",
              animationDuration: "1.5s",
            }}
          />

          {/* Middle ring with different speed */}
          <div
            className="absolute inset-2 rounded-full animate-spin"
            style={{
              background: "conic-gradient(from 180deg, transparent, #fbbf24, #ec4899, transparent)",
              animationDuration: "2s",
              animationDirection: "reverse"
            }}
          />

          {/* Inner parrot icon */}
          <div className="absolute inset-3 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
            <div className="text-3xl animate-pulse">🦜</div>
          </div>
        </div>
        {/* Loading Text with Tropical Theme */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 text-white/90">
            <span className='text-2xl font-semibold text-white mb-3'>Getting Ready</span>
            <div className="flex space-x-1">
              <div
                className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>

        {/* Tropical Progress Bar */}
        <div className="w-64 h-2 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden border border-white/30">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full relative overflow-hidden"
            style={{
              width: "75%",
              animation: "tropical-progress 3s ease-in-out infinite"
            }}
          >
            {/* Shimmer effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{
                animation: "shimmer 2s infinite"
              }}
            />
          </div>
        </div>

        {/* Fun Loading Messages */}
        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm animate-pulse">
            Teaching AI parrots to speak gibberish... 🤖
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes tropical-progress {
          0%, 100% {
            width: 20%;
          }
          50% {
            width: 85%;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;