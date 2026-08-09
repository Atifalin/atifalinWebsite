import { useState, useEffect, useRef } from 'react';
import './App.css';
import {
  FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaBars, FaTimes,
  FaMapMarkerAlt, FaPhoneAlt, FaArrowRight, FaArrowUp,
} from 'react-icons/fa';
import { motion, useScroll, useSpring } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  CONTENT                                                            */
/* ------------------------------------------------------------------ */

const NAV = [
  { id: 'story', label: 'Story' },
  { id: 'work', label: 'Work' },
  { id: 'numbers', label: 'Numbers' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'path', label: 'Path' },
  { id: 'contact', label: 'Contact' },
];

const CHAPTERS = [
  {
    no: '01',
    year: '2020',
    title: 'Bangalore to British Columbia',
    body: `I finished a business degree in Bangalore and went to Canada for an MBA at Thompson Rivers
    University. I expected to end up in marketing. Instead I spent my final year on live consulting
    projects — building revenue models and presenting them to boards of directors — and discovered
    I liked operational problems far more than campaigns.`,
  },
  {
    no: '02',
    year: '2022',
    title: 'The mill floor',
    body: `I joined Kruger Inc. in Kamloops as a Customer Service & Planning Representative — processing
    orders, arranging shipments, sitting between customers and a pulp mill. It was the fastest possible
    education in how a plan meets reality. Six months later I was promoted to Production Planner.`,
  },
  {
    no: '03',
    year: '2023',
    title: 'Owning the plan',
    body: `Suddenly I owned the monthly S&OP cycle for the mill: 398,000 tons of annual inventory,
    over USD 318 million, across mill-managed and distributor-managed stock. My job was to take what
    sales promised, weigh it against what a continuous-process mill can physically do, and turn the
    two into one plan the executive team could commit to.`,
    aside: `You cannot speed up a pulp mill. That constraint teaches you more about planning than any
    framework does.`,
  },
  {
    no: '04',
    year: '2025',
    title: 'Building the thing I needed',
    body: `The reporting around the plan was slow, so I stopped waiting for it. With a small project
    team I built a mill-wide Power BI platform — executive views, budget gap analysis, production
    reporting, inventory down to sub-grade level. Then I added the part I actually wanted: a page where
    the sales team could test a prospective order against the live plan and see whether it fit, and when
    it would be ready.`,
    aside: `That is order promising — the feature enterprise planning suites are sold on. I built a
    working version in Power BI because we needed it.`,
  },
  {
    no: '05',
    year: '2023–24',
    title: 'When the ports closed',
    body: `Then the Vancouver port went on strike. Then the railways. For a mill that exports by sea,
    the plan stopped being a spreadsheet problem and became a logistics one. We re-routed through US
    ports, rebuilt transit assumptions, and replanned production and delivery commitments around them —
    on daily calls with carriers and freight forwarders.`,
  },
  {
    no: '06',
    year: '2026',
    title: 'Back to Bengaluru',
    body: `I chose to move back to India. Kruger retained me as an external consultant afterwards to
    hand over the planning function and build reporting tools for my successor, so the cadence continued
    without me. Since then I have been consulting independently — and looking for the right full-time
    planning role to bring all of this to.`,
  },
];

const CASES = [
  {
    tag: 'Planning systems',
    title: 'An order-promising tool, built in Power BI',
    problem: `Sales needed to know whether a prospective customer order could be absorbed by the
    current production plan, and when it would be available. The answer lived in my head and in
    spreadsheets, so it took hours and did not scale.`,
    action: `I built a simulation page inside the mill's Power BI platform. Sales could enter
    prospective requirements on top of the live plan and immediately see whether the volume fit and
    what the availability date looked like.`,
    result: `Available-to-promise / capable-to-promise logic — the capability advanced planning suites
    are sold on — delivered without one. Sales self-served instead of queueing for planning.`,
    stack: ['Power BI', 'DAX', 'Data modelling', 'Capacity logic'],
  },
  {
    tag: 'Disruption',
    title: 'Holding export delivery through two strikes',
    problem: `The Vancouver port strike and a Canadian rail strike disrupted the export route a
    seaborne pulp business depends on. Transit assumptions underpinning every delivery commitment
    stopped being true.`,
    action: `We re-routed shipments through US ports, rebuilt lead-time assumptions around the new
    routing, and replanned production sequencing and delivery commitments — coordinating daily with
    carriers and freight forwarders.`,
    result: `Export delivery continued through both disruptions. It also permanently changed how I
    think about a plan: a schedule that cannot survive its own logistics assumptions is not a plan.`,
    stack: ['Multi-modal logistics', 'Contingency planning', 'Carrier coordination'],
  },
  {
    tag: 'Forecasting',
    title: 'Treating forecast error as a discipline',
    problem: `Forecast accuracy was reported as a single number, which tells you almost nothing about
    what to do differently.`,
    action: `I tracked MAPE by horizon — roughly 3% at 15 days, 7% at one month, 11% at two months,
    21% at three — and used Python and pandas to decompose the error, separating systematic bias from
    variance by product and period.`,
    result: `The error profile became an input rather than a report: it set safety stock levels and
    framed how much confidence each horizon deserved in the S&OP conversation.`,
    stack: ['Python', 'pandas', 'MAPE / bias analysis', 'Safety stock'],
  },
];

const NUMBERS = [
  { value: '398k', unit: 'tons', label: 'Annual inventory owned', sub: 'USD 318M+, MMI and DMI' },
  { value: '~7%', unit: 'MAPE', label: 'Forecast error at one month', sub: '~3% at 15 days' },
  { value: '12%', unit: 'lower', label: 'Inventory holding costs', sub: 'Forecasting + automation' },
  { value: '40%', unit: 'faster', label: 'Management decision cycles', sub: 'Self-built BI platform' },
  { value: '6', unit: 'months', label: 'From CSR to Production Planner', sub: 'Promoted at Kruger' },
  { value: '3–5', unit: 'teams', label: 'Departments on the platform', sub: 'Planning, sales, production, warehouse' },
];

const TOOLKIT = [
  {
    group: 'Planning',
    items: ['S&OP / IBP', 'Demand forecasting', 'Forecast accuracy & bias', 'Capacity requirements planning',
      'Production scheduling', 'Inventory optimisation (MMI/DMI)', 'MRP', 'Scenario / what-if analysis',
      'Exception management'],
  },
  {
    group: 'Data & BI',
    items: ['Power BI (modelling, DAX)', 'Advanced Excel (certified)', 'SQL / PostgreSQL',
      'Python (pandas — forecast error analysis)', 'KPI design', 'Executive reporting'],
  },
  {
    group: 'Systems',
    items: ['SAP ERP — PP module', 'Master data (BOMs, routings, work centres)', 'MRP runs',
      'Capacity planning', 'Reporting automation'],
  },
  {
    group: 'Engineering',
    items: ['TypeScript', 'React / React Native', 'REST APIs', 'Supabase / PostgreSQL', 'Docker',
      'GitHub Actions (CI/CD)', 'LLM API integration'],
  },
];

const LEARNING = ['German (A1 → B1)', 'Advanced planning systems', 'SAP IBP'];

const PATH = [
  {
    date: 'Feb 2026 — present',
    role: 'Founder & Analytics Consultant',
    org: 'Ezypath · Bengaluru, India',
    points: [
      'Reporting automation, data pipelines and AI-assisted internal tools for small and mid-sized businesses.',
      'Retained by Kruger Inc. — a former employer — to lead knowledge transfer of the planning function and build reporting-automation tools for my successor.',
    ],
  },
  {
    date: 'Apr 2023 — Jan 2026',
    role: 'Production Planner',
    org: 'Kruger Inc. · Kamloops, BC, Canada',
    points: [
      'Owned the monthly S&OP cycle for the pulp mill, aligning demand, supply, production and financial plans.',
      'Managed 398,000+ tons of annual inventory (USD 318M+); exceeded sales targets by 10,000+ tons while holding inventory goals.',
      'Led the build of the mill-wide Power BI platform, including the order-promising simulator.',
      'Maintained SAP master data and capacity requirements plans; ran MRP and built production schedules.',
      'Sustained export delivery through the Vancouver port and Canadian rail strikes.',
    ],
  },
  {
    date: 'Oct 2022 — Mar 2023',
    role: 'Customer Service & Planning Representative',
    org: 'Kruger Inc. · Kamloops, BC, Canada',
    points: [
      'Order processing, shipping schedules and demand balancing between customers and the mill.',
      'Promoted to Production Planner within six months.',
    ],
  },
  {
    date: 'Mar 2022 — Aug 2022',
    role: 'Strategic Consultant (MBA live projects)',
    org: 'Kamloops Film Society & House of Carmond · Canada',
    points: [
      'Market research, gap analysis and revenue models presented to boards of directors.',
    ],
  },
  {
    date: 'Dec 2018 — Mar 2019',
    role: 'Intern — Planning & Logistics',
    org: 'Jindal Steelworks · India',
    points: [
      'Production planning, inventory management and logistics analysis at a high-volume steel plant.',
    ],
  },
];

const EDUCATION = [
  {
    degree: 'Master of Business Administration',
    school: 'Thompson Rivers University, Kamloops, Canada',
    detail: 'GPA 3.74 / 4.33',
    year: '2020 — 2022',
  },
  {
    degree: 'Bachelor of Business Administration',
    school: 'AIMS Institute, Bangalore University, India',
    detail: '',
    year: '2016 — 2019',
  },
];

const CERTS = ['Six Sigma White Belt', 'Advanced Microsoft Excel (Certified)', 'Google Analytics IQ'];

const LANGUAGES = [
  { name: 'English', level: 'Full professional — working language for 3.5 years in Canada' },
  { name: 'Hindi / Urdu', level: 'Native' },
  { name: 'Kannada', level: 'Conversational' },
  { name: 'German', level: 'A1, working towards B1' },
];

const PROJECTS = [
  {
    name: 'HomeHeros',
    kind: 'Client project',
    body: 'A Canadian home-services marketplace, built and deployed end to end.',
    stack: ['React Native (Expo)', 'Supabase', 'Stripe', 'Docker', 'GitHub Actions'],
  },
  {
    name: 'GhantaPL',
    kind: 'Personal',
    body: 'Real-time fantasy football auction platform with AI-assisted team analysis.',
    stack: ['React Native', 'Supabase', 'Claude API'],
  },
  {
    name: 'SpendWise',
    kind: 'Personal',
    body: 'Credit-card expense tracker with spending analytics and interactive visualisations.',
    stack: ['React Native', 'TypeScript', 'Supabase'],
  },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ eyebrow, title, lede }) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const [active, setActive] = useState('top');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = ['top', ...NAV.map((n) => n.id)];
      let current = 'top';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const go = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      const res = await fetch('https://formspree.io/f/xpwreqll', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) { setSent(true); form.reset(); }
    } catch { /* fall through — user can email directly */ }
  };

  return (
    <div className="app">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      {/* ---------------- NAV ---------------- */}
      <header className={`nav ${scrolled ? 'nav-solid' : ''}`}>
        <div className="wrap nav-inner">
          <a href="#top" className="brand" onClick={(e) => go(e, 'top')}>
            atifalin<span>.in</span>
          </a>

          <nav className="nav-links">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={active === n.id ? 'is-active' : ''}
                onClick={(e) => go(e, n.id)}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <a className="btn btn-sm btn-ghost nav-cta" href="/files/Resume_Mohammed_Atif_Ali_Neranki.pdf" download>
            <FaDownload /> Résumé
          </a>

          <button className="burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={(e) => go(e, n.id)}>{n.label}</a>
            ))}
            <a href="/files/Resume_Mohammed_Atif_Ali_Neranki.pdf" download>Download résumé</a>
          </motion.div>
        )}
      </header>

      {/* ---------------- HERO ---------------- */}
      <section id="top" className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="wrap hero-inner">
          <motion.div className="hero-copy" initial="hidden" animate="show" variants={fadeUp}>
            <span className="status">
              <i className="dot" /> Bengaluru, India · open to supply chain planning roles
            </span>

            <h1>
              I plan supply chains —<br />
              and build the systems<br />
              <em>that plan them.</em>
            </h1>

            <p className="hero-sub">
              Supply chain planner with 3+ years owning demand planning, S&amp;OP and production
              scheduling for a Canadian pulp mill — 398,000 tons and USD 318M of inventory. Canadian MBA.
              Most planners stop at Excel; I built the Power BI platform, the order-promising simulator
              and the forecast-error tooling myself.
            </p>

            <div className="hero-cta">
              <a className="btn btn-primary" href="#work" onClick={(e) => go(e, 'work')}>
                See the work <FaArrowRight />
              </a>
              <a className="btn btn-ghost" href="#contact" onClick={(e) => go(e, 'contact')}>
                Get in touch
              </a>
            </div>

            <div className="hero-social">
              <a href="https://www.linkedin.com/in/atifalin" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://github.com/Atifalin" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href="mailto:atifalin09@gmail.com" aria-label="Email"><FaEnvelope /></a>
            </div>
          </motion.div>

          <motion.div
            className="hero-portrait"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="portrait-frame">
              <img src="/Mo.png" alt="Mohammed Atif Ali Neranki" />
            </div>
            <div className="portrait-card">
              <strong>Mohammed Atif Ali Neranki</strong>
              <span>MBA · Supply Chain &amp; Planning Analytics</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- STORY ---------------- */}
      <section id="story" className="section section-paper">
        <div className="wrap">
          <SectionHead
            eyebrow="The story"
            title="How I got here"
            lede="Six chapters, from a business degree in Bangalore to owning the plan for a pulp mill in British Columbia — and back."
          />

          <div className="chapters">
            {CHAPTERS.map((c, i) => (
              <Reveal key={c.no} delay={i * 0.04}>
                <article className="chapter">
                  <div className="chapter-meta">
                    <span className="chapter-no">{c.no}</span>
                    <span className="chapter-year">{c.year}</span>
                  </div>
                  <div className="chapter-body">
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                    {c.aside && <blockquote>{c.aside}</blockquote>}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- WORK ---------------- */}
      <section id="work" className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Signature work"
            title="Three things worth showing"
            lede="Problem, what I did, what came of it. No jargon padding."
          />

          <div className="cases">
            {CASES.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <article className="case">
                  <span className="case-tag">{c.tag}</span>
                  <h3>{c.title}</h3>
                  <dl>
                    <dt>Problem</dt><dd>{c.problem}</dd>
                    <dt>What I did</dt><dd>{c.action}</dd>
                    <dt>Result</dt><dd>{c.result}</dd>
                  </dl>
                  <ul className="chips">
                    {c.stack.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- NUMBERS ---------------- */}
      <section id="numbers" className="section section-ink">
        <div className="wrap">
          <SectionHead eyebrow="By the numbers" title="What it added up to" />
          <div className="numbers">
            {NUMBERS.map((n, i) => (
              <Reveal key={n.label} delay={i * 0.05}>
                <div className="stat">
                  <div className="stat-value">
                    {n.value} <span>{n.unit}</span>
                  </div>
                  <div className="stat-label">{n.label}</div>
                  <div className="stat-sub">{n.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TOOLKIT ---------------- */}
      <section id="toolkit" className="section section-paper">
        <div className="wrap">
          <SectionHead
            eyebrow="Toolkit"
            title="What I actually use"
            lede="Listed honestly — including what I am still building."
          />

          <div className="toolkit">
            {TOOLKIT.map((t, i) => (
              <Reveal key={t.group} delay={i * 0.05}>
                <div className="tool-group">
                  <h3>{t.group}</h3>
                  <ul className="chips">
                    {t.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="learning">
            <h4>Currently learning</h4>
            <ul className="chips chips-muted">
              {LEARNING.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------------- PATH ---------------- */}
      <section id="path" className="section">
        <div className="wrap">
          <SectionHead eyebrow="Path" title="Experience & education" />

          <div className="timeline">
            {PATH.map((p, i) => (
              <Reveal key={p.role + p.date} delay={i * 0.04}>
                <article className="tl-item">
                  <div className="tl-date">{p.date}</div>
                  <div className="tl-body">
                    <h3>{p.role}</h3>
                    <div className="tl-org">{p.org}</div>
                    <ul>
                      {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="edu-grid">
            <Reveal>
              <div className="panel">
                <h4>Education</h4>
                {EDUCATION.map((e) => (
                  <div className="edu-row" key={e.degree}>
                    <div>
                      <strong>{e.degree}</strong>
                      <span>{e.school}</span>
                      {e.detail && <em>{e.detail}</em>}
                    </div>
                    <span className="edu-year">{e.year}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="panel">
                <h4>Certifications</h4>
                <ul className="chips">{CERTS.map((c) => <li key={c}>{c}</li>)}</ul>
                <h4 className="mt">Languages</h4>
                {LANGUAGES.map((l) => (
                  <div className="lang-row" key={l.name}>
                    <strong>{l.name}</strong>
                    <span>{l.level}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="projects">
            <h4>Built on the side</h4>
            <p className="projects-note">
              Shipped products, not tutorials — this is where the engineering half of the toolkit comes from.
            </p>
            <div className="project-grid">
              {PROJECTS.map((p) => (
                <div className="project" key={p.name}>
                  <div className="project-top">
                    <strong>{p.name}</strong>
                    <span>{p.kind}</span>
                  </div>
                  <p>{p.body}</p>
                  <ul className="chips chips-muted">
                    {p.stack.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CONTACT ---------------- */}
      <section id="contact" className="section section-ink">
        <div className="wrap contact-grid">
          <div>
            <SectionHead
              eyebrow="Contact"
              title="Let's talk"
              lede="I'm in Bengaluru and available immediately for full-time supply chain planning and planning-analytics roles. Open to relocation for the right opportunity."
            />
            <ul className="contact-list">
              <li><FaMapMarkerAlt /> Bengaluru, Karnataka, India</li>
              <li><FaPhoneAlt /> <a href="tel:+919535760145">+91 95357 60145</a></li>
              <li><FaEnvelope /> <a href="mailto:atifalin09@gmail.com">atifalin09@gmail.com</a></li>
              <li><FaLinkedin /> <a href="https://www.linkedin.com/in/atifalin" target="_blank" rel="noreferrer">linkedin.com/in/atifalin</a></li>
              <li><FaGithub /> <a href="https://github.com/Atifalin" target="_blank" rel="noreferrer">github.com/Atifalin</a></li>
            </ul>
          </div>

          <Reveal delay={0.08}>
            {sent ? (
              <div className="form-sent">
                <h3>Thanks — message sent.</h3>
                <p>I'll get back to you shortly. If it's urgent, email me directly at atifalin09@gmail.com.</p>
              </div>
            ) : (
              <form className="form" ref={formRef} onSubmit={onSubmit}>
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" required />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required />
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" required />
                </div>
                <button className="btn btn-primary" type="submit">
                  Send message <FaArrowRight />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <span>© {new Date().getFullYear()} Mohammed Atif Ali Neranki</span>
          <a href="#top" onClick={(e) => go(e, 'top')} className="to-top">
            Back to top <FaArrowUp />
          </a>
        </div>
      </footer>
    </div>
  );
}
