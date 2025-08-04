# 🦜 Parrot Parrot – The AI Telephone Game

> A silly, real-time multiplayer game where players whisper phrases into an AI parrot and guess what it thought they meant — chaos and laughter guaranteed.

---

## 🎮 Overview

**Parrot Parrot** is a social browser game inspired by _Chinese whispers_, but with an AI twist.

- One player types a creative sentence.
- The AI parrot hilariously transforms it into themed gibberish.
- Other players guess the original sentence from the AI's bizarre output.
- Closer guesses earn more points.
- Play continues for a few rounds — laughter guaranteed!

Whether you're playing with friends or tackling the daily single-player mode, the game is all about fun, unpredictability, and seeing just how wrong things can go.

---

## ✨ Features

- 🎲 Real-time multiplayer rooms (create/join)
- 🎭 Parrot personalities & transformation themes
- ⚙️ Custom game settings (rounds, players, theme)
- 🧠 GPT-powered "parrot speak" & quirky commentary
- 🧮 Local scoring using Levenshtein distance
- 🏆 Leaderboard, badges, and funny awards
- 📅 Optional daily single-player mode
- 📤 Shareable game summaries

---

## ⚙️ Tech Stack

### 💻 Frontend

- **React (Vite)** – Fast UI rendering
- **Tailwind CSS** – Utility-first styling
- **Framer Motion** – Smooth animations
- **React Router** – Client-side routing
- **Socket.io-client** – Real-time multiplayer support

### 🧠 Backend

- **Node.js + Express** – API and server logic
- **Socket.io** – Multiplayer room handling
- **OpenAI GPT-4** – Sentence transformations & commentary
- **js-levenshtein** – Local similarity scoring
- **JWT** – Auth & room access control
- **MongoDB Atlas** _(optional)_ – Game history and profiles

### 📦 Dev & Deployment

- **Vercel** – Frontend hosting
- **Railway / Render** – Backend deployment
- **Postman** – API testing
- **GitHub** – Version control

---

## ⏱ 10-Day Build Plan

| Day | Task                                                |
| --- | --------------------------------------------------- |
| 1   | Project setup, repo initialization, basic UI mockup |
| 2   | Implement room creation/joining (Socket.io setup)   |
| 3   | Build round logic: phrase input, AI transformation  |
| 4   | Player input: guesses + local similarity scoring    |
| 5   | Leaderboard, round transitions                      |
| 6   | Add GPT parrot personalities/themes                 |
| 7   | UI polish: Tailwind + Framer Motion                 |
| 8   | Add game settings (rounds, themes, names)           |
| 9   | Single-player mode + funny badges                   |
| 10  | Final testing, deploy on Vercel + Render, docs      |

---

## 🧪 How It Works

- 🧑‍🎤 **One player types a sentence.**
- 🦜 **AI Parrot (GPT-4)** rewrites it based on selected theme/personality.
- 🤔 **Other players guess** what the original sentence was.
- ✅ **Score is calculated** using Levenshtein distance (the fewer changes, the better!).
- 🥳 **Funny commentary** by the parrot after each round.

---
