'use client';

import React, { useState } from 'react';
import {
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts';

const InklineLogo = ({ color = '#0057B8', size = 'md' }) => {
  const sizeMap = { sm: 'w-16 h-16', md: 'w-24 h-24', lg: 'w-32 h-32' };
  return (
    <svg viewBox="0 0 1071.1 365" className={sizeMap[size]} xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M278.8,60.2H86.2c-14.4,0-26,11.7-26,26v192.6c0,14.4,11.7,26,26,26h192.6c14.4,0,26-11.7,26-26V86.2c0-14.4-11.7-26-26-26ZM191.8,110.1h60.2v48h-60.2v-48ZM194.9,254.9l-36.7-56.4v56.4h-48v-96.8h34.2c-13.3-3-21.6-16.2-18.5-29.5,3-13.3,16.2-21.6,29.5-18.5,13.3,3,21.6,16.2,18.5,29.5-2.1,9.2-9.3,16.4-18.5,18.5h36.5l63,96.8h-60Z" />
      <path fill={color} d="M407.8,249.3h-23.8V115.7h23.8v133.6Z" />
      <path fill={color} d="M533.2,249.3h-21.1l-63.4-91h-1.1v91h-23.8V115.7h21.5l63,91.4h1.1v-91.4h23.8v133.6h0Z" />
      <path fill={color} d="M547.4,115.7h23.8v61.5h1.9l52.1-61.5h29.4l-51.7,60,52.1,73.6h-28.7l-40-57.4-15.1,17.7v39.6h-23.8V115.7Z" />
      <path fill={color} d="M665.5,115.7h23.8v113.6h58.9v20h-82.7V115.7Z" />
      <path fill={color} d="M783.5,249.3h-23.8V115.7h23.8v133.6Z" />
      <path fill={color} d="M908.6,249.3h-21.1l-63.4-91h-1.1v91h-23.8V115.7h21.5l63,91.4h1.1v-91.4h23.8v133.6h0Z" />
      <path fill={color} d="M923.7,115.7h86.8v20.4h-63v36.2h58.5v20.4h-58.5v36.6h63.4v20h-87.2V115.7Z" />
    </svg>
  );
};

const QuebecFlag = ({ size = 'w-8 h-6' }) => (
  <svg viewBox="0 0 100 67" className={size} xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="67" fill="#003DA5" />
    <rect x="40" y="0" width="20" height="67" fill="white" />
    <rect x="0" y="27" width="100" height="13" fill="white" />
    <g fill="white">
      <path d="M20,13 L15,10 L18,15 L15,18 L20,15 L25,18 L22,15 L25,10 Z" />
      <path d="M80,13 L75,10 L78,15 L75,18 L80,15 L85,18 L82,15 L85,10 Z" />
      <path d="M20,54 L15,51 L18,56 L15,59 L20,56 L25,59 L22,56 L25,51 Z" />
      <path d="M80,54 L75,51 L78,56 L75,59 L80,56 L85,59 L82,56 L85,51 Z" />
    </g>
  </svg>
);

const colors = { cobalt: '#0057B8', cerulean: '#1399CC', magenta: '#E10098', nearlyBlack: '#101010' };

const familyKeywords = [
  { kw: 'family photography near me', vol: 170, kd: 4, cpc: 0.66, p: 'HIGH' },
  { kw: 'family photographer near me', vol: 170, kd: 8, cpc: 0.72, p: 'HIGH' },
  { kw: 'family photos ottawa', vol: 90, kd: 8, cpc: 0.52, p: 'HIGH' },
  { kw: 'family photographer ottawa', vol: 110, kd: 11, cpc: 0.47, p: 'HIGH' },
  { kw: 'family photoshoot near me', vol: 260, kd: 12, cpc: 0.54, p: 'HIGH' },
  { kw: 'ottawa family photographer', vol: 110, kd: 13, cpc: 0.47, p: 'HIGH' },
  { kw: 'family photo session', vol: 140, kd: 0, cpc: 0.54, p: 'HIGH' },
  { kw: 'family photo studio near me', vol: 140, kd: 0, cpc: 0.51, p: 'HIGH' },
  { kw: 'family pictures ottawa', vol: 90, kd: 20, cpc: 0.52, p: 'MEDIUM' },
  { kw: 'family photography ottawa', vol: 70, kd: 25, cpc: 0.57, p: 'MEDIUM' },
  { kw: 'family portrait studio', vol: 390, kd: 26, cpc: 0.64, p: 'MEDIUM' },
  { kw: 'family photos', vol: 1600, kd: 33, cpc: 0.58, p: 'LONG' },
];

const headshotKeywords = [
  { kw: 'ottawa headshot photographer', vol: 50, kd: 6, cpc: 1.07, p: 'HIGH' },
  { kw: 'headshots ottawa', vol: 170, kd: 8, cpc: 1.34, p: 'HIGH' },
  { kw: 'headshot photography near me', vol: 110, kd: 14, cpc: 1.24, p: 'HIGH' },
  { kw: 'professional headshot near me', vol: 90, kd: 16, cpc: 1.3, p: 'HIGH' },
  { kw: 'team headshots', vol: 20, kd: 0, cpc: 2.51, p: 'HIGH' },
  { kw: 'corporate portraits', vol: 30, kd: 0, cpc: 0.0, p: 'HIGH' },
  { kw: 'executive headshots', vol: 30, kd: 0, cpc: 2.72, p: 'HIGH' },
  { kw: 'professional headshots', vol: 1900, kd: 22, cpc: 1.52, p: 'MEDIUM' },
  { kw: 'headshot photographer', vol: 170, kd: 23, cpc: 1.21, p: 'MEDIUM' },
  { kw: 'linkedin headshots', vol: 260, kd: 39, cpc: 1.07, p: 'LONG' },
  { kw: 'corporate photography', vol: 140, kd: 47, cpc: 1.45, p: 'LONG' },
  { kw: 'business headshots', vol: 260, kd: 50, cpc: 2.58, p: 'LONG' },
];

const hockeyKeywords = [
  { kw: 'hockey team photos', vol: 140, kd: 0, cpc: 0.0, p: 'HIGH' },
  { kw: 'hockey photography', vol: 110, kd: 7, cpc: 1.0, p: 'HIGH' },
  { kw: 'hockey photographer', vol: 20, kd: 0, cpc: 0.61, p: 'HIGH' },
  { kw: 'youth hockey photography', vol: 20, kd: 0, cpc: 0.0, p: 'HIGH' },
  { kw: 'hockey portrait', vol: 20, kd: 0, cpc: 0.0, p: 'HIGH' },
  { kw: 'hockey media day', vol: 20, kd: 0, cpc: 0.0, p: 'HIGH' },
  { kw: 'photographe hockey', vol: 20, kd: 0, cpc: 0.0, p: 'HIGH' },
  { kw: 'hockey player photoshoot', vol: 210, kd: 25, cpc: 0.0, p: 'MEDIUM' },
];

const petKeywords = [
  { kw: 'pet photoshoot', vol: 90, kd: 16, cpc: 1.23, p: 'HIGH' },
  { kw: 'dog photoshoot', vol: 720, kd: 24, cpc: 1.42, p: 'HIGH' },
  { kw: 'dog photography', vol: 260, kd: 30, cpc: 0.64, p: 'MEDIUM' },
  { kw: 'pet photography near me', vol: 140, kd: 38, cpc: 0.0, p: 'LONG' },
  { kw: 'pet photography', vol: 260, kd: 40, cpc: 0.86, p: 'LONG' },
  { kw: 'pet portraits', vol: 1300, kd: 56, cpc: 1.13, p: 'LONG' },
];

const localKeywords = [
  { kw: 'photographe gatineau', vol: 210, kd: 24, cpc: 0.69, p: 'HIGH' },
  { kw: 'photographers near me', vol: 1000, kd: 18, cpc: 0.98, p: 'MEDIUM' },
  { kw: 'portrait photographer', vol: 170, kd: 26, cpc: 0.93, p: 'MEDIUM' },
  { kw: 'photographer near me', vol: 2400, kd: 28, cpc: 0.97, p: 'MEDIUM' },
  { kw: 'photography ottawa', vol: 210, kd: 36, cpc: 1.18, p: 'LONG' },
  { kw: 'ottawa photographer', vol: 260, kd: 40, cpc: 1.29, p: 'LONG' },
];

const KDBar = ({ value }) => {
  let bgColor = colors.cerulean;
  if (value > 30) bgColor = '#EF4444';
  else if (value > 15) bgColor = colors.magenta;
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full" style={{ width: `${Math.min(value, 100)}%`, backgroundColor: bgColor }} />
      </div>
      <span className="text-xs font-medium text-slate-700 w-8">{value}</span>
    </div>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = { HIGH: 'bg-blue-100 text-blue-900', MEDIUM: 'bg-pink-100 text-pink-900', LONG: 'bg-slate-100 text-slate-900' };
  const labels = { HIGH: 'Quick Win', MEDIUM: 'Growth', LONG: 'Long-term' };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[priority]}`}>{labels[priority]}</span>;
};

const KeywordTable = ({ keywords, title, insight }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
    <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 mb-6 leading-relaxed">{insight}</p>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2" style={{ backgroundColor: colors.cobalt }}>
            <th className="px-4 py-3 text-left text-white font-semibold">Keyword</th>
            <th className="px-4 py-3 text-center text-white font-semibold">Volume</th>
            <th className="px-4 py-3 text-center text-white font-semibold">KD</th>
            <th className="px-4 py-3 text-center text-white font-semibold">CPC</th>
            <th className="px-4 py-3 text-center text-white font-semibold">Priority</th>
          </tr>
        </thead>
        <tbody>
          {keywords.map((kw, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="px-4 py-3 font-medium text-slate-900">{kw.kw}</td>
              <td className="px-4 py-3 text-center text-slate-700">{kw.vol}</td>
              <td className="px-4 py-3 text-center"><KDBar value={kw.kd} /></td>
              <td className="px-4 py-3 text-center text-slate-700">${kw.cpc.toFixed(2)}</td>
              <td className="px-4 py-3 text-center"><PriorityBadge priority={kw.p} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const contentCalendar = [
  {
    month: 'March 2026',
    phase: 'Phase 1: Hockey & Family Quick Wins',
    posts: [
      { title: 'What to Expect at a Hockey Team Photo Day', keywords: 'hockey team photos, hockey media day (KD 0)', target: '/hockey' },
      { title: 'The Ultimate Guide to Hockey Photography: Capturing the Game', keywords: 'hockey photography, hockey photographer (KD 0–7)', target: '/hockey' },
      { title: 'Family Photo Outfit Ideas: What to Wear for Your Ottawa Session', keywords: 'family photo outfit ideas (720/mo), family photoshoot clothes ideas (720/mo)', target: '/family' },
      { title: 'Why Aylmer Is the Perfect Backdrop for Family Portraits', keywords: 'family photos ottawa, family photographer ottawa (KD 8–11)', target: '/family' },
    ],
  },
  {
    month: 'April 2026',
    phase: 'Phase 1: Headshots & Hockey',
    posts: [
      { title: 'How to Prepare for Professional Headshots: A Complete Guide', keywords: 'headshots ottawa, headshot photography near me (KD 8–14)', target: '/corporate' },
      { title: 'Youth Hockey Photography: Tips for Parents and Coaches', keywords: 'youth hockey photography, hockey portrait (KD 0)', target: '/hockey' },
      { title: 'Team Headshots: Why Every Business Needs Updated Group Photos', keywords: 'team headshots, corporate portraits (KD 0)', target: '/corporate' },
      { title: 'Behind the Lens: A Day at Robinson Arena Hockey Media Day', keywords: 'hockey media day, hockey team photos (KD 0)', target: '/hockey' },
    ],
  },
  {
    month: 'May 2026',
    phase: 'Phase 1/2 Transition: Pets & Family',
    posts: [
      { title: 'Why Your Pet Deserves a Professional Photoshoot', keywords: 'pet photoshoot, dog photoshoot (KD 16–24)', target: '/pets' },
      { title: 'Spring Family Photo Sessions in Ottawa-Gatineau: Booking Guide', keywords: 'family photoshoot near me, family photo session (KD 0–12)', target: '/family' },
      { title: 'Executive Headshots: Making the Right First Impression', keywords: 'executive headshots, professional headshot near me (KD 0–16)', target: '/corporate' },
      { title: 'From Vet Tech to Pet Photographer: My Journey with Animals', keywords: 'pet photography, dog photography (KD 24–30)', target: '/pets' },
    ],
  },
  {
    month: 'June 2026',
    phase: 'Phase 2: Growth Keywords',
    posts: [
      { title: 'Photographe à Gatineau : Guide complet pour vos portraits de famille', keywords: 'photographe gatineau (210/mo, KD 24)', target: '/fr-ca pages' },
      { title: 'The Best Dog Photoshoot Ideas for Every Breed', keywords: 'dog photoshoot (720/mo, KD 24), animal photoshoot', target: '/pets' },
      { title: 'How to Choose the Right Photographer Near You', keywords: 'photographer near me (2,400/mo), photographers near me (1,000/mo)', target: 'Sitewide' },
      { title: 'Hockey Player Portraits: From Ice to Studio', keywords: 'hockey player photoshoot (210/mo, KD 25)', target: '/hockey' },
    ],
  },
  {
    month: 'July 2026',
    phase: 'Phase 2: Bilingual & Cross-Service',
    posts: [
      { title: 'Séance photo professionnelle : comment bien se préparer', keywords: 'photo professionnelle (880/mo), photographe professionnel', target: '/fr-ca pages' },
      { title: 'Including Your Pets in Family Photos: Tips from a Vet-Turned-Photographer', keywords: 'family photography with dogs (70/mo), family portrait with dog', target: '/family + /pets' },
      { title: 'Summer Mini Sessions in Ottawa: What You Need to Know', keywords: 'family photography ottawa, family pictures ottawa (KD 20–25)', target: '/family' },
      { title: 'LinkedIn Headshots That Get You Noticed: A Photographer\'s Guide', keywords: 'linkedin headshots (260/mo, KD 39), professional headshots (1,900/mo)', target: '/corporate' },
    ],
  },
  {
    month: 'August 2026',
    phase: 'Phase 2/3: Authority Building',
    posts: [
      { title: 'The Complete Guide to Pet Portraits: From Playful to Regal', keywords: 'pet portraits (1,300/mo, KD 56), pet photography (KD 40)', target: '/pets' },
      { title: 'Back-to-School Family Photos: Capture the Moment', keywords: 'family photos (1,600/mo, KD 33), fall family photos (880/mo)', target: '/family' },
      { title: 'Photography in Ottawa: Your Guide to the City\'s Best Photographers', keywords: 'photography ottawa (KD 36), ottawa photographer (KD 40)', target: 'Sitewide' },
      { title: 'Why Every Business Needs Professional Corporate Photography', keywords: 'corporate photography (KD 47), business headshots (KD 50)', target: '/corporate' },
    ],
  },
];

export default function KeywordResearchReport() {
  const volumeData = [
    { name: 'Family', volume: 3350, fill: colors.cobalt },
    { name: 'Headshots', volume: 5100, fill: colors.cerulean },
    { name: 'Hockey', volume: 560, fill: colors.magenta },
    { name: 'Pets', volume: 2770, fill: colors.cobalt },
    { name: 'Local', volume: 4250, fill: colors.cerulean },
  ];

  const categoryBreakdown = [
    { name: 'Family', high: 8, med: 3, long: 1 },
    { name: 'Headshots', high: 7, med: 2, long: 3 },
    { name: 'Hockey', high: 7, med: 1, long: 0 },
    { name: 'Pets', high: 2, med: 1, long: 3 },
    { name: 'Local', high: 1, med: 3, long: 2 },
  ];

  const radarData = [
    { subject: 'Family', you: 0, sara: 80, mathieu: 40, isabelle: 85 },
    { subject: 'Hockey', you: 0, sara: 0, mathieu: 0, isabelle: 0 },
    { subject: 'Pets', you: 0, sara: 0, mathieu: 0, isabelle: 0 },
    { subject: 'Headshots', you: 0, sara: 60, mathieu: 55, isabelle: 20 },
    { subject: 'Bilingual', you: 0, sara: 0, mathieu: 90, isabelle: 0 },
    { subject: 'Local SEO', you: 0, sara: 70, mathieu: 75, isabelle: 65 },
  ];

  const clientCompetitors = [
    { name: 'saramcconnell.ca', focus: 'Family, Maternity, Headshots', kws: '~50', top: 'family photography ottawa (#2)', threat: 'High' },
    { name: 'mathieu-photo.com', focus: 'Portraits, Weddings (EN/FR)', kws: '~50', top: 'photographe gatineau (#1)', threat: 'High' },
    { name: 'isabellebuckleyphotography.ca', focus: 'Family, Wedding', kws: '~50', top: 'family photographer ottawa (#2)', threat: 'High' },
    { name: 'gillianmccollphotos.com', focus: 'Newborn, Maternity, Family', kws: '~50', top: 'ottawa newborn photographer (#2)', threat: 'Medium' },
    { name: 'lexinephotographie.com', focus: 'Wedding, Hockey', kws: '~50', top: 'hockey team photos (#13)', threat: 'Medium' },
    { name: 'clicplus.ca', focus: 'Youth Sports Galleries', kws: '~23', top: 'Mostly branded traffic', threat: 'Low' },
  ];

  const semrushCompetitors = [
    { name: 'melissagauthier.ca', relevance: 0.62, kws: 147, traffic: 97, overlap: 'Gillian, Sara, Isabelle' },
    { name: 'kaylaphotography.ca', relevance: 0.42, kws: 134, traffic: 503, overlap: 'Gillian, Sara, Mathieu' },
    { name: 'ofwilddawnphotography.com', relevance: 0.43, kws: 60, traffic: 145, overlap: 'Isabelle, Mathieu' },
    { name: 'samparkphotography.com', relevance: 0.39, kws: 85, traffic: 174, overlap: 'Mathieu, Gillian' },
    { name: 'joeyrudd.ca', relevance: 0.17, kws: 342, traffic: 781, overlap: 'Mathieu' },
    { name: 'diamondviewphotography.com', relevance: 0.52, kws: 94, traffic: 4, overlap: 'Gillian, Sara' },
    { name: 'jessicabarnett.ca', relevance: 0.27, kws: 89, traffic: 118, overlap: 'Isabelle' },
    { name: 'gtasportsphotography.com', relevance: 0.08, kws: 98, traffic: 416, overlap: 'Lexine (sports)' },
  ];

  return (
    <div className="w-full bg-slate-50">
      <div className="w-full py-20 px-6 sm:px-10 lg:px-16 text-white relative" style={{ background: `linear-gradient(135deg, ${colors.cobalt} 0%, ${colors.cerulean} 100%)` }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12 gap-8">
            <InklineLogo color="#fff" size="lg" />
            <img src="data:image/png;base64,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" alt="Alicia Riddle Photography" className="h-24 object-contain" />
          </div>
          <h1 className="text-5xl font-bold mb-2">Keyword Research & SEO Opportunity Report</h1>
          <p className="text-xl opacity-95">aliciariddle.ca — February 2026</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 -mt-16 relative z-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md">
            <div className="text-3xl font-bold text-slate-900 mb-1">44</div>
            <div className="text-sm text-slate-600">Total Keywords</div>
            <div className="text-xs text-slate-500 mt-1">across 5 categories</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md" style={{ borderTopColor: colors.cerulean, borderTopWidth: '4px' }}>
            <div className="text-3xl font-bold" style={{ color: colors.cerulean }}>25</div>
            <div className="text-sm text-slate-600">Quick Win Keywords</div>
            <div className="text-xs text-slate-500 mt-1">KD 0–15, 1–3 months</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md" style={{ borderTopColor: colors.magenta, borderTopWidth: '4px' }}>
            <div className="text-3xl font-bold" style={{ color: colors.magenta }}>0</div>
            <div className="text-sm text-slate-600">Current Rankings</div>
            <div className="text-xs text-slate-500 mt-1">brand-new site — all opportunity</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md" style={{ borderTopColor: colors.cerulean, borderTopWidth: '4px' }}>
            <div className="text-3xl font-bold" style={{ color: colors.cerulean }}>7/8</div>
            <div className="text-sm text-slate-600">Blue Ocean: Hockey</div>
            <div className="text-xs text-slate-500 mt-1">keywords at KD 0</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="bg-white rounded-xl border border-slate-200 p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: colors.cobalt }}>1</span>
            Executive Summary
          </h2>
          <div className="prose prose-sm max-w-none mb-6 text-slate-700 leading-relaxed">
            <p>Alicia Riddle Photography is a brand-new studio offering family, corporate headshots, hockey, and pet photography services in the Ottawa-Gatineau market. The site is positioned to compete in a crowded family photography space, but possesses unique advantages in two underserved niches: hockey team photography and pet photography (leveraging Alicia's vet tech background).</p>
            <p>This keyword research analyzed 44 high-potential search terms across five service categories using Semrush's competitive intelligence suite. We identified 25 "quick win" keywords achievable within 1–3 months through on-page optimization alone, and discovered a true blue ocean in hockey photography—an 8-keyword cluster with zero keyword difficulty.</p>
          </div>
          <div className="border-l-4 p-6 rounded-r-lg" style={{ borderColor: colors.magenta, backgroundColor: 'rgba(225, 0, 152, 0.05)' }}>
            <p className="font-semibold text-slate-900 mb-2">Bottom Line</p>
            <p className="text-slate-700 leading-relaxed">Hockey photography is a true blue ocean — virtually zero competition. Combined with achievable headshot and family keywords, Alicia can realistically rank for 19+ keywords within 3 months through on-page optimization alone.</p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: colors.cobalt }}>2</span>
            Competitive Landscape
          </h2>

          <div className="bg-blue-50 border-l-4 p-6 rounded-r-lg mb-8" style={{ borderColor: colors.cobalt }}>
            <p className="font-semibold text-slate-900 mb-2">Our Methodology</p>
            <p className="text-slate-700 leading-relaxed">We analyzed the 6 competitors identified by the client, then cross-referenced each competitor's organic search rivals using Semrush's competitive intelligence tools. This surfaced 30+ additional photographers competing for the same keywords in the Ottawa-Gatineau market, allowing us to validate the original list and identify blind spots.</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Client-Identified Competitors</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: colors.cobalt }}>
                    <th className="px-4 py-3 text-left text-white font-semibold">Competitor</th>
                    <th className="px-4 py-3 text-left text-white font-semibold">Primary Focus</th>
                    <th className="px-4 py-3 text-center text-white font-semibold">Est. KWs</th>
                    <th className="px-4 py-3 text-left text-white font-semibold">Top Rankings</th>
                    <th className="px-4 py-3 text-center text-white font-semibold">Threat</th>
                  </tr>
                </thead>
                <tbody>
                  {clientCompetitors.map((comp, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 font-medium text-slate-900">{comp.name}</td>
                      <td className="px-4 py-3 text-slate-700">{comp.focus}</td>
                      <td className="px-4 py-3 text-center text-slate-700">{comp.kws}</td>
                      <td className="px-4 py-3 text-slate-700">{comp.top}</td>
                      <td className="px-4 py-3 text-center"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${comp.threat === 'High' ? 'bg-red-100 text-red-900' : comp.threat === 'Medium' ? 'bg-yellow-100 text-yellow-900' : 'bg-green-100 text-green-900'}`}>{comp.threat}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Additional Competitors Surfaced by Semrush</h3>
            <p className="text-slate-600 text-sm mb-6">These photographers were identified through cross-referencing the organic search competitors of all 6 client-identified domains.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: colors.cobalt }}>
                    <th className="px-4 py-3 text-left text-white font-semibold">Competitor</th>
                    <th className="px-4 py-3 text-center text-white font-semibold">Relevance Score</th>
                    <th className="px-4 py-3 text-center text-white font-semibold">Organic KWs</th>
                    <th className="px-4 py-3 text-center text-white font-semibold">Est. Traffic</th>
                    <th className="px-4 py-3 text-left text-white font-semibold">Overlap With</th>
                  </tr>
                </thead>
                <tbody>
                  {semrushCompetitors.map((comp, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 font-medium text-slate-900">{comp.name}</td>
                      <td className="px-4 py-3 text-center text-slate-700">{comp.relevance.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center text-slate-700">{comp.kws}</td>
                      <td className="px-4 py-3 text-center text-slate-700">{comp.traffic}</td>
                      <td className="px-4 py-3 text-slate-700">{comp.overlap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Market Coverage Comparison</h3>
            <p className="text-slate-600 text-sm mb-6">How your service coverage compares to top 3 competitors</p>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={colors.cobalt} opacity={0.2} />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Alicia (You)" dataKey="you" stroke={colors.cerulean} fill={colors.cerulean} />
                <Radar name="Sara McConnell" dataKey="sara" stroke={colors.cobalt} fill={colors.cobalt} />
                <Radar name="Mathieu Photo" dataKey="mathieu" stroke={colors.magenta} fill={colors.magenta} />
                <Radar name="Isabelle Buckley" dataKey="isabelle" stroke="#94A3B8" fill="#94A3B8" />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="text-2xl mb-2">🏒</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Hockey</h4>
              <p className="text-slate-700 text-sm">No competitor has strong organic rankings. KD 0 across almost all terms.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="text-2xl mb-2">🐾</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Pets</h4>
              <p className="text-slate-700 text-sm">Completely underserved locally. No competitor targets pet photography.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="text-2xl mb-2">💼</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Corporate</h4>
              <p className="text-slate-700 text-sm">Only 2 competitors present. Ottawa headshot terms at KD 6–18.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-2">
                <QuebecFlag size="w-6 h-5" />
                <span>Bilingual</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Bilingual Advantage</h4>
              <p className="text-slate-700 text-sm">Only Mathieu Photo competes. Your bilingual site has a built-in edge.</p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: colors.cobalt }}>3</span>
            Keyword Opportunities by Service
          </h2>

          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Monthly Search Volume by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.cobalt} opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="volume" fill={colors.cerulean}>
                  {volumeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Priority Breakdown by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.cobalt} opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="high" name="Quick Win (KD 0–15)" fill={colors.cerulean} stackId="a" />
                <Bar dataKey="med" name="Growth (KD 16–30)" fill={colors.magenta} stackId="a" />
                <Bar dataKey="long" name="Long-term (KD 30+)" fill="#94A3B8" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <KeywordTable keywords={familyKeywords} title="Family Photography Keywords" insight="Strongest mix of volume and achievability. 'Near me' variants trigger Google's local pack — critical for a studio-based business." />
          <KeywordTable keywords={headshotKeywords} title="Corporate & Headshot Keywords" insight="Highest CPC values ($1–$2.72) signal strong commercial intent. Ottawa-specific terms are very achievable (KD 6–18)." />
          <KeywordTable keywords={hockeyKeywords} title="Hockey Photography Keywords" insight="Your biggest competitive advantage — a true blue ocean. Nearly every keyword has KD 0. No competitor is optimizing for these terms." />
          <KeywordTable keywords={petKeywords} title="Pet Photography Keywords" insight="'Dog photoshoot' (720/mo, KD 24) is a standout. Your vet background gives you a unique content angle no competitor can match." />
          <KeywordTable keywords={localKeywords} title="Local & Bilingual Keywords" insight="'Photographe gatineau' (210/mo) is key for your bilingual advantage. Broader terms improve as domain authority grows." />
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: colors.cobalt }}>4</span>
            3-Phase Implementation Strategy
          </h2>
          <div className="space-y-6">
            {[
              { phase: 'Phase 1: Quick Wins', duration: 'Months 1–3', color: colors.cerulean, tasks: ['Optimize service pages for Family, Hockey, and Headshot keywords', 'Build citation profile (Google Business, Yelp, Waze)', 'Target KD 0–15 terms with on-page only', 'Expected: 8–10 first page rankings'] },
              { phase: 'Phase 2: Content + Authority', duration: 'Months 4–6', color: colors.magenta, tasks: ['Launch 12-post blog calendar (2/month)', 'Leverage vet tech background for pet content', 'Build local partnerships (vet clinics, sports leagues)', 'Expected: 15–19 first page rankings'] },
              { phase: 'Phase 3: Dominance', duration: 'Months 7–12', color: '#94A3B8', tasks: ['Target higher-KD terms (KD 20–40)', 'Expand into bilingual content strategy', 'Build topical authority clusters', 'Expected: 25–30+ first page rankings'] },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6" style={{ borderTopColor: item.color, borderTopWidth: '4px' }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{item.phase}</h3>
                    <p className="text-sm text-slate-500 mt-1">{item.duration}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: item.color }}>{item.phase.split(':')[0]}</span>
                </div>
                <ul className="space-y-2">
                  {item.tasks.map((task, i) => (
                    <li key={i} className="flex items-start"><span className="text-slate-400 mr-3 flex-shrink-0">•</span><span className="text-slate-700">{task}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center">
            <span className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: colors.cobalt }}>5</span>
            6-Month Content Strategy
          </h2>
          <p className="text-slate-600 mb-8">4 posts per month, aligned with keyword phases and Semrush search data.</p>
          <div className="space-y-8">
            {contentCalendar.map((month, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-8">
                <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-200">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{month.month}</h3>
                    <p className="text-sm text-slate-500 mt-1">{month.phase}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {month.posts.map((post, i) => (
                    <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-200" style={{ borderLeftColor: month.phase.includes('Phase 1') ? colors.cerulean : month.phase.includes('Phase 2') ? colors.magenta : '#94A3B8', borderLeftWidth: '4px' }}>
                      <h4 className="font-semibold text-slate-900 mb-2 text-sm">{post.title}</h4>
                      <div className="space-y-2 text-xs">
                        <div><span className="text-slate-500">Keywords:</span><p className="text-slate-700 mt-0.5">{post.keywords}</p></div>
                        <div><span className="text-slate-500">Target Page:</span><p className="text-slate-700 font-mono mt-0.5">{post.target}</p></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: colors.cobalt }}>6</span>
            Recommended Next Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Optimize Service Pages', desc: 'Update title tags, meta descriptions, and H1s for Family, Headshots, and Hockey landing pages.' },
              { title: 'Create SEO Content', desc: '24 blog posts across 6 months targeting quick-win keywords. Align with Phase timeline above.' },
              { title: 'Build Local SEO', desc: 'Create and optimize Google Business Profile. Build local citations in Ottawa-Gatineau directories.' },
              { title: 'Leverage Bilingual Edge', desc: 'Create French versions of top-performing content. Target "photographe gatineau" immediately.' },
              { title: 'Track Progress', desc: 'Set up Semrush rank tracking for all 44 keywords. Monitor monthly for ranking improvements.' },
              { title: 'Monthly Strategy Reviews', desc: 'Review rankings, traffic, and conversions. Adjust keyword targets and content plan as needed.' },
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-700 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-8 text-center text-white mt-20" style={{ background: `linear-gradient(135deg, ${colors.cobalt} 0%, ${colors.cerulean} 100%)` }}>
          <div className="flex items-center justify-center gap-8 mb-6">
            <InklineLogo color="#fff" size="md" />
            <span className="text-white opacity-50">+</span>
            <img src="data:image/png;base64,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" alt="Alicia Riddle Photography" className="h-20 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
          </div>
          <p className="text-sm opacity-90 mb-4">Keyword Research Report • Prepared for Alicia Riddle Photography</p>
          <p className="text-xs opacity-75">Data sourced from Semrush competitive intelligence analysis. All metrics current as of February 2026.</p>
        </div>
      </div>
    </div>
  );
}
