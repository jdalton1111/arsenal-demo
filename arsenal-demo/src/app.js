import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

// Tailwind is assumed available in canvas preview; styles focus on CM-like dark theme
const Layout = ({ children }) => (
  <div className="min-h-screen bg-neutral-900 text-neutral-100">
    <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="text-xl font-bold tracking-wide text-red-500">A R S E N A L • HUB</Link>
        <nav className="text-sm flex gap-4">
          <NavLink to="/fixtures">Fixtures</NavLink>
          <NavLink to="/table">Table</NavLink>
          <NavLink to="/players">Players</NavLink>
          <NavLink to="/news">News</NavLink>
        </nav>
        <div className="ml-auto">
          <SearchBar />
        </div>
      </div>
    </header>
    <main className="max-w-6xl mx-auto p-4">{children}</main>
    <footer className="max-w-6xl mx-auto px-4 py-6 text-xs text-neutral-400 border-t border-neutral-800">
      Data shown is demo only. Hook up an API later. © Arsenal Hub (fan project)
    </footer>
  </div>
);

const NavLink = ({ to, children }) => (
  <Link to={to} className={({ isActive }) =>
    `px-3 py-1 rounded-md hover:bg-neutral-800 transition ${window.location.pathname === to ? 'bg-neutral-800 text-white' : 'text-neutral-300'}`
  }>{children}</Link>
);

const SearchBar = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  return (
    <form onSubmit={(e)=>{e.preventDefault(); if(q.trim()) navigate(`/players?q=${encodeURIComponent(q)}`)}}>
      <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search players..." className="bg-neutral-800/70 border border-neutral-700 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"/>
    </form>
  );
};

// --- Demo Data (replace with API later) ---
const demoPlayers = [
  { id: 1, name: "Declan Rice", pos: "DM", nationality: "ENG", minutes: 3200, tackles: 98, tacklesWon: 72, passes: 2600, passesCompleted: 2365, shots: 44, goals: 8, assists: 6 },
  { id: 2, name: "Martin Ødegaard", pos: "AM", nationality: "NOR", minutes: 3005, tackles: 42, tacklesWon: 23, passes: 2820, passesCompleted: 2530, shots: 96, goals: 14, assists: 10 },
  { id: 3, name: "Ben White", pos: "RB", nationality: "ENG", minutes: 3150, tackles: 90, tacklesWon: 60, passes: 2100, passesCompleted: 1950, shots: 32, goals: 4, assists: 7 },
  { id: 4, name: "William Saliba", pos: "CB", nationality: "FRA", minutes: 3330, tackles: 70, tacklesWon: 55, passes: 2800, passesCompleted: 2670, shots: 12, goals: 2, assists: 1 },
  { id: 5, name: "Bukayo Saka", pos: "RW", nationality: "ENG", minutes: 2990, tackles: 35, tacklesWon: 18, passes: 1650, passesCompleted: 1410, shots: 110, goals: 16, assists: 12 },
];

const demoFixtures = [
  { id: "ARS-MCI-2025-08-17", date: "2025-08-17", comp: "Premier League", home: "Arsenal", away: "Man City", venue: "Emirates" },
  { id: "CHE-ARS-2025-08-24", date: "2025-08-24", comp: "Premier League", home: "Chelsea", away: "Arsenal", venue: "Stamford Bridge" },
];

const demoResults = [
  { id: "ARS-TOT-2025-05-12", date: "2025-05-12", comp: "Premier League", home: "Arsenal", away: "Spurs", score: "2–1", xgHome: 1.9, xgAway: 1.1, stats: { shotsH: 15, shotsA: 9, possH: 55, possA: 45, tacklesH: 19, tacklesA: 17 } },
];

const demoTable = [
  { team: "Arsenal", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
  { team: "Man City", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
  { team: "Liverpool", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
];

// Utilities
const pct = (num, den) => (den ? (num/den)*100 : 0);

// --- Pages ---
/*  Home, Fixtures, TablePage, LeagueTable, Players, PlayerPage,
    MatchPage, News, FixturePage, NotFound, Card, Th, Stat, BadgeStat, TopTacklePct 
    remain identical to your original file — just with `window.location.search`
    wherever you had `location.search`.  Paste the rest of your original code here.
*/

// --- App Router ---
const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/fixtures" element={<Fixtures/>}/>
        <Route path="/fixture/:id" element={<FixturePage/>}/>
        <Route path="/table" element={<TablePage/>}/>
        <Route path="/players" element={<Players/>}/>
        <Route path="/player/:id" element={<PlayerPage/>}/>
        <Route path="/match/:id" element={<MatchPage/>}/>
        <Route path="/news" element={<News/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Layout>
  </Router>
);

export default App;


