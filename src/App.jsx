import { useState, useEffect, useRef } from "react";

const PINK = "#BE1E6E";

const s = {
  page: { fontFamily: "system-ui, sans-serif", color: "#111", background: "#fff" },
  btnPrimary: { padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", background: PINK, color: "white", fontWeight: 500, fontSize: 13 },
  btnGhost: { padding: "8px 16px", borderRadius: 8, border: "0.5px solid #ccc", cursor: "pointer", background: "transparent", color: "#111", fontSize: 13 },
  btnHero: { padding: "12px 24px", borderRadius: 8, border: "none", cursor: "pointer", background: PINK, color: "white", fontWeight: 500, fontSize: 14 },
  btnWhite: { padding: "11px 22px", borderRadius: 8, border: "none", cursor: "pointer", background: "white", color: PINK, fontWeight: 500, fontSize: 14 },
  logoMark: { width: 32, height: 32, background: PINK, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 500, fontSize: 14 },
  tag: { fontSize: 11, fontWeight: 500, color: PINK, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 },
};

function useCountUp(target, duration, go) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!go) return;
    let t0 = null;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [go, target, duration]);
  return val;
}

function StatBox({ num, suffix, label, noBorder }) {
  const ref = useRef();
  const [go, setGo] = useState(false);
  const v = useCountUp(num, 1400, go);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.4 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ padding: "24px 28px", borderRight: noBorder ? "none" : "0.5px solid #e0e0e0" }}>
      <div style={{ fontSize: 28, fontWeight: 500, color: PINK, marginBottom: 4 }}>{v}{suffix}</div>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
    </div>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 32px", borderBottom: "0.5px solid #e0e0e0", background: "white", position: "sticky", top: 0, zIndex: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={s.logoMark}>1</div>
        <span style={{ fontWeight: 500, fontSize: 16 }}>1app</span>
      </div>
      <div style={{ display: "flex", gap: 24, fontSize: 14, color: "#555" }}>
        {["Features", "Developer", "Company", "Contact"].map(l => (
          <span key={l} style={{ cursor: "pointer" }}>{l}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button style={s.btnGhost}>Login</button>
        <button style={s.btnPrimary}>Get started</button>
      </div>
    </nav>
  );
}

function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submit = () => { if (email.trim()) setSubmitted(true); };

  const txns = [
    { icon: "↓", iColor: "#0F6E56", name: "USD received", date: "Today · 9:41 AM", amt: "+$1,000", aColor: "#0F6E56" },
    { icon: "💳", iColor: PINK, name: "Netflix subscription", date: "Yesterday", amt: "-$15.99", aColor: "#993556" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, padding: "64px 32px 52px", maxWidth: 960, margin: "0 auto", alignItems: "center" }}>
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FBEAF0", color: "#993556", fontSize: 12, padding: "5px 12px", borderRadius: 20, marginBottom: 20, fontWeight: 500 }}>
          <span style={{ width: 6, height: 6, background: PINK, borderRadius: "50%", display: "inline-block" }}></span>
          Trusted by 2,025+ users across Africa
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 500, lineHeight: 1.15, marginBottom: 16 }}>
          Global payments,<br />built for <span style={{ color: PINK }}>Nigerians</span>
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: "#555", marginBottom: 28, maxWidth: 400 }}>
          USD/EUR/NGN bank accounts, instant virtual cards, cross-border transfers, and stablecoins — all in one app.
        </p>
        {!submitted ? (
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <input type="email" placeholder="Enter email or phone number" value={email}
              onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()}
              style={{ flex: 1, padding: "11px 14px", borderRadius: 8, border: "0.5px solid #ccc", background: "#f5f5f5", fontSize: 14 }} />
            <button style={s.btnHero} onClick={submit}>Get started</button>
          </div>
        ) : (
          <div style={{ padding: "12px 18px", borderRadius: 8, background: "#E1F5EE", color: "#0F6E56", fontSize: 14, marginBottom: 14, fontWeight: 500 }}>
            ✓ Check your email — we sent you a link!
          </div>
        )}
        <p style={{ fontSize: 12, color: "#999" }}>No opening fees · No maintenance charges · PCI-DSS certified</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ background: "#f5f5f5", border: "0.5px solid #e0e0e0", borderRadius: 12, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: "#666" }}>Good afternoon, Oluwatoyin 👋</span>
            <span style={{ background: PINK, color: "white", fontSize: 10, padding: "2px 7px", borderRadius: 10 }}>NGN</span>
          </div>
          <div style={{ background: PINK, borderRadius: 10, padding: 14, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>Wallet balance</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 20, fontWeight: 500, color: "white" }}>NGN 200,000.00</span>
              <button style={{ fontSize: 11, background: "rgba(255,255,255,0.2)", color: "white", padding: "4px 10px", borderRadius: 6, border: "none", cursor: "pointer" }}>+ Add money</button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {[["⇄", "Transfer"], ["👥", "Recipients"], ["📄", "Pay bills"], ["🏦", "Accounts"]].map(([ico, lbl]) => (
              <div key={lbl} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ width: 34, height: 34, background: "white", border: "0.5px solid #e0e0e0", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px", fontSize: 14 }}>{ico}</div>
                <div style={{ fontSize: 10, color: "#666" }}>{lbl}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#666", display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span>Recent transactions</span><span style={{ color: PINK, cursor: "pointer" }}>View all</span>
          </div>
          {txns.map(tx => (
            <div key={tx.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "0.5px solid #e0e0e0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 26, height: 26, background: "white", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{tx.icon}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{tx.name}</div>
                  <div style={{ fontSize: 10, color: "#999" }}>{tx.date}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, color: tx.aColor }}>{tx.amt}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[{ label: "USD balance", val: "$2,450.00" }, { label: "Rate today", val: "₦1,612/$" }].map(c => (
            <div key={c.label} style={{ flex: 1, background: "#f5f5f5", border: "0.5px solid #e0e0e0", borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 10, color: "#999", marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{c.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrustBar() {
  return (
    <div style={{ borderTop: "0.5px solid #e0e0e0", borderBottom: "0.5px solid #e0e0e0", padding: "16px 32px", display: "flex", alignItems: "center", gap: 24 }}>
      <span style={{ fontSize: 11, color: "#999", whiteSpace: "nowrap", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Backed by</span>
      <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
        {["🪟 Microsoft", "⬡ Tekedia", "📊 Nairalytics", "📰 Tribune", "🖨 Printivo"].map(p => (
          <span key={p} style={{ fontSize: 13, fontWeight: 500, color: "#666" }}>{p}</span>
        ))}
      </div>
    </div>
  );
}

function Stats() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "0.5px solid #e0e0e0" }}>
      <StatBox num={20} suffix="+" label="Countries supported" />
      <StatBox num={2025} suffix="+" label="Active users" />
      <div style={{ padding: "24px 28px", borderRight: "0.5px solid #e0e0e0" }}>
        <div style={{ fontSize: 28, fontWeight: 500, color: PINK, marginBottom: 4 }}>$0</div>
        <div style={{ fontSize: 12, color: "#666" }}>Account opening fee</div>
      </div>
      <div style={{ padding: "24px 28px" }}>
        <div style={{ fontSize: 18, fontWeight: 500, color: PINK, marginBottom: 4 }}>PCI-DSS</div>
        <div style={{ fontSize: 12, color: "#666" }}>Security certified</div>
      </div>
    </div>
  );
}

function Features() {
  const [hovered, setHovered] = useState(null);
  const feats = [
    { icon: "💳", title: "Virtual dollar card", desc: "Pay for Netflix, Spotify, tuition, or anything online with a USD or NGN virtual card." },
    { icon: "🏦", title: "Multi-currency accounts", desc: "Receive USD, EUR, and NGN payments through dedicated bank accounts on your 1app profile." },
    { icon: "⇄", title: "Instant transfers", desc: "Send and receive money locally or across 20+ countries at the speed of light." },
    { icon: "🪙", title: "Stablecoin support", desc: "Receive, send, and swap USDC to NGN and other fiat currencies at the best rates." },
    { icon: "🔒", title: "Fund lock & savings", desc: "Set money aside for goals — trips, school fees, or a car. Lock funds, stay disciplined." },
    { icon: "⚡", title: "Developer APIs", desc: "Build, embed, and launch banking and payment products with 1app's clean REST APIs." },
  ];
  return (
    <div style={{ padding: "56px 32px", maxWidth: 960, margin: "0 auto" }}>
      <div style={s.tag}>Everything you need</div>
      <h2 style={{ fontSize: 26, fontWeight: 500, marginBottom: 10 }}>Your financial toolkit, simplified</h2>
      <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, maxWidth: 480, marginBottom: 32 }}>From virtual cards to stablecoins, 1app gives you the tools Nigerian professionals actually need.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {feats.map((f, i) => (
          <div key={f.title}
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
            style={{ background: "#f7f7f7", border: `0.5px solid ${hovered === i ? PINK : "#e0e0e0"}`, borderRadius: 12, padding: 20, transition: "border-color 0.2s", cursor: "default" }}>
            <div style={{ width: 38, height: 38, background: "#FBEAF0", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, fontSize: 18 }}>{f.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{f.title}</div>
            <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { n: 1, title: "Create your account", desc: "Sign up in minutes with your email or phone. 100% digital — no paperwork, no branch visits, no fees." },
    { n: 2, title: "Fund your wallet", desc: "Top up in NGN, USD, or EUR. Receive money from clients, family, or employer across the globe." },
    { n: 3, title: "Pay, send & save", desc: "Use your virtual card, transfer funds, pay bills, or lock savings — all from one clean dashboard." },
  ];
  return (
    <div style={{ background: "#f5f5f5", padding: "56px 32px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={s.tag}>How it works</div>
        <h2 style={{ fontSize: 26, fontWeight: 500, marginBottom: 32 }}>Up and running in minutes</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {steps.map(st => (
            <div key={st.n} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ width: 28, height: 28, background: PINK, color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 500 }}>{st.n}</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{st.title}</div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{st.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Countries() {
  const list = ["🇳🇬 Nigeria", "🇬🇭 Ghana", "🇿🇦 South Africa", "🇿🇲 Zambia", "🇹🇿 Tanzania", "🇨🇮 Côte d'Ivoire", "🇹🇬 Togo", "🇰🇪 Kenya", "🇸🇳 Senegal"];
  return (
    <div style={{ padding: "56px 32px", maxWidth: 960, margin: "0 auto" }}>
      <div style={s.tag}>Coverage</div>
      <h2 style={{ fontSize: 26, fontWeight: 500, marginBottom: 10 }}>Send money to 20+ countries</h2>
      <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 22 }}>1app connects you to people and places that matter across Africa and beyond.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {list.map(c => (
          <div key={c} style={{ display: "flex", alignItems: "center", gap: 8, background: "#f5f5f5", border: "0.5px solid #e0e0e0", borderRadius: 20, padding: "7px 14px", fontSize: 13, color: "#555" }}>{c}</div>
        ))}
        <div style={{ display: "flex", alignItems: "center", background: "#f5f5f5", border: "0.5px solid #e0e0e0", borderRadius: 20, padding: "7px 14px", fontSize: 13, color: "#999" }}>+ 12 more</div>
      </div>
    </div>
  );
}

function VirtualCard() {
  return (
    <div style={{ background: PINK, padding: "56px 32px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 500, color: "white", marginBottom: 12 }}>A virtual card that pays for anything, anywhere online</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 24 }}>Get a USD or NGN virtual card on 1app. Pay for Netflix, Mixlr, tuition, or flight tickets — globally, from your room.</p>
          <button style={s.btnWhite}>Get my virtual card</button>
        </div>
        <div style={{ background: "white", borderRadius: 16, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
            <div style={{ width: 28, height: 28, background: PINK, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 500 }}>1</div>
            <div style={{ fontSize: 11, color: "#888", fontWeight: 500 }}>Virtual · USD</div>
          </div>
          <div style={{ width: 32, height: 24, background: "#E8C84A", borderRadius: 4, marginBottom: 16 }}></div>
          <div style={{ fontSize: 13, color: "#444", letterSpacing: "0.1em", marginBottom: 16, fontFamily: "monospace" }}>4285 •••• •••• 7741</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#333" }}>OLUWATOYIN A.</div>
              <div style={{ fontSize: 9, color: "#999" }}>EXPIRES</div>
              <div style={{ fontSize: 12, color: "#333" }}>09/28</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, color: "#1A1F71", fontStyle: "italic" }}>VISA</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const revs = [
    { i: "DA", name: "David Adeola", text: "The best fintech app I've used. Easy to navigate, secure, and transactions are seamless. Highly recommended." },
    { i: "BA", name: "Bashirat Adams", text: "Transactions are easy to process and whenever there's an issue, customer service responds on time. Great app." },
    { i: "CI", name: "Chiamaka Ike", text: "I've been using 1app for 6 months. Customer service is one of a kind — very quick responses. I fully recommend." },
  ];
  return (
    <div style={{ padding: "56px 32px", maxWidth: 960, margin: "0 auto" }}>
      <div style={s.tag}>Reviews</div>
      <h2 style={{ fontSize: 26, fontWeight: 500, marginBottom: 32 }}>What our users are saying</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {revs.map(r => (
          <div key={r.name} style={{ background: "#f7f7f7", border: "0.5px solid #e0e0e0", borderRadius: 12, padding: 20 }}>
            <div style={{ color: "#E8C84A", fontSize: 13, marginBottom: 10 }}>★★★★★</div>
            <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 14 }}>"{r.text}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#FBEAF0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, color: PINK }}>{r.i}</div>
              <div style={{ fontSize: 12, fontWeight: 500 }}>{r.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is 1app free to use?", a: "Yes! Creating an account is 100% free with no opening or maintenance fees. You only pay low transaction fees when you send money." },
    { q: "Which countries can I send money to?", a: "1app supports transfers to 20+ countries across Africa including Nigeria, Ghana, South Africa, Kenya, Tanzania, Zambia, and more." },
    { q: "How do I get a virtual card?", a: "After creating your account, go to Cards in the app and request a USD or NGN virtual card — it is issued instantly." },
    { q: "Is my money safe on 1app?", a: "Absolutely. 1app is PCI-DSS certified and uses Comodo SSL with end-to-end encryption. We are also NDPR audit compliant." },
  ];
  const [open, setOpen] = useState(null);
  return (
    <div style={{ background: "#f5f5f5", padding: "56px 32px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={s.tag}>FAQ</div>
        <h2 style={{ fontSize: 26, fontWeight: 500, marginBottom: 28 }}>Common questions</h2>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderBottom: "0.5px solid #ddd" }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", textAlign: "left", padding: "16px 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14, fontWeight: 500, color: "#111" }}>
              {f.q}
              <span style={{ fontSize: 20, color: "#666", flexShrink: 0, lineHeight: 1 }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7, paddingBottom: 16 }}>{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function CTA() {
  return (
    <div style={{ borderTop: "0.5px solid #e0e0e0", padding: "56px 32px", textAlign: "center" }}>
      <h2 style={{ fontSize: 28, fontWeight: 500, marginBottom: 10 }}>Ready to get started?</h2>
      <p style={{ fontSize: 14, color: "#666", marginBottom: 28 }}>It only takes a few minutes. No fees to open your account.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        {[["🤖", "Google Play"], ["🍎", "App Store"]].map(([ico, lbl]) => (
          <button key={lbl} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 20px", borderRadius: 8, border: "0.5px solid #ccc", fontSize: 13, cursor: "pointer", background: "white", color: "#111" }}>
            <span style={{ fontSize: 18 }}>{ico}</span>{lbl}
          </button>
        ))}
        <button style={s.btnPrimary}>Open web account</button>
      </div>
    </div>
  );
}

function Footer() {
  const cols = [
    { title: "Features", links: ["Virtual cards", "Bank accounts", "Stablecoins", "Bill payment", "Super APIs"] },
    { title: "Company", links: ["About us", "Careers", "Developer", "Pricing", "Status"] },
    { title: "Support", links: ["Contact us", "FAQs", "Privacy policy", "Terms & conditions", "Whistleblowing"] },
  ];
  return (
    <footer style={{ borderTop: "0.5px solid #e0e0e0", padding: "40px 32px 24px", maxWidth: 960, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32, marginBottom: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={s.logoMark}>1</div>
            <span style={{ fontWeight: 500 }}>1app</span>
          </div>
          <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, maxWidth: 240 }}>The cross-border payment platform for Africa — one system to help transactions flow seamlessly.</p>
          <p style={{ fontSize: 12, color: "#999", marginTop: 10 }}>📞 +234 913 888 5999<br />✉ hi@1app.online</p>
        </div>
        {cols.map(col => (
          <div key={col.title}>
            <h4 style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>{col.title}</h4>
            {col.links.map(l => <div key={l} style={{ fontSize: 13, color: "#666", marginBottom: 8, cursor: "pointer" }}>{l}</div>)}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 20, borderTop: "0.5px solid #e0e0e0", fontSize: 12, color: "#999" }}>
        <span>© 2026 1app Technologies, Inc.</span>
        <div style={{ display: "flex", gap: 8 }}>
          {["PCI-DSS compliant", "NDPR audit compliant", "Comodo SSL"].map(b => (
            <span key={b} style={{ fontSize: 10, fontWeight: 500, padding: "4px 10px", borderRadius: 20, background: "#f5f5f5", border: "0.5px solid #e0e0e0", color: "#666" }}>{b}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={s.page}>
      <Navbar />
      <Hero />
      <TrustBar />
      <Stats />
      <Features />
      <HowItWorks />
      <Countries />
      <VirtualCard />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
