import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  return readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");
}

test("static export contains Stella's meaningful portfolio hero", async () => {
  const html = await render();
  assert.match(html, /<title>Stella Jin \| Full-stack &amp; AI Developer<\/title>/i);
  assert.match(html, /Building thoughtful/);
  assert.match(html, /digital products/);
  assert.match(html, /Full-stack &amp; AI developer/);
  assert.match(html, /href="#work"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("hero source is semantic and uses the approved visual tokens", async () => {
  const [page, hero, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HeroSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<main/);
  assert.match(page, /id="home"/);
  assert.match(hero, /aria-label="Primary navigation"/);
  assert.match(layout, /Stella Jin \| Full-stack & AI Developer/);
  assert.match(css, /--accent-mint:/);
  assert.match(css, /--accent-cyan:/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("renders about, project, and contact content from Stella's approved profile", async () => {
  const html = await render();

  assert.match(html, /A blend of soft skills/);
  assert.match(html, /Full-stack Developer Intern/);
  assert.match(html, /Travel Budget AI Assistant/);
  assert.match(html, /Financial Insights Platform/);
  assert.match(html, /Enterprise AI Chatbot/);
  assert.match(html, /Asset Management Apps/);
  assert.match(html, /Get in touch!/);
  assert.match(html, /href="mailto:stella\.jin123@gmail\.com"/);
});

test("ships the four requested accessible interaction components", async () => {
  const [wheel, spark, glass, glow, page, hero, css] = await Promise.all([
    readFile(new URL("../app/components/OptionWheel.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ClickSpark.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/FluidGlassHero.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/BorderGlowCard.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HeroSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(wheel, /aria-expanded=\{open\}/);
  assert.match(wheel, /event\.key === "Escape"/);
  assert.match(spark, /data-click-spark/);
  assert.match(glass, /className="fluid-glass"/);
  assert.match(glow, /--glow-x/);
  assert.match(page, /<ClickSpark>/);
  assert.match(page, /<OptionWheel/);
  assert.match(hero, /<FluidGlassHero/);
  assert.match(page, /<BorderGlowCard/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test("ships the approved stronger motion, shared glow, and hosted contact form", async () => {
  const [wheel, spark, glass, form, page, hero, css] = await Promise.all([
    readFile(new URL("../app/components/OptionWheel.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ClickSpark.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/FluidGlassHero.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ContactForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HeroSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(wheel, /--wheel-delay/);
  assert.match(spark, /closest<HTMLElement>\("\.glow-surface"\)/);
  assert.equal((glass.match(/data-fluid-layer/g) ?? []).length, 3);
  assert.match(form, /https:\/\/formsubmit\.co\/ajax\/stella\.jin123@gmail\.com/);
  assert.match(form, /const form = event\.currentTarget/);
  assert.match(form, /aria-live="polite"/);
  assert.match(form, /name="name"/);
  assert.match(form, /name="email"/);
  assert.match(form, /name="message"/);
  assert.match(page, /contact-layout/);
  assert.match(hero, /button-primary glow-surface cursor-target/);
  assert.match(hero, /button-secondary glow-surface cursor-target/);
  assert.match(css, /\.glow-surface::after/);
  assert.match(css, /cubic-bezier\(\.2, \.9, \.2, 1\.35\)/);
});

test("uses scoped medium hover glow, project showcase links, and a seamless tech ticker", async () => {
  const [page, hero, form, data, showcase, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HeroSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ContactForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/portfolio-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/projects/ProjectShowcase.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.equal((page.match(/className="skills-track-group"/g) ?? []).length, 2);
  assert.match(page, /className="skills-track"/);
  assert.match(page, /skill-card glow-surface/);
  assert.match(page, /className="project-action glow-surface cursor-target" href=\{project\.demoHref\}>View project/);
  assert.doesNotMatch(hero, /glass-nav glow-surface|intro-panel glow-surface|current-panel glow-surface/);
  assert.doesNotMatch(page, /experience\.map\(\(item\) => <article className="glow-surface"/);
  assert.doesNotMatch(page, /<li className="glow-surface"/);
  assert.doesNotMatch(page, /contact-card glow-surface|contact-info glow-surface|<a className="glow-surface" href=\{contact\.href\}/);
  assert.match(form, /className="contact-form"/);
  assert.doesNotMatch(form, /<(?:input|textarea) className="glow-surface"/);
  assert.match(form, /form-submit glow-surface/);
  assert.match(data, /demoHref: "\/projects\//);
  assert.match(data, /Demo showcase coming soon/);
  assert.match(showcase, /pageContent\.showcase\.message/);
  assert.match(css, /@keyframes glow-spin/);
  assert.match(css, /@keyframes marquee-left/);
  assert.match(css, /animation: marquee-left/);
  assert.match(css, /\.glow-surface::before/);
  assert.match(css, /\.glow-surface:hover::before/);
});

test("centralizes editable copy and uses the selected portrait hero", async () => {
  const [page, data, hero, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/portfolio-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HeroSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    access(new URL("../public/stella-jin-profile.png", import.meta.url)),
  ]);

  assert.match(page, /pageContent/);
  assert.match(page, /<HeroSection/);
  assert.doesNotMatch(page, /HeroVisualCompare/);
  assert.match(data, /export const pageContent/);
  assert.match(data, /techStack:/);
  assert.match(hero, /className="hero-shell hero-mode-portrait"/);
  assert.doesNotMatch(hero, /HeroMode|aria-pressed|mode === "original"/);
  assert.match(hero, /className="portrait-layout"/);
  assert.match(hero, /className="portrait-brand"/);
  assert.match(hero, /className="hero-portrait"[\s\S]*<HeroActions \/>[\s\S]*className="portrait-copy"[\s\S]*className="portrait-name name-display"/);
  assert.match(hero, /src="\/stella-jin-profile\.png"/);
  assert.match(css, /\.portrait-brand \{[^}]*justify-items: start/);
  assert.match(css, /\.hero-portrait \{[^}]*width: 50%/);
});

test("ships the seven scoped React Bits-style motion refinements", async () => {
  const [page, hero, target, splash, float, gradient, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HeroSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/TargetCursor.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SplashCursor.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ScrollFloat.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/GradientText.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(hero, /portrait-brand/);
  assert.match(css, /\.portrait-name \{[^}]*color: rgba\(218,255,240,\.58\)/);
  assert.match(css, /\.portrait-brand \.hero-actions \{[^}]*margin-top: 48px/);
  assert.match(page, /className="contact-visual"/);
  assert.doesNotMatch(page, /className="contact-info"/);
  assert.match(page, /className="contact-inline"/);
  assert.match(page, /<TargetCursor/);
  assert.match(page, /<SplashCursor/);
  assert.match(target, /closest<HTMLElement>\("\.cursor-target"\)/);
  assert.match(splash, /getContext\("2d"\)/);
  assert.match(float, /IntersectionObserver/);
  assert.match(page, /<ScrollFloat/);
  assert.match(gradient, /gradient-text/);
  assert.match(page, /<GradientText/);
  assert.match(css, /@keyframes nav-aurora/);
  assert.match(css, /@keyframes gradient-text-shift/);
});

test("extends scroll float through About, Work, and Contact while preserving restored copy", async () => {
  const [page, data, block] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/portfolio-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ScrollFloatBlock.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(data, /Most recently I built financial features in Vue\/Nuxt/);
  assert.ok((page.match(/<ScrollFloatBlock/g) ?? []).length >= 5);
  assert.match(block, /IntersectionObserver/);
});

test("uses the portrait hero with left-aligned actions beneath the portrait", async () => {
  const [hero, page, data, css] = await Promise.all([
    readFile(new URL("../app/components/HeroSection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/portfolio-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(hero, /className="portrait-brand"[\s\S]*className="hero-portrait"[\s\S]*<HeroActions \/>/);
  assert.match(hero, /className="portrait-copy"[\s\S]*className="portrait-name name-display"[\s\S]*<HeroCopy \/>/);
  assert.doesNotMatch(hero, /HeroMode|useState|hero-layout-switch|mode === "original"/);
  assert.match(css, /\.portrait-layout \{[^}]*grid-template-columns: minmax\(304px, 360px\) minmax\(0, 620px\)[^}]*justify-content: center/);
  assert.match(css, /\.portrait-brand \{[^}]*justify-items: start/);
  assert.match(css, /\.portrait-brand \{[^}]*justify-self: end/);
  assert.match(css, /\.portrait-brand \.hero-actions \{[^}]*margin-top: 48px/);
  assert.doesNotMatch(data, /label: "Phone"|href: "tel:/);
  assert.match(page, /<h2 id="about-title"><em>\{pageContent\.about\.titleLead\}<\/em> and <span>\{pageContent\.about\.titleAccent\}<\/span><\/h2>/);
  assert.doesNotMatch(page, /import \{ ScrollFloat \}/);
});

test("keeps the portrait name at 120px and shrinks it only at constrained widths", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const tabletCss = css.slice(css.indexOf("@media (max-width: 800px)"), css.indexOf("@media (min-width: 600px)"));

  assert.match(css, /\.portrait-name \{[^}]*font-size: 120px/);
  assert.match(css, /@media \(min-width: 600px\) and \(max-width: 800px\)[\s\S]*grid-template-areas: "portrait name" "copy copy" "actions actions"/);
  assert.match(css, /@media \(min-width: 600px\) and \(max-width: 700px\)[\s\S]*grid-template-columns: minmax\(180px, 210px\) minmax\(230px, 320px\)/);
  assert.match(css, /@media \(max-width: 800px\)[\s\S]*\.hero-portrait \{[^}]*width: clamp\(200px, calc\(140px \+ 10vw\), 210px\)/);
  assert.match(tabletCss, /\.portrait-name \{[^}]*font-size: min\(120px, 17vw\)/);
  assert.equal(css.match(/font-size: min\(120px, 17vw\)/g)?.length, 1);
  assert.match(css, /@media \(max-width: 599px\)[\s\S]*\.portrait-name \{[^}]*font-size: min\(120px, 27vw\)/);
  assert.doesNotMatch(css, /\.name-display \{ font-size: clamp\(78px, 23vw, 120px\)/);
  assert.match(css, /@media \(max-width: 599px\)[\s\S]*grid-template-areas: "portrait" "name" "copy" "actions"/);
  assert.match(css, /@media \(max-width: 800px\)[\s\S]*\.portrait-brand, \.portrait-copy \{ display: contents; \}/);
});
