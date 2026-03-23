"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
  CartesianGrid,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import {
  Tv,
  Clock,
  Film,
  TrendingUp,
  Calendar,
  PlayCircle,
  Timer,
  Plane,
  GraduationCap,
  Globe,
  Dumbbell,
  BookOpen,
  Languages,
  Briefcase,
  Zap,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";

interface Show {
  show: string;
  type: string;
  startYear: number;
  endYear: string;
  yearsRunning: number;
  status: string;
  episodes: number;
  avgEpisodeMin: number;
  totalHours: number;
}

const RAW_DATA: Show[] = [
  { show: "The Simpsons", type: "Animated", startYear: 1989, endYear: "Present", yearsRunning: 36, status: "Ongoing", episodes: 760, avgEpisodeMin: 22, totalHours: 278.7 },
  { show: "South Park", type: "Animated", startYear: 1997, endYear: "Present", yearsRunning: 27, status: "Ongoing", episodes: 330, avgEpisodeMin: 22, totalHours: 121.0 },
  { show: "Family Guy", type: "Animated", startYear: 1999, endYear: "Present", yearsRunning: 25, status: "Ongoing", episodes: 420, avgEpisodeMin: 22, totalHours: 154.0 },
  { show: "SpongeBob SquarePants", type: "Animated", startYear: 1999, endYear: "Present", yearsRunning: 25, status: "Ongoing", episodes: 300, avgEpisodeMin: 22, totalHours: 110.0 },
  { show: "American Dad!", type: "Animated", startYear: 2005, endYear: "Present", yearsRunning: 20, status: "Ongoing", episodes: 350, avgEpisodeMin: 22, totalHours: 128.3 },
  { show: "Futurama", type: "Animated", startYear: 1999, endYear: "Present", yearsRunning: 25, status: "Ongoing", episodes: 150, avgEpisodeMin: 22, totalHours: 55.0 },
  { show: "King of the Hill", type: "Animated", startYear: 1997, endYear: "2010", yearsRunning: 13, status: "Ended", episodes: 259, avgEpisodeMin: 22, totalHours: 94.9 },
  { show: "Rick and Morty", type: "Animated", startYear: 2013, endYear: "Present", yearsRunning: 12, status: "Ongoing", episodes: 70, avgEpisodeMin: 22, totalHours: 25.7 },
  { show: "Bob's Burgers", type: "Animated", startYear: 2011, endYear: "Present", yearsRunning: 14, status: "Ongoing", episodes: 260, avgEpisodeMin: 22, totalHours: 95.3 },
  { show: "Archer", type: "Animated", startYear: 2009, endYear: "2023", yearsRunning: 14, status: "Ended", episodes: 145, avgEpisodeMin: 22, totalHours: 53.2 },
  { show: "One Piece", type: "Anime", startYear: 1999, endYear: "Present", yearsRunning: 25, status: "Ongoing", episodes: 1100, avgEpisodeMin: 24, totalHours: 440.0 },
  { show: "Naruto", type: "Anime", startYear: 2002, endYear: "2007", yearsRunning: 5, status: "Ended", episodes: 220, avgEpisodeMin: 23, totalHours: 84.3 },
  { show: "Naruto Shippuden", type: "Anime", startYear: 2007, endYear: "2017", yearsRunning: 10, status: "Ended", episodes: 500, avgEpisodeMin: 23, totalHours: 191.7 },
  { show: "Boruto", type: "Anime", startYear: 2017, endYear: "Present", yearsRunning: 9, status: "Ongoing", episodes: 290, avgEpisodeMin: 23, totalHours: 111.2 },
  { show: "Dragon Ball", type: "Anime", startYear: 1986, endYear: "1989", yearsRunning: 3, status: "Ended", episodes: 153, avgEpisodeMin: 24, totalHours: 61.2 },
  { show: "Dragon Ball Z", type: "Anime", startYear: 1989, endYear: "1996", yearsRunning: 7, status: "Ended", episodes: 291, avgEpisodeMin: 24, totalHours: 116.4 },
  { show: "Dragon Ball Super", type: "Anime", startYear: 2015, endYear: "2018", yearsRunning: 3, status: "Ended", episodes: 131, avgEpisodeMin: 24, totalHours: 52.4 },
  { show: "Pokémon", type: "Anime", startYear: 1997, endYear: "Present", yearsRunning: 27, status: "Ongoing", episodes: 1250, avgEpisodeMin: 22, totalHours: 458.3 },
  { show: "Detective Conan", type: "Anime", startYear: 1996, endYear: "Present", yearsRunning: 28, status: "Ongoing", episodes: 1100, avgEpisodeMin: 24, totalHours: 440.0 },
  { show: "Bleach", type: "Anime", startYear: 2004, endYear: "2012", yearsRunning: 8, status: "Ended", episodes: 366, avgEpisodeMin: 24, totalHours: 146.4 },
  { show: "Attack on Titan", type: "Anime", startYear: 2013, endYear: "2023", yearsRunning: 10, status: "Ended", episodes: 94, avgEpisodeMin: 24, totalHours: 37.6 },
  { show: "My Hero Academia", type: "Anime", startYear: 2016, endYear: "Present", yearsRunning: 9, status: "Ongoing", episodes: 150, avgEpisodeMin: 24, totalHours: 60.0 },
  { show: "Jujutsu Kaisen", type: "Anime", startYear: 2020, endYear: "Present", yearsRunning: 6, status: "Ongoing", episodes: 50, avgEpisodeMin: 24, totalHours: 20.0 },
  { show: "Demon Slayer", type: "Anime", startYear: 2019, endYear: "Present", yearsRunning: 7, status: "Ongoing", episodes: 60, avgEpisodeMin: 24, totalHours: 24.0 },
  { show: "Fullmetal Alchemist Brotherhood", type: "Anime", startYear: 2009, endYear: "2010", yearsRunning: 1, status: "Ended", episodes: 64, avgEpisodeMin: 24, totalHours: 25.6 },
  { show: "Law & Order", type: "Live Action", startYear: 1990, endYear: "2010", yearsRunning: 20, status: "Ended", episodes: 456, avgEpisodeMin: 45, totalHours: 342.0 },
  { show: "Law & Order SVU", type: "Live Action", startYear: 1999, endYear: "Present", yearsRunning: 25, status: "Ongoing", episodes: 550, avgEpisodeMin: 45, totalHours: 412.5 },
  { show: "NCIS", type: "Live Action", startYear: 2003, endYear: "Present", yearsRunning: 22, status: "Ongoing", episodes: 470, avgEpisodeMin: 43, totalHours: 337.0 },
  { show: "Grey's Anatomy", type: "Live Action", startYear: 2005, endYear: "Present", yearsRunning: 20, status: "Ongoing", episodes: 430, avgEpisodeMin: 43, totalHours: 308.2 },
  { show: "CSI", type: "Live Action", startYear: 2000, endYear: "2015", yearsRunning: 15, status: "Ended", episodes: 335, avgEpisodeMin: 43, totalHours: 240.1 },
  { show: "Criminal Minds", type: "Live Action", startYear: 2005, endYear: "2020", yearsRunning: 15, status: "Ended", episodes: 324, avgEpisodeMin: 43, totalHours: 232.2 },
  { show: "Supernatural", type: "Live Action", startYear: 2005, endYear: "2020", yearsRunning: 15, status: "Ended", episodes: 327, avgEpisodeMin: 42, totalHours: 228.9 },
  { show: "ER", type: "Live Action", startYear: 1994, endYear: "2009", yearsRunning: 15, status: "Ended", episodes: 331, avgEpisodeMin: 44, totalHours: 242.7 },
  { show: "The Office (US)", type: "Live Action", startYear: 2005, endYear: "2013", yearsRunning: 8, status: "Ended", episodes: 201, avgEpisodeMin: 22, totalHours: 73.7 },
  { show: "Friends", type: "Live Action", startYear: 1994, endYear: "2004", yearsRunning: 10, status: "Ended", episodes: 236, avgEpisodeMin: 22, totalHours: 86.5 },
  { show: "The Big Bang Theory", type: "Live Action", startYear: 2007, endYear: "2019", yearsRunning: 12, status: "Ended", episodes: 279, avgEpisodeMin: 22, totalHours: 102.3 },
  { show: "Two and a Half Men", type: "Live Action", startYear: 2003, endYear: "2015", yearsRunning: 12, status: "Ended", episodes: 262, avgEpisodeMin: 22, totalHours: 96.0 },
  { show: "How I Met Your Mother", type: "Live Action", startYear: 2005, endYear: "2014", yearsRunning: 9, status: "Ended", episodes: 208, avgEpisodeMin: 22, totalHours: 76.3 },
  { show: "Modern Family", type: "Live Action", startYear: 2009, endYear: "2020", yearsRunning: 11, status: "Ended", episodes: 250, avgEpisodeMin: 22, totalHours: 91.7 },
  { show: "Brooklyn Nine-Nine", type: "Live Action", startYear: 2013, endYear: "2021", yearsRunning: 8, status: "Ended", episodes: 153, avgEpisodeMin: 22, totalHours: 56.1 },
  { show: "The Walking Dead", type: "Live Action", startYear: 2010, endYear: "2022", yearsRunning: 12, status: "Ended", episodes: 177, avgEpisodeMin: 44, totalHours: 129.8 },
  { show: "Game of Thrones", type: "Live Action", startYear: 2011, endYear: "2019", yearsRunning: 8, status: "Ended", episodes: 73, avgEpisodeMin: 57, totalHours: 69.3 },
  { show: "Breaking Bad", type: "Live Action", startYear: 2008, endYear: "2013", yearsRunning: 5, status: "Ended", episodes: 62, avgEpisodeMin: 47, totalHours: 48.6 },
  { show: "The Sopranos", type: "Live Action", startYear: 1999, endYear: "2007", yearsRunning: 8, status: "Ended", episodes: 86, avgEpisodeMin: 55, totalHours: 78.8 },
  { show: "House MD", type: "Live Action", startYear: 2004, endYear: "2012", yearsRunning: 8, status: "Ended", episodes: 177, avgEpisodeMin: 44, totalHours: 129.8 },
  { show: "The X-Files", type: "Live Action", startYear: 1993, endYear: "2018", yearsRunning: 25, status: "Ended", episodes: 218, avgEpisodeMin: 45, totalHours: 163.5 },
  { show: "Buffy the Vampire Slayer", type: "Live Action", startYear: 1997, endYear: "2003", yearsRunning: 6, status: "Ended", episodes: 144, avgEpisodeMin: 45, totalHours: 108.0 },
  { show: "Lost", type: "Live Action", startYear: 2004, endYear: "2010", yearsRunning: 6, status: "Ended", episodes: 121, avgEpisodeMin: 44, totalHours: 88.7 },
  { show: "24", type: "Live Action", startYear: 2001, endYear: "2010", yearsRunning: 9, status: "Ended", episodes: 192, avgEpisodeMin: 44, totalHours: 140.8 },
  { show: "Frasier", type: "Live Action", startYear: 1993, endYear: "2004", yearsRunning: 11, status: "Ended", episodes: 264, avgEpisodeMin: 22, totalHours: 96.8 },
];

const TYPE_COLORS: Record<string, string> = {
  Animated: "#FF6B35",
  Anime: "#E91E63",
  "Live Action": "#2196F3",
};

const TYPE_COLORS_LIGHT: Record<string, string> = {
  Animated: "#FFF3ED",
  Anime: "#FCE4EC",
  "Live Action": "#E3F2FD",
};

// Show card data for the hero marquee
const SHOW_CARDS: { name: string; emoji: string; gradient: string; hours: number }[] = [
  { name: "Pokémon", emoji: "⚡", gradient: "from-yellow-400 to-amber-500", hours: 458 },
  { name: "One Piece", emoji: "🏴‍☠️", gradient: "from-red-500 to-orange-500", hours: 440 },
  { name: "Detective Conan", emoji: "🔍", gradient: "from-blue-500 to-cyan-500", hours: 440 },
  { name: "Law & Order SVU", emoji: "⚖️", gradient: "from-slate-600 to-slate-800", hours: 413 },
  { name: "Law & Order", emoji: "🔨", gradient: "from-gray-700 to-gray-900", hours: 342 },
  { name: "NCIS", emoji: "🔫", gradient: "from-blue-700 to-blue-900", hours: 337 },
  { name: "Grey's Anatomy", emoji: "🏥", gradient: "from-teal-500 to-emerald-600", hours: 308 },
  { name: "The Simpsons", emoji: "🍩", gradient: "from-yellow-400 to-yellow-600", hours: 279 },
  { name: "Game of Thrones", emoji: "🐉", gradient: "from-gray-800 to-red-900", hours: 69 },
  { name: "Breaking Bad", emoji: "🧪", gradient: "from-green-600 to-emerald-800", hours: 49 },
  { name: "Attack on Titan", emoji: "⚔️", gradient: "from-red-600 to-red-900", hours: 38 },
  { name: "Friends", emoji: "☕", gradient: "from-rose-400 to-pink-500", hours: 87 },
  { name: "The Office", emoji: "📎", gradient: "from-blue-400 to-indigo-500", hours: 74 },
  { name: "Rick and Morty", emoji: "🧬", gradient: "from-green-400 to-cyan-500", hours: 26 },
  { name: "SpongeBob", emoji: "🧽", gradient: "from-yellow-300 to-yellow-500", hours: 110 },
  { name: "Dragon Ball Z", emoji: "🔥", gradient: "from-orange-500 to-red-600", hours: 116 },
  { name: "Naruto", emoji: "🍥", gradient: "from-orange-400 to-orange-600", hours: 84 },
  { name: "South Park", emoji: "🎒", gradient: "from-sky-500 to-blue-600", hours: 121 },
  { name: "Supernatural", emoji: "👻", gradient: "from-zinc-700 to-zinc-900", hours: 229 },
  { name: "Family Guy", emoji: "🍺", gradient: "from-lime-500 to-green-600", hours: 154 },
];

export default function Dashboard() {
  const [activeType, setActiveType] = useState<string>("All");
  const [sortField, setSortField] = useState<keyof Show>("totalHours");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [hoveredShow, setHoveredShow] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    return activeType === "All"
      ? RAW_DATA
      : RAW_DATA.filter((s) => s.type === activeType);
  }, [activeType]);

  const sortedTableData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "desc" ? bVal - aVal : aVal - bVal;
      }
      return sortDir === "desc"
        ? String(bVal).localeCompare(String(aVal))
        : String(aVal).localeCompare(String(bVal));
    });
  }, [filteredData, sortField, sortDir]);

  const totalEpisodes = filteredData.reduce((s, d) => s + d.episodes, 0);
  const totalHours = filteredData.reduce((s, d) => s + d.totalHours, 0);
  const totalDays = totalHours / 24;
  const longestShow = [...filteredData].sort(
    (a, b) => b.yearsRunning - a.yearsRunning
  )[0];
  const mostEpisodes = [...filteredData].sort(
    (a, b) => b.episodes - a.episodes
  )[0];

  const hoursByType = useMemo(() => {
    const map: Record<string, number> = {};
    filteredData.forEach((s) => {
      map[s.type] = (map[s.type] || 0) + s.totalHours;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value: Math.round(value) }))
      .sort((a, b) => b.value - a.value);
  }, [filteredData]);

  const topByHours = useMemo(() => {
    return [...filteredData]
      .sort((a, b) => b.totalHours - a.totalHours)
      .slice(0, 15)
      .map((s) => ({ ...s, name: s.show }));
  }, [filteredData]);

  const scatterData = useMemo(() => {
    return filteredData.map((s) => ({
      name: s.show,
      x: s.episodes,
      y: s.totalHours,
      z: s.yearsRunning,
      type: s.type,
    }));
  }, [filteredData]);

  const typeStats = useMemo(() => {
    const types = ["Animated", "Anime", "Live Action"];
    return types.map((t) => {
      const shows = RAW_DATA.filter((s) => s.type === t);
      const avgEps = Math.round(shows.reduce((s, d) => s + d.episodes, 0) / shows.length);
      const avgYears = Math.round(shows.reduce((s, d) => s + d.yearsRunning, 0) / shows.length);
      const totalH = Math.round(shows.reduce((s, d) => s + d.totalHours, 0));
      return { type: t, count: shows.length, avgEps, avgYears, totalH };
    });
  }, []);

  // Decade breakdown
  const decadeData = useMemo(() => {
    const decades: Record<string, { animated: number; anime: number; liveAction: number }> = {};
    RAW_DATA.forEach((s) => {
      const decade = `${Math.floor(s.startYear / 10) * 10}s`;
      if (!decades[decade]) decades[decade] = { animated: 0, anime: 0, liveAction: 0 };
      if (s.type === "Animated") decades[decade].animated++;
      else if (s.type === "Anime") decades[decade].anime++;
      else decades[decade].liveAction++;
    });
    return Object.entries(decades)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([decade, counts]) => ({ decade, ...counts }));
  }, []);

  const handleSort = (field: keyof Show) => {
    if (sortField === field) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ field }: { field: keyof Show }) => (
    <span className="ml-1 text-xs opacity-50">
      {sortField === field ? (sortDir === "desc" ? "▼" : "▲") : "⇅"}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== INTERACTIVE HERO ===== */}
      <header className="relative bg-gray-950 overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-8 sm:pt-10 pb-4 sm:pb-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="bg-blue-500 p-2 sm:p-2.5 rounded-xl">
              <Tv className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <h1 className="text-2xl sm:text-5xl font-black tracking-tight text-white">
              TV Binge-Watch Dashboard
            </h1>
          </div>
          <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mb-4 sm:mb-6">
            50 iconic shows. 15,814 episodes. 8,361 hours.
            How long would it really take to watch them all?
          </p>

          {/* Hero stats row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-xl">
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-black text-white">50</div>
              <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">Shows</div>
            </div>
            <div className="text-center border-x border-gray-800">
              <div className="text-2xl sm:text-4xl font-black text-amber-400">8,361</div>
              <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-black text-white">348</div>
              <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">Days Nonstop</div>
            </div>
          </div>
        </div>

        {/* Scrolling show cards marquee - Row 1 */}
        <div className="relative mb-2 overflow-hidden">
          <div className="flex gap-3 animate-marquee hover:[animation-play-state:paused]">
            {[...SHOW_CARDS, ...SHOW_CARDS].map((card, i) => (
              <div
                key={`r1-${i}`}
                onMouseEnter={() => setHoveredShow(card.name)}
                onMouseLeave={() => setHoveredShow(null)}
                className={`flex-shrink-0 w-32 sm:w-40 h-20 sm:h-24 rounded-xl bg-gradient-to-br ${card.gradient} p-3 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                  hoveredShow === card.name ? "scale-110 shadow-2xl shadow-white/20 z-10" : "hover:scale-105"
                }`}
              >
                <div className="text-2xl">{card.emoji}</div>
                <div>
                  <div className="text-white font-bold text-xs leading-tight truncate">{card.name}</div>
                  <div className="text-white/70 text-[10px]">{card.hours}h to binge</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrolling show cards marquee - Row 2 (reverse) */}
        <div className="relative pb-6 sm:pb-8 overflow-hidden">
          <div className="flex gap-3 animate-marquee-reverse hover:[animation-play-state:paused]">
            {[...SHOW_CARDS.slice(10), ...SHOW_CARDS.slice(0, 10), ...SHOW_CARDS.slice(10), ...SHOW_CARDS.slice(0, 10)].map((card, i) => (
              <div
                key={`r2-${i}`}
                onMouseEnter={() => setHoveredShow(card.name)}
                onMouseLeave={() => setHoveredShow(null)}
                className={`flex-shrink-0 w-32 sm:w-40 h-20 sm:h-24 rounded-xl bg-gradient-to-br ${card.gradient} p-3 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                  hoveredShow === card.name ? "scale-110 shadow-2xl shadow-white/20 z-10" : "hover:scale-105"
                }`}
              >
                <div className="text-2xl">{card.emoji}</div>
                <div>
                  <div className="text-white font-bold text-xs leading-tight truncate">{card.name}</div>
                  <div className="text-white/70 text-[10px]">{card.hours}h to binge</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {["All", "Animated", "Anime", "Live Action"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeType === t
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {t}
              {t !== "All" && (
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full ml-2"
                  style={{ backgroundColor: TYPE_COLORS[t] }}
                />
              )}
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            icon={<Tv className="w-5 h-5" />}
            label="Shows"
            value={filteredData.length.toString()}
            sub={`${filteredData.filter((s) => s.status === "Ongoing").length} still ongoing`}
            color="blue"
          />
          <KpiCard
            icon={<PlayCircle className="w-5 h-5" />}
            label="Total Episodes"
            value={totalEpisodes.toLocaleString()}
            sub={`${mostEpisodes?.show} leads with ${mostEpisodes?.episodes.toLocaleString()}`}
            color="rose"
          />
          <KpiCard
            icon={<Clock className="w-5 h-5" />}
            label="Total Binge Hours"
            value={Math.round(totalHours).toLocaleString()}
            sub={`That's ${Math.round(totalDays)} days nonstop`}
            color="amber"
          />
          <KpiCard
            icon={<Calendar className="w-5 h-5" />}
            label="Longest Running"
            value={longestShow?.show || ""}
            sub={`${longestShow?.yearsRunning} years and counting`}
            color="emerald"
          />
        </div>

        {/* ===== "INSTEAD OF BINGE-WATCHING" SECTION ===== */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-2xl p-4 sm:p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold">Instead of Watching All 50 Shows, You Could...</h2>
          </div>
          <p className="text-gray-400 text-sm mb-5">
            8,361 hours is a lot of screen time. Here&apos;s what else you could do with that time.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <InsteadCard icon={<Plane className="w-5 h-5" />} value="199x" label="Fly around the world" color="text-sky-400" />
            <InsteadCard icon={<Globe className="w-5 h-5" />} value="209x" label="Drive coast-to-coast across the US" color="text-emerald-400" />
            <InsteadCard icon={<GraduationCap className="w-5 h-5" />} value="4.6" label="Bachelor's degrees earned" color="text-amber-400" />
            <InsteadCard icon={<Languages className="w-5 h-5" />} value="9" label="Languages learned fluently" color="text-rose-400" />
            <InsteadCard icon={<Briefcase className="w-5 h-5" />} value="4.5 yrs" label="Of full-time work" color="text-blue-400" />
            <InsteadCard icon={<Dumbbell className="w-5 h-5" />} value="55" label="Marathon training cycles" color="text-orange-400" />
            <InsteadCard icon={<BookOpen className="w-5 h-5" />} value="121x" label="Read all Harry Potter books" color="text-yellow-400" />
            <InsteadCard icon={<Film className="w-5 h-5" />} value="121x" label="Watch every MCU movie" color="text-red-400" />
          </div>
        </div>

        {/* Binge Calculator */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Timer className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-bold text-gray-900">The Binge Calculator</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Watching all {filteredData.length} shows back-to-back at different paces:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-gray-900">{Math.round(totalHours).toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">Total Hours</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-gray-900">{Math.round(totalDays).toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">Days Nonstop (24/7)</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-gray-900">{Math.round(totalHours / 8 / 30)}</div>
              <div className="text-xs text-gray-500 mt-1">Months (8hr/day)</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-gray-900">{(totalHours / 4 / 365).toFixed(1)}</div>
              <div className="text-xs text-gray-500 mt-1">Years (4hr/day)</div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Top Shows by Hours */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
              Top 15 Shows by Binge Time
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">
              Hours needed to watch every episode. Pokémon and Detective Conan are in a league of their own.
            </p>
            <div className="h-[380px] sm:h-[480px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topByHours} layout="vertical" margin={{ left: 0, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "#666" }} />
                  <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 10, fill: "#333" }} />
                  <Tooltip
                    formatter={(value) => [`${value} hrs`, "Binge Time"]}
                    contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: 13 }}
                  />
                  <Bar dataKey="totalHours" radius={[0, 6, 6, 0]}>
                    {topByHours.map((entry, i) => (
                      <Cell key={i} fill={TYPE_COLORS[entry.type]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Hours by Type Pie + Stats */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Hours by Genre</h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">Total binge time broken down by show type.</p>
            <div className="h-[240px] sm:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hoursByType}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    strokeWidth={2}
                    stroke="#fff"
                    label={({ value }) => `${value}h`}
                  >
                    {hoursByType.map((entry, i) => (
                      <Cell key={i} fill={TYPE_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} hrs`, ""]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-3">
              {typeStats.map((t) => (
                <div
                  key={t.type}
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ backgroundColor: TYPE_COLORS_LIGHT[t.type] }}
                >
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{t.type}</div>
                    <div className="text-xs text-gray-600">{t.count} shows · avg {t.avgYears}yr run</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm" style={{ color: TYPE_COLORS[t.type] }}>
                      {t.totalH.toLocaleString()}h
                    </div>
                    <div className="text-xs text-gray-600">~{t.avgEps} eps avg</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decade Breakdown + Most Streamed */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Decade Breakdown */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Shows by Decade Started</h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">The 2000s were the golden age of new long-running shows.</p>
            <div className="h-[260px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={decadeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="decade" tick={{ fontSize: 12, fill: "#666" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#666" }} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: 13 }} />
                  <Legend />
                  <Bar dataKey="animated" name="Animated" fill="#FF6B35" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="anime" name="Anime" fill="#E91E63" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="liveAction" name="Live Action" fill="#2196F3" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Most Streamed in 2024 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Most-Streamed in 2024</h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">Nielsen data: these shows from our list dominated streaming last year.</p>
            <div className="space-y-2.5">
              {[
                { rank: 1, name: "Grey's Anatomy", mins: "47.9B min", bar: 100 },
                { rank: 2, name: "Family Guy", mins: "42.4B min", bar: 88 },
                { rank: 3, name: "Bob's Burgers", mins: "36.8B min", bar: 77 },
                { rank: 4, name: "NCIS", mins: "35.9B min", bar: 75 },
                { rank: 5, name: "The Big Bang Theory", mins: "33.1B min", bar: 69 },
                { rank: 6, name: "Law & Order SVU", mins: "31.2B min", bar: 65 },
                { rank: 7, name: "Criminal Minds", mins: "29.8B min", bar: 62 },
                { rank: 8, name: "SpongeBob", mins: "28.4B min", bar: 59 },
              ].map((item) => (
                <div key={item.rank} className="flex items-center gap-3">
                  <div className="w-6 text-sm font-bold text-gray-400 text-right">{item.rank}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-900">{item.name}</span>
                      <span className="text-xs text-gray-500">{item.mins}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        style={{ width: `${item.bar}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scatter: Episodes vs Hours */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Episodes vs Binge Time</h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            Shows with longer episodes (Live Action dramas) rack up hours faster per episode. Bubble size = years on air.
          </p>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ bottom: 10, left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" dataKey="x" name="Episodes" tick={{ fontSize: 12, fill: "#666" }} label={{ value: "Episodes", position: "bottom", offset: -2, fontSize: 12, fill: "#999" }} />
                <YAxis type="number" dataKey="y" name="Total Hours" tick={{ fontSize: 12, fill: "#666" }} label={{ value: "Hours", angle: -90, position: "insideLeft", fontSize: 12, fill: "#999" }} />
                <ZAxis type="number" dataKey="z" range={[40, 400]} />
                <Tooltip
                  content={({ payload }) => {
                    if (!payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-sm">
                        <div className="font-bold text-gray-900">{d.name}</div>
                        <div className="text-gray-600">{d.x} episodes · {d.y}h · {d.z} years</div>
                      </div>
                    );
                  }}
                />
                {["Animated", "Anime", "Live Action"].map((type) => (
                  <Scatter key={type} name={type} data={scatterData.filter((d) => d.type === type)} fill={TYPE_COLORS[type]} fillOpacity={0.75} />
                ))}
                <Legend />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Show Timelines</h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">When each show started and how long it ran. Some have been on air for over three decades.</p>
          <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
            {[...filteredData]
              .sort((a, b) => a.startYear - b.startYear)
              .map((show) => {
                const minYear = 1986;
                const maxYear = 2026;
                const range = maxYear - minYear;
                const left = ((show.startYear - minYear) / range) * 100;
                const endYr = show.endYear === "Present" ? 2026 : parseInt(show.endYear);
                const width = ((endYr - show.startYear) / range) * 100;
                return (
                  <div key={show.show} className="flex items-center gap-2">
                    <div className="w-28 sm:w-52 text-[10px] sm:text-xs text-gray-700 font-medium truncate flex-shrink-0 text-right pr-1 sm:pr-2">{show.show}</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded relative">
                      <div
                        className="absolute h-full rounded"
                        style={{
                          left: `${left}%`,
                          width: `${Math.max(width, 0.8)}%`,
                          backgroundColor: TYPE_COLORS[show.type],
                          opacity: show.status === "Ongoing" ? 1 : 0.65,
                        }}
                        title={`${show.startYear}–${show.endYear} (${show.yearsRunning}yr)`}
                      />
                    </div>
                    <div className="w-8 text-xs text-gray-500 flex-shrink-0">{show.yearsRunning}y</div>
                  </div>
                );
              })}
            <div className="flex items-center gap-2 mt-2">
              <div className="w-28 sm:w-52 flex-shrink-0" />
              <div className="flex-1 flex justify-between text-[10px] text-gray-400 px-1">
                <span>1986</span><span>1996</span><span>2006</span><span>2016</span><span>2026</span>
              </div>
              <div className="w-8 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-1">
            <Film className="w-5 h-5 text-gray-600" />
            <h2 className="text-base sm:text-lg font-bold text-gray-900">All Shows</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">Click column headers to sort. Showing {filteredData.length} shows.</p>
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-xs sm:text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  {[
                    { key: "show", label: "Show" },
                    { key: "type", label: "Type" },
                    { key: "startYear", label: "Start" },
                    { key: "yearsRunning", label: "Years" },
                    { key: "status", label: "Status" },
                    { key: "episodes", label: "Episodes" },
                    { key: "avgEpisodeMin", label: "Ep Min" },
                    { key: "totalHours", label: "Hours" },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      className="py-2 px-3 font-semibold text-gray-700 cursor-pointer hover:text-gray-900 select-none whitespace-nowrap"
                      onClick={() => handleSort(key as keyof Show)}
                    >
                      {label}<SortIcon field={key as keyof Show} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedTableData.map((s) => (
                  <tr key={s.show} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-3 font-medium text-gray-900 whitespace-nowrap">{s.show}</td>
                    <td className="py-2 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: TYPE_COLORS[s.type] }}>
                        {s.type}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-gray-600">{s.startYear}</td>
                    <td className="py-2 px-3 text-gray-600">{s.yearsRunning}</td>
                    <td className="py-2 px-3">
                      <span className={`text-xs font-semibold ${s.status === "Ongoing" ? "text-emerald-600" : "text-gray-500"}`}>{s.status}</span>
                    </td>
                    <td className="py-2 px-3 text-gray-700 font-medium">{s.episodes.toLocaleString()}</td>
                    <td className="py-2 px-3 text-gray-600">{s.avgEpisodeMin}m</td>
                    <td className="py-2 px-3 font-bold text-gray-900">{s.totalHours.toLocaleString()}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fun Facts — expanded */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <FunFact icon={<TrendingUp className="w-5 h-5 text-rose-500" />} title="Naruto Universe" text="Watching Naruto + Shippuden + Boruto is 387 hours — over 16 straight days of ninjas." />
          <FunFact icon={<Clock className="w-5 h-5 text-blue-500" />} title="Law & Order Universe" text="The original + SVU total 754 hours. That's a full month of 24/7 crime-solving." />
          <FunFact icon={<Tv className="w-5 h-5 text-amber-500" />} title="Dragon Ball Saga" text="DB + DBZ + DBS = 575 episodes and 230 hours. Most of it is powering up." />
          <FunFact icon={<Zap className="w-5 h-5 text-yellow-500" />} title="91% of Us Binge" text="91% of people report binge-watching TV regularly. You're not alone on that couch." />
          <FunFact icon={<Globe className="w-5 h-5 text-emerald-500" />} title="Simpsons = 36 Years" text="The longest-running US sitcom. If it were a person, it could run for president." />
          <FunFact icon={<BookOpen className="w-5 h-5 text-indigo-500" />} title="Streaming is King" text="US streaming hit 16.7 trillion minutes in 2025 — up 19% from 2024. TV isn't dying, it moved." />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        <a href="https://x.com/Trace_Cohen" target="_blank" rel="noopener" className="hover:text-gray-900 transition-colors">Twitter</a>
        {" | "}
        <a href="mailto:t@nyvp.com" className="hover:text-gray-900 transition-colors">t@nyvp.com</a>
      </footer>
    </div>
  );
}

function KpiCard({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string; sub: string; color: string }) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    rose: "bg-rose-50 text-rose-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl mb-2 ${colorMap[color]}`}>{icon}</div>
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</div>
      <div className="text-xl font-bold text-gray-900 mt-0.5 leading-tight">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{sub}</div>
    </div>
  );
}

function InsteadCard({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
      <div className={`${color} mb-2`}>{icon}</div>
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="text-xs text-gray-400 mt-1 leading-tight">{label}</div>
    </div>
  );
}

function FunFact({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}
