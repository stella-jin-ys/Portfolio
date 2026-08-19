import Image from "next/image";
import { pageContent } from "../portfolio-data";
import { FluidGlassHero } from "./FluidGlassHero";

function HeroActions() {
  return (
    <div className="hero-actions">
      <a className="button button-primary glow-surface cursor-target" href="#work">{pageContent.hero.primaryAction} <span aria-hidden="true">→</span></a>
      <a className="button button-secondary glow-surface cursor-target" href="#contact">{pageContent.hero.secondaryAction}</a>
    </div>
  );
}

function HeroCopy() {
  return (
    <div className="hero-copy">
      <p className="eyebrow">{pageContent.hero.eyebrow}</p>
      <h1 id="hero-title"><em>{pageContent.hero.titleLead}</em><span>{pageContent.hero.titleAccent}</span></h1>
      <p className="hero-summary">{pageContent.hero.summary}</p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="hero-shell hero-mode-portrait" aria-labelledby="hero-title">
      <nav className="glass-nav" aria-label="Primary navigation">
        <div className="nav-links">
          <a className="cursor-target" href="#home">{pageContent.nav.home}</a><a className="cursor-target" href="#about">{pageContent.nav.about}</a><a className="cursor-target" href="#work">{pageContent.nav.work}</a>
        </div>
        <a className="wordmark" href="#home" aria-label="Stella Jin, home">STELLA</a>
        <a className="nav-contact glow-surface cursor-target" href="#contact">{pageContent.nav.contact}</a>
      </nav>

      <div className="portrait-layout">
        <div className="portrait-brand">
          <figure className="hero-portrait">
            <Image src="/stella-jin-profile.png" alt="Portrait of Stella Jin" width={308} height={461} priority unoptimized />
          </figure>
          <HeroActions />
        </div>
        <div className="portrait-copy">
          <div className="portrait-name name-display" aria-hidden="true"><span>STELLA</span><span>JIN</span></div>
          <HeroCopy />
        </div>
        <FluidGlassHero />
      </div>
    </section>
  );
}
