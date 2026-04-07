import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  { id: "overview", label: "Overview", icon: "📋" },
  { id: "planning", label: "Planning Process", icon: "🗺️" },
  { id: "platforms", label: "Platform Selection", icon: "📱" },
  { id: "framework", label: "Media Framework", icon: "📊" },
  { id: "formats", label: "High Impact Formats", icon: "⚡" },
  { id: "budget", label: "Budget & Channel Mix", icon: "💰" },
  { id: "measurement", label: "Measurement & KPIs", icon: "📡" },
  { id: "calendar", label: "GCC Calendar", icon: "📅" },
  { id: "updates", label: "Platform Updates", icon: "🔄" },
  { id: "caveats", label: "Caveats & Risks", icon: "⚠️" },
  { id: "checklist", label: "Pre-Launch QA", icon: "✅" },
  { id: "mistakes", label: "Common Mistakes", icon: "🚫" },
  { id: "glossary", label: "KPI Glossary", icon: "📖" },
];

const Chip = ({ children, color = "blue" }) => {
  const colors = {
    blue: { bg: "#1a2744", text: "#7eb8ff", border: "#2a4060" },
    green: { bg: "#1a3a2a", text: "#7effb8", border: "#2a5040" },
    amber: { bg: "#3a2a1a", text: "#ffcb7e", border: "#504020" },
    red: { bg: "#3a1a1a", text: "#ff7e7e", border: "#502a2a" },
    purple: { bg: "#2a1a3a", text: "#c07eff", border: "#402a50" },
    teal: { bg: "#1a3a3a", text: "#7effee", border: "#2a5050" },
  };
  const c = colors[color] || colors.blue;
  return (
    <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: c.bg, color: c.text, border: `1px solid ${c.border}`, marginRight: 6, marginBottom: 4 }}>
      {children}
    </span>
  );
};

const Card = ({ children, style, onClick, hoverable }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov && hoverable ? "#1c2538" : "#141c2e",
        border: "1px solid #1e2d45",
        borderRadius: 12,
        padding: 20,
        marginBottom: 14,
        cursor: onClick ? "pointer" : "default",
        transition: "all .2s",
        transform: hov && hoverable ? "translateY(-1px)" : "none",
        boxShadow: hov && hoverable ? "0 4px 20px rgba(0,0,0,.3)" : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Accordion = ({ title, subtitle, children, defaultOpen, badge }) => {
  const [open, setOpen] = useState(defaultOpen || false);
  return (
    <Card hoverable onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", display: "flex", alignItems: "center", gap: 8 }}>
            {title} {badge}
          </div>
          {subtitle && <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>{subtitle}</div>}
        </div>
        <div style={{ fontSize: 18, color: "#475569", transition: "transform .2s", transform: open ? "rotate(180deg)" : "none" }}>▾</div>
      </div>
      {open && <div onClick={e => e.stopPropagation()} style={{ marginTop: 16, borderTop: "1px solid #1e2d45", paddingTop: 16, cursor: "default" }}>{children}</div>}
    </Card>
  );
};

const InfoRow = ({ label, value }) => (
  <div style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13 }}>
    <span style={{ color: "#64748b", fontWeight: 600, minWidth: 130, flexShrink: 0 }}>{label}</span>
    <span style={{ color: "#cbd5e1" }}>{value}</span>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 style={{ fontSize: 22, fontWeight: 800, color: "#e2e8f0", marginBottom: 6, fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}>{children}</h2>
);

const SectionDesc = ({ children }) => (
  <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24, lineHeight: 1.6 }}>{children}</p>
);

const CheckItem = ({ children, checked, onChange }) => (
  <div
    onClick={() => onChange && onChange(!checked)}
    style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 12px", borderRadius: 8, cursor: "pointer", background: checked ? "#1a2e1a" : "transparent", marginBottom: 4, transition: "background .15s" }}
  >
    <div style={{ width: 18, height: 18, borderRadius: 4, border: checked ? "none" : "2px solid #334155", background: checked ? "#22c55e" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, fontSize: 11, color: "#fff", fontWeight: 800 }}>
      {checked ? "✓" : ""}
    </div>
    <span style={{ fontSize: 13, color: checked ? "#86efac" : "#94a3b8", textDecoration: checked ? "line-through" : "none", lineHeight: 1.5 }}>{children}</span>
  </div>
);

const SearchBar = ({ value, onChange }) => (
  <div style={{ position: "relative", marginBottom: 20 }}>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search playbook..."
      style={{ width: "100%", padding: "10px 16px 10px 38px", background: "#0f1726", border: "1px solid #1e2d45", borderRadius: 10, color: "#e2e8f0", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
    />
    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, opacity: .5 }}>🔍</span>
  </div>
);

const ProgressBar = ({ value, max, color = "#3b82f6" }) => (
  <div style={{ background: "#0f1726", borderRadius: 6, height: 6, overflow: "hidden" }}>
    <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 6, transition: "width .5s" }} />
  </div>
);

// DATA
const planningStages = [
  { stage: "1. Brief Intake & Objective Setting", what: "Receive and interrogate the client brief. Clarify the single most important objective — awareness, consideration, or conversion. Identify target audience, geography, flight dates, blackout periods.", actions: "Complete a brief interrogation checklist. Document: objective, KPI, audience, markets, budget, flight, creative status, measurement requirements, past campaign data.", mistake: "Accepting a brief at face value without asking 'what does success look like in a number?'" },
  { stage: "2. Audience & Market Analysis", what: "Define the target audience with precision: demographics, platform behaviour, language preference (Arabic vs English), device usage, and GCC-specific cultural context.", actions: "Pull platform audience estimates. Cross-reference with GCC-specific data (e.g. Snapchat penetration by market). Document audience size per platform per market.", mistake: "Treating GCC as a monolith. KSA is Snap/TikTok-dominant. Kuwait over-indexes on Snapchat. UAE has the most diverse audience." },
  { stage: "3. Platform Selection & Justification", what: "Select platforms based on: (a) where your audience is, (b) which formats support the objective, (c) whether budget is sufficient. Every platform needs a written rationale.", actions: "Use the Platform × Objective matrix. Document why each platform is included. Remove platforms without meaningful budget.", mistake: "Adding platforms because they're trending — not because they're right for the objective." },
  { stage: "4. Budget Allocation & Channel Mix", what: "Distribute budget across platforms and funnel stages. Always allocate enough per platform to exit the learning phase.", actions: "Build a budget allocation table: platform | monthly budget | % of total | buying type | expected KPI range. Flag platforms below minimum.", mistake: "Spreading budget equally across too many platforms. Meta needs minimum ~$5K/month." },
  { stage: "5. Format & Creative Planning", what: "Identify which ad formats are required per platform per objective. Brief creative team with precise specs.", actions: "Produce a creative requirements matrix: platform | format | aspect ratio | duration | spec | deadline. Flag creative gaps.", mistake: "Adapting a landscape TV edit to vertical mobile placements. Planning TikTok without a hook in the first 2 seconds." },
  { stage: "6. Measurement Framework Setup", what: "Define measurement framework before the campaign goes live. Confirm tracking is in place: Meta Pixel + CAPI, TikTok Events API, Snap Pixel, LinkedIn Insight Tag.", actions: "Produce a measurement plan: KPI | target | source | reporting cadence | attribution window. Validate pixel firing.", mistake: "Setting up measurement after launch. Using inconsistent UTM naming across campaigns." },
  { stage: "7. Campaign Launch & QA", what: "Run a pre-launch QA checklist: pixels firing, tracking links working, creative approved, targeting correct, budget pacing set, naming conventions applied.", actions: "Complete QA checklist. Get two-person sign-off. Document go-live date and first reporting date.", mistake: "Launching without checking that pixels are firing. Forgetting frequency caps on awareness campaigns." },
  { stage: "8. Optimisation & Mid-Flight", what: "Optimise based on data. Wait for the learning phase (7–14 days or 50 conversion events) before changes. Change one variable at a time.", actions: "Weekly optimisation report: spend vs pacing, CPM/CPC/CPL vs benchmark, CTR, creative performance ranking.", mistake: "Making daily bid changes that reset the learning phase. Ignoring creative fatigue until performance collapses." },
  { stage: "9. Reporting & Post-Campaign", what: "Report against the KPIs defined in the measurement framework — not just metrics that look good. Include what worked, what didn't, and why.", actions: "Report structure: Executive Summary → KPI Performance → Platform Breakdown → Creative Performance → Audience Insights → Learnings → Recommendations.", mistake: "Reporting only the good numbers. Claiming credit for conversions that would have happened organically." },
];

const platforms = [
  { name: "Meta", include: "Any objective at any budget tier. Audience 18–55+. Creative in 9:16 and 1:1. E-commerce with Pixel + CAPI.", exclude: "Landscape-only creative. No Pixel for conversions. Budget below $5K/month.", gcc: "Essential baseline for all GCC campaigns. Dual-language (AR+EN) recommended. Ramadan CPMs spike 2–3x.", color: "blue" },
  { name: "TikTok", include: "Target 18–34. Native entertainment-first creative. Awareness or video view campaigns. UGC-style content.", exclude: "Target 45+. Corporate creative. Budget below $5K/month. Heavily regulated category.", gcc: "GCC TikTok usage among highest globally. Arabic content critical. Spark Ads outperform brand content. Book TopView 4–6 weeks ahead.", color: "purple" },
  { name: "Snapchat", include: "KSA or Kuwait (non-negotiable). Audience 13–34. AR or experiential formats. Cultural moments.", exclude: "B2B or 45+ audience. Budget below $5K/month. No vertical creative. UAE-only campaign.", gcc: "KSA & Kuwait penetration 60–70%. Sponsored Snaps and Total Snap Takeover are new high-impact formats.", color: "amber" },
  { name: "YouTube", include: "Video is primary format. Audience researches before buying. Awareness or demand gen objective.", exclude: "No video creative. Budget below $5K/month. Pure social engagement objective.", gcc: "#1 video platform in GCC. Arabic content consumption very high. Masthead book 4–8 weeks advance.", color: "red" },
  { name: "Google Demand Gen", include: "Mid-to-lower funnel. Video/image creative available. Google Tag + GA4 in place. Budget $10K+/month.", exclude: "No conversion tracking. Budget below $5K/month. Pure awareness. Single static image only.", gcc: "Most versatile Google performance format for GCC. Strong for fashion, retail, travel. Replaces Discovery Ads.", color: "teal" },
  { name: "Google PMax", include: "E-commerce at scale. Product feed available. 50+ monthly conversions. Enhanced Conversions implemented. Budget $15K+/month.", exclude: "Under 30–50 conversions/month. No server-side tracking. Need precise placement control. No product feed.", gcc: "Covers all Google inventory. GCC fashion, electronics, FMCG see strong ROAS. Not for early-stage brands.", color: "teal" },
  { name: "LinkedIn", include: "B2B professionals, decision-makers. Lead generation or thought leadership. Budget accepts premium CPMs ($15–$60).", exclude: "B2C mass awareness. General consumers. Budget below $10K/month.", gcc: "Growing in UAE and KSA enterprise sectors. Thought Leader Ads underused but highly effective.", color: "blue" },
  { name: "X (Twitter)", include: "Live event tie-in (sports, news). Real-time conversation. News-aware adults.", exclude: "E-commerce conversions. Budget below $5K/month. Brand safety is a concern.", gcc: "Strongest for live events: F1, Saudi National Day, FIFA. Trend Takeover+ owns national conversation.", color: "green" },
  { name: "Pinterest", include: "Female 25–44. Home, fashion, beauty, weddings. Upper-to-mid funnel discovery.", exclude: "Not visually driven. Male-skewing. Immediate conversion at scale.", gcc: "GCC audience skews affluent female. Shopping Spotlight effective for peak retail.", color: "red" },
  { name: "Programmatic", include: "Reach extension beyond social. Brand safety via PMPs. Retargeting. CTV/OTT or DOOH.", exclude: "Budget below $20K/month. No first-party data or pixel.", gcc: "Shahid & MBC offer premium Arabic video. DOOH in Dubai & Riyadh is premium. Always use PMPs.", color: "amber" },
];

const frameworkData = [
  { platform: "Meta", objective: "Awareness", type: "Brand Awareness", format: "Image/Video/Carousel + Threads", buying: "CPM", kpi: "Reach/CPM", benchmark: "CPM: $3–$11", notes: "Reels & Threads growing. Ramadan 2–3x CPM. Supply 6–12 diverse creatives." },
  { platform: "Meta", objective: "Video Views", type: "ThruPlay", format: "Video (15s–60s)", buying: "CPV", kpi: "ThruPlay Rate/CPV", benchmark: "CPV: $0.01–$0.05", notes: "Arabic creative outperforms in KSA/Kuwait. 9:16 mandatory for Reels." },
  { platform: "Meta", objective: "Traffic", type: "Link Clicks/LPV", format: "Image/Video/Carousel/Collection", buying: "CPC", kpi: "CPC/CTR", benchmark: "CPC: $0.30–$1.10", notes: "WhatsApp Status ads auto-activate. ~95%+ WhatsApp penetration in GCC." },
  { platform: "Meta", objective: "Lead Gen", type: "Lead Ads", format: "Lead Form/Instant Form", buying: "CPL", kpi: "CPL/Volume", benchmark: "CPL: $5–$30", notes: "Arabic form fields improve completion in KSA/Kuwait." },
  { platform: "Meta", objective: "Conversions", type: "Advantage+ Sales", format: "Image/Video/Carousel/DPA", buying: "CPA", kpi: "ROAS/CPA", benchmark: "ROAS: 2–5x", notes: "Flexible Multi-Format. Ensure CAPI implemented." },
  { platform: "TikTok", objective: "Awareness", type: "Brand Awareness", format: "TopView/TopReach/Logo Takeover/Prime Time", buying: "CPM/Reservation", kpi: "Reach/CPM", benchmark: "CPM: $5–$20", notes: "TopReach bundles TopView+TopFeed. Logo Takeover highest-impact. Book 4–6 wks." },
  { platform: "TikTok", objective: "Video Views", type: "Video Views", format: "In-Feed (up to 10min), Pulse", buying: "CPV", kpi: "View Rate/VTR", benchmark: "CPV: $0.02–$0.08", notes: "Pulse Mentions/Tastemakers new. GCC time-spent among highest globally." },
  { platform: "TikTok", objective: "Conversions", type: "Product Sales", format: "In-Feed/Dynamic Showcase", buying: "CPA", kpi: "ROAS/CPA", benchmark: "ROAS: 1.5–4x", notes: "Smart+ growing. Events API required for attribution." },
  { platform: "Snapchat", objective: "Awareness", type: "Brand Awareness", format: "Story/Commercial/AR/Sponsored Snaps/Takeover", buying: "CPM", kpi: "Reach/CPM", benchmark: "CPM: $3–$10", notes: "Total Snap Takeover (Mar 2026) — first ad across all tabs. 60–70% reach KSA/Kuwait." },
  { platform: "Snapchat", objective: "AR Engagement", type: "AR Lens/AI Lens", format: "AR Lens/Sponsored AI Lens", buying: "Reservation", kpi: "Lens Plays/Shares", benchmark: "$15K–$41K+", notes: "AI Lenses use generative AI. High earned media in GCC." },
  { platform: "YouTube", objective: "Awareness", type: "Brand Awareness", format: "Bumper/Non-Skip/Masthead", buying: "CPM", kpi: "Reach/CPM", benchmark: "CPM: $5–$15", notes: "#1 video platform GCC. Masthead book well in advance." },
  { platform: "YouTube/Google", objective: "Traffic/Conv.", type: "Demand Gen", format: "Video/Image/Carousel", buying: "CPC/CPA", kpi: "CPC/CPA", benchmark: "CPM $5–15 | CPC $0.50–2", notes: "Spans YouTube, Shorts, Gmail & Discover. Requires Google Tag + GA4." },
  { platform: "YouTube/Google", objective: "Conversions", type: "Performance Max", format: "Video/Image/Text (AI combo)", buying: "CPA/tROAS", kpi: "ROAS/CPA", benchmark: "ROAS: 3–8x", notes: "All Google surfaces. Needs 50+ monthly conversions. Enhanced Conversions required." },
  { platform: "LinkedIn", objective: "Lead Gen", type: "Lead Gen Forms", format: "Image/Video + Lead Form", buying: "CPL", kpi: "CPL/Volume", benchmark: "CPL: $30–$150", notes: "Pre-filled from LinkedIn profiles. Dominant for B2B in GCC." },
  { platform: "LinkedIn", objective: "Thought Leadership", type: "Thought Leader Ads", format: "Boosted personal posts", buying: "CPM/CPC", kpi: "Engagement/CTR", benchmark: "CPM: $20–$50", notes: "Amplify exec posts. Drives credibility in GCC professional sector." },
  { platform: "X (Twitter)", objective: "Awareness", type: "Trend Takeover", format: "Trend Takeover+/Amplify", buying: "Reservation", kpi: "SOV/Impressions", benchmark: "$20K–$55K+", notes: "Dominates trending tab. Powerful for launch moments & cultural events." },
  { platform: "Programmatic", objective: "Awareness", type: "OLV/CTV/DOOH", format: "Display/Pre-Roll/CTV/DOOH", buying: "CPM", kpi: "Reach/CPM/vCPM", benchmark: "CPM: $2–$30", notes: "CTV via OSN+, Shahid. DOOH in Dubai Mall, SZR. Always use PMPs." },
];

const highImpactFormats = [
  { platform: "Meta", name: "Trending Reels Ads", type: "Full-Screen Video", use: "Product launches, trend-jacking, Gen Z", cost: "CPM Reservation", specs: "9:16, up to 60s, auto-play sound-on", gcc: "Ads after top 5% Reels. Hook in 2s. Arabic Reels high amplification.", isNew: false },
  { platform: "Meta", name: "Advantage+ Sales", type: "AI Full-Funnel", use: "Always-on e-commerce, Eid, White Friday, DSF", cost: "CPA/ROAS", specs: "AI selects audience, placement & creative", gcc: "Replaces Advantage+ Shopping. Flexible Multi-Format. 8–12 creatives. COD important in KSA.", isNew: true },
  { platform: "Meta", name: "Click-to-WhatsApp", type: "Conversational", use: "Lead gen, customer service, high-intent", cost: "CPC $0.30–$1.50", specs: "Opens WhatsApp chat from ad", gcc: "WhatsApp penetration ~95%+ GCC. Ideal for real estate, auto, hospitality.", isNew: false },
  { platform: "TikTok", name: "Logo Takeover ★", type: "App-Splash Co-Brand", use: "Major launches, Ramadan day-1, National Day", cost: "Reservation (above TopView)", specs: "Brand logo co-brands TikTok splash screen", gcc: "Highest-impact format on TikTok. First brand: Warner Bros. GCC availability TBC.", isNew: true },
  { platform: "TikTok", name: "Prime Time ★", type: "Sequential Live-Moment", use: "Live events (F1, FIFA, Ramadan nights)", cost: "Reservation premium", specs: "Up to 3 sequential ads, 15-min window", gcc: "Perfect for F1 Abu Dhabi, Eid night, Ramadan Iftar. 3-act narrative.", isNew: true },
  { platform: "TikTok", name: "TopReach ★", type: "Bundled Premium Reach", use: "Max one-day reach, cultural moments", cost: "CPM-based single buy", specs: "TopView + TopFeed bundled", gcc: "More efficient than separate buys. Ideal for Ramadan launch day, National Day.", isNew: true },
  { platform: "TikTok", name: "Pulse Mentions ★", type: "Contextual Creator-Adjacent", use: "Brand relevance, social proof", cost: "CPM auction", specs: "Ads next to content discussing your brand", gcc: "Own the conversation around your category in GCC.", isNew: true },
  { platform: "Snapchat", name: "Total Snap Takeover ★", type: "Full-App Domination", use: "Major launches, National Days, Eid", cost: "Reservation premium", specs: "First ad across ALL app tabs simultaneously", gcc: "97% of users visit multiple tabs. Unmatched cross-surface presence.", isNew: true },
  { platform: "Snapchat", name: "Sponsored Snaps ★", type: "Native Inbox Ad", use: "Product launches, time-sensitive offers", cost: "CPM $4–$12", specs: "Ads in Chat/Inbox as brand Snaps", gcc: "Inbox-first usage in KSA & Kuwait. High open rates. Strong for Eid/Ramadan.", isNew: true },
  { platform: "Snapchat", name: "Reminder Ads ★", type: "Intent-to-Return", use: "Countdown to launches, sale dates, live events", cost: "CPM auction", specs: "Users set in-app reminder, push notification sent", gcc: "Ramadan countdown, Eid launches, F1 moments. No equivalent elsewhere.", isNew: true },
  { platform: "Snapchat", name: "Sponsored AI Lenses", type: "Generative AI AR", use: "Personalised brand moments", cost: "$15K–$50K+", specs: "AI-generated personalised experiences", gcc: "Different from fixed AR. Strong for beauty, fashion, FMCG.", isNew: true },
  { platform: "YouTube", name: "Masthead", type: "Homepage Takeover", use: "Mass reach, product launches, Ramadan", cost: "$50K–$200K/day", specs: "Top of YouTube Home, auto-play muted", gcc: "Best for maximum GCC-wide reach. Book 6–8 weeks ahead.", isNew: false },
  { platform: "YouTube", name: "Demand Gen ★", type: "AI Multi-Surface", use: "E-commerce, lead gen, consideration", cost: "CPM/CPC/CPA/tROAS", specs: "YouTube + Shorts + Gmail + Discover in one", gcc: "Best Google format below Masthead. Strong for fashion, retail, travel.", isNew: true },
  { platform: "YouTube", name: "Performance Max ★", type: "Fully Automated Cross-Channel", use: "E-commerce, always-on conversions", cost: "CPA/tROAS automated", specs: "All Google surfaces, AI-generated combos", gcc: "Fashion, electronics, FMCG see strong ROAS. Needs 50+ conv/month.", isNew: true },
];

const budgetTiers = [
  { tier: "Starter", budget: "$5K–$15K/mo", platforms: "Meta + 1 (TikTok or Snap)", mix: "Meta 70–80%, 1 secondary", max: 2, buying: "Auction only", reach: "50K–300K impressions/mo", constraint: "Too small for reservation formats" },
  { tier: "Growth", budget: "$15K–$50K/mo", platforms: "Meta + TikTok + Snap or YouTube", mix: "Meta 50–60%, TikTok 20–25%, Other 15–25%", max: 3, buying: "Auction + minor reservation", reach: "300K–1.5M impressions/mo", constraint: "Begin testing platform mix" },
  { tier: "Mid-Market", budget: "$50K–$150K/mo", platforms: "Meta + TikTok + Snap + YouTube + LinkedIn/X", mix: "Meta 35–40%, TikTok 20–25%, Snap 15–20%, YouTube 10–15%", max: 5, buying: "Auction + reservation formats", reach: "1.5M–6M impressions/mo", constraint: "Balance always-on with moment spikes" },
  { tier: "Premium", budget: "$150K–$400K/mo", platforms: "All major + Programmatic + DOOH", mix: "Meta 30–35%, TikTok 15–20%, YouTube 15%, Snap 10–15%, Prog 10%, DOOH 5–10%", max: 7, buying: "Auction + multiple reservations + PMPs", reach: "6M–20M impressions/mo", constraint: "Creative production is the bottleneck" },
  { tier: "Enterprise", budget: "$400K+/mo", platforms: "All + CTV + DOOH + Content partnerships", mix: "Meta 25–30%, TikTok 15–20%, YouTube 15–20%, Snap 10%, Prog+CTV 15%, DOOH 5–10%", max: "All", buying: "Full reservation + category exclusives", reach: "20M+ impressions/mo", constraint: "Measurement & attribution is the primary challenge" },
];

const channelMixByObjective = [
  { objective: "Brand Awareness", meta: "30%", tiktok: "20%", snap: "15%", youtube: "20%", google: "—", linkedin: "—", x: "5%", prog: "10%" },
  { objective: "Video Views", meta: "25%", tiktok: "30%", snap: "15%", youtube: "25%", google: "—", linkedin: "—", x: "5%", prog: "—" },
  { objective: "Traffic", meta: "40%", tiktok: "15%", snap: "15%", youtube: "—", google: "15%", linkedin: "5%", x: "5%", prog: "5%" },
  { objective: "Lead Gen", meta: "40%", tiktok: "15%", snap: "15%", youtube: "—", google: "10%", linkedin: "15%", x: "5%", prog: "—" },
  { objective: "E-commerce", meta: "45%", tiktok: "15%", snap: "10%", youtube: "—", google: "20%", linkedin: "—", x: "—", prog: "10%" },
  { objective: "App Installs", meta: "40%", tiktok: "20%", snap: "15%", youtube: "—", google: "20%", linkedin: "—", x: "—", prog: "5%" },
  { objective: "B2B", meta: "20%", tiktok: "—", snap: "—", youtube: "—", google: "15%", linkedin: "50%", x: "10%", prog: "5%" },
  { objective: "Full Funnel", meta: "30%", tiktok: "15%", snap: "12%", youtube: "10%", google: "15%", linkedin: "8%", x: "5%", prog: "10%" },
];

const seasonalCalendar = [
  { period: "Ramadan Build-Up", months: "Jan–Feb", cpm: "Medium ↑", weight: "10–15%", action: "Lock reservations. Audience warm-up. Brief Arabic creative.", prebook: "TopView, Masthead, Snap First Story", color: "amber" },
  { period: "Ramadan Peak", months: "Feb–Mar (lunar)", cpm: "HIGH (2–3x)", weight: "20–25%", action: "Max deployment. Post-Iftar 8pm–12am. Conversion last 10 days.", prebook: "All platforms at max", color: "red" },
  { period: "Eid Al-Fitr", months: "Mar–Apr (3–5 days)", cpm: "VERY HIGH", weight: "5–8%", action: "Conversion-first. Retarget Ramadan audiences. WhatsApp. DPA.", prebook: "Advantage+, TikTok DSA, Snap Dynamic", color: "red" },
  { period: "Q2 / Post-Eid", months: "Apr–May", cpm: "Low–Medium", weight: "5–8%", action: "Efficiency-focused. Lower CPMs = reach building. Test new creatives.", prebook: "Meta, TikTok (auction), TrueView", color: "green" },
  { period: "Summer", months: "Jun–Aug", cpm: "Low", weight: "8–10%", action: "Travel & hospitality. Gaming spikes. Test & learn.", prebook: "Meta, YouTube, TikTok, Programmatic", color: "green" },
  { period: "Eid Al-Adha", months: "Jun–Jul (varies)", cpm: "HIGH", weight: "5–8%", action: "Travel & hospitality. Launch creative 2 weeks prior.", prebook: "Meta, YouTube, TikTok In-Feed", color: "amber" },
  { period: "Back to School", months: "Aug–Sep", cpm: "Medium", weight: "3–5%", action: "Education, tech, fashion. Target parents (Meta/Google), students (Snap).", prebook: "Meta, Google, Snapchat", color: "blue" },
  { period: "Saudi National Day", months: "Sep 23", cpm: "Medium–High (KSA)", weight: "3–5%", action: "KSA-specific. Patriotic creative. Book in August.", prebook: "TopView, Trend Takeover+, Snap AR", color: "purple" },
  { period: "Q4 Brand Building", months: "Oct–Nov", cpm: "Medium ↑", weight: "8–12%", action: "White Friday prep. Riyadh Season. Brand awareness before Q1 spike.", prebook: "YouTube, Meta, LinkedIn, DOOH", color: "blue" },
  { period: "White Friday / DSF", months: "Late Nov–Dec", cpm: "HIGH", weight: "8–12%", action: "Biggest retail window. Conversion-first. Amazon/Noon alongside social.", prebook: "Advantage+, PMax, TikTok DSA, DOOH", color: "red" },
  { period: "UAE National Day & NY", months: "Dec 2–Jan 1", cpm: "Medium–High", weight: "5–8%", action: "UAE patriotic early Dec. NYE hospitality & travel. DOOH Downtown.", prebook: "Snap AR, TikTok Hashtag, DOOH Dubai", color: "purple" },
];

const measurementSetup = [
  { tracking: "Meta Pixel + CAPI", what: "Tracks user actions on website. CAPI sends events server-side, bypassing iOS restrictions and ad blockers.", platform: "Meta", checks: ["Pixel installed and firing on all key pages", "CAPI implemented (server-side)", "Event deduplication configured", "Test Events tool confirms correct firing", "Standard events mapped (ViewContent, AddToCart, Purchase)"] },
  { tracking: "TikTok Events API + Pixel", what: "Server-side and browser-side event tracking. Required for conversion optimisation and accurate ROAS.", platform: "TikTok", checks: ["TikTok Pixel installed", "Events API implemented server-side", "Events verified in Events Manager", "Conversion events prioritised correctly", "Attribution window agreed (7-day click / 1-day view)"] },
  { tracking: "Snap Pixel + CAPI", what: "Tracks Snapchat-driven conversions. Required for Dynamic Ads and Smart Bidding.", platform: "Snapchat", checks: ["Snap Pixel installed", "CAPI implemented", "Pixel Events Manager shows data flowing", "Eligibility check passed"] },
  { tracking: "LinkedIn Insight Tag", what: "Tracks LinkedIn-driven website visits and conversions. Enables retargeting audiences.", platform: "LinkedIn", checks: ["Insight Tag installed on all pages", "Conversion events configured", "Domain verified in Campaign Manager"] },
  { tracking: "GA4 + UTM Parameters", what: "Cross-platform session tracking, attribution, and audience data.", platform: "All Platforms", checks: ["GA4 property configured", "UTM naming convention documented and shared", "Parameters applied to all ad URLs", "GA4 linked to Google Ads"] },
  { tracking: "3rd Party Verification (DV/IAS)", what: "Verifies viewability, brand safety, and invalid traffic.", platform: "Programmatic + Social", checks: ["DV or IAS tags implemented", "Brand safety categories configured", "Viewability threshold set (70%+)", "IVT monitoring active"] },
];

const attributionCaveats = [
  { caveat: "Each platform claims credit for conversions", detail: "A single purchase can be claimed by all four platforms simultaneously. Platform ROAS always looks better than reality.", handle: "Never sum platform ROAS. Use GA4 or MMP as single source of truth." },
  { caveat: "View-Through Attribution (VTA)", detail: "If someone saw your ad on Monday and bought on Friday without clicking, Meta claims the conversion. Default: 7-day click + 1-day view.", handle: "Explain VTA to clients upfront. Consider click-only attribution if strong organic demand." },
  { caveat: "Learning Phase & Data Instability", detail: "After any significant change, platforms re-enter a 7–14 day learning phase where CPAs are elevated.", handle: "Brief clients at kickoff. No structural changes in first 7–14 days." },
  { caveat: "iOS Privacy & Signal Loss", detail: "~60–70% of iOS users opt out of tracking. Platform-reported numbers are understated.", handle: "CAPI/server-side tracking is non-negotiable. Platform numbers are a floor, not ceiling." },
  { caveat: "GCC Cash on Delivery (COD)", detail: "Significant COD orders in KSA can't be tracked via standard pixel events.", handle: "Ask for COD % at briefing. If >20%, build a blended attribution model." },
];

const caveats = [
  { area: "Benchmarks Are Directional", risk: "Actual costs vary by vertical, creative quality, audience, competition, algorithm state.", handle: "Never guarantee. Present as ranges. Your own data always beats published benchmarks.", flag: "Client asks for a KPI guarantee in writing." },
  { area: "Reservation Pricing Volatility", risk: "Pricing changes frequently, fluctuates with demand especially during Ramadan, National Days, sports.", handle: "Always get a formal rep quote. Quotes expire — confirm before presenting.", flag: "Plan includes reservation based on quote older than 2 weeks." },
  { area: "Platform Algorithm Changes", risk: "Meta had 83 changes in 2025. TikTok launched 4 formats in Mar 2026.", handle: "Check newsrooms monthly. Audit settings each campaign.", flag: "Plan uses template not updated in 6+ months." },
  { area: "Creative Is #1 Variable", risk: "Algorithm uses creative as primary targeting signal. Weak creative kills performance regardless of strategy.", handle: "Make creative quality non-negotiable. Flag non-native creative. Recommend A/B testing.", flag: "Single creative asset. No 9:16 vertical available." },
  { area: "GCC Cultural Sensitivity", risk: "Content acceptable globally may be restricted in GCC markets.", handle: "Review all creative against GCC guidelines. Check platform policies for market restrictions.", flag: "Global creative applied to GCC without local review." },
  { area: "Ramadan Complexity", risk: "CPMs spike 2–3x. Inventory sells out. Audiences shift to post-Iftar (8pm–1am).", handle: "Begin planning 8–10 weeks in advance. Lock reservation formats.", flag: "Ramadan planning starts in the same month." },
  { area: "Minimum Budgets", risk: "Below thresholds, results are statistically unreliable.", handle: "Meta ~$5K/mo, TikTok ~$5K/mo, LinkedIn ~$5K+/mo practical minimum.", flag: "Any platform with <$3K/month." },
  { area: "Data Privacy & First-Party Data", risk: "Third-party cookies declining. Retargeting capabilities reducing.", handle: "CAPI/server-side baseline. Build first-party data (CRM, loyalty, emails).", flag: "Conversion campaign with no first-party data strategy." },
  { area: "Brand Safety", risk: "Ads appearing alongside inappropriate content causes brand damage.", handle: "Apply platform controls. Use PMPs for programmatic. Keyword exclusion lists.", flag: "Programmatic open exchange without DV/IAS." },
];

const qaChecklist = {
  "Brief & Strategy": [
    "Objective is clearly defined with measurable KPI and target range",
    "Target audience documented (demographics, markets, language)",
    "Budget allocation confirmed per platform per month",
    "Flight dates confirmed — align with GCC cultural calendar",
    "Client signed off on final media plan in writing",
  ],
  "Creative": [
    "All assets in correct formats and specs per platform",
    "9:16 vertical available for Reels, TikTok, Snapchat, Shorts",
    "Arabic creative available for KSA and Kuwait campaigns",
    "Creative reviewed for GCC cultural sensitivity",
    "All assets uploaded and approved in platform ad managers",
    "No creative currently in rejected status",
  ],
  "Tracking & Measurement": [
    "Meta Pixel firing confirmed (Test Events tool)",
    "CAPI/server-side tracking implemented and verified",
    "TikTok Pixel + Events API configured and firing",
    "Snap Pixel verified",
    "LinkedIn Insight Tag installed",
    "UTM parameters applied to all destination URLs",
    "GA4 receiving traffic from all campaign sources",
    "Conversion events mapped correctly in all platforms",
  ],
  "Campaign Setup": [
    "Naming convention applied consistently across platforms",
    "Targeting verified — age, gender, geo, language, interests",
    "Budget pacing set correctly (daily vs lifetime)",
    "Bid strategy confirmed and appropriate for objective",
    "Frequency caps set for awareness (2–3x/week)",
    "Brand safety settings applied",
    "Ad scheduling set if event-based timing required",
    "All ads have correct destination URLs and CTAs",
  ],
  "Final Sign-Off": [
    "Two-person internal review completed",
    "Client confirmed creative preview and go-live approval",
    "First reporting date agreed and calendared",
    "Pacing/dashboard alerts configured",
  ],
};

const commonMistakes = [
  { mistake: "Treating GCC as one market", why: "Brief says 'GCC campaign' — same mix used everywhere", fix: "Segment by market. At minimum separate UAE, KSA, Kuwait.", rule: "Document platform priority per market, not just per campaign." },
  { mistake: "Optimising before learning phase ends", why: "Client/AM panics at early CPAs and forces changes in week 1", fix: "Set expectations before launch. Share learning phase timeline.", rule: "No structural changes in first 7–14 days." },
  { mistake: "Claiming ROAS without attribution caveats", why: "Platform ROAS reported without noting view-through / double-counting", fix: "Always label as 'platform-reported'. Use GA4 as cross-channel truth.", rule: "Every ROAS figure must include source and attribution model." },
  { mistake: "Planning without confirmed creative", why: "Plan built before knowing creative will be delivered in right specs", fix: "Creative requirements are prerequisite of brief sign-off.", rule: "Don't activate without confirmed creative." },
  { mistake: "Spreading budget across too many platforms", why: "Client wants to 'be everywhere' or planner pads the plan", fix: "Apply minimum budget test: $5K/month per platform.", rule: "Every platform must have a clear role, justified budget, and KPI." },
  { mistake: "Not booking reservations early enough", why: "Planner assumes inventory is always available", fix: "Create reservations calendar. Book 4–8 weeks before peaks.", rule: "Reservation formats must be confirmed ahead." },
  { mistake: "Using a single creative per campaign", why: "Limited creative production budget", fix: "Advocate for minimum 3 variants. AI optimisation needs creative variety.", rule: "Campaign success is heavily reliant on creatives." },
];

const platformUpdates = [
  { platform: "Meta", update: "Andromeda Algorithm — Global Rollout", impact: "🔴", date: "Oct 2025", detail: "Creative is now the primary targeting signal. Supply 8–12 diverse creatives per campaign." },
  { platform: "Meta", update: "Advantage+ Sales (replaces Shopping)", impact: "🔴", date: "Early 2026", detail: "Covers broader conversion objectives. Old API deprecated — migrate by Sep 2026." },
  { platform: "Meta", update: "Threads Ads — Global Rollout", impact: "🔴", date: "Feb 2026", detail: "400M+ MAU. Image, video, carousel ads via Ads Manager." },
  { platform: "Meta", update: "WhatsApp Status Ads Expanding", impact: "🔴", date: "Mar 2026", detail: "Auto-activates in Traffic campaigns. ~95%+ WhatsApp penetration GCC." },
  { platform: "Meta", update: "Detailed Targeting Exclusions Removed", impact: "🔴", date: "Mar 2025", detail: "Rely on creative signals, Value Rules, and first-party data (CAPI)." },
  { platform: "TikTok", update: "Logo Takeover — NEW", impact: "🔴", date: "Mar 2026", detail: "Highest-impact format. Brand logo co-brands TikTok splash screen." },
  { platform: "TikTok", update: "Prime Time — NEW", impact: "🔴", date: "Mar 2026", detail: "3 sequential ads, 15-min window. For live events." },
  { platform: "TikTok", update: "TopReach — NEW", impact: "🔴", date: "Mar 2026", detail: "Bundles TopView + TopFeed in single buy." },
  { platform: "TikTok", update: "TopView → CPM/Auction", impact: "🔴", date: "2023+", detail: "More targeting flexibility. Brand Takeover remains reservation." },
  { platform: "Snapchat", update: "Total Snap Takeover — NEW", impact: "🔴", date: "Mar 2026", detail: "First ad across ALL app tabs. 97% users visit multiple tabs." },
  { platform: "Snapchat", update: "Sponsored Snaps — Global", impact: "🔴", date: "2025", detail: "Ads in Chat/Inbox. High native feel. Inbox-first in KSA/Kuwait." },
  { platform: "Snapchat", update: "Smart Bidding & Smart Budget", impact: "🟡", date: "May 2025", detail: "Auto CPA bidding and spend reallocation. Aligns with Meta Advantage+." },
  { platform: "Cross-Platform", update: "9:16 Vertical is Default Standard", impact: "🔴", date: "2025–26", detail: "Meta confirmed 90% vertical by 2026. Non-vertical ads penalised." },
  { platform: "Cross-Platform", update: "AI-Driven Creative Optimisation", impact: "🔴", date: "2025–26", detail: "All major platforms use AI for creative selection. Supply 8–12 variants." },
  { platform: "Cross-Platform", update: "First-Party Data & Server-Side Essential", impact: "🔴", date: "2025–26", detail: "CAPI, Events API, Snap CAPI are measurement baseline." },
];

const glossary = [
  { term: "CPM", full: "Cost Per Mille", def: "Cost to serve 1,000 impressions", use: "Awareness, Reach" },
  { term: "CPC", full: "Cost Per Click", def: "Cost for each click on the ad", use: "Traffic, Lead Gen" },
  { term: "CPV", full: "Cost Per View", def: "Cost for each qualifying video view", use: "Video Views" },
  { term: "CPCV", full: "Cost Per Completed View", def: "Cost when video watched to 100%", use: "Video, OLV" },
  { term: "CPI", full: "Cost Per Install", def: "Cost per app install", use: "App Installs" },
  { term: "CPL", full: "Cost Per Lead", def: "Cost per lead form submission", use: "Lead Gen" },
  { term: "CPA", full: "Cost Per Acquisition", def: "Cost per conversion event", use: "Conversions" },
  { term: "ROAS", full: "Return on Ad Spend", def: "Revenue ÷ Spend", use: "E-commerce" },
  { term: "CTR", full: "Click-Through Rate", def: "Clicks ÷ Impressions × 100", use: "Traffic" },
  { term: "VTR", full: "View-Through Rate", def: "Video views ÷ Impressions × 100", use: "Video" },
  { term: "VCR", full: "Video Completion Rate", def: "Completed views ÷ Total starts × 100", use: "Video" },
  { term: "ThruPlay", full: "ThruPlay (Meta)", def: "View of 15s+ (or full if <15s)", use: "Meta Video" },
  { term: "vCPM", full: "Viewable CPM", def: "CPM when 50%+ in-view for 1+ second", use: "Display" },
  { term: "CVR", full: "Conversion Rate", def: "Conversions ÷ Clicks × 100", use: "Conversions" },
  { term: "LPV", full: "Landing Page Views", def: "Sessions where page fully loads", use: "Traffic Quality" },
  { term: "oCPM", full: "Optimised CPM", def: "Platform optimises for desired outcome", use: "Awareness" },
  { term: "tROAS", full: "Target ROAS", def: "Automated bidding targeting specific ROAS", use: "Google" },
  { term: "SOV", full: "Share of Voice", def: "Brand's share of total impressions in category", use: "Competitive" },
  { term: "DCO", full: "Dynamic Creative Optimisation", def: "Automated creative personalisation", use: "Retargeting" },
  { term: "PMP", full: "Private Marketplace", def: "Invite-only programmatic auction", use: "Programmatic" },
  { term: "MTA", full: "Multi-Touch Attribution", def: "Credit across multiple touchpoints", use: "Measurement" },
  { term: "MMM", full: "Marketing Mix Modelling", def: "Statistical analysis across all channels", use: "Enterprise" },
  { term: "COD", full: "Cash on Delivery", def: "Still dominant in KSA e-commerce", use: "E-commerce KSA" },
  { term: "DSF", full: "Dubai Shopping Festival", def: "Annual retail event in UAE", use: "All Platforms" },
  { term: "Demand Gen", full: "Google Demand Gen", def: "AI campaign across YouTube, Gmail & Discover", use: "Google Conv." },
  { term: "PMax", full: "Performance Max", def: "Fully automated all-Google inventory campaign", use: "Google E-com" },
  { term: "DOOH", full: "Digital Out-of-Home", def: "Digital billboard ads, programmatic", use: "Awareness" },
  { term: "CTV", full: "Connected TV", def: "Streaming TV ads via internet TV", use: "Awareness, Video" },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("overview");
  const [search, setSearch] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const [mobileNav, setMobileNav] = useState(false);
  const contentRef = useRef(null);

  const toggleCheck = (key) => setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));

  const totalChecks = Object.values(qaChecklist).flat().length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  useEffect(() => { if (contentRef.current) contentRef.current.scrollTop = 0; }, [activeSection]);

  const filterText = search.toLowerCase();

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#0b1120", color: "#e2e8f0", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Mobile nav toggle */}
      <button onClick={() => setMobileNav(!mobileNav)} style={{ position: "fixed", top: 12, left: 12, zIndex: 1000, display: "none", background: "#141c2e", border: "1px solid #1e2d45", borderRadius: 8, color: "#e2e8f0", padding: "8px 12px", fontSize: 18, cursor: "pointer", "@media(maxWidth:768px)": { display: "block" } }}>☰</button>

      {/* Sidebar */}
      <nav style={{ width: 240, minWidth: 240, background: "#0d1425", borderRight: "1px solid #1a2540", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid #1a2540" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#3b82f6", letterSpacing: "0.08em", textTransform: "uppercase" }}>GCC Digital Media</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#e2e8f0", marginTop: 2 }}>Planning Playbook</div>
          <div style={{ fontSize: 10, color: "#475569", marginTop: 4 }}>Updated March 2026 · Michel Zaidan · UM</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => { setActiveSection(s.id); setMobileNav(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 12px", border: "none",
                borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600, fontFamily: "inherit", textAlign: "left",
                background: activeSection === s.id ? "#1a2744" : "transparent",
                color: activeSection === s.id ? "#7eb8ff" : "#64748b",
                transition: "all .15s",
              }}
            >
              <span style={{ fontSize: 14 }}>{s.icon}</span> {s.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "12px 16px", borderTop: "1px solid #1a2540", fontSize: 10, color: "#334155" }}>
          All benchmarks in USD · Directional only
        </div>
      </nav>

      {/* Main Content */}
      <main ref={contentRef} style={{ flex: 1, overflowY: "auto", padding: "28px 36px 60px" }}>
        <div style={{ maxWidth: 900 }}>
          <SearchBar value={search} onChange={setSearch} />

          {/* OVERVIEW */}
          {activeSection === "overview" && (
            <div>
              <SectionTitle>GCC Digital Media Planning Framework 2026</SectionTitle>
              <SectionDesc>The complete internal reference for digital media planning across the GCC region. Contains the full planning toolkit: platform-by-objective framework with benchmarks, verified 2026 platform updates, high-impact format guidance, GCC cultural calendar, budget recommendations, and QA checklists.</SectionDesc>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12, marginBottom: 24 }}>
                {SECTIONS.filter(s => s.id !== "overview").map(s => (
                  <Card key={s.id} hoverable onClick={() => setActiveSection(s.id)} style={{ cursor: "pointer" }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{s.label}</div>
                  </Card>
                ))}
              </div>

              <Card style={{ background: "linear-gradient(135deg, #1a2744 0%, #0d1425 100%)", border: "1px solid #2a4060" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#7eb8ff", marginBottom: 8 }}>⚡ Key 2026 Changes</div>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.8 }}>
                  • <strong style={{ color: "#e2e8f0" }}>Meta Andromeda</strong> — Creative is now the primary targeting signal (8–12 assets per campaign)<br/>
                  • <strong style={{ color: "#e2e8f0" }}>TikTok NewFronts</strong> — Logo Takeover, Prime Time, TopReach, Pulse Mentions all new<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Snapchat</strong> — Total Snap Takeover, Sponsored Snaps, Reminder Ads, AI Lenses<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Google</strong> — Demand Gen replaces Discovery Ads; PMax covers all Google surfaces<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Cross-Platform</strong> — 9:16 vertical is default standard; server-side tracking mandatory
                </div>
              </Card>
            </div>
          )}

          {/* PLANNING PROCESS */}
          {activeSection === "planning" && (
            <div>
              <SectionTitle>Planning Process & Methodology</SectionTitle>
              <SectionDesc>The 9-stage end-to-end planning process from brief intake to post-campaign analysis.</SectionDesc>
              {planningStages.filter(s => !filterText || JSON.stringify(s).toLowerCase().includes(filterText)).map((s, i) => (
                <Accordion key={i} title={s.stage} subtitle="Expand for details">
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, color: "#7eb8ff", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>What Happens</div>
                      {s.what}
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, color: "#7effb8", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>Agency Actions & Outputs</div>
                      {s.actions}
                    </div>
                    <div style={{ background: "#1a1520", borderRadius: 8, padding: 12, border: "1px solid #2a1a30" }}>
                      <div style={{ fontWeight: 700, color: "#ff7e7e", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>⚠️ Common Mistake</div>
                      {s.mistake}
                    </div>
                  </div>
                </Accordion>
              ))}
            </div>
          )}

          {/* PLATFORM SELECTION */}
          {activeSection === "platforms" && (
            <div>
              <SectionTitle>Platform Selection Criteria</SectionTitle>
              <SectionDesc>When to include or exclude each platform, with GCC-specific considerations.</SectionDesc>
              {platforms.filter(p => !filterText || JSON.stringify(p).toLowerCase().includes(filterText)).map((p, i) => (
                <Accordion key={i} title={p.name} badge={<Chip color={p.color}>{p.name}</Chip>}>
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
                    <InfoRow label="✅ Include when" value={p.include} />
                    <InfoRow label="❌ Exclude when" value={p.exclude} />
                    <div style={{ marginTop: 10, padding: 10, background: "#0f1726", borderRadius: 8, fontSize: 12 }}>
                      <strong style={{ color: "#ffcb7e" }}>🌍 GCC Note:</strong> {p.gcc}
                    </div>
                  </div>
                </Accordion>
              ))}
            </div>
          )}

          {/* MEDIA FRAMEWORK */}
          {activeSection === "framework" && (
            <div>
              <SectionTitle>Media Planning Framework</SectionTitle>
              <SectionDesc>Platform × Objective matrix with buying units, KPIs, USD benchmarks, and GCC planning notes.</SectionDesc>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #1e2d45" }}>
                      {["Platform", "Objective", "Type", "Buying", "Primary KPI", "Benchmark", "GCC Notes"].map(h => (
                        <th key={h} style={{ padding: "10px 8px", textAlign: "left", color: "#64748b", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: ".05em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {frameworkData.filter(r => !filterText || JSON.stringify(r).toLowerCase().includes(filterText)).map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #141c2e", background: i % 2 === 0 ? "#0d1425" : "transparent" }}>
                        <td style={{ padding: "8px", fontWeight: 700, color: "#e2e8f0" }}>{r.platform}</td>
                        <td style={{ padding: "8px" }}><Chip color={r.objective.includes("Aware") ? "blue" : r.objective.includes("Video") ? "purple" : r.objective.includes("Traffic") ? "green" : r.objective.includes("Lead") ? "amber" : r.objective.includes("Conv") ? "red" : "teal"}>{r.objective}</Chip></td>
                        <td style={{ padding: "8px", color: "#94a3b8" }}>{r.type}</td>
                        <td style={{ padding: "8px", color: "#94a3b8" }}>{r.buying}</td>
                        <td style={{ padding: "8px", color: "#cbd5e1", fontWeight: 600 }}>{r.kpi}</td>
                        <td style={{ padding: "8px", color: "#7effb8", fontWeight: 600 }}>{r.benchmark}</td>
                        <td style={{ padding: "8px", color: "#64748b", maxWidth: 200, fontSize: 11 }}>{r.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* HIGH IMPACT FORMATS */}
          {activeSection === "formats" && (
            <div>
              <SectionTitle>High Impact Ad Formats</SectionTitle>
              <SectionDesc>The highest-impact ad units on each platform — when to use them, costs, specs, and GCC considerations. ★ marks new 2025–2026 formats.</SectionDesc>
              {highImpactFormats.filter(f => !filterText || JSON.stringify(f).toLowerCase().includes(filterText)).map((f, i) => (
                <Accordion key={i} title={f.name} subtitle={`${f.platform} · ${f.type}`} badge={f.isNew ? <Chip color="green">NEW</Chip> : null}>
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
                    <InfoRow label="Best Use Cases" value={f.use} />
                    <InfoRow label="Cost / Buying" value={f.cost} />
                    <InfoRow label="Key Specs" value={f.specs} />
                    <div style={{ marginTop: 10, padding: 10, background: "#0f1726", borderRadius: 8, fontSize: 12 }}>
                      <strong style={{ color: "#ffcb7e" }}>🌍 GCC:</strong> {f.gcc}
                    </div>
                  </div>
                </Accordion>
              ))}
            </div>
          )}

          {/* BUDGET */}
          {activeSection === "budget" && (
            <div>
              <SectionTitle>Budget Guidance & Channel Mix</SectionTitle>
              <SectionDesc>Spend tier recommendations, channel mix by objective, and seasonal budget weighting for GCC.</SectionDesc>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#7eb8ff", marginBottom: 12 }}>Spend Tiers</h3>
              {budgetTiers.map((t, i) => (
                <Accordion key={i} title={`${t.tier} — ${t.budget}`} subtitle={`Max ${t.max} platforms · ${t.reach}`}>
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
                    <InfoRow label="Platforms" value={t.platforms} />
                    <InfoRow label="Channel Mix" value={t.mix} />
                    <InfoRow label="Buying" value={t.buying} />
                    <InfoRow label="Key Constraint" value={t.constraint} />
                  </div>
                </Accordion>
              ))}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#7eb8ff", marginTop: 28, marginBottom: 12 }}>Channel Mix by Objective (Mid-Market+)</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #1e2d45" }}>
                      {["Objective", "Meta", "TikTok", "Snap", "YouTube", "Google", "LinkedIn", "X", "Prog."].map(h => (
                        <th key={h} style={{ padding: "8px 6px", textAlign: "center", color: "#64748b", fontWeight: 700, fontSize: 10, textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {channelMixByObjective.map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #141c2e" }}>
                        <td style={{ padding: "8px", fontWeight: 700, color: "#e2e8f0", fontSize: 12 }}>{r.objective}</td>
                        {[r.meta, r.tiktok, r.snap, r.youtube, r.google, r.linkedin, r.x, r.prog].map((v, j) => (
                          <td key={j} style={{ padding: "8px", textAlign: "center", color: v === "—" ? "#334155" : parseInt(v) >= 30 ? "#7effb8" : parseInt(v) >= 15 ? "#7eb8ff" : "#94a3b8", fontWeight: parseInt(v) >= 30 ? 700 : 400 }}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#7eb8ff", marginTop: 28, marginBottom: 12 }}>Seasonal Budget Weighting</h3>
              {seasonalCalendar.filter(s => !filterText || JSON.stringify(s).toLowerCase().includes(filterText)).map((s, i) => (
                <Accordion key={i} title={s.period} subtitle={`${s.months} · ${s.weight} of annual`} badge={<Chip color={s.color}>{s.cpm}</Chip>}>
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
                    <InfoRow label="Priority Action" value={s.action} />
                    <InfoRow label="Pre-Book" value={s.prebook} />
                  </div>
                </Accordion>
              ))}
            </div>
          )}

          {/* MEASUREMENT */}
          {activeSection === "measurement" && (
            <div>
              <SectionTitle>Measurement & KPIs</SectionTitle>
              <SectionDesc>KPI framework by funnel stage, tracking setup requirements, and attribution caveats every planner must understand.</SectionDesc>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#7eb8ff", marginBottom: 12 }}>Funnel Stage KPIs</h3>
              {[
                { stage: "Top (Awareness)", obj: "Build brand awareness, reach new audiences", primary: "CPM / Reach / Frequency", secondary: "Unique Reach, vCPM, Brand Lift ($30K+ budgets)" },
                { stage: "Top (Video)", obj: "Drive video consumption, storytelling", primary: "VTR / ThruPlay / CPV", secondary: "Completion Rate by quartile, Avg Watch Time, Skip Rate" },
                { stage: "Mid (Consideration)", obj: "Drive traffic, engagement, exploration", primary: "CTR / CPC / Landing Page Views", secondary: "Bounce Rate, Session Duration" },
                { stage: "Mid (Lead Gen)", obj: "Collect first-party data, qualified leads", primary: "CPL / Lead Volume", secondary: "Form Completion Rate, Lead Quality Score" },
                { stage: "Bottom (Conversions)", obj: "Purchases, sign-ups, downloads", primary: "ROAS / CPA / CVR", secondary: "Add-to-Cart, Checkout Rate, Incremental ROAS" },
                { stage: "Retention & Loyalty", obj: "Re-engage existing customers", primary: "CPA (Retargeting) / ROAS", secondary: "View-Through Conversions, Frequency (cap 5–7x/week)" },
              ].map((f, i) => (
                <Card key={i}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>{f.stage}</div>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>{f.obj}</div>
                  <InfoRow label="Primary KPI" value={<span style={{ color: "#7effb8", fontWeight: 600 }}>{f.primary}</span>} />
                  <InfoRow label="Secondary" value={f.secondary} />
                </Card>
              ))}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#7eb8ff", marginTop: 28, marginBottom: 12 }}>Tracking Setup (Pre-Launch)</h3>
              {measurementSetup.map((m, i) => (
                <Accordion key={i} title={m.tracking} subtitle={m.platform}>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 12 }}>{m.what}</div>
                  {m.checks.map((c, j) => (
                    <CheckItem key={j} checked={checkedItems[`track_${i}_${j}`]} onChange={() => toggleCheck(`track_${i}_${j}`)}>{c}</CheckItem>
                  ))}
                </Accordion>
              ))}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#ff7e7e", marginTop: 28, marginBottom: 12 }}>⚠️ Attribution Caveats</h3>
              {attributionCaveats.map((a, i) => (
                <Card key={i}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>{a.caveat}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>{a.detail}</div>
                  <div style={{ fontSize: 12, color: "#7effb8" }}>✅ {a.handle}</div>
                </Card>
              ))}
            </div>
          )}

          {/* CALENDAR */}
          {activeSection === "calendar" && (
            <div>
              <SectionTitle>GCC Cultural & Seasonal Calendar</SectionTitle>
              <SectionDesc>19 key moments across 6 categories with timing, audience mindset, platforms, formats, and strategy notes.</SectionDesc>
              {seasonalCalendar.filter(s => !filterText || JSON.stringify(s).toLowerCase().includes(filterText)).map((s, i) => (
                <Accordion key={i} title={s.period} subtitle={`${s.months} · Budget: ${s.weight}`} badge={<Chip color={s.color}>{s.cpm}</Chip>}>
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
                    <InfoRow label="Months" value={s.months} />
                    <InfoRow label="CPM Pressure" value={s.cpm} />
                    <InfoRow label="Budget Weight" value={s.weight} />
                    <InfoRow label="Priority Action" value={s.action} />
                    <InfoRow label="Pre-Book" value={s.prebook} />
                  </div>
                </Accordion>
              ))}
            </div>
          )}

          {/* PLATFORM UPDATES */}
          {activeSection === "updates" && (
            <div>
              <SectionTitle>Latest Platform Updates (2025–2026)</SectionTitle>
              <SectionDesc>Verified updates from official newsrooms and trusted sources. Check before every campaign.</SectionDesc>
              {platformUpdates.filter(u => !filterText || JSON.stringify(u).toLowerCase().includes(filterText)).map((u, i) => (
                <Card key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>{u.update}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{u.platform} · {u.date}</div>
                    </div>
                    <span style={{ fontSize: 18 }}>{u.impact}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>{u.detail}</div>
                </Card>
              ))}
            </div>
          )}

          {/* CAVEATS */}
          {activeSection === "caveats" && (
            <div>
              <SectionTitle>Caveats, Disclaimers & Risk Areas</SectionTitle>
              <SectionDesc>10 risk areas every planner must understand and communicate to clients.</SectionDesc>
              {caveats.filter(c => !filterText || JSON.stringify(c).toLowerCase().includes(filterText)).map((c, i) => (
                <Accordion key={i} title={c.area}>
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
                    <InfoRow label="Risk" value={c.risk} />
                    <InfoRow label="How to Handle" value={c.handle} />
                    <div style={{ marginTop: 8, padding: 10, background: "#1a1520", borderRadius: 8, border: "1px solid #2a1a30", fontSize: 12 }}>
                      <strong style={{ color: "#ff7e7e" }}>🚩 Red Flag:</strong> {c.flag}
                    </div>
                  </div>
                </Accordion>
              ))}
            </div>
          )}

          {/* CHECKLIST */}
          {activeSection === "checklist" && (
            <div>
              <SectionTitle>Pre-Launch QA Checklist</SectionTitle>
              <SectionDesc>Complete before every campaign go-live. {checkedCount}/{totalChecks} items checked.</SectionDesc>
              <div style={{ marginBottom: 20 }}>
                <ProgressBar value={checkedCount} max={totalChecks} color={checkedCount === totalChecks ? "#22c55e" : "#3b82f6"} />
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 6 }}>{Math.round((checkedCount / totalChecks) * 100)}% complete</div>
              </div>
              {Object.entries(qaChecklist).map(([category, items]) => (
                <Card key={category} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0", marginBottom: 12 }}>{category}</div>
                  {items.map((item, i) => {
                    const key = `qa_${category}_${i}`;
                    return <CheckItem key={key} checked={checkedItems[key]} onChange={() => toggleCheck(key)}>{item}</CheckItem>;
                  })}
                </Card>
              ))}
            </div>
          )}

          {/* MISTAKES */}
          {activeSection === "mistakes" && (
            <div>
              <SectionTitle>Common Planning Mistakes</SectionTitle>
              <SectionDesc>7 recurring errors with root causes, fixes, and prevention rules.</SectionDesc>
              {commonMistakes.filter(m => !filterText || JSON.stringify(m).toLowerCase().includes(filterText)).map((m, i) => (
                <Accordion key={i} title={m.mistake}>
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
                    <InfoRow label="Why It Happens" value={m.why} />
                    <InfoRow label="The Fix" value={m.fix} />
                    <div style={{ marginTop: 8, padding: 10, background: "#1a2744", borderRadius: 8, border: "1px solid #2a4060", fontSize: 12 }}>
                      <strong style={{ color: "#7eb8ff" }}>📌 Rule:</strong> {m.rule}
                    </div>
                  </div>
                </Accordion>
              ))}
            </div>
          )}

          {/* GLOSSARY */}
          {activeSection === "glossary" && (
            <div>
              <SectionTitle>KPI & Metric Glossary</SectionTitle>
              <SectionDesc>Definitions for every metric and acronym used across the framework. {glossary.length} terms.</SectionDesc>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #1e2d45" }}>
                      {["Term", "Full Name", "Definition", "Use Case"].map(h => (
                        <th key={h} style={{ padding: "10px 8px", textAlign: "left", color: "#64748b", fontWeight: 700, fontSize: 10, textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {glossary.filter(g => !filterText || JSON.stringify(g).toLowerCase().includes(filterText)).map((g, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #141c2e", background: i % 2 === 0 ? "#0d1425" : "transparent" }}>
                        <td style={{ padding: "8px", fontWeight: 800, color: "#7eb8ff", fontFamily: "monospace" }}>{g.term}</td>
                        <td style={{ padding: "8px", color: "#e2e8f0" }}>{g.full}</td>
                        <td style={{ padding: "8px", color: "#94a3b8" }}>{g.def}</td>
                        <td style={{ padding: "8px" }}><Chip color="blue">{g.use}</Chip></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
