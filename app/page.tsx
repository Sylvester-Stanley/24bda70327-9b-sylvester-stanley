import { Fragment } from 'react';
export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0f', color: '#f1f5f9', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glow { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:.8;transform:scale(1.08)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .fade1{animation:fadeUp .7s ease both}
        .fade2{animation:fadeUp .7s .15s ease both}
        .fade3{animation:fadeUp .7s .3s ease both}
        .fade4{animation:fadeUp .7s .45s ease both}
        .shimmer-text{background:linear-gradient(90deg,#6ee7b7,#818cf8,#6ee7b7);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite}
        .card{transition:border-color .25s,transform .25s}
        .card:hover{border-color:rgba(110,231,183,.25)!important;transform:translateY(-4px)}
        .btn-primary:hover{opacity:.88;transform:translateY(-2px)}
        .btn-ghost:hover{background:rgba(255,255,255,.04);transform:translateY(-2px)}
        .orb{position:absolute;border-radius:50%;filter:blur(80px);animation:glow 6s ease-in-out infinite;pointer-events:none}
      `}</style>

      {/* Navbar */}
      <nav className="fade1 flex justify-between items-center px-12 py-5" style={{ borderBottom:'1px solid rgba(255,255,255,.07)', backdropFilter:'blur(12px)', background:'rgba(10,10,15,.8)', position:'sticky', top:0, zIndex:10 }}>
        <span style={{ fontFamily:'Playfair Display,serif', fontSize:22, fontWeight:900 }}>
          Next<span style={{ color:'#6ee7b7' }}>.</span>Ship
        </span>
        <div className="flex items-center gap-8">
          {['Features','Pipeline','Docs'].map(l => (
            <a key={l} href="#" style={{ color:'#94a3b8', fontSize:14, fontWeight:500, textDecoration:'none' }}>{l}</a>
          ))}
          <button style={{ background:'#6ee7b7', color:'#0a0a0f', border:'none', padding:'9px 20px', borderRadius:8, fontSize:14, fontWeight:500, cursor:'pointer' }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32" style={{ position:'relative', overflow:'hidden', minHeight:'88vh' }}>
        <div className="orb" style={{ width:420, height:420, background:'rgba(110,231,183,.12)', top:-80, left:-80 }} />
        <div className="orb" style={{ width:360, height:360, background:'rgba(129,140,248,.1)', bottom:-60, right:-60, animationDelay:'-3s' }} />

        <div className="fade1 flex items-center gap-2 mb-7" style={{ border:'1px solid rgba(110,231,183,.3)', background:'rgba(110,231,183,.07)', color:'#6ee7b7', fontSize:12, fontWeight:500, padding:'6px 14px', borderRadius:100, letterSpacing:'0.5px' }}>
          <span style={{ width:6, height:6, background:'#6ee7b7', borderRadius:'50%', animation:'glow 2s infinite', display:'inline-block' }} />
          CI/CD Pipeline Active
        </div>

        <h1 className="fade2" style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(42px,7vw,80px)', fontWeight:900, lineHeight:1.05, letterSpacing:'-2px', maxWidth:780, marginBottom:24 }}>
          Ship faster with <span className="shimmer-text">zero friction</span>
        </h1>

        <p className="fade3" style={{ color:'#94a3b8', fontSize:17, fontWeight:300, lineHeight:1.7, maxWidth:520, marginBottom:40 }}>
          A production-ready Next.js app, containerized with Docker and deployed automatically via GitHub Actions. Built for speed, reliability, and scale.
        </p>

        <div className="fade4 flex gap-3 flex-wrap justify-center">
          <button className="btn-primary" style={{ background:'#6ee7b7', color:'#0a0a0f', border:'none', padding:'14px 28px', borderRadius:10, fontSize:15, fontWeight:500, cursor:'pointer', transition:'opacity .2s,transform .2s' }}>
            Get Started
          </button>
          <button className="btn-ghost" style={{ background:'transparent', color:'#f1f5f9', border:'1px solid rgba(255,255,255,.07)', padding:'14px 28px', borderRadius:10, fontSize:15, cursor:'pointer', transition:'background .2s,transform .2s' }}>
            View on GitHub
          </button>
        </div>
      </section>

      {/* Stats */}
      <div className="flex justify-center" style={{ borderTop:'1px solid rgba(255,255,255,.07)', borderBottom:'1px solid rgba(255,255,255,.07)', background:'#12121a' }}>
        {[['100%','Static export'],['<1s','Build time'],['3x','Docker stages'],['0','Manual steps']].map(([n,l]) => (
          <div key={l} className="text-center" style={{ flex:1, maxWidth:200, padding:'28px 16px', borderRight:'1px solid rgba(255,255,255,.07)' }}>
            <div style={{ fontFamily:'Playfair Display,serif', fontSize:32, fontWeight:700, color:'#6ee7b7', lineHeight:1, marginBottom:4 }}>{n}</div>
            <div style={{ fontSize:12, color:'#94a3b8', letterSpacing:'0.3px' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <section style={{ padding:'96px 48px', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ fontSize:11, fontWeight:500, letterSpacing:2, color:'#6ee7b7', textTransform:'uppercase', marginBottom:12 }}>Why it works</div>
        <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,4vw,42px)', fontWeight:700, letterSpacing:-1, marginBottom:56, maxWidth:480, lineHeight:1.15 }}>
          Everything you need, nothing you don't
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            ['⚡','Blazing fast','Pure static HTML and CSS served by rootless Nginx. No Node.js runtime in production.'],
            ['🐳','Dockerized','Multi-stage Dockerfile keeps the final image lean — only your files and Nginx.'],
            ['🤖','Automated CI/CD','GitHub Actions tests every PR and publishes a Docker image on every push to main.'],
            ['🔔','Slack alerts','Get notified instantly on every deployment success or failure in your team channel.'],
            ['🔒','Secure by default','Rootless Nginx, no secrets in images, GITHUB_TOKEN handles GHCR authentication.'],
            ['📦','Registry ready','Every build is tagged with :latest and a commit SHA for full traceability.'],
          ].map(([icon,title,desc]) => (
            <div key={title} className="card" style={{ background:'#12121a', border:'1px solid rgba(255,255,255,.07)', borderRadius:16, padding:32, position:'relative', overflow:'hidden' }}>
              <div style={{ width:44, height:44, background:'rgba(110,231,183,.1)', border:'1px solid rgba(110,231,183,.2)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, marginBottom:20 }}>{icon}</div>
              <h3 style={{ fontSize:17, fontWeight:500, marginBottom:10 }}>{title}</h3>
              <p style={{ fontSize:14, color:'#94a3b8', lineHeight:1.65, fontWeight:300 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pipeline */}
      <section style={{ background:'#12121a', borderTop:'1px solid rgba(255,255,255,.07)', borderBottom:'1px solid rgba(255,255,255,.07)', padding:'80px 48px', textAlign:'center' }}>
        <div style={{ fontSize:11, fontWeight:500, letterSpacing:2, color:'#6ee7b7', textTransform:'uppercase', marginBottom:12 }}>How it works</div>
        <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,4vw,42px)', fontWeight:700, letterSpacing:-1, marginBottom:48, maxWidth:480, margin:'0 auto 48px', lineHeight:1.15 }}>
          From code to production automatically
        </h2>
        <div className="flex items-center justify-center flex-wrap gap-0">
          {[['✏️','Write code','Next.js + Tailwind'],['📤','Push','Triggers workflow'],['🧪','Test','Lint + build'],['🐳','Docker','3-stage build'],['🚀','Ship','Tagged + live']].map(([icon,name,desc],i,arr) => (
  <Fragment key={name}>
    <div className="flex flex-col items-center gap-2" style={{ padding:'0 20px' }}>
      <div style={{ width:52, height:52, borderRadius:'50%', background:'rgba(110,231,183,.1)', border:'1px solid rgba(110,231,183,.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{icon}</div>
      <div style={{ fontSize:13, fontWeight:500 }}>{name}</div>
      <div style={{ fontSize:12, color:'#94a3b8', maxWidth:90, lineHeight:1.4 }}>{desc}</div>
    </div>
    {i < arr.length - 1 && <span style={{ color:'rgba(255,255,255,.15)', fontSize:22, marginBottom:20 }}>→</span>}
  </Fragment>
))}
        </div>
      </section>

      {/* Footer */}
      <footer className="flex justify-between items-center px-12" style={{ padding:'32px 48px', borderTop:'1px solid rgba(255,255,255,.07)', color:'#94a3b8', fontSize:13 }}>
        <span style={{ fontFamily:'Playfair Display,serif', fontSize:16, fontWeight:700, color:'#f1f5f9' }}>
          Next<span style={{ color:'#6ee7b7' }}>.</span>Ship
        </span>
        <span>Built with Next.js · Docker · GitHub Actions</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>

    </main>
  );
}