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
  { id: "programmatic", label: "Programmatic Deep Dive", icon: "🖥️" },
  { id: "vendors", label: "Vendor Landscape", icon: "🏢" },
  { id: "creativespecs", label: "Creative Specs", icon: "🎨" },
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
  { name: "Meta (Facebook + Instagram)", strengths: ["Broadest audience reach (18–55+) at any budget", "Most mature auction system — exits learning phase fastest", "Full-funnel: awareness through conversion in one platform", "Advantage+ / Andromeda AI optimises creative-to-audience matching", "CAPI enables strong server-side measurement", "WhatsApp Status + Threads extend reach further"], kpis: ["Awareness: CPM $3–$11, Reach, Frequency", "Traffic: CPC $0.30–$1.10, LPV, CTR", "Leads: CPL $5–$30, Form Completion Rate", "Conversions: ROAS 2–5x, CPA, CVR"], audienceFit: "Almost universal. Strongest 25–54 but effective across all demos. Both Arabic & English audiences. Expat + national reach in all GCC markets.", capabilities: "Full-funnel bidding (awareness→conversion). Pixel + CAPI tracking. Custom/Lookalike audiences. Catalogue/DPA. Lead Gen Forms. A/B testing. DCO. Advantage+ Sales for e-commerce.", evaluate: "Is our audience on Meta? → Almost certainly yes. Do we have Pixel + CAPI? → Required for conversion campaigns. Budget $5K+/month? → Minimum for learning phase. Creative in 9:16? → Needed for Reels/Stories (now 90% of inventory). Past performance? → Check historical CPA/ROAS benchmarks.", gcc: "Essential baseline for all GCC campaigns. Dual-language (AR+EN) recommended. Ramadan CPMs spike 2–3x — budget accordingly. Threads ads now live globally (Feb 2026). WhatsApp Status ads auto-activate in Traffic campaigns.", minBudget: "$5K/month", color: "blue" },
  { name: "TikTok", strengths: ["Dominant for 18–34 audience in GCC", "Highest time-spent per session of any platform", "Creative IS targeting — algorithm finds audience based on content", "Spark Ads (creator content) drive 70% higher CTR than brand content", "New formats: Logo Takeover, Prime Time, TopReach, Pulse"], kpis: ["Awareness: CPM $5–$20, Reach, VCR", "Video Views: CPV $0.02–$0.08, Completion Rate", "Traffic: CPC $0.20–$1.00, LPV", "Conversions: ROAS 1.5–4x, CPA"], audienceFit: "Dominant 18–34. Growing 35–44. Weaker 45+. Arabic-language content critical. KSA & UAE are among highest TikTok usage globally. Entertainment-first audience mindset.", capabilities: "In-Feed video, TopView (CPM auction), Spark Ads, Branded Hashtag Challenges, Dynamic Showcase Ads. Events API for server-side tracking. Smart+ (AI automation). TikTok Shop not yet in GCC.", evaluate: "Is target audience 18–34? → Strong signal to include. Can we produce native/UGC-style creative? → Essential — polished TV-style underperforms. Events API implemented? → Required for conversion campaigns. Budget $5K+/month? → Minimum. Is there a cultural moment to leverage? → TikTok excels at moment-based campaigns.", gcc: "Among highest usage globally. Arabic content and trending sounds are critical. Book TopView/TopReach 4–6 weeks ahead for peak moments. Spark Ads are underused by GCC agencies.", minBudget: "$5K/month", color: "purple" },
  { name: "Snapchat", strengths: ["60–70% penetration in KSA & Kuwait — non-negotiable for these markets", "Strongest AR/Lens capabilities of any platform", "New: Total Snap Takeover, Sponsored Snaps, Reminder Ads", "Inbox-first usage behaviour = high ad attention", "Smart Bidding + Smart Budget for automated optimisation"], kpis: ["Awareness: CPM $3–$10, Reach, Swipe-Up Rate", "Video: CPV $0.01–$0.05, Completion Rate", "Leads: CPL $8–$34, Form Completion Rate", "Conversions: ROAS 1.5–3.5x, CPA"], audienceFit: "Dominant 13–34 in KSA and Kuwait. Important but less dominant in UAE. Weaker for 45+ and B2B audiences. Arabic-speaking, mobile-native users.", capabilities: "AR Lenses (incl. AI Lenses), First Story, Commercials (non-skippable 6s), Dynamic Ads, Sponsored Snaps (inbox), Reminder Ads, Story Ads. Snap Pixel + CAPI.", evaluate: "Does the campaign target KSA or Kuwait? → Snapchat is mandatory, not optional. Audience 13–34? → Strong fit. AR or experiential component? → Snap is the leader. Budget to produce Snap-specific vertical creative? → Required. Past Snap performance in market? → Check historical CPMs and swipe rates.", gcc: "KSA & Kuwait penetration is 60–70% — cannot be excluded for these markets. Total Snap Takeover (Mar 2026) dominates entire app. Sponsored Snaps appear in Chat inbox.", minBudget: "$5K/month", color: "amber" },
  { name: "YouTube / Google Video", strengths: ["#1 video platform in GCC by time-spent", "Massive Arabic content consumption", "Non-skippable formats guarantee message delivery", "Masthead for maximum single-day reach", "Demand Gen spans YouTube + Shorts + Gmail + Discover"], kpis: ["Awareness: CPM $5–$15, Reach, Brand Lift", "Video Views: CPV $0.01–$0.05, VTR, Completion Rate", "Demand Gen: CPC $0.50–$2.00, ROAS 2–6x"], audienceFit: "Broadest video audience in GCC. All ages. Strong for audiences that research before buying (auto, real estate, B2B, tech, travel). Both Arabic and English content consumption.", capabilities: "TrueView (skippable), Non-Skip (15–20s), Bumpers (6s), Shorts, Masthead. Demand Gen (multi-surface). PMax (all Google surfaces). YouTube Select (top 5% content).", evaluate: "Is video storytelling important for this campaign? → YouTube is the primary platform. Does the audience research before purchasing? → YouTube is in the consideration path. Budget for $5K+/month? → Minimum. Video assets available? → Required. Need guaranteed message delivery? → Use non-skip or bumpers.", gcc: "#1 video platform in GCC. Arabic content consumption is extremely high. Masthead book 4–8 weeks in advance. Demand Gen is strongest Google mid-funnel format for GCC.", minBudget: "$5K/month", color: "red" },
  { name: "Google Performance Max", strengths: ["Covers ALL Google surfaces from one campaign", "AI-driven creative and audience optimisation", "Strong for e-commerce with product feeds", "Enhanced Conversions for accurate measurement"], kpis: ["Conversions: ROAS 3–8x (e-commerce), CPA varies", "New Customer Rate, Impression Share"], audienceFit: "Broad — lets Google AI find the right audience. Best for brands with existing conversion data (50+ monthly conversions). Strongest for e-commerce, travel, auto in GCC.", capabilities: "Automated across YouTube, Search, GDN, Gmail, Discover, Maps, Shopping. AI generates ad combinations from asset library. Requires product feed for shopping, Enhanced Conversions.", evaluate: "Is the objective e-commerce conversions? → PMax is Google's strongest format. Do we have 50+ monthly conversions? → Required for AI to optimise. Enhanced Conversions implemented? → Non-negotiable. Product feed available? → Required for Shopping inventory. Budget $15K+/month? → Minimum for meaningful AI learning.", gcc: "GCC fashion, electronics, FMCG see strong ROAS. Not suitable for early-stage brands without conversion history.", minBudget: "$15K/month", color: "teal" },
  { name: "LinkedIn", strengths: ["Only platform for precise B2B professional targeting", "Job title, industry, company, seniority targeting", "Pre-filled Lead Gen Forms from profile data = high completion", "Thought Leader Ads amplify executive credibility", "Document Ads drive high engagement for thought leadership"], kpis: ["Awareness: CPM $10–$60", "Leads: CPL $30–$150, Form Completion Rate", "Conversions: CPA $50–$200+", "Engagement: CPE $0.50–$3.00"], audienceFit: "Business professionals, C-suite, decision-makers. BFSI, tech, government, consulting, real estate investors. Not suitable for B2C mass-market or general consumers.", capabilities: "Sponsored Content (image/video/carousel), Lead Gen Forms (pre-filled), Document Ads (PDF carousels), InMail, Thought Leader Ads. Insight Tag for tracking. ABM targeting.", evaluate: "Is this a B2B campaign? → LinkedIn is likely essential. Target audience is decision-makers or specific job titles? → Only LinkedIn can target this precisely. Budget accepts premium CPMs ($15–$60)? → LinkedIn is expensive — thin budgets produce minimal reach. Past performance data? → Check historical CPL and lead quality scores.", gcc: "Growing in UAE and KSA enterprise sectors. Government, BFSI, tech verticals perform well. Thought Leader Ads underused but highly effective.", minBudget: "$10K/month (practical minimum)", color: "blue" },
  { name: "X (Twitter)", strengths: ["Strongest platform for real-time event moments", "Trend Takeover+ dominates national conversation", "Strong news, culture, finance, sports, and government audience", "Amplify Pre-Roll for brand-safe in-stream video"], kpis: ["Awareness: CPM $7–$19, Impressions, SOV", "Video: CPV $0.04–$0.15, Completion Rate", "Engagement: CPE $0.15–$0.60", "Traffic: CPC $0.60–$2.40"], audienceFit: "News-aware, politically and culturally engaged adults. Sports fans. Finance and government professionals. Weaker for e-commerce and direct response.", capabilities: "Promoted Ads, Video Ads, Website Cards, Trend Takeover+, Amplify Pre-Roll, Vertical Video Ads. Limited conversion optimisation vs Meta/TikTok.", evaluate: "Is this campaign tied to a live event (F1, FIFA, National Day, Ramadan)? → X is essential for real-time. Is the audience news/sports/finance-engaged? → Good fit. Is the objective e-commerce or app installs? → X is weak here — deprioritise. Budget for meaningful reach ($5K+/month)? → Brand safety is a concern — verify controls.", gcc: "Strongest for live events: F1 Abu Dhabi, Saudi National Day, FIFA. Trend Takeover+ is highly effective for owning a national conversation. Use primarily as moment-based buy, not always-on.", minBudget: "$5K/month", color: "green" },
  { name: "Pinterest", strengths: ["High purchase-intent audience in planning/discovery mode", "Strong for visually-driven lifestyle categories", "Shopping Spotlight for peak retail moments", "Affluent female audience in GCC"], kpis: ["Awareness: CPM $4–$12, Saves, Closeups", "Traffic: CPC $0.50–$2.00, Outbound Clicks", "Conversions: ROAS 2–5x (with catalogue)"], audienceFit: "Female 25–44, interested in home, fashion, beauty, weddings, travel, lifestyle. Affluent. Users actively planning purchases — high intent.", capabilities: "Standard Pins, Video Pins, Max-Width Video, Shopping Ads, Dynamic Product Ads, Collections, Lead Ads. Pinterest Tag required for conversion tracking.", evaluate: "Is the category visually driven (fashion, beauty, home, weddings)? → Strong fit. Is the target audience female 25–44? → Pinterest's core demo. Do we have a product catalogue? → Enables Shopping Ads. Is the objective discovery-to-purchase? → Pinterest excels here. Direct response at scale? → Pinterest is a discovery platform, not DR.", gcc: "GCC audience skews affluent female. Shopping Spotlight effective for DSF, Eid gifting. Less developed than other platforms in GCC but growing.", minBudget: "$3K/month", color: "red" },
  { name: "Programmatic (Display, CTV, DOOH, Audio)", strengths: ["Reach beyond social walled gardens", "Premium brand-safe inventory via PMPs", "CTV (Shahid, OSN+) for lean-back video", "DOOH for physical-world brand presence", "Retargeting across the open web", "DCO for personalised creative at scale"], kpis: ["Awareness: CPM $2–$30 (varies by inventory)", "Video: CPCV $0.05–$0.20, VCR", "Retargeting: CPC $0.30–$2.00, CVR", "CTV: CPM $15–$40, near-100% viewability"], audienceFit: "Broad — depends on inventory and data strategy. CTV reaches cord-cutters and streaming audiences. DOOH reaches commuters, shoppers, travellers. Display/native for retargeting and reach extension.", capabilities: "Display banners, native, OLV pre-roll, CTV/OTT, DOOH, audio (Spotify, Anghami). DCO. Retargeting. First-party data activation. Brand safety via DV/IAS. Needs DSP (DV360, TTD, MiQ).", evaluate: "Do we need reach beyond social platforms? → Programmatic extends across the open web + CTV + DOOH. Is retargeting a priority? → Programmatic display/native is the standard approach. Budget $20K+/month? → Minimum for meaningful programmatic. Verification (DV/IAS) in place? → Non-negotiable. First-party data available? → Significantly improves performance. Which DSP? → See Vendor Landscape section.", gcc: "Shahid & MBC offer premium Arabic CTV inventory. DOOH in Dubai Mall, SZR, Riyadh King Fahd Road is premium. Always use PMPs over open exchange for brand safety.", minBudget: "$20K/month", color: "amber" },
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

const programmaticEcosystem = [
  { category: "DSPs (Demand-Side Platforms)", description: "Platforms advertisers use to buy programmatic ad inventory via real-time bidding across display, video, audio, CTV and DOOH.", vendors: [
    { name: "Google DV360", type: "Enterprise DSP", what: "Google's enterprise DSP within Google Marketing Platform. Access to 80+ ad exchanges and SSPs, reaching 90%+ of global internet users. Native integration with YouTube, Gmail, Discover, and GDN.", gcc: "Best choice for YouTube-heavy GCC campaigns. Strong audience data from Google Search behaviour. Integrates with GA4 and CM360. Minimum ~$10K–$25K/month (often via agency).", bestFor: "YouTube reach, Google ecosystem, large-scale awareness, audience intelligence", minBudget: "$10K–$25K/month" },
    { name: "The Trade Desk (TTD)", type: "Independent DSP", what: "Leading independent, publicly-traded DSP. Open-internet focus with transparent cost-plus pricing (~20% platform fee). Strong CTV/OTT capabilities. Supports Unified ID 2.0 for identity resolution.", gcc: "Growing in GCC. Excellent for CTV campaigns on Shahid, OSN+, and StarzPlay. Better transparency than DV360 on costs. Preferred by agencies wanting independence from Google ecosystem.", bestFor: "CTV/OTT, transparency, cross-channel, retail media", minBudget: "$25K+/month (higher entry point)" },
    { name: "Amazon DSP", type: "E-commerce DSP", what: "Amazon's DSP leveraging purchase-intent data from Amazon shoppers. Strong for retargeting and lookalike audiences based on actual buying behaviour.", gcc: "Relevant for UAE brands selling on Amazon.ae. Purchase data targeting is unmatched. Strong during White Friday and DSF retail moments. Limited GCC-specific inventory outside Amazon properties.", bestFor: "E-commerce retargeting, purchase-intent audiences, Amazon sellers", minBudget: "$15K+/month" },
    { name: "Excelate (MEmob+)", type: "GCC-Native DSP", what: "Mobility-native DSP built for MENA with offline intelligence and store-visit attribution built in. Integrates AllPings location data covering 2M+ points of interest. Digital-to-physical attribution without third-party stitching.", gcc: "Purpose-built for GCC. Strongest option for footfall attribution in Dubai/Riyadh malls, retail, and real estate. Covers UAE, KSA, and wider MENA. Privacy-compliant (GDPR, CCPA).", bestFor: "Footfall attribution, location targeting, mall/retail, real estate", minBudget: "Contact vendor" },
    { name: "StackAdapt", type: "Mid-Market DSP", what: "Self-serve DSP popular with mid-market agencies. Multi-channel: display, native, video, CTV, audio, in-game, and DOOH. AI-powered contextual targeting.", gcc: "Growing MENA presence. Good entry point for agencies without DV360 or TTD access. Supports native and CTV formats.", bestFor: "Mid-market budgets, native ads, multi-channel", minBudget: "$5K–$15K/month" },
  ]},
  { category: "Brand Safety & Verification", description: "Third-party vendors that verify ad quality: viewability, brand safety, fraud prevention, and geographic accuracy. Non-negotiable for any serious programmatic buy.", vendors: [
    { name: "DoubleVerify (DV)", type: "Verification & Brand Safety", what: "Industry-leading verification vendor. Pre-bid and post-bid controls for viewability, brand safety, fraud prevention, and geo-accuracy. Integrates with all major DSPs (DV360, TTD, Xandr). Custom contextual categories.", gcc: "Standard requirement for GCC programmatic campaigns. Essential for brand-safe delivery — blocks ads from appearing alongside extremist, political, or culturally inappropriate content. Used by most major GCC agencies.", bestFor: "Brand safety, viewability, fraud prevention, all DSPs", minBudget: "CPM-based (typically $0.03–$0.15 CPM)" },
    { name: "Integral Ad Science (IAS)", type: "Verification & Brand Safety", what: "Major verification vendor alongside DV. Covers viewability, brand safety, invalid traffic (IVT), and contextual targeting. Integrates with DSPs, social platforms, and ad servers.", gcc: "Widely used across GCC agencies. Offers Arabic-language content classification for brand safety — important for culturally sensitive GCC markets. Integrates with Meta, TikTok, YouTube, and programmatic.", bestFor: "Brand safety, viewability, social media verification", minBudget: "CPM-based" },
    { name: "MOAT (Oracle)", type: "Attention & Viewability", what: "Oracle's ad measurement tool focused on viewability, attention metrics, and invalid traffic. Provides attention-based analytics beyond binary viewability.", gcc: "Less prevalent than DV and IAS in GCC but available. Useful as a secondary verification layer or for attention measurement studies.", bestFor: "Attention metrics, viewability validation", minBudget: "CPM-based" },
  ]},
  { category: "Programmatic Specialists & Managed Service", description: "Companies that operate as outsourced programmatic desks, running campaigns on behalf of agencies or brands using multiple DSPs.", vendors: [
    { name: "MiQ", type: "Programmatic Media Partner", what: "Leading independent programmatic specialist. Operates across multiple DSPs (agnostic). AI-powered platform MiQ Sigma unifies 300+ data feeds and 700 trillion consumer signals. Offers advanced TV, CTV, DOOH, display, video, and audio.", gcc: "MENAT office active (managed by Wassim Mneimneh). Partners with local telcos for direct mobile data — unique in GCC. Strong for CTV (Shahid, OSN+), DOOH, and multi-screen campaigns. First programmatic partner to license MENA telecom data.", bestFor: "CTV/Advanced TV, DOOH, multi-screen, managed programmatic", minBudget: "$20K+/month recommended" },
  ]},
  { category: "Ad Servers", description: "Platforms that host, deliver, and track ad creatives across campaigns. Required for trafficking, frequency capping, and unified cross-platform reporting.", vendors: [
    { name: "Campaign Manager 360 (CM360)", type: "Enterprise Ad Server", what: "Google's enterprise ad server (formerly DoubleClick). Handles ad trafficking, conversion tracking, reach/frequency management, and unified reporting across all channels. Integrates natively with DV360.", gcc: "Standard ad server for major GCC agencies and large advertisers. Required for cross-channel frequency management and proper attribution. Essential for any campaign using DV360.", bestFor: "Cross-channel tracking, DV360 integration, attribution", minBudget: "License-based (via Google)" },
    { name: "Flashtalking (Innovid)", type: "Independent Ad Server", what: "Independent ad server focused on creative analytics, dynamic creative optimisation (DCO), and cross-channel measurement. Acquired by Innovid in 2022.", gcc: "Used by agencies wanting independence from Google's ad serving stack. Strong DCO capabilities for personalised Arabic/English creative. Growing adoption in GCC premium campaigns.", bestFor: "DCO, creative analytics, independence from Google", minBudget: "License-based" },
  ]},
  { category: "CTV / OTT Inventory (GCC)", description: "Connected TV and streaming platforms offering ad-supported inventory in the GCC region.", vendors: [
    { name: "Shahid (MBC Group)", type: "Premium Arabic CTV/OTT", what: "MBC Group's dominant streaming platform. Largest library of Arabic content globally. AVOD (ad-supported) tier available. Pre-roll and mid-roll video ads. Massive reach across UAE, KSA, and wider MENA.", gcc: "The #1 Arabic CTV/OTT platform for GCC campaigns. Brand-safe premium Arabic content. Essential for reaching Arabic-speaking audiences in lean-back CTV environments. Accessible via DV360, TTD, and MiQ.", bestFor: "Arabic content reach, premium video, brand-safe CTV", minBudget: "PMP deals — contact publisher" },
    { name: "OSN+ (Orbit Showtime Network)", type: "Premium International CTV/OTT", what: "Premium streaming service with exclusive HBO, Paramount, and international content deals. Primarily SVOD but exploring AVOD/ad integration. Targets affluent, English-speaking audiences.", gcc: "Premium international content environment. Skews affluent, expat, English-speaking. Ideal for luxury, auto, hospitality, and BFSI brands. Limited ad inventory — premium pricing.", bestFor: "Affluent audiences, premium context, international content", minBudget: "Premium — contact publisher" },
    { name: "StarzPlay (Lionsgate+)", type: "CTV/OTT", what: "Streaming platform with mix of Hollywood and Arabic content. AVOD tier available. Growing GCC user base.", gcc: "Third-tier CTV option after Shahid and OSN+. Useful for incremental CTV reach. Available programmatically via major DSPs.", bestFor: "Incremental CTV reach, mixed content", minBudget: "Via DSP/PMP" },
    { name: "Anghami", type: "Audio Streaming", what: "Leading Arabic music and podcast streaming platform. Ad-supported tier with audio, display, and video ad formats. Programmatic access available.", gcc: "Dominant audio streaming in GCC. Strong for reach among younger Arabic-speaking audiences. Contextual targeting by mood, genre, time of day. Also offers high-impact display units on the platform.", bestFor: "Audio ads, Arabic youth, contextual targeting", minBudget: "Via DSP or direct" },
  ]},
  { category: "DOOH Vendors (GCC)", description: "Digital Out-of-Home networks and platforms for programmatic or direct billboard and screen buying in the GCC.", vendors: [
    { name: "JCDecaux Middle East", type: "Premium DOOH Network", what: "Global DOOH leader. Dubai International Airport programmatic DOOH launched Feb 2025 — shopping corridors, boarding gates, baggage reclaim, VIP lounges across Terminals 1 and 3. Integrates with major DSPs.", gcc: "Premium airport and urban DOOH across Dubai. Programmatic buying via DV360 and TTD. Also covers Dubai Metro stations and premium urban locations. Highest-quality airport inventory in GCC.", bestFor: "Airport advertising, premium urban, tourists & business travelers", minBudget: "From ~$350/day (programmatic)" },
    { name: "Vistar Media", type: "Programmatic DOOH Platform", what: "Programmatic DOOH buying platform connecting advertisers to digital screen networks. SSP for DOOH publishers. Supports geo-targeting, time-of-day, audience data integration.", gcc: "Active in Dubai and Riyadh. Connects to premium mall and urban screens including Dubai Mall, Mall of the Emirates, King Fahd Road Riyadh. Available via TTD and DV360 integrations.", bestFor: "Mall screens, geo-targeted DOOH, programmatic buying", minBudget: "$10K+/campaign" },
    { name: "Hypermedia", type: "GCC DOOH Network", what: "One of the largest DOOH networks in the Middle East. Operates screens across malls, retail, residential, and outdoor locations in UAE and KSA.", gcc: "Strong mall and retail coverage — Dubai Mall, Mall of the Emirates, City Centre, and Riyadh malls. Direct deals or programmatic. High foot traffic locations.", bestFor: "Mall advertising, retail environments, high footfall", minBudget: "Contact vendor" },
    { name: "BackLite Media", type: "UAE Premium Outdoor", what: "Premium outdoor and DOOH operator in UAE. Iconic locations including Sheikh Zayed Road and key Dubai arterial roads. Large-format digital billboards.", gcc: "Operates some of the most visible outdoor locations in Dubai. Sheikh Zayed Road billboards are among the most premium DOOH placements in the Middle East.", bestFor: "High-visibility outdoor, brand launches, SZR", minBudget: "Premium — contact vendor" },
  ]},
  { category: "Data & Audience Platforms", description: "Platforms for audience data, identity resolution, and customer data management.", vendors: [
    { name: "LiveRamp", type: "Data Connectivity & Identity", what: "Leading data connectivity platform. Enables brands to onboard first-party CRM data into DSPs for targeting. Supports identity resolution across devices and channels.", gcc: "Essential for activating first-party data (email lists, CRM, loyalty) in programmatic campaigns. Works with DV360 and TTD. Growing adoption among GCC enterprise advertisers.", bestFor: "First-party data activation, CRM onboarding, identity", minBudget: "License-based" },
    { name: "Lotame", type: "Data Management Platform (DMP)", what: "Independent DMP for audience data collection, segmentation, and activation. Curation platform for third-party data. Cookieless identity solution (Panorama ID).", gcc: "Available in MENA. Useful for brands building audience segments from web/app data. Panorama ID supports cookieless environments.", bestFor: "Audience segmentation, third-party data, DMP", minBudget: "License-based" },
  ]},
  { category: "Mobile Measurement Partners (MMPs)", description: "Platforms for measuring app install attribution, in-app events, and mobile campaign performance across channels.", vendors: [
    { name: "AppsFlyer", type: "MMP", what: "Leading mobile measurement partner. Tracks app installs and in-app events across all ad networks. Fraud prevention suite. Deep linking and audience segmentation.", gcc: "Standard MMP for GCC app campaigns. Required for accurate CPI/CPA measurement across Meta, TikTok, Google UAC, and Snap app campaigns.", bestFor: "App install attribution, fraud prevention, deep linking", minBudget: "Tiered pricing by installs" },
    { name: "Adjust", type: "MMP", what: "Mobile measurement and fraud prevention platform. Attribution, analytics, and audience segmentation for app marketers.", gcc: "Alternative to AppsFlyer. Used by several GCC e-commerce and super-app brands. Good fraud prevention suite.", bestFor: "App attribution, analytics, fraud prevention", minBudget: "Tiered pricing" },
  ]},
];

const regionalVendors = {
  "GCC / Dubai": { desc: "The core vendor ecosystem for programmatic advertising across UAE, KSA, Kuwait, Qatar, Bahrain, and Oman.", data: programmaticEcosystem },
  "China": { desc: "China operates a completely separate digital ecosystem. Google, Meta, and Western DSPs do not function inside the Great Firewall. BAT (Baidu, Alibaba, Tencent) control ~90% of programmatic. All platforms require Chinese-language creative and local entity or agency partner.", data: [
    { category: "Major Platforms (BAT Ecosystem)", description: "Baidu, Alibaba, and Tencent dominate ~90% of China's $163B digital ad market. Each operates as a closed ecosystem with its own DSP, DMP, and ad exchange.", vendors: [
      { name: "Baidu Ads (Baidu Tuiguang)", type: "Search + Programmatic", what: "China's dominant search engine (66% market share). Baidu Ads covers search (PPC), display via Baidu Ad Network, video (iQIYI), and programmatic. Equivalent of Google Ads in China. Reaches 1B+ users.", gcc: "Essential for brands targeting Chinese tourists visiting GCC or Chinese investors in Dubai/Abu Dhabi real estate. Search ads are the entry point for any China-focused campaign. Requires Chinese landing pages.", bestFor: "Search ads, brand awareness, travel/real estate targeting Chinese audiences", minBudget: "$5K+/month (via local agency)" },
      { name: "Tencent Ads (WeChat + QQ)", type: "Social + Programmatic", what: "Tencent's ad platform covering WeChat (1.4B MAU), QQ, Tencent Video, and Tencent News. WeChat Moments ads are equivalent to Facebook News Feed. WeChat mini-programs enable in-app e-commerce and lead gen. Tencent Ad Exchange (TAE) powers programmatic.", gcc: "WeChat is the #1 platform for reaching Chinese HNWI/UHNW audiences interested in GCC real estate, luxury, and hospitality. WeChat mini-programs are essential for lead gen funnels targeting Chinese buyers. Used by OMNIYAT, Emaar, and other GCC developers.", bestFor: "HNWI targeting, real estate, luxury, WeChat lead gen funnels", minBudget: "$10K+/month" },
      { name: "Alibaba / Alimama (TANX)", type: "E-commerce + Programmatic", what: "Alibaba's ad ecosystem covers Taobao, Tmall, Youku, and the TANX ad exchange (one of China's largest). Alimama is the advertising arm. Programmatic buying via TANX reaches Alibaba's massive e-commerce audience. Enterprise DMP available.", gcc: "Relevant for GCC brands selling products to Chinese consumers. Fashion, beauty, and luxury GCC brands can advertise on Tmall Global (cross-border e-commerce). Less relevant for services/real estate.", bestFor: "E-commerce, product sales to Chinese consumers, Tmall brands", minBudget: "$15K+/month" },
    ]},
    { category: "Social & Video Platforms", description: "Beyond BAT, newer platforms dominate short-video, community, and content discovery.", vendors: [
      { name: "Douyin (TikTok China)", type: "Short-Video + E-commerce", what: "The Chinese version of TikTok, operated by ByteDance. Massive reach among 18–45 demographics. Supports in-feed video ads, TopView, branded hashtag challenges, and live-stream shopping. Douyin Shop enables direct e-commerce. Ocean Engine is the ad platform.", gcc: "Critical for reaching younger Chinese audiences. GCC tourism, hospitality, and luxury brands use Douyin KOLs (influencers) for destination marketing. Live-streaming is key for product launches. Requires native Chinese content.", bestFor: "Video ads, influencer campaigns, e-commerce, tourism marketing", minBudget: "$5K+/month" },
      { name: "Xiaohongshu (RED / RedNote)", type: "Community + Discovery", what: "Lifestyle and product discovery platform — 300M+ users, predominantly young urban women (Tier 1–2 cities). Combines social media with product reviews and e-commerce. Strong for beauty, fashion, travel, and luxury. KOL/KOC (influencer) marketing is primary strategy.", gcc: "Powerful for GCC luxury real estate, hospitality, and lifestyle brands targeting affluent Chinese women. User-generated content and KOC reviews drive trust. Essential for brands wanting word-of-mouth in China.", bestFor: "Luxury, lifestyle, beauty, travel, female audiences", minBudget: "$3K+/month (KOL seeding)" },
      { name: "Weibo (Sina Weibo)", type: "Microblogging + Social", what: "China's equivalent of Twitter/Facebook hybrid. 580M+ MAU. Strong for brand awareness, trending topics, celebrity endorsements, and event marketing. Weibo Fans Headline and Fans Tunnel are key ad products.", gcc: "Good for broad awareness campaigns targeting Chinese audiences. Event-driven campaigns (Dubai Shopping Festival, Expo activations) perform well. Less precise targeting than WeChat or Douyin.", bestFor: "Brand awareness, trending campaigns, event marketing, celebrity endorsements", minBudget: "$5K+/month" },
      { name: "Bilibili", type: "Gen Z Video Platform", what: "China's dominant Gen Z video platform (like YouTube for younger demographics). 340M+ MAU. Long-form video, anime, gaming, education, and lifestyle content. Growing ad platform with native video ads.", gcc: "Niche but growing — relevant for GCC brands targeting Gen Z Chinese tourists or students. Education and gaming verticals.", bestFor: "Gen Z, gaming, education, long-form video", minBudget: "$5K+/month" },
    ]},
    { category: "China DSPs & Specialist Vendors", description: "Independent DSPs and specialist platforms for reaching Chinese audiences programmatically.", vendors: [
      { name: "iPinYou", type: "Independent China DSP", what: "China's leading independent DSP. Works with Baidu, JD.com, Ctrip, and other major publishers. Transparent trading platform (Optimus Prime). Integrates with IAS and Grapeshot for verification. Cross-data analysis across multiple Chinese publishers.", gcc: "Best independent option for GCC brands running programmatic in China without relying solely on BAT ecosystems. Supports cross-publisher optimisation.", bestFor: "Independent programmatic buying, cross-publisher reach", minBudget: "$15K+/month" },
      { name: "EternityX", type: "China Cross-Border DSP", what: "Cross-border programmatic platform specialising in connecting international brands with Chinese audiences — both inside China and outbound Chinese travellers globally. Covers WeChat, Weibo, Baidu, Douyin, and Chinese-language inventory worldwide.", gcc: "Directly relevant for GCC real estate, luxury, and hospitality brands targeting Chinese investors and tourists. Operates in Dubai with GCC agency partnerships. Has worked with UM on OMNIYAT campaigns. Covers PIPL/GDPR compliance.", bestFor: "Cross-border China targeting, HNWI investors, GCC real estate", minBudget: "$10K+/month" },
      { name: "Toutiao / Pangolin (ByteDance)", type: "Content Discovery + In-App", what: "ByteDance's news and content discovery platform (100M+ DAU). Pangolin is the in-app advertising network. AI-powered content recommendations with embedded ads. Part of the Ocean Engine ad platform alongside Douyin.", gcc: "Useful for content-driven campaigns targeting Chinese audiences. Strong for education, finance, and news-adjacent advertising.", bestFor: "Content discovery ads, news-adjacent, AI-powered targeting", minBudget: "$5K+/month" },
    ]},
    { category: "Key Considerations for China", description: "Critical rules for any brand advertising in or targeting China.", vendors: [
      { name: "⚠️ China Planning Rules", type: "Must-Know Guidelines", what: "1) Google, Meta, YouTube, and Western DSPs (DV360, TTD) do not work inside China — the Great Firewall blocks them. 2) All creative must be in Mandarin Chinese. 3) You need a local agency partner or Chinese entity to open ad accounts on most platforms. 4) WeChat and Douyin are the two most important platforms for reaching HNWI audiences. 5) PIPL (China's data privacy law) requires data localisation — work with compliant vendors. 6) KOL/KOC influencer marketing is often more effective than paid ads for luxury and lifestyle brands. 7) Mini-programs (WeChat/Douyin) are essential for lead gen — Chinese users expect in-app experiences, not external websites.", gcc: "For GCC brands targeting Chinese buyers (real estate, luxury, hospitality): start with WeChat + Douyin, use KOLs for credibility, build a WeChat mini-program for lead capture, and work with EternityX or a specialist China agency. Budget: minimum $15K–$20K/month to be meaningful.", bestFor: "Planning reference", minBudget: "N/A" },
    ]},
  ]},
  "Russia / CIS": { desc: "Since 2022, Google Ads and Meta Ads are blocked in Russia. The market runs on local platforms: Yandex (66% search share), VK, and Telegram. Over 90% of ad campaigns use domestic DSPs. Google Analytics replaced by Yandex Metrica.", data: [
    { category: "Major Platforms", description: "Yandex and VK dominate Russia's digital advertising landscape, with Telegram emerging as a key channel.", vendors: [
      { name: "Yandex Direct", type: "Search + Programmatic + Display", what: "Russia's dominant ad platform. Covers search ads (66% search market share), Yandex Advertising Network (YAN — 50K+ publisher sites), display, video, in-app, and programmatic buying. Reaches 102M monthly users (83% of Russia's population). Automated bidding, AI-powered ad creation, and deep audience targeting from Yandex's super-app ecosystem (Maps, Food, Music, Market).", gcc: "Essential for any brand targeting Russian-speaking audiences in GCC or Russia. Large Russian expat community in UAE makes Yandex relevant for Dubai real estate, luxury, hospitality, and tourism marketing. Yandex has a MENA-focused sales team.", bestFor: "Search ads, programmatic display, Russian-speaking audiences", minBudget: "$5K+/month" },
      { name: "VK Ads", type: "Social + Display Network", what: "VK's ad platform covering VKontakte (Russia's largest social network), Odnoklassniki (OK.ru), Avito (classifieds), Dzen (content), and 50K+ partner sites. Display, video, native, and Stories ad formats. Advanced targeting. Budget auto-optimisation. Replaced Meta Ads as the primary social advertising platform.", gcc: "Relevant for targeting Russian consumers and the Russian expat community in UAE/GCC. VK is the primary social media platform in Russia. Strong for real estate, education, and tourism brands targeting Russian speakers.", bestFor: "Social media ads, Russian consumer targeting, broad reach", minBudget: "$3K+/month" },
      { name: "Telegram Ads", type: "Messaging + Channel Ads", what: "Telegram has 50%+ daily penetration in Russia. Ads run in channels with 1,000+ subscribers — visible to non-Premium users. Short text + button format only. Can link to Telegram channel or external website. Available via Yandex Direct integration or Telegram's own ad platform.", gcc: "Telegram is widely used in GCC, especially among Russian and CIS expat communities. Relevant for real estate developers, hospitality, and luxury brands targeting Russian-speaking audiences in Dubai. Telegram bots can be used for lead gen.", bestFor: "Russian community targeting, channel advertising, lead gen via bots", minBudget: "$2K+/month" },
    ]},
    { category: "Independent Russian DSPs", description: "Since Google DV360 and The Trade Desk exited Russia, local DSPs have filled the gap. Over 90% of programmatic campaigns now run on domestic platforms.", vendors: [
      { name: "HYBRID", type: "Independent Russian DSP", what: "Top-10 revenue DSP in Russia. Operates independently from Yandex, VK, and MTS ecosystems. Self-service model. Supports display, video, audio, CTV, and DOOH. Partners with major Russian publishers. Unified dashboard across all channels.", gcc: "Available for campaigns targeting Russian audiences. Offers CTV and DOOH formats that Yandex Direct does not cover natively.", bestFor: "Omnichannel programmatic, CTV, DOOH, independence from Yandex/VK", minBudget: "$10K+/month" },
      { name: "Segmento (MTS)", type: "Telecom-Powered DSP", what: "MTS telecom's DSP with first-party mobile data from Russia's largest mobile operator. Deep audience targeting based on telecom data (location, app usage, demographics). Includes Buzzoola for native advertising.", gcc: "Strong for precision targeting of Russian mobile users. Telecom data provides unique audience signals unavailable on other platforms.", bestFor: "Telecom data targeting, precision audiences, native ads", minBudget: "$10K+/month" },
      { name: "GetIntent", type: "Self-Service Russian DSP", what: "Self-service DSP with AI-powered campaign optimisation. Video tutorials and knowledge base for setup. Automated bidding across CPM, CPC, CPA models.", gcc: "Entry-level option for agencies testing Russian programmatic without committing to larger platforms.", bestFor: "Self-service programmatic, mid-market budgets", minBudget: "$5K+/month" },
    ]},
    { category: "Analytics & Measurement (Russia)", description: "Google Analytics does not function in Russia since 2022. Local alternatives have fully replaced it.", vendors: [
      { name: "Yandex Metrica", type: "Web Analytics", what: "Russia's primary web analytics platform. Equivalent of Google Analytics. Heatmaps, session recordings, goal tracking, funnel visualisation. Fully integrated with Yandex Direct. Free to use.", gcc: "Required for any website targeting Russian audiences. Integrates with Yandex Direct for conversion tracking and audience building.", bestFor: "Web analytics, conversion tracking, Yandex integration", minBudget: "Free" },
      { name: "Roistat", type: "End-to-End Marketing Analytics", what: "Comprehensive marketing analytics platform. Multi-channel attribution, ROI tracking, call tracking, CRM integration. Supports data imports from Yandex, VK Ads, Ozon, and third-party DSPs.", gcc: "Best option for brands needing cross-channel attribution in Russia. Replaces Google Analytics + GA4 functionality.", bestFor: "Cross-channel attribution, ROI tracking, CRM integration", minBudget: "Subscription-based" },
      { name: "myTracker (VK)", type: "Mobile App Analytics", what: "VK's mobile measurement and analytics platform. Tracks app installs, in-app events, and user retention. Free alternative to AppsFlyer/Adjust for Russian market.", gcc: "Required for app campaigns targeting Russian users. Replaces Western MMPs for Russia-focused campaigns.", bestFor: "Mobile app tracking, install attribution", minBudget: "Free" },
    ]},
    { category: "Key Considerations for Russia", description: "Critical rules for any brand advertising in or targeting Russia/CIS markets.", vendors: [
      { name: "⚠️ Russia Planning Rules", type: "Must-Know Guidelines", what: "1) Google Ads and Meta Ads are blocked — Yandex Direct and VK Ads are the primary platforms. 2) Google Analytics doesn't work — use Yandex Metrica. 3) Yandex holds 66% search share and is the #1 platform for performance marketing. 4) VK is the primary social media platform (Meta/Instagram require VPN). 5) Telegram is a major media channel — 50%+ daily penetration. 6) 42% of Russians use VPNs — targeting precision is reduced on non-logged-in platforms. 7) All creative must be in Russian. 8) Local agency partner recommended for account setup and management. 9) CIS markets (Kazakhstan, Belarus, Uzbekistan) can be reached via Yandex and VK but may need separate creative.", gcc: "For GCC brands targeting Russian-speaking audiences: Yandex Direct is the starting point. VK Ads for social reach. Telegram for community building. Large Russian expat community in Dubai — Yandex/VK still reach them. Budget: $10K+/month minimum to be meaningful.", bestFor: "Planning reference", minBudget: "N/A" },
    ]},
  ]},
  "South & Southeast Asia": { desc: "Diverse markets with varying platform dominance. India is mobile-first with strong Google/Meta presence. Southeast Asia sees heavy social commerce via TikTok, Shopee, and Lazada. LINE dominates in Thailand, KakaoTalk in South Korea.", data: [
    { category: "Major Platforms", description: "Google and Meta work across the region but local platforms have significant presence in specific markets.", vendors: [
      { name: "Google Ads (incl. DV360)", type: "Search + Programmatic", what: "Google is the dominant search engine across South and Southeast Asia. Google Ads covers Search, Display, YouTube, and Demand Gen. DV360 available for enterprise programmatic. Strong in India, Indonesia, Philippines, Thailand, Vietnam.", gcc: "Standard tool for GCC brands targeting South Asian audiences (Indian, Filipino, Sri Lankan expat communities in UAE/GCC). Google Ads works the same as for GCC campaigns — no special setup needed.", bestFor: "Search, YouTube, display, broad APAC reach", minBudget: "$5K+/month" },
      { name: "Meta (Facebook + Instagram)", type: "Social", what: "Facebook and Instagram remain the dominant social platforms across South and Southeast Asia. Facebook is #1 in Philippines, Indonesia, Vietnam, and India. Instagram strong for younger urban demographics. Messenger is a major commerce channel in Philippines.", gcc: "Standard tool for reaching South/Southeast Asian audiences. Same platform as GCC campaigns. Large Indian and Filipino communities in UAE are reachable via Meta.", bestFor: "Social advertising, broad APAC reach, e-commerce", minBudget: "$3K+/month" },
      { name: "TikTok (+ TikTok Shop)", type: "Short-Video + Social Commerce", what: "TikTok is massive across Southeast Asia — Indonesia, Thailand, Vietnam, Philippines, and Malaysia. TikTok Shop is a major social commerce platform in the region (unlike GCC where it's not yet widely deployed). Live-stream shopping is a key format.", gcc: "TikTok Shop is transforming e-commerce in SEA. For GCC brands exporting to SEA or targeting SEA tourists, TikTok is essential. Same ad platform as GCC TikTok campaigns.", bestFor: "Social commerce, Gen Z/Millennial, live-stream shopping", minBudget: "$5K+/month" },
    ]},
    { category: "Regional & Market-Specific Platforms", description: "Platforms with dominance in specific Asian markets.", vendors: [
      { name: "LINE Ads (Thailand, Japan, Taiwan)", type: "Messaging + Social", what: "LINE is the dominant messaging app in Thailand (50M+ users), Japan (95M+), and Taiwan (21M+). LINE Ads Platform supports display, video, and native ads within the LINE app ecosystem. LINE Official Accounts enable brand CRM and retargeting.", gcc: "Essential for any campaign targeting Thai audiences. Thai expat community in GCC is reachable. Requires local agency for account setup in most cases.", bestFor: "Thailand market, Japanese market, messaging ads", minBudget: "$3K+/month" },
      { name: "KakaoTalk (South Korea)", type: "Messaging + Social", what: "South Korea's dominant messaging platform (47M+ MAU in a 52M population). Kakao Moment ads reach users across KakaoTalk, Daum (search), and Kakao's content ecosystem. Display, video, and commerce ad formats.", gcc: "Required for any campaign targeting South Korean audiences. Korean tourists are a significant segment in Dubai luxury/hospitality.", bestFor: "South Korean market, messaging ads, commerce", minBudget: "$5K+/month" },
      { name: "Shopee & Lazada Ads", type: "E-commerce Marketplace", what: "Shopee (Sea Group) and Lazada (Alibaba) are the two dominant e-commerce platforms in Southeast Asia. Both offer in-platform advertising: sponsored products, display ads, and live-stream shopping. Shopee is #1 in most SEA markets.", gcc: "Relevant for GCC brands selling physical products into Southeast Asian markets. Not relevant for service-based GCC campaigns.", bestFor: "E-commerce, product sales into SEA markets", minBudget: "$3K+/month" },
      { name: "Grab Ads", type: "Super-App Advertising", what: "Grab is Southeast Asia's leading super-app (ride-hailing, food delivery, payments). Grab Ads offers in-app display, native, and location-based targeting. Covers Singapore, Malaysia, Indonesia, Philippines, Thailand, Vietnam.", gcc: "Niche but growing — useful for targeting SEA consumers based on real-world behaviour (travel, dining). Location-based targeting is strong.", bestFor: "Location-based ads, in-app, super-app audience", minBudget: "$5K+/month" },
    ]},
    { category: "India-Specific", description: "India is the world's largest mobile-first market with 800M+ internet users. Google and Meta dominate, but local platforms are growing.", vendors: [
      { name: "JioAds (Jio Platforms)", type: "Telecom + Super-App Ecosystem", what: "Reliance Jio's advertising platform covering Jio Cinema (streaming), JioSaavn (music), Jio News, and Jio's massive mobile user base (450M+ subscribers). Programmatic and direct buying. CTV inventory via Jio Cinema (formerly Voot).", gcc: "Relevant for GCC brands targeting Indian audiences — Jio reaches the broadest mobile audience in India. Indian expat community is the largest in UAE. Jio Cinema offers CTV-style inventory.", bestFor: "Indian mass-market reach, CTV, mobile-first", minBudget: "$10K+/month" },
      { name: "Hotstar (Disney+ Hotstar)", type: "Premium CTV/OTT", what: "India's leading premium streaming platform. Cricket (IPL), movies, and series. Ad-supported tier with pre-roll, mid-roll, and sponsor formats. Massive reach during IPL cricket season.", gcc: "Strong for reaching Indian audiences during IPL season — cricket viewership in UAE is massive. Premium brand-safe environment.", bestFor: "Cricket/IPL advertising, premium Indian audiences, CTV", minBudget: "$15K+/month" },
      { name: "InMobi", type: "Mobile-First DSP", what: "India-headquartered mobile-first DSP with global reach. Strong in-app advertising capabilities. Proprietary data from Glance (lock-screen) and mobile SDK integrations. Supports display, video, native, and rewarded ads.", gcc: "One of the few India-origin DSPs with genuine global scale. Useful for mobile-first campaigns targeting Indian and SEA audiences.", bestFor: "Mobile in-app advertising, India/SEA reach, performance", minBudget: "$10K+/month" },
    ]},
  ]},
};

const creativeSpecs = [
  // META
  { platform: "Meta", placement: "Feed (FB + IG)", device: "Mobile + Desktop", format: "Image", ratio: "1:1", dimensions: "1080 × 1080 px", alt: "4:5 (1080×1350) recommended for mobile", duration: "N/A", fileSize: "30 MB max", fileType: "JPG, PNG", notes: "4:5 takes up more screen on mobile — higher engagement. Avoid heavy text overlays." },
  { platform: "Meta", placement: "Feed (FB + IG)", device: "Mobile + Desktop", format: "Video", ratio: "4:5", dimensions: "1080 × 1350 px", alt: "1:1 (1080×1080) also supported", duration: "Up to 241 min (15–60s recommended)", fileSize: "4 GB max", fileType: "MP4, MOV", notes: "H.264 compression, AAC audio. Captions boost watch time by 12%. Hook in first 3s." },
  { platform: "Meta", placement: "Feed Carousel", device: "Mobile + Desktop", format: "Image/Video", ratio: "1:1", dimensions: "1080 × 1080 px", alt: "All cards must share same ratio", duration: "Up to 240 min per card", fileSize: "30 MB image / 4 GB video", fileType: "JPG, PNG, MP4, MOV", notes: "2–10 cards. First card is the hook. Min 3 cards recommended. Strong for product showcase." },
  { platform: "Meta", placement: "Stories (FB + IG)", device: "Mobile only", format: "Image/Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "1440 × 2560 for sharper quality", duration: "Up to 120s (5–15s recommended)", fileSize: "30 MB image / 4 GB video", fileType: "JPG, PNG, MP4, MOV", notes: "Full-screen vertical. Safe zone: keep text 250px from top, 340px from bottom (UI overlays). Sound-on environment." },
  { platform: "Meta", placement: "Reels (FB + IG)", device: "Mobile only", format: "Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "No landscape — 9:16 mandatory", duration: "Up to 90s (15–30s sweet spot)", fileSize: "4 GB max", fileType: "MP4, MOV", notes: "Must feel native — UGC-style outperforms polished. Hook in first 2s. Trending audio helps. Auto-plays with sound." },
  { platform: "Meta", placement: "Right Column", device: "Desktop only", format: "Image", ratio: "1:1", dimensions: "1200 × 1200 px", alt: "Minimum 254 × 133 px", duration: "N/A", fileSize: "30 MB max", fileType: "JPG, PNG", notes: "Desktop-only placement. Small format — keep visuals simple and text minimal." },
  { platform: "Meta", placement: "Collection / Instant Experience", device: "Mobile only", format: "Image/Video", ratio: "1:1", dimensions: "1080 × 1080 px", alt: "Cover image/video + product grid", duration: "Video up to 120s", fileSize: "30 MB image / 4 GB video", fileType: "JPG, PNG, MP4, MOV", notes: "Full-screen post-click experience. Product images auto-pulled from catalogue (1:1 crop). Min 4 products." },
  { platform: "Meta", placement: "Threads", device: "Mobile + Desktop", format: "Image/Video", ratio: "1:1 or 16:9", dimensions: "1080 × 1080 px", alt: "Same specs as Feed", duration: "Same as Feed", fileSize: "Same as Feed", fileType: "JPG, PNG, MP4, MOV", notes: "NEW (Feb 2026). 400M+ MAU. Can run ads without a Threads profile using IG/FB creative." },
  { platform: "Meta", placement: "WhatsApp Status", device: "Mobile only", format: "Image/Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "Same as Stories", duration: "Up to 60s", fileSize: "Same as Stories", fileType: "JPG, PNG, MP4, MOV", notes: "NEW. Auto-activates in Traffic campaigns via Advantage+. 95%+ WhatsApp penetration in GCC." },

  // TIKTOK
  { platform: "TikTok", placement: "In-Feed Video", device: "Mobile only", format: "Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "1:1 and 16:9 supported but penalised", duration: "5s–10 min (15–60s recommended)", fileSize: "500 MB max", fileType: "MP4, MOV, AVI", notes: "Native feel essential. Hook in first 2s. Trending sounds boost reach. UGC-style > polished. Now supports up to 10 min." },
  { platform: "TikTok", placement: "TopView", device: "Mobile only", format: "Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "Full-screen, auto-play, sound-on", duration: "Up to 60s", fileSize: "500 MB max", fileType: "MP4, MOV", notes: "First ad on app open. Now CPM/auction (not reservation). Book 4–6 weeks for peak GCC moments." },
  { platform: "TikTok", placement: "Brand Takeover", device: "Mobile only", format: "Image/Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "Static 3s or GIF 3–5s", duration: "3–5s", fileSize: "500 MB max", fileType: "JPG, PNG, MP4, GIF", notes: "Full-screen on app open. 1 advertiser per day per category. Reservation only ($30K–$100K/day). No engagement." },
  { platform: "TikTok", placement: "Spark Ads", device: "Mobile only", format: "Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "Uses existing organic creator post", duration: "Same as original post", fileSize: "N/A (uses existing post)", fileType: "N/A", notes: "Amplify creator/influencer content as paid ads. 70% higher CTR vs standard brand content. Requires creator authorisation code." },
  { platform: "TikTok", placement: "Branded Hashtag Challenge", device: "Mobile only", format: "Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "Challenge page + UGC content", duration: "6-day package", fileSize: "N/A", fileType: "N/A", notes: "Reservation ($100K–$200K). Drives massive UGC. Combine with creator seeding. GCC users highly participatory." },
  { platform: "TikTok", placement: "Logo Takeover ★", device: "Mobile only", format: "Logo/Image", ratio: "Custom", dimensions: "Per TikTok spec (TBC)", alt: "App splash screen co-brand", duration: "App open moment", fileSize: "TBC", fileType: "TBC", notes: "NEW Mar 2026. Highest-impact format. Brand logo on TikTok splash. GCC availability — check with rep." },

  // SNAPCHAT
  { platform: "Snapchat", placement: "Single Image / Video", device: "Mobile only", format: "Image/Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "Full-screen vertical only", duration: "3–180s video (6–15s recommended)", fileSize: "5 MB image / 1 GB video", fileType: "JPG, PNG, MP4, MOV", notes: "Between Stories placement. Swipe-up CTA. 6s Commercials are non-skippable and drive strong recall in GCC." },
  { platform: "Snapchat", placement: "Story Ads", device: "Mobile only", format: "Image/Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "3–20 Snaps in a series", duration: "Each Snap 3–180s", fileSize: "5 MB image / 1 GB video per Snap", fileType: "JPG, PNG, MP4, MOV", notes: "Swipeable multi-Snap experience in Discover. Tile creative is the hook — make it visually arresting." },
  { platform: "Snapchat", placement: "AR Lens / AI Lens", device: "Mobile only", format: "AR/3D", ratio: "Full-screen", dimensions: "Per Lens Studio specs", alt: "Generative AI Lens (new)", duration: "Interactive (user-controlled)", fileSize: "Per Lens Studio", fileType: "Lens Studio project", notes: "Reservation ($15K–$50K+). AI Lenses use generative AI for personalised brand experiences. High earned media." },
  { platform: "Snapchat", placement: "Sponsored Snaps ★", device: "Mobile only", format: "Image/Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "Appears in Chat/Inbox", duration: "Short-form", fileSize: "5 MB image / 1 GB video", fileType: "JPG, PNG, MP4, MOV", notes: "NEW 2025. Ads in users' inbox. High native feel. Strong for KSA/Kuwait (inbox-first usage behaviour)." },
  { platform: "Snapchat", placement: "Dynamic Product Ads", device: "Mobile only", format: "Auto-generated", ratio: "9:16", dimensions: "Auto from product feed", alt: "Requires product catalogue + Snap Pixel", duration: "N/A", fileSize: "N/A", fileType: "Product feed (XML/CSV)", notes: "Auto-generates ads from catalogue. Personalised per user. Strong for fashion/retail retargeting in GCC." },

  // YOUTUBE
  { platform: "YouTube", placement: "TrueView In-Stream (Skippable)", device: "Mobile + Desktop + CTV", format: "Video", ratio: "16:9", dimensions: "1920 × 1080 px (HD)", alt: "4K (3840×2160) supported", duration: "No max (30s–3min recommended)", fileSize: "256 GB max", fileType: "MP4, MOV, AVI, WMV", notes: "Skippable after 5s. CTA overlay + end screen. Paid only if 30s+ viewed. Arabic CTAs boost GCC performance." },
  { platform: "YouTube", placement: "Non-Skippable In-Stream", device: "Mobile + Desktop + CTV", format: "Video", ratio: "16:9", dimensions: "1920 × 1080 px", alt: "Vertical (9:16) for Shorts placement", duration: "15–20s (max 20s)", fileSize: "256 GB max", fileType: "MP4, MOV", notes: "Viewer must watch in full. Creative must be compelling throughout — no skip option. CPM: $6–$18." },
  { platform: "YouTube", placement: "Bumper Ads", device: "Mobile + Desktop + CTV", format: "Video", ratio: "16:9", dimensions: "1920 × 1080 px", alt: "", duration: "6s max (non-skippable)", fileSize: "256 GB max", fileType: "MP4, MOV", notes: "Short, punchy. Pairs with TrueView for sequencing (awareness → recall). Cost-efficient GCC reach." },
  { platform: "YouTube", placement: "YouTube Shorts", device: "Mobile only", format: "Video", ratio: "9:16", dimensions: "1080 × 1920 px", alt: "Vertical mandatory", duration: "Up to 60s", fileSize: "256 GB max", fileType: "MP4, MOV", notes: "Part of Demand Gen campaigns. Full-screen vertical. Competes with TikTok/Reels. Growing rapidly in GCC." },
  { platform: "YouTube", placement: "Masthead", device: "Mobile + Desktop + CTV", format: "Video", ratio: "16:9", dimensions: "1920 × 1080 px", alt: "Auto-plays muted on desktop", duration: "Up to 30s auto-play", fileSize: "Per Google spec", fileType: "MP4", notes: "Homepage takeover. Reservation $50K–$200K/day. Maximum reach. Book 6–8 weeks ahead for GCC." },
  { platform: "YouTube", placement: "Demand Gen (Multi-Surface)", device: "Mobile + Desktop", format: "Video/Image/Carousel", ratio: "16:9 (video), 1:1 or 4:5 (image)", dimensions: "1920×1080 (video), 1080×1080 (image)", alt: "Carousel: 1200×628 landscape", duration: "15–30s video recommended", fileSize: "4 GB video / 5 MB image", fileType: "MP4, MOV, JPG, PNG", notes: "Spans YouTube, Shorts, Gmail & Discover. AI selects format per user. Requires Google Tag + GA4." },

  // LINKEDIN
  { platform: "LinkedIn", placement: "Sponsored Content (Feed)", device: "Mobile + Desktop", format: "Image", ratio: "1.91:1 or 1:1", dimensions: "1200 × 627 px (landscape) or 1080 × 1080 px (square)", alt: "", duration: "N/A", fileSize: "5 MB max", fileType: "JPG, PNG", notes: "Square (1:1) now outperforms landscape on mobile. Professional tone essential." },
  { platform: "LinkedIn", placement: "Sponsored Content (Feed)", device: "Mobile + Desktop", format: "Video", ratio: "1:1, 16:9, or 9:16", dimensions: "Min 360px wide", alt: "Vertical (9:16) growing", duration: "3s–30 min (15–60s recommended)", fileSize: "200 MB max", fileType: "MP4", notes: "Auto-plays muted — captions essential. Hook in first 3s. Arabic captions for KSA campaigns." },
  { platform: "LinkedIn", placement: "Document Ads", device: "Mobile + Desktop", format: "Document (PDF)", ratio: "Vertical pages", dimensions: "Per document", alt: "Appears as swipeable carousel", duration: "N/A", fileSize: "100 MB max", fileType: "PDF, DOC, DOCX, PPT, PPTX", notes: "High engagement for thought leadership. Users swipe through pages like a carousel. Strong for B2B in GCC." },
  { platform: "LinkedIn", placement: "InMail / Message Ads", device: "Mobile + Desktop", format: "Text + Banner", ratio: "Banner: 300 × 250", dimensions: "300 × 250 px", alt: "Text body + CTA button + optional banner", duration: "N/A", fileSize: "2 MB banner", fileType: "JPG, PNG, GIF (non-animated)", notes: "Direct to inbox. 1 InMail per member per 45 days. Personalisation boosts open rates." },
  { platform: "LinkedIn", placement: "Thought Leader Ads", device: "Mobile + Desktop", format: "Organic post (boosted)", ratio: "Per original post", dimensions: "Per original post", alt: "Boosts personal profile post as ad", duration: "Per original post", fileSize: "Per original post", fileType: "Per original post", notes: "Amplify exec posts. Drives credibility. Underused in GCC but highly effective for B2B." },

  // X (TWITTER)
  { platform: "X (Twitter)", placement: "Promoted Ad (Timeline)", device: "Mobile + Desktop", format: "Image", ratio: "1.91:1 or 1:1", dimensions: "1200 × 675 px (landscape) or 1080 × 1080 px (square)", alt: "", duration: "N/A", fileSize: "5 MB max", fileType: "JPG, PNG", notes: "GIF also supported (up to 15 MB). Max 4 images per tweet." },
  { platform: "X (Twitter)", placement: "Promoted Video", device: "Mobile + Desktop", format: "Video", ratio: "16:9, 1:1, or 9:16", dimensions: "1920 × 1080 px (16:9) or 1080 × 1080 px (1:1)", alt: "Vertical (9:16) growing", duration: "Up to 2:20 (6–15s recommended)", fileSize: "1 GB max", fileType: "MP4, MOV", notes: "Auto-plays muted in timeline. Sound-on for in-stream pre-roll. Shorter = stronger for GCC live events." },
  { platform: "X (Twitter)", placement: "Website Card", device: "Mobile + Desktop", format: "Image/Video + CTA", ratio: "1.91:1", dimensions: "800 × 418 px (min)", alt: "Includes headline + URL + CTA button", duration: "Video up to 2:20", fileSize: "5 MB image / 1 GB video", fileType: "JPG, PNG, MP4, MOV", notes: "Image + CTA button drives higher CTR than plain promoted tweets. Strong for traffic campaigns." },
  { platform: "X (Twitter)", placement: "Trend Takeover+", device: "Mobile + Desktop", format: "Video/Image + Hashtag", ratio: "16:9", dimensions: "1200 × 675 px min", alt: "Dominates Trending tab for 24hrs", duration: "Up to 6s (GIF/Video)", fileSize: "Per format", fileType: "JPG, PNG, MP4, GIF", notes: "Reservation $20K–$55K/day. Drives earned hashtag usage. Powerful for F1, Saudi National Day, FIFA." },

  // PINTEREST
  { platform: "Pinterest", placement: "Standard Pin", device: "Mobile + Desktop", format: "Image", ratio: "2:3", dimensions: "1000 × 1500 px", alt: "1:1 supported but 2:3 preferred", duration: "N/A", fileSize: "20 MB max", fileType: "JPG, PNG", notes: "Vertical format dominates on Pinterest. Users are in planning/discovery mode — high purchase intent." },
  { platform: "Pinterest", placement: "Video Pin", device: "Mobile + Desktop", format: "Video", ratio: "1:1, 2:3, or 9:16", dimensions: "1080 × 1080 px (1:1) or 1080 × 1920 px (9:16)", alt: "Max-Width Video takes full mobile width", duration: "4s–15 min (6–15s recommended)", fileSize: "2 GB max", fileType: "MP4, MOV", notes: "Auto-plays muted. Max-Width Video (full screen) is highest impact. Strong for lifestyle/design brands." },
  { platform: "Pinterest", placement: "Shopping / Collections", device: "Mobile + Desktop", format: "Image", ratio: "1:1", dimensions: "1080 × 1080 px", alt: "Hero image + 3 secondary product images", duration: "N/A", fileSize: "20 MB max", fileType: "JPG, PNG", notes: "Requires product catalogue + Pinterest Tag. Hero image is the hook. Strong for fashion/home/beauty in UAE." },

  // PROGRAMMATIC
  { platform: "Programmatic", placement: "Display Banners", device: "Mobile + Desktop", format: "Image/HTML5", ratio: "Various", dimensions: "300×250, 728×90, 160×600, 320×50, 300×600", alt: "These 5 sizes cover 90%+ of inventory", duration: "N/A (HTML5: 15–30s loops)", fileSize: "150 KB (standard) / 200 KB (rich media)", fileType: "JPG, PNG, GIF, HTML5", notes: "Always produce all 5 core sizes. Arabic + English versions for KSA/Kuwait. Use DCO for personalisation." },
  { platform: "Programmatic", placement: "Native Ads", device: "Mobile + Desktop", format: "Image + Text", ratio: "1.91:1 or 1:1", dimensions: "1200 × 627 px (landscape) or 1200 × 1200 px (square)", alt: "Headline (25 chars) + Description (90 chars) + Image", duration: "N/A", fileSize: "1 MB max", fileType: "JPG, PNG", notes: "Blends with publisher content. Via Taboola/Outbrain. Strong for BFSI, real estate, government in GCC." },
  { platform: "Programmatic", placement: "Pre-Roll / Mid-Roll (OLV)", device: "Mobile + Desktop", format: "Video", ratio: "16:9", dimensions: "1920 × 1080 px", alt: "640×360 minimum", duration: "15s or 30s (non-skippable)", fileSize: "Per publisher spec", fileType: "MP4, MOV, VAST tag", notes: "Premium publisher video. Via PMP deals (Shahid, MBC, Zawya). VAST/VPAID tags for ad serving." },
  { platform: "Programmatic", placement: "CTV / OTT", device: "Smart TV / Streaming", format: "Video", ratio: "16:9", dimensions: "1920 × 1080 px (HD) or 3840 × 2160 px (4K)", alt: "Full-screen non-skippable", duration: "15s or 30s", fileSize: "Per publisher", fileType: "MP4, VAST tag", notes: "Shahid, OSN+, StarzPlay. Full-screen, sound-on, lean-back. Near-100% viewability. PMPs only in GCC." },
  { platform: "Programmatic", placement: "DOOH", device: "Digital Screens", format: "Image/Video", ratio: "Varies by screen", dimensions: "Varies: 1920×1080, 1080×1920, 3840×2160", alt: "Check screen specs per location", duration: "10–15s video loops", fileSize: "Per network (typically <50 MB)", fileType: "JPG, PNG, MP4", notes: "Dubai Mall, SZR, airport, Riyadh screens. Always confirm exact specs with DOOH vendor. No audio on most screens." },
  { platform: "Programmatic", placement: "Audio (Spotify, Anghami)", device: "Mobile + Desktop", format: "Audio + Companion", ratio: "Companion: 1:1", dimensions: "Companion: 640 × 640 px", alt: "Audio: 15s or 30s", duration: "15s or 30s audio", fileSize: "Audio: 1 MB / Companion: 200 KB", fileType: "MP3, WAV (audio) / JPG, PNG (companion)", notes: "Anghami is the leading Arabic audio platform. Companion display shown during audio ad. Contextual targeting by mood/genre." },
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
  const [vendorRegion, setVendorRegion] = useState("GCC / Dubai");
  const [creativePlatform, setCreativePlatform] = useState("All");
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
              <SectionTitle>Platform Evaluation & Selection</SectionTitle>
              <SectionDesc>A holistic framework for evaluating each platform. Consider: Does our audience live here? Can the platform deliver on our KPIs? Do we have the right creative, tracking, and budget? What does past performance tell us?</SectionDesc>

              <Card style={{ background: "linear-gradient(135deg, #1a2744 0%, #0d1425 100%)", border: "1px solid #2a4060", marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#7eb8ff", marginBottom: 8 }}>🎯 Platform Selection Framework — 5 Questions Before Adding Any Platform</div>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.9 }}>
                  <strong style={{ color: "#7effb8" }}>1. Audience:</strong> Is our target audience actually on this platform in this market? (Don't assume — check platform data)<br/>
                  <strong style={{ color: "#ffcb7e" }}>2. Capability:</strong> Can this platform deliver against our specific KPI? (Awareness ≠ Conversion ≠ Lead Gen)<br/>
                  <strong style={{ color: "#c07eff" }}>3. Creative:</strong> Do we have the right creative format for this platform? (9:16 for TikTok/Snap, UGC-style, Arabic versions)<br/>
                  <strong style={{ color: "#7eb8ff" }}>4. Measurement:</strong> Is tracking in place? (Pixel, CAPI, Events API, UTMs, GA4 — platform-specific)<br/>
                  <strong style={{ color: "#ff7e7e" }}>5. Budget:</strong> Is budget sufficient for the platform to exit learning phase and deliver meaningful data?
                </div>
              </Card>

              {platforms.filter(p => !filterText || JSON.stringify(p).toLowerCase().includes(filterText)).map((p, i) => (
                <Accordion key={i} title={p.name} badge={<Chip color={p.color}>{p.minBudget} min</Chip>}>
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, color: "#7effb8", fontSize: 11, textTransform: "uppercase", marginBottom: 6 }}>Strengths</div>
                      {p.strengths.map((s, si) => <div key={si} style={{ fontSize: 12, marginBottom: 3, paddingLeft: 12, position: "relative" }}><span style={{ position: "absolute", left: 0 }}>•</span> {s}</div>)}
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, color: "#ffcb7e", fontSize: 11, textTransform: "uppercase", marginBottom: 6 }}>KPIs & Benchmarks</div>
                      {p.kpis.map((k, ki) => <div key={ki} style={{ fontSize: 12, marginBottom: 2, fontFamily: "monospace" }}>{k}</div>)}
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, color: "#c07eff", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>Audience Fit</div>
                      <div style={{ fontSize: 12 }}>{p.audienceFit}</div>
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 700, color: "#7eb8ff", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>Platform Capabilities</div>
                      <div style={{ fontSize: 12 }}>{p.capabilities}</div>
                    </div>

                    <div style={{ marginBottom: 12, padding: 12, background: "#0d1a14", borderRadius: 8, border: "1px solid #2a5040" }}>
                      <div style={{ fontWeight: 700, color: "#7effb8", fontSize: 11, textTransform: "uppercase", marginBottom: 6 }}>📋 Should We Include This Platform? (Evaluation Checklist)</div>
                      <div style={{ fontSize: 12, lineHeight: 1.8 }}>{p.evaluate}</div>
                    </div>

                    <div style={{ padding: 10, background: "#0f1726", borderRadius: 8, fontSize: 12 }}>
                      <strong style={{ color: "#ffcb7e" }}>🌍 GCC Considerations:</strong> {p.gcc}
                    </div>

                    <div style={{ marginTop: 8 }}>
                      <InfoRow label="Min Budget" value={<span style={{ color: "#7effb8", fontWeight: 700 }}>{p.minBudget}</span>} />
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

          {/* PROGRAMMATIC DEEP DIVE */}
          {activeSection === "programmatic" && (
            <div>
              <SectionTitle>Programmatic Deep Dive</SectionTitle>
              <SectionDesc>The complete guide to programmatic advertising in the GCC: how it works, when to use it, the planning approach, what to watch out for, a pre-launch checklist, and the most common pitfalls.</SectionDesc>

              <Card style={{ background: "linear-gradient(135deg, #1a2744 0%, #0d1425 100%)", border: "1px solid #2a4060", marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#7eb8ff", marginBottom: 10 }}>🖥️ How Programmatic Works (Simple Version)</div>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 2 }}>
                  <strong style={{ color: "#e2e8f0" }}>1. Advertiser</strong> sets campaign goals, budgets, targeting, and creative in a <strong style={{ color: "#7effb8" }}>DSP</strong> (Demand-Side Platform)<br/>
                  <strong style={{ color: "#e2e8f0" }}>2. Publisher</strong> makes ad inventory available via an <strong style={{ color: "#ffcb7e" }}>SSP</strong> (Supply-Side Platform)<br/>
                  <strong style={{ color: "#e2e8f0" }}>3. Ad Exchange</strong> connects DSPs and SSPs — runs a real-time auction in milliseconds<br/>
                  <strong style={{ color: "#e2e8f0" }}>4. Winning ad</strong> is served to the user — tracked by an <strong style={{ color: "#c07eff" }}>Ad Server</strong> (e.g. CM360)<br/>
                  <strong style={{ color: "#e2e8f0" }}>5. Verification vendor</strong> (DV/IAS) confirms: was it viewable? Brand-safe? Real human? Right country?<br/>
                  <strong style={{ color: "#e2e8f0" }}>6. All of this</strong> happens in under 100 milliseconds — before the page finishes loading
                </div>
              </Card>

              <Card style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", marginBottom: 10 }}>📌 Key Buying Types</div>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.8 }}>
                  <strong style={{ color: "#7effb8" }}>Open Exchange (RTB)</strong> — Real-time bidding on open marketplace. Maximum scale, lower quality control. CPMs: $2–$10. Use with verification mandatory.<br/>
                  <strong style={{ color: "#7eb8ff" }}>Private Marketplace (PMP)</strong> — Invite-only auction with selected premium publishers. Better quality, brand-safe. CPMs: $10–$30. Recommended for GCC.<br/>
                  <strong style={{ color: "#ffcb7e" }}>Programmatic Guaranteed (PG)</strong> — Fixed price, guaranteed inventory, automated delivery. Premium pricing. Best for tentpole moments (Ramadan, National Days).<br/>
                  <strong style={{ color: "#c07eff" }}>Preferred Deals</strong> — Fixed CPM with a specific publisher, non-guaranteed volume. Good for testing premium inventory before committing to PG.
                </div>
              </Card>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#7eb8ff", marginBottom: 12, marginTop: 28 }}>📋 Planning Approach — Step by Step</h3>
              {[
                { step: "1. Define Role in the Media Mix", detail: "Programmatic is not a replacement for social — it's complementary. Define whether programmatic is playing an awareness role (CTV, DOOH, OLV), a retargeting role (display, native), or a reach-extension role (beyond social walled gardens). This determines your DSP, inventory, and creative requirements.", output: "Written rationale for programmatic's role in the campaign" },
                { step: "2. Select the Right DSP", detail: "Choose based on: budget (DV360 needs $10K+/month, TTD needs $25K+), inventory needs (YouTube = DV360, CTV-first = TTD or MiQ), data strategy (Google data = DV360, first-party via UID2 = TTD), and transparency requirements. One DSP per campaign unless budget justifies multi-DSP.", output: "DSP selection with rationale documented" },
                { step: "3. Build Your Inventory Strategy", detail: "Decide: Open Exchange vs PMP vs Programmatic Guaranteed. For GCC, default to PMPs for brand safety. Build an inclusion list of approved publishers and domains. For CTV, secure PMP deals with Shahid, OSN+. For DOOH, book premium locations early. Avoid open exchange without verification.", output: "Inventory strategy document: deal IDs, publisher list, buying type per format" },
                { step: "4. Set Up Audiences & Data", detail: "Layer audiences in priority order: (1) First-party data — CRM lists, website retargeting via pixel (highest value, 2–3x performance vs third-party), (2) Lookalike/similar audiences from first-party seeds, (3) Third-party data segments — contextual, intent, demographic. For GCC, ensure Arabic-language content targeting is configured.", output: "Audience strategy with segments, data sources, and priority ranking" },
                { step: "5. Creative Requirements", detail: "Programmatic needs multiple sizes and formats: display (300×250, 728×90, 160×600, 320×50 minimum), video (15s and 30s, horizontal and vertical), native (headline + image + description), CTV (15s and 30s, 16:9), DOOH (varies by screen). Arabic + English versions for KSA/Kuwait. Use DCO where possible for personalisation.", output: "Creative matrix: format × size × language × message variant" },
                { step: "6. Implement Verification & Tracking", detail: "Before launch: implement DV or IAS tags in the ad server (CM360 or Flashtalking). Configure brand safety categories — block content related to violence, politics, religion, adult. Set viewability threshold (70%+ industry standard). Enable IVT (invalid traffic) monitoring. Set up conversion pixels if running performance campaigns.", output: "Verification setup confirmed, brand safety categories documented" },
                { step: "7. Launch, Monitor & Optimise", detail: "Week 1: monitor delivery, pacing, viewability, and brand safety incidents. Week 2+: optimise — pause underperforming domains/apps, shift budget to high-performing PMPs, refresh creative. Ongoing: review placement reports for low-quality sites, check frequency caps, monitor fraud rates. Report weekly.", output: "Weekly optimisation report with actions taken" },
              ].map((s, i) => (
                <Accordion key={i} title={s.step}>
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
                    <div style={{ marginBottom: 10 }}>{s.detail}</div>
                    <div style={{ padding: 10, background: "#0f1726", borderRadius: 8, fontSize: 12 }}>
                      <strong style={{ color: "#7effb8" }}>📄 Output:</strong> {s.output}
                    </div>
                  </div>
                </Accordion>
              ))}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#7eb8ff", marginBottom: 12, marginTop: 28 }}>🔍 What to Look Out For</h3>
              {[
                { area: "Viewability", what: "Industry average is 54–60% — meaning 40–46% of impressions you pay for are never seen.", action: "Use viewable CPM (vCPM) bidding. Set viewability threshold at 70%+. Use DV or IAS for independent measurement. CTV and DOOH have near-100% viewability — factor this into channel mix decisions.", metric: "Target: 70%+ viewability on display, 90%+ on video/CTV" },
                { area: "Ad Fraud / Invalid Traffic (IVT)", what: "Ad fraud costs the industry ~$84 billion annually. Bots, click farms, and spoofed domains inflate impressions and clicks. GCC open exchange inventory has moderate fraud risk.", action: "Enable pre-bid fraud filtering in your DSP. Use DV/IAS for IVT monitoring. Build publisher inclusion lists instead of trying to block all bad inventory. Use PMPs over open exchange. Monitor for abnormally high CTRs with zero conversions.", metric: "Target: <3% IVT rate on PMPs, <5% on open exchange" },
                { area: "Brand Safety Incidents", what: "Ads appearing next to inappropriate content — violence, misinformation, politically sensitive, or content contradicting Islamic values. Especially risky in GCC where cultural standards are strict.", action: "Configure DV/IAS brand safety categories per client. Block: violence, adult, political extremism, gambling, alcohol. Use custom keyword exclusion lists. Review placement reports weekly. For programmatic video, use PMPs only — open exchange video has highest brand safety risk.", metric: "Target: 0 brand safety incidents per campaign" },
                { area: "Frequency Oversaturation", what: "Without proper caps, programmatic will hammer the same users repeatedly — leading to ad fatigue, negative brand perception, and wasted spend.", action: "Set frequency caps in the DSP: 3–5x/week for awareness, 7–10x/week for retargeting. Use cross-campaign frequency management via CM360. Monitor frequency distribution — if >20% of users see the ad 10+ times, you have a problem.", metric: "Target: 3–5x/week (awareness), 7–10x/week (retargeting)" },
                { area: "Domain Spoofing & Low-Quality Inventory", what: "Some publishers misrepresent their domains to attract premium ad spend. Your ad thinks it's on a premium news site but it's actually on a low-quality content farm.", action: "Use ads.txt/app-ads.txt verification. Build inclusion lists of approved domains. Avoid buying on 'long-tail' open exchange without verification. Review placement reports — flag any domain you don't recognise.", metric: "Check placement reports weekly" },
                { area: "Data Leakage", what: "Some DSPs and data partners may share your audience data or retargeting lists with competitors or across clients if not properly ring-fenced.", action: "Confirm data isolation with your DSP. Use clean rooms for sensitive first-party data. Read data partner terms carefully. Ask: 'Can other advertisers target my audience segments?'", metric: "Contractual data isolation confirmed" },
                { area: "Hidden Fees / Non-Transparent Costs", what: "The programmatic supply chain can include 15–30% of spend going to intermediary fees (DSP, SSP, exchange, data, verification) before reaching the publisher.", action: "Demand cost transparency from your DSP. Understand the fee stack: DSP fee (10–20%) + data cost + verification cost + SSP take rate. With TTD, you can see the full breakdown. With DV360, less transparent. Ask your vendor to show working media vs. total spend.", metric: "Working media ratio: aim for 60%+ of spend reaching publishers" },
              ].map((s, i) => (
                <Accordion key={i} title={s.area} subtitle={s.metric}>
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ fontWeight: 700, color: "#ff7e7e", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>The Risk</div>
                      {s.what}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#7effb8", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>What To Do</div>
                      {s.action}
                    </div>
                  </div>
                </Accordion>
              ))}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#7eb8ff", marginBottom: 12, marginTop: 28 }}>✅ Programmatic Pre-Launch Checklist</h3>
              {Object.entries({
                "DSP & Inventory Setup": [
                  "DSP selected with documented rationale",
                  "PMP deals confirmed with deal IDs from publishers",
                  "Inclusion list of approved domains/apps created",
                  "Open exchange blocked or limited to verified inventory only",
                  "CTV inventory secured (Shahid, OSN+, StarzPlay PMP deals)",
                  "DOOH placements booked if applicable (lead time 2–4 weeks)",
                ],
                "Audiences & Data": [
                  "First-party data uploaded (CRM lists, website audiences)",
                  "Retargeting pixel installed and firing on client website",
                  "Lookalike/similar audiences built from first-party seeds",
                  "Third-party data segments selected and costed",
                  "Audience exclusions configured (existing customers, converters)",
                ],
                "Creative & Ad Serving": [
                  "All creative sizes produced (300×250, 728×90, 160×600, 320×50 minimum)",
                  "Video creative available in 15s and 30s (horizontal + vertical)",
                  "Arabic creative versions available for KSA/Kuwait campaigns",
                  "DCO templates configured if using dynamic creative",
                  "All creatives trafficked in ad server (CM360 / Flashtalking)",
                  "Click-through URLs verified and UTM parameters applied",
                ],
                "Verification & Brand Safety": [
                  "DV or IAS tags implemented in ad server",
                  "Brand safety categories configured per client requirements",
                  "Custom keyword exclusion list applied",
                  "Viewability threshold set (70%+ display, 90%+ video)",
                  "IVT / fraud monitoring enabled (pre-bid filtering on)",
                  "Geographic targeting verified — correct GCC markets selected",
                ],
                "Campaign Settings": [
                  "Frequency caps configured (3–5x/week awareness, 7–10x retargeting)",
                  "Budget pacing set correctly (daily/weekly/flight)",
                  "Bid strategy confirmed (CPM, vCPM, CPA target)",
                  "Dayparting configured if required (e.g. post-Iftar for Ramadan)",
                  "Campaign naming convention applied consistently",
                  "Conversion tracking pixels verified if performance campaign",
                ],
                "Reporting & Sign-Off": [
                  "Reporting template set up with agreed KPIs",
                  "Placement report review scheduled (weekly minimum)",
                  "Two-person internal QA completed before go-live",
                  "Client sign-off received on plan and targeting",
                ],
              }).map(([category, items]) => (
                <Card key={category} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0", marginBottom: 12 }}>{category}</div>
                  {items.map((item, i) => {
                    const key = `prog_qa_${category}_${i}`;
                    return <CheckItem key={key} checked={checkedItems[key]} onChange={() => toggleCheck(key)}>{item}</CheckItem>;
                  })}
                </Card>
              ))}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#ff7e7e", marginBottom: 12, marginTop: 28 }}>🚫 Common Programmatic Pitfalls</h3>
              {[
                { mistake: "Running open exchange without verification", why: "It's cheaper and easier to set up — planner skips DV/IAS to save on CPM costs or because it wasn't in the original plan.", impact: "Ads appear on low-quality content farms, fraud sites, or alongside culturally inappropriate content. Brand safety incident with the client. Inflated metrics from bot traffic.", fix: "Verification is non-negotiable. DV or IAS on every programmatic campaign. The $0.03–$0.15 CPM cost is insurance, not overhead.", rule: "No programmatic campaign goes live without DV or IAS. Ever." },
                { mistake: "Using open exchange for GCC without an inclusion list", why: "Planner targets 'UAE' or 'KSA' in the DSP and lets it run across all available inventory in those geos.", impact: "Ads end up on obscure apps, made-for-advertising sites, and low-quality Arabic content. 40–60% of impressions may be non-viewable or fraudulent.", fix: "Build a curated inclusion list of 50–200 approved domains and apps. Use PMPs as the primary buying method. Open exchange only as supplementary reach with strict verification.", rule: "Inclusion lists before every programmatic campaign in GCC." },
                { mistake: "Ignoring frequency caps", why: "DSP default settings often have no frequency cap, or caps are set too high. Planner doesn't configure them.", impact: "20–30% of budget wasted hammering the same users 15–20+ times. Negative brand perception. Audience fatigue. Creative burn-out.", fix: "Set caps at DSP level AND ad server level. Awareness: 3–5x/week. Retargeting: 7–10x/week max. Use CM360 for cross-campaign frequency management.", rule: "Frequency caps configured on every campaign. Review frequency distribution weekly." },
                { mistake: "Not reviewing placement reports", why: "Campaign is set up, optimised on top-line metrics (CPM, CTR), but nobody checks where ads actually ran.", impact: "Budget bleeds to low-quality sites, mobile game apps, or MFA (made-for-advertising) sites that generate clicks but zero real engagement or conversions.", fix: "Review placement reports weekly. Flag and block any domain/app you wouldn't want the client to see their ad on. Create an exclusion list that grows over time.", rule: "Weekly placement report review is mandatory. Build a running exclusion list." },
                { mistake: "Treating programmatic as 'set and forget'", why: "Campaign is launched, performing 'okay', and planner moves on to other tasks. Optimisation happens monthly instead of weekly.", impact: "Slow creative fatigue goes unnoticed. Budget shifts to underperforming inventory. CPMs creep up. Viewability drops. Performance degrades gradually.", fix: "Structured optimisation cadence: daily pacing checks, weekly full optimisation (creative, placement, audience, frequency), bi-weekly creative refresh, monthly strategy review.", rule: "Programmatic needs weekly active optimisation — not monthly check-ins." },
                { mistake: "Buying CTV inventory on open exchange", why: "CTV CPMs on open exchange ($5–$15) look cheaper than PMP deals ($15–$40). Planner opts for scale.", impact: "Most 'CTV' inventory on open exchange is actually mobile in-app video or desktop pre-roll being misrepresented as CTV. You're paying CTV prices for non-CTV quality.", fix: "CTV must be bought via PMPs with verified publishers (Shahid, OSN+, StarzPlay) or through a managed service partner like MiQ. Verify device-type reporting.", rule: "CTV = PMPs only. No open exchange CTV buying in GCC." },
                { mistake: "No conversion tracking on performance campaigns", why: "Programmatic retargeting or performance display launched without a working conversion pixel on the client's website.", impact: "DSP cannot optimise toward conversions. Campaign runs on CPM/CPC optimisation instead. ROAS is unmeasurable. Budget is wasted on users who never convert.", fix: "Conversion pixel must be installed and firing before campaign launch. Verify with the DSP's diagnostic tools. Test with a known conversion before go-live.", rule: "No performance programmatic without verified conversion tracking." },
                { mistake: "Underestimating the minimum budget", why: "Client wants programmatic with a $5K/month budget. Planner adds it to the plan to look comprehensive.", impact: "DSP doesn't gather enough data to optimise. Results are statistically meaningless. Operational overhead (setup, trafficking, reporting) exceeds the value of the spend.", fix: "Minimum $20K/month for programmatic to be meaningful. Below that, the budget is better allocated to social platforms where learning algorithms are more efficient at lower spend.", rule: "$20K/month minimum. If budget doesn't allow it, don't include programmatic." },
              ].map((m, i) => (
                <Accordion key={i} title={m.mistake}>
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, color: "#64748b", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>Why It Happens</div>
                      {m.why}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, color: "#ff7e7e", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>Impact</div>
                      {m.impact}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, color: "#7effb8", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>The Fix</div>
                      {m.fix}
                    </div>
                    <div style={{ padding: 10, background: "#1a2744", borderRadius: 8, border: "1px solid #2a4060", fontSize: 12 }}>
                      <strong style={{ color: "#7eb8ff" }}>📌 Rule:</strong> {m.rule}
                    </div>
                  </div>
                </Accordion>
              ))}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#7eb8ff", marginBottom: 12, marginTop: 28 }}>⚠️ GCC Programmatic Rules of Thumb</h3>
              <Card style={{ background: "#1a1520", border: "1px solid #2a1a30" }}>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.8 }}>
                  • <strong style={{ color: "#e2e8f0" }}>Always use PMPs</strong> over open exchange for GCC campaigns — brand safety is non-negotiable<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Minimum $20K/month</strong> for programmatic to generate meaningful optimisation data<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Verification (DV or IAS)</strong> is required on every programmatic buy — no exceptions<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Arabic creative</strong> is essential for KSA/Kuwait programmatic — use DCO for AR+EN versioning<br/>
                  • <strong style={{ color: "#e2e8f0" }}>CTV is growing fast</strong> — Shahid AVOD tier is the #1 Arabic CTV inventory in GCC<br/>
                  • <strong style={{ color: "#e2e8f0" }}>DOOH</strong> in Dubai Mall, SZR, and Riyadh King Fahd Road are premium placements — book early for peak moments<br/>
                  • <strong style={{ color: "#e2e8f0" }}>First-party data</strong> (CRM lists via LiveRamp) outperforms third-party data by 2–3x for conversions<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Viewability target</strong>: 70%+ for display, 90%+ for video and CTV<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Working media ratio</strong>: aim for 60%+ of total spend actually reaching publishers (rest is fees)<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Placement reports</strong>: review weekly, build a running exclusion list, never trust 'set and forget'<br/>
                  • <strong style={{ color: "#e2e8f0" }}>CTV buying</strong>: PMPs only — never buy CTV on open exchange in GCC<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Ramadan/peak CPMs</strong>: book PG deals 6–8 weeks ahead for premium inventory during Ramadan, Eid, and National Days
                </div>
              </Card>
            </div>
          )}

          {/* VENDOR LANDSCAPE */}
          {activeSection === "vendors" && (
            <div>
              <SectionTitle>Vendor Landscape by Region</SectionTitle>
              <SectionDesc>Platform and vendor ecosystems across key markets. Each region has different dominant platforms, DSPs, and rules of engagement.</SectionDesc>

              <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
                {Object.keys(regionalVendors).map(region => (
                  <button key={region} onClick={() => setVendorRegion(region)} style={{
                    padding: "8px 16px", borderRadius: 20, border: vendorRegion === region ? "1px solid #3b82f6" : "1px solid #1e2d45",
                    background: vendorRegion === region ? "#1a2744" : "#0d1425", color: vendorRegion === region ? "#7eb8ff" : "#64748b",
                    fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all .15s"
                  }}>{region}</button>
                ))}
              </div>

              <Card style={{ background: "linear-gradient(135deg, #1a2744 0%, #0d1425 100%)", border: "1px solid #2a4060", marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>{regionalVendors[vendorRegion].desc}</div>
              </Card>

              {regionalVendors[vendorRegion].data.filter(cat => !filterText || JSON.stringify(cat).toLowerCase().includes(filterText)).map((cat, ci) => (
                <div key={ci} style={{ marginBottom: 28 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#7eb8ff", marginBottom: 4 }}>{cat.category}</h3>
                  <p style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>{cat.description}</p>
                  {cat.vendors.map((v, vi) => (
                    <Accordion key={vi} title={v.name} subtitle={v.type} badge={<Chip color={v.type.includes("DSP") || v.type.includes("Search") ? "blue" : v.type.includes("Safety") || v.type.includes("Verif") ? "red" : v.type.includes("CTV") || v.type.includes("OTT") || v.type.includes("Audio") || v.type.includes("Video") || v.type.includes("Social") ? "purple" : v.type.includes("DOOH") || v.type.includes("Outdoor") || v.type.includes("Commerce") ? "amber" : v.type.includes("Guideline") || v.type.includes("Must-Know") ? "red" : "teal"}>{v.type}</Chip>}>
                      <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
                        <div style={{ marginBottom: 10 }}>
                          <div style={{ fontWeight: 700, color: "#64748b", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>What It Does</div>
                          {v.what}
                        </div>
                        <div style={{ marginBottom: 10, padding: 10, background: "#0f1726", borderRadius: 8 }}>
                          <strong style={{ color: "#ffcb7e" }}>🌍 GCC Relevance / How to Use:</strong><br/>{v.gcc}
                        </div>
                        <InfoRow label="Best For" value={v.bestFor} />
                        {v.minBudget && v.minBudget !== "N/A" && <InfoRow label="Min Budget" value={<span style={{ color: "#7effb8", fontWeight: 600 }}>{v.minBudget}</span>} />}
                      </div>
                    </Accordion>
                  ))}
                </div>
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

              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                {/* Left: Checklist items */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {Object.entries(qaChecklist).map(([category, items]) => {
                    const catChecked = items.filter((_, i) => checkedItems[`qa_${category}_${i}`]).length;
                    const catDone = catChecked === items.length;
                    return (
                    <Card key={category} style={{ marginBottom: 16, border: catDone ? "1px solid #22c55e30" : "1px solid #1e2d45" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{category}</div>
                        <div style={{ fontSize: 11, color: catDone ? "#22c55e" : "#64748b", fontWeight: 600 }}>
                          {catDone ? "✅ Complete" : `${catChecked}/${items.length}`}
                        </div>
                      </div>
                      {items.map((item, i) => {
                        const key = `qa_${category}_${i}`;
                        return <CheckItem key={key} checked={checkedItems[key]} onChange={() => toggleCheck(key)}>{item}</CheckItem>;
                      })}
                    </Card>
                  );})}
                </div>

                {/* Right: Sticky evolution card */}
                <div style={{ width: 220, flexShrink: 0, position: "sticky", top: 28 }}>
                  {(() => {
                    const pct = Math.round((checkedCount / totalChecks) * 100);
                    const stages = [
                      { min: 0, icon: "🥚", name: "The Brief Egg", msg: "Start checking items to hatch it.", bg: "#141c2e" },
                      { min: 8, icon: "🐣", name: "The Hatchling", msg: "Brief & strategy taking shape.", bg: "#1a2020" },
                      { min: 20, icon: "🐥", name: "Baby Planner", msg: "Creative & tracking coming together.", bg: "#1a2520" },
                      { min: 35, icon: "🐦", name: "Fledgling Campaign", msg: "Learning to fly.", bg: "#1a2a25" },
                      { min: 50, icon: "🦅", name: "Campaign Eagle", msg: "Over halfway there!", bg: "#1a302a" },
                      { min: 65, icon: "🚀", name: "Launch Sequence", msg: "Engines warming up.", bg: "#1a2540" },
                      { min: 80, icon: "🛸", name: "Orbit Mode", msg: "Final checks in progress.", bg: "#1a2050" },
                      { min: 95, icon: "⭐", name: "Supernova", msg: "So close!", bg: "#2a1a40" },
                      { min: 100, icon: "🏆", name: "Campaign Ready!", msg: "Cleared for launch! 🎉", bg: "#1a3a1a" },
                    ];
                    const stage = [...stages].reverse().find(s => pct >= s.min) || stages[0];
                    const nextStage = stages[stages.indexOf(stage) + 1];

                    return (
                      <div style={{ background: `linear-gradient(180deg, ${stage.bg} 0%, #0d1425 100%)`, border: "1px solid #1e2d45", borderRadius: 12, padding: 20, textAlign: "center" }}>
                        <div style={{ fontSize: 48, marginBottom: 6, filter: pct === 100 ? "drop-shadow(0 0 12px #22c55e)" : "none", transition: "all .5s" }}>{stage.icon}</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: "#e2e8f0", marginBottom: 2 }}>{stage.name}</div>
                        <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 12 }}>{stage.msg}</div>

                        <div style={{ marginBottom: 4 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 10, color: "#64748b" }}>{pct}%</span>
                            <span style={{ fontSize: 10, color: "#64748b" }}>{checkedCount}/{totalChecks}</span>
                          </div>
                          <ProgressBar value={checkedCount} max={totalChecks} color={pct === 100 ? "#22c55e" : pct >= 80 ? "#7eb8ff" : pct >= 50 ? "#3b82f6" : "#334155"} />
                        </div>

                        {nextStage && pct < 100 && (
                          <div style={{ marginTop: 10, fontSize: 9, color: "#475569", lineHeight: 1.4 }}>
                            Next: {nextStage.icon} {nextStage.name}<br/>at {nextStage.min}%
                          </div>
                        )}

                        {pct === 100 && (
                          <div style={{ marginTop: 10, display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
                            {stages.map((s, i) => <span key={i} style={{ fontSize: 12, opacity: 0.7 }}>{s.icon}</span>)}
                          </div>
                        )}

                        {/* Evolution timeline */}
                        <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                          {stages.map((s, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <div style={{
                                width: 8, height: 8, borderRadius: "50%",
                                background: pct >= s.min ? (pct === 100 ? "#22c55e" : "#3b82f6") : "#1e2d45",
                                border: pct >= s.min && pct < (stages[i+1]?.min || 101) ? "2px solid #7eb8ff" : "1px solid transparent",
                                transition: "all .3s",
                                fontSize: 5, display: "flex", alignItems: "center", justifyContent: "center"
                              }} />
                              {i < stages.length - 1 && <div style={{ width: 6, height: 1, background: pct >= (stages[i+1]?.min || 101) ? "#3b82f6" : "#1e2d45" }} />}
                            </div>
                          ))}
                        </div>

                        {/* Reset button */}
                        <button
                          onClick={() => { if (window.confirm("Reset all checked items? This will clear your progress.")) setCheckedItems({}); }}
                          style={{
                            marginTop: 16, width: "100%", padding: "8px 0", borderRadius: 8,
                            background: "transparent", border: "1px solid #334155", color: "#64748b",
                            fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                            transition: "all .15s"
                          }}
                          onMouseEnter={e => { e.target.style.borderColor = "#ff7e7e"; e.target.style.color = "#ff7e7e"; }}
                          onMouseLeave={e => { e.target.style.borderColor = "#334155"; e.target.style.color = "#64748b"; }}
                        >
                          ↺ Reset Checklist
                        </button>
                      </div>
                    );
                  })()}
                </div>
              </div>
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

          {/* CREATIVE SPECS */}
          {activeSection === "creativespecs" && (
            <div>
              <SectionTitle>Creative Specs by Platform</SectionTitle>
              <SectionDesc>Complete ad dimensions, formats, file requirements, and placement-specific specs across all platforms. {creativeSpecs.length} formats documented.</SectionDesc>

              <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
                {["All"].concat(Array.from(new Set(creativeSpecs.map(s => s.platform)))).map(p => (
                  <button key={p} onClick={() => setCreativePlatform(p)} style={{
                    padding: "6px 14px", borderRadius: 20, border: creativePlatform === p ? "1px solid #3b82f6" : "1px solid #1e2d45",
                    background: creativePlatform === p ? "#1a2744" : "#0d1425", color: creativePlatform === p ? "#7eb8ff" : "#64748b",
                    fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all .15s"
                  }}>{p}</button>
                ))}
              </div>

              <Card style={{ background: "linear-gradient(135deg, #1a2744 0%, #0d1425 100%)", border: "1px solid #2a4060", marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#7eb8ff", marginBottom: 8 }}>🎯 Quick Reference — The 3 Must-Have Ratios</div>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.8 }}>
                  <strong style={{ color: "#7effb8" }}>1:1 Square (1080×1080)</strong> — Works across 80% of placements. Safe default for Feed on all platforms.<br/>
                  <strong style={{ color: "#ffcb7e" }}>4:5 Vertical (1080×1350)</strong> — Best for mobile Feed. Takes up more screen. Higher engagement vs square.<br/>
                  <strong style={{ color: "#c07eff" }}>9:16 Full Vertical (1080×1920)</strong> — Mandatory for Reels, Stories, TikTok, Snapchat, Shorts. Non-negotiable in 2026.
                </div>
              </Card>

              {(() => { const filtered = creativeSpecs.filter(s => creativePlatform === "All" || s.platform === creativePlatform).filter(s => !filterText || JSON.stringify(s).toLowerCase().includes(filterText)); return (
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>Showing <strong style={{ color: "#7eb8ff" }}>{filtered.length}</strong> of {creativeSpecs.length} formats {creativePlatform !== "All" ? `for ${creativePlatform}` : ""}</div>
              ); })()}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#7eb8ff", marginBottom: 14 }}>📱 Visual Format Examples</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>

                {/* Phone: Feed 1:1 */}
                {(creativePlatform === "All" || ["Meta","LinkedIn","X (Twitter)","Pinterest"].includes(creativePlatform)) && (
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#7eb8ff", marginBottom: 8 }}>Feed Post — 1:1 Square</div>
                  <div style={{ width: 140, margin: "0 auto", background: "#0b1120", borderRadius: 16, border: "2px solid #334155", padding: "8px 6px", position: "relative" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#334155", margin: "0 auto 6px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4, padding: "0 4px" }}>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#1e2d45" }} />
                      <div style={{ height: 4, flex: 1, background: "#1e2d45", borderRadius: 2 }} />
                    </div>
                    <div style={{ width: "100%", paddingBottom: "100%", background: "linear-gradient(135deg, #1a3a2a, #1a2744)", borderRadius: 4, position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#7effb8", fontSize: 10, fontWeight: 700 }}>1:1<br/>1080×1080</div>
                    </div>
                    <div style={{ padding: "4px", display: "flex", gap: 3, marginTop: 4 }}>
                      {[1,2,3,4].map(i => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: "#1e2d45" }} />)}
                    </div>
                    <div style={{ height: 3, background: "#1e2d45", borderRadius: 2, margin: "4px 20px 2px", width: "60%" }} />
                    <div style={{ height: 3, background: "#1e2d45", borderRadius: 2, margin: "2px 20px", width: "80%" }} />
                    <div style={{ width: 30, height: 3, borderRadius: 10, background: "#334155", margin: "8px auto 2px" }} />
                  </div>
                  <div style={{ fontSize: 9, color: "#64748b", marginTop: 6 }}>Meta · LinkedIn · X · Pinterest</div>
                </Card>)}

                {/* Phone: Feed 4:5 */}
                {(creativePlatform === "All" || creativePlatform === "Meta") && (
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#ffcb7e", marginBottom: 8 }}>Feed Post — 4:5 Vertical</div>
                  <div style={{ width: 140, margin: "0 auto", background: "#0b1120", borderRadius: 16, border: "2px solid #334155", padding: "8px 6px" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#334155", margin: "0 auto 6px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4, padding: "0 4px" }}>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#1e2d45" }} />
                      <div style={{ height: 4, flex: 1, background: "#1e2d45", borderRadius: 2 }} />
                    </div>
                    <div style={{ width: "100%", paddingBottom: "125%", background: "linear-gradient(135deg, #3a2a1a, #1a2744)", borderRadius: 4, position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#ffcb7e", fontSize: 10, fontWeight: 700 }}>4:5<br/>1080×1350</div>
                    </div>
                    <div style={{ height: 3, background: "#1e2d45", borderRadius: 2, margin: "4px 20px 2px", width: "60%" }} />
                    <div style={{ width: 30, height: 3, borderRadius: 10, background: "#334155", margin: "6px auto 2px" }} />
                  </div>
                  <div style={{ fontSize: 9, color: "#64748b", marginTop: 6 }}>Meta Feed · Best for mobile</div>
                </Card>)}

                {/* Phone: Stories/Reels 9:16 */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#c07eff", marginBottom: 8 }}>Stories / Reels — 9:16</div>
                  <div style={{ width: 120, margin: "0 auto", background: "linear-gradient(180deg, #2a1a3a, #1a2744)", borderRadius: 16, border: "2px solid #334155", height: 214, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 6, left: 8, right: 8, display: "flex", alignItems: "center", gap: 4, zIndex: 2 }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,.3)" }} />
                      <div style={{ height: 3, flex: 1, background: "rgba(255,255,255,.15)", borderRadius: 2 }} />
                    </div>
                    <div style={{ position: "absolute", top: 8, right: 8, display: "flex", flexDirection: "column", gap: 6, zIndex: 2 }}>
                      {["♡","💬","↗"].map((e,i) => <div key={i} style={{ fontSize: 8, opacity: .4 }}>{e}</div>)}
                    </div>
                    <div style={{ position: "absolute", top: 20, left: 0, right: 0, height: 2, background: "rgba(126,184,255,.2)", margin: "0 8px" }}>
                      <div style={{ width: "40%", height: "100%", background: "#7eb8ff", borderRadius: 1 }} />
                    </div>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#c07eff", fontSize: 10, fontWeight: 700, flexDirection: "column" }}>
                      <span>9:16</span>
                      <span style={{ fontSize: 8 }}>1080×1920</span>
                      <span style={{ fontSize: 7, color: "#ff7e7e", marginTop: 4 }}>⬆ 250px safe zone</span>
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,.3)", padding: "6px 8px", zIndex: 2 }}>
                      <div style={{ height: 3, background: "rgba(255,255,255,.2)", borderRadius: 2, marginBottom: 3, width: "70%" }} />
                      <div style={{ background: "rgba(126,184,255,.3)", borderRadius: 4, padding: "3px 0", textAlign: "center", fontSize: 7, color: "#7eb8ff" }}>CTA Button</div>
                      <div style={{ fontSize: 7, color: "#ff7e7e", textAlign: "center", marginTop: 2 }}>⬇ 340px safe zone</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 9, color: "#64748b", marginTop: 6 }}>Meta · TikTok · Snap · Shorts</div>
                </Card>

                {/* Phone: TikTok In-Feed */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#c07eff", marginBottom: 8 }}>TikTok In-Feed</div>
                  <div style={{ width: 120, margin: "0 auto", background: "linear-gradient(180deg, #0b1120, #1a1520)", borderRadius: 16, border: "2px solid #334155", height: 214, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#c07eff", fontSize: 10, fontWeight: 700, flexDirection: "column" }}>
                      <span>9:16</span>
                      <span style={{ fontSize: 8 }}>Full Screen</span>
                      <span style={{ fontSize: 7, color: "#94a3b8", marginTop: 4 }}>Sound ON</span>
                      <span style={{ fontSize: 7, color: "#ffcb7e" }}>Hook in 2s</span>
                    </div>
                    <div style={{ position: "absolute", right: 6, bottom: 40, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                      {["♡","💬","↗","🎵"].map((e,i) => <div key={i} style={{ fontSize: 10, opacity: .3 }}>{e}</div>)}
                    </div>
                    <div style={{ position: "absolute", bottom: 6, left: 8, right: 30 }}>
                      <div style={{ height: 3, background: "rgba(255,255,255,.15)", borderRadius: 2, marginBottom: 2, width: "60%" }} />
                      <div style={{ height: 3, background: "rgba(255,255,255,.1)", borderRadius: 2, width: "80%" }} />
                      <div style={{ height: 2, background: "rgba(255,255,255,.08)", borderRadius: 2, marginTop: 3, width: "40%" }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 9, color: "#64748b", marginTop: 6 }}>TikTok · Spark Ads · Prime Time</div>
                </Card>

                {/* Carousel */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#7eb8ff", marginBottom: 8 }}>Carousel — Multi-Card</div>
                  <div style={{ width: 140, margin: "0 auto", background: "#0b1120", borderRadius: 16, border: "2px solid #334155", padding: "8px 6px" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#334155", margin: "0 auto 6px" }} />
                    <div style={{ display: "flex", gap: 4, overflow: "hidden" }}>
                      {[1,2,3].map(i => (
                        <div key={i} style={{ minWidth: i === 1 ? "85%" : "15%", paddingBottom: i === 1 ? "85%" : "15%", background: i === 1 ? "linear-gradient(135deg, #1a2744, #1a3a2a)" : "#141c2e", borderRadius: 4, position: "relative", flexShrink: 0 }}>
                          {i === 1 && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#7eb8ff", fontSize: 9, fontWeight: 700 }}>Card 1<br/>1:1</div>}
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 6 }}>
                      {[1,2,3,4,5].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: i === 1 ? "#7eb8ff" : "#1e2d45" }} />)}
                    </div>
                    <div style={{ height: 3, background: "#1e2d45", borderRadius: 2, margin: "4px 10px 2px", width: "70%" }} />
                    <div style={{ width: 30, height: 3, borderRadius: 10, background: "#334155", margin: "6px auto 2px" }} />
                  </div>
                  <div style={{ fontSize: 9, color: "#64748b", marginTop: 6 }}>Meta · LinkedIn · Pinterest</div>
                </Card>

                {/* Desktop: Browser Feed */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#7eb8ff", marginBottom: 8 }}>Desktop Feed</div>
                  <div style={{ width: "100%", background: "#0b1120", borderRadius: 8, border: "2px solid #334155", overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", background: "#141c2e", borderBottom: "1px solid #1e2d45" }}>
                      {["#ff5f57","#febc2e","#28c840"].map((c,i) => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />)}
                      <div style={{ flex: 1, height: 10, background: "#0b1120", borderRadius: 4, margin: "0 10px" }} />
                    </div>
                    <div style={{ padding: 8, display: "flex", gap: 6 }}>
                      <div style={{ flex: "0 0 30%", display: "flex", flexDirection: "column", gap: 3 }}>
                        {[1,2,3].map(i => <div key={i} style={{ height: 4, background: "#1e2d45", borderRadius: 2, width: `${90-i*15}%` }} />)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#1e2d45" }} />
                          <div style={{ height: 3, flex: 1, background: "#1e2d45", borderRadius: 2 }} />
                          <div style={{ fontSize: 6, color: "#334155" }}>Sponsored</div>
                        </div>
                        <div style={{ paddingBottom: "55%", background: "linear-gradient(135deg, #1a2744, #1a3a2a)", borderRadius: 4, position: "relative" }}>
                          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#7eb8ff", fontSize: 9, fontWeight: 700 }}>16:9 or 1:1</div>
                        </div>
                        <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
                          {[1,2,3].map(i => <div key={i} style={{ height: 3, flex: 1, background: "#1e2d45", borderRadius: 2 }} />)}
                        </div>
                      </div>
                      <div style={{ flex: "0 0 20%" }}>
                        <div style={{ paddingBottom: "180%", background: "linear-gradient(180deg, #1a2744, #141c2e)", borderRadius: 4, position: "relative" }}>
                          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontSize: 7 }}>Right<br/>Column</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 9, color: "#64748b", marginTop: 6 }}>Meta · LinkedIn · X (Desktop)</div>
                </Card>

                {/* Display Banners */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#ffcb7e", marginBottom: 8 }}>Display Banners</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                    <div style={{ width: "100%", height: 22, background: "linear-gradient(90deg, #3a2a1a, #1a2744)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#ffcb7e", fontWeight: 600, border: "1px dashed #504020" }}>728 × 90 — Leaderboard</div>
                    <div style={{ display: "flex", gap: 6, width: "100%", justifyContent: "center" }}>
                      <div style={{ width: 70, height: 58, background: "linear-gradient(135deg, #3a2a1a, #1a2744)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: "#ffcb7e", fontWeight: 600, border: "1px dashed #504020" }}>300×250<br/>MPU</div>
                      <div style={{ width: 28, height: 80, background: "linear-gradient(180deg, #3a2a1a, #1a2744)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 6, color: "#ffcb7e", fontWeight: 600, border: "1px dashed #504020", writingMode: "vertical-rl" }}>160×600</div>
                    </div>
                    <div style={{ width: "80%", height: 14, background: "linear-gradient(90deg, #3a2a1a, #1a2744)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: "#ffcb7e", fontWeight: 600, border: "1px dashed #504020" }}>320 × 50 — Mobile</div>
                  </div>
                  <div style={{ fontSize: 9, color: "#64748b", marginTop: 6 }}>Programmatic · GDN · Display</div>
                </Card>

                {/* Interstitial */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#ff7e7e", marginBottom: 8 }}>Interstitial / Takeover</div>
                  <div style={{ width: 120, margin: "0 auto", background: "#0b1120", borderRadius: 16, border: "2px solid #334155", height: 200, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 8, background: "linear-gradient(135deg, #3a1a1a, #1a2744)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", border: "1px dashed #502a2a" }}>
                      <div style={{ fontSize: 8, color: "#ff7e7e", fontWeight: 700 }}>Full Screen</div>
                      <div style={{ fontSize: 7, color: "#94a3b8" }}>Overlay</div>
                      <div style={{ fontSize: 7, color: "#ffcb7e", marginTop: 4 }}>320×480 or</div>
                      <div style={{ fontSize: 7, color: "#ffcb7e" }}>1080×1920</div>
                    </div>
                    <div style={{ position: "absolute", top: 12, right: 12, width: 14, height: 14, borderRadius: "50%", background: "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#94a3b8" }}>✕</div>
                  </div>
                  <div style={{ fontSize: 9, color: "#64748b", marginTop: 6 }}>Programmatic · In-App · Rich Media</div>
                </Card>

                {/* Native Ad */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#7effb8", marginBottom: 8 }}>Native / In-Content</div>
                  <div style={{ width: "100%", background: "#0b1120", borderRadius: 8, border: "1px solid #1e2d45", padding: 8 }}>
                    {[1,2].map(i => <div key={i} style={{ height: 3, background: "#1e2d45", borderRadius: 2, marginBottom: 3, width: `${95-i*10}%` }} />)}
                    <div style={{ border: "1px dashed #2a5040", borderRadius: 6, padding: 8, margin: "6px 0", background: "#0d1a14" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <div style={{ width: 45, height: 35, background: "linear-gradient(135deg, #1a3a2a, #1a2744)", borderRadius: 3, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 6, color: "#7effb8" }}>Image</div>
                        <div>
                          <div style={{ height: 3, background: "#2a5040", borderRadius: 2, width: 60, marginBottom: 3 }} />
                          <div style={{ height: 2, background: "#1e2d45", borderRadius: 2, width: 50, marginBottom: 2 }} />
                          <div style={{ height: 2, background: "#1e2d45", borderRadius: 2, width: 40 }} />
                          <div style={{ fontSize: 6, color: "#7effb8", marginTop: 3 }}>Sponsored</div>
                        </div>
                      </div>
                    </div>
                    {[1,2,3].map(i => <div key={i} style={{ height: 3, background: "#1e2d45", borderRadius: 2, marginBottom: 3, width: `${100-i*8}%` }} />)}
                  </div>
                  <div style={{ fontSize: 9, color: "#64748b", marginTop: 6 }}>Taboola · Outbrain · Programmatic</div>
                </Card>

                {/* CTV */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#c07eff", marginBottom: 8 }}>CTV / OTT — 16:9</div>
                  <div style={{ width: "100%", background: "#0b1120", borderRadius: 4, border: "3px solid #334155", overflow: "hidden", position: "relative" }}>
                    <div style={{ paddingBottom: "56.25%", background: "linear-gradient(135deg, #2a1a3a, #0d1425)", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        <div style={{ fontSize: 9, color: "#c07eff", fontWeight: 700 }}>16:9</div>
                        <div style={{ fontSize: 8, color: "#94a3b8" }}>1920×1080 HD</div>
                        <div style={{ fontSize: 7, color: "#ffcb7e", marginTop: 4 }}>15s or 30s</div>
                        <div style={{ fontSize: 7, color: "#7effb8" }}>Non-skippable</div>
                        <div style={{ fontSize: 7, color: "#64748b" }}>Sound ON</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: 30, height: 8, background: "#334155", margin: "0 auto", borderRadius: "0 0 4px 4px" }} />
                  <div style={{ width: 60, height: 3, background: "#1e2d45", margin: "0 auto", borderRadius: "0 0 2px 2px" }} />
                  <div style={{ fontSize: 9, color: "#64748b", marginTop: 6 }}>Shahid · OSN+ · YouTube CTV</div>
                </Card>

                {/* DOOH */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#ffcb7e", marginBottom: 8 }}>DOOH — Billboard</div>
                  <div style={{ position: "relative" }}>
                    <div style={{ width: "100%", background: "linear-gradient(135deg, #3a2a1a, #1a2744)", borderRadius: 3, border: "3px solid #504020", overflow: "hidden" }}>
                      <div style={{ paddingBottom: "50%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                          <div style={{ fontSize: 9, color: "#ffcb7e", fontWeight: 700 }}>Landscape / Portrait</div>
                          <div style={{ fontSize: 8, color: "#94a3b8" }}>Varies by screen</div>
                          <div style={{ fontSize: 7, color: "#64748b", marginTop: 2 }}>10–15s loops</div>
                          <div style={{ fontSize: 7, color: "#ff7e7e" }}>No audio</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: 6, height: 20, background: "#504020", margin: "0 auto" }} />
                  </div>
                  <div style={{ fontSize: 9, color: "#64748b", marginTop: 4 }}>Dubai Mall · SZR · Riyadh</div>
                </Card>

                {/* YouTube Masthead */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#ff7e7e", marginBottom: 8 }}>YouTube Masthead</div>
                  <div style={{ width: "100%", background: "#0b1120", borderRadius: 8, border: "2px solid #334155", overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", background: "#141c2e", borderBottom: "1px solid #1e2d45" }}>
                      <div style={{ fontSize: 8, color: "#ff7e7e" }}>▶</div>
                      <div style={{ flex: 1, height: 10, background: "#0b1120", borderRadius: 4 }} />
                    </div>
                    <div style={{ padding: "0 8px 8px" }}>
                      <div style={{ paddingBottom: "35%", background: "linear-gradient(90deg, #3a1a1a, #1a2744)", borderRadius: 4, position: "relative", marginTop: 8 }}>
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                          <div style={{ fontSize: 8, color: "#ff7e7e", fontWeight: 700 }}>MASTHEAD</div>
                          <div style={{ fontSize: 7, color: "#94a3b8" }}>Homepage Takeover</div>
                          <div style={{ fontSize: 6, color: "#ffcb7e" }}>$50K–$200K/day</div>
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, marginTop: 6 }}>
                        {[1,2,3].map(i => <div key={i} style={{ paddingBottom: "60%", background: "#141c2e", borderRadius: 3 }} />)}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 9, color: "#64748b", marginTop: 6 }}>YouTube · Book 6–8 weeks ahead</div>
                </Card>

                {/* LinkedIn Document Ad */}
                <Card style={{ padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#7eb8ff", marginBottom: 8 }}>Document Ad (Swipeable)</div>
                  <div style={{ width: 140, margin: "0 auto", background: "#0b1120", borderRadius: 8, border: "1px solid #1e2d45", padding: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#1e2d45" }} />
                      <div><div style={{ height: 3, background: "#1e2d45", borderRadius: 2, width: 50, marginBottom: 2 }} /><div style={{ height: 2, background: "#141c2e", borderRadius: 2, width: 35 }} /></div>
                    </div>
                    <div style={{ display: "flex", gap: 3, overflow: "hidden" }}>
                      {[1,2].map(i => (
                        <div key={i} style={{ minWidth: i === 1 ? "88%" : "12%", paddingBottom: i === 1 ? "110%" : "20%", background: i === 1 ? "#141c2e" : "#0d1425", borderRadius: 4, border: "1px solid #1e2d45", position: "relative", flexShrink: 0 }}>
                          {i === 1 && <div style={{ position: "absolute", inset: 6, display: "flex", flexDirection: "column", gap: 3 }}>
                            <div style={{ height: 3, background: "#1e2d45", borderRadius: 2, width: "80%" }} />
                            <div style={{ height: 2, background: "#1e2d45", borderRadius: 2, width: "60%" }} />
                            <div style={{ height: 2, background: "#1e2d45", borderRadius: 2, width: "90%" }} />
                            <div style={{ height: 2, background: "#1e2d45", borderRadius: 2, width: "70%" }} />
                            <div style={{ flex: 1, background: "linear-gradient(135deg, #1a2744, #141c2e)", borderRadius: 3, marginTop: 3 }} />
                          </div>}
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 7, color: "#7eb8ff", textAlign: "center", marginTop: 4 }}>← Swipe through pages →</div>
                  </div>
                  <div style={{ fontSize: 9, color: "#64748b", marginTop: 6 }}>LinkedIn · PDF/PPT · B2B</div>
                </Card>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #1e2d45" }}>
                      {["Platform", "Placement", "Device", "Format", "Ratio", "Dimensions", "Duration", "File", "Notes"].map(h => (
                        <th key={h} style={{ padding: "8px 6px", textAlign: "left", color: "#64748b", fontWeight: 700, fontSize: 9, textTransform: "uppercase", letterSpacing: ".04em", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {creativeSpecs
                      .filter(s => creativePlatform === "All" || s.platform === creativePlatform)
                      .filter(s => !filterText || JSON.stringify(s).toLowerCase().includes(filterText))
                      .map((s, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #141c2e", background: i % 2 === 0 ? "#0d1425" : "transparent" }}>
                        <td style={{ padding: "7px 6px", fontWeight: 700, color: "#e2e8f0", whiteSpace: "nowrap" }}>{s.platform}</td>
                        <td style={{ padding: "7px 6px", color: "#cbd5e1", fontSize: 11 }}>{s.placement}</td>
                        <td style={{ padding: "7px 6px", color: "#64748b", fontSize: 10 }}>{s.device}</td>
                        <td style={{ padding: "7px 6px" }}><Chip color={s.format.includes("Video") ? "purple" : s.format.includes("Image") ? "blue" : s.format.includes("Audio") ? "teal" : "amber"}>{s.format}</Chip></td>
                        <td style={{ padding: "7px 6px", color: "#7effb8", fontWeight: 700, fontFamily: "monospace", fontSize: 11 }}>{s.ratio}</td>
                        <td style={{ padding: "7px 6px", color: "#ffcb7e", fontFamily: "monospace", fontSize: 10, whiteSpace: "nowrap" }}>{s.dimensions}</td>
                        <td style={{ padding: "7px 6px", color: "#94a3b8", fontSize: 10 }}>{s.duration}</td>
                        <td style={{ padding: "7px 6px", color: "#64748b", fontSize: 10 }}>{s.fileType}</td>
                        <td style={{ padding: "7px 6px", color: "#64748b", fontSize: 10, maxWidth: 200 }}>{s.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#7eb8ff", marginTop: 28, marginBottom: 12 }}>📐 Detailed Specs by Platform</h3>
              {[...new Set(creativeSpecs.filter(s => creativePlatform === "All" || s.platform === creativePlatform).map(s => s.platform))].map(platform => (
                <div key={platform} style={{ marginBottom: 24 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0", marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #1e2d45" }}>{platform}</h4>
                  {creativeSpecs.filter(s => s.platform === platform).filter(s => !filterText || JSON.stringify(s).toLowerCase().includes(filterText)).map((s, i) => (
                    <Accordion key={i} title={s.placement} subtitle={`${s.format} · ${s.device}`} badge={<Chip color={s.format.includes("Video") ? "purple" : s.format.includes("Image") ? "blue" : "amber"}>{s.ratio}</Chip>}>
                      <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
                        <InfoRow label="Dimensions" value={<span style={{ color: "#ffcb7e", fontWeight: 600, fontFamily: "monospace" }}>{s.dimensions}</span>} />
                        <InfoRow label="Aspect Ratio" value={<span style={{ color: "#7effb8", fontWeight: 600 }}>{s.ratio}</span>} />
                        {s.alt && <InfoRow label="Alternative" value={s.alt} />}
                        <InfoRow label="Format" value={s.format} />
                        <InfoRow label="File Type" value={s.fileType} />
                        <InfoRow label="File Size" value={s.fileSize} />
                        <InfoRow label="Duration" value={s.duration} />
                        <InfoRow label="Device" value={s.device} />
                        <div style={{ marginTop: 10, padding: 10, background: "#0f1726", borderRadius: 8, fontSize: 12 }}>
                          <strong style={{ color: "#ffcb7e" }}>📝 Notes:</strong> {s.notes}
                        </div>
                      </div>
                    </Accordion>
                  ))}
                </div>
              ))}

              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#ff7e7e", marginTop: 28, marginBottom: 12 }}>⚠️ Creative Checklist Reminders</h3>
              <Card style={{ background: "#1a1520", border: "1px solid #2a1a30" }}>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.8 }}>
                  • <strong style={{ color: "#e2e8f0" }}>9:16 vertical is the 2026 default</strong> — Meta confirmed 90% of inventory will be vertical. Produce 9:16 first, adapt from there.<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Safe zones</strong> — Stories/Reels: keep text 250px from top, 340px from bottom (UI overlays cover these areas).<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Hook in first 2 seconds</strong> — TikTok, Reels, and Snap users decide instantly whether to watch or swipe.<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Captions always</strong> — 80%+ of feed video is watched muted. Captions boost watch time by 12%.<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Arabic versions</strong> — Mandatory for KSA and Kuwait campaigns. Use DCO for AR+EN versioning on programmatic.<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Minimum 3 creative variants</strong> — Algorithms need variety. Andromeda (Meta) uses creative as targeting signal.<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Platform-native &gt; polished</strong> — UGC-style creative outperforms TV-style on TikTok and Reels.<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Programmatic display: 5 core sizes</strong> — 300×250, 728×90, 160×600, 320×50, 300×600 covers 90%+ of inventory.<br/>
                  • <strong style={{ color: "#e2e8f0" }}>CTV is always 16:9</strong> — No vertical on TV screens. 15s and 30s are standard durations.<br/>
                  • <strong style={{ color: "#e2e8f0" }}>Test before launch</strong> — Preview in-platform before going live. What looks good in Canva may crop badly in-feed.
                </div>
              </Card>
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
