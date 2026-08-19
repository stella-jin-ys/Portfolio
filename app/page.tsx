import type { Metadata } from "next";
import { BorderGlowCard } from "./components/effects/BorderGlowCard";
import { ClickSpark } from "./components/effects/ClickSpark";
import { ContactForm } from "./components/forms/ContactForm";
import { GradientText } from "./components/effects/GradientText";
import { HeroSection } from "./components/sections/HeroSection";
import { OptionWheel } from "./components/effects/OptionWheel";
import { ScrollFloatBlock } from "./components/effects/ScrollFloatBlock";
import { SplashCursor } from "./components/effects/SplashCursor";
import { TargetCursor } from "./components/effects/TargetCursor";
import { contacts, experience, pageContent, projects, skills, techStack } from "./portfolio-data";

export const metadata: Metadata = {
  title: pageContent.meta.title,
  description: pageContent.meta.description,
};

export default function Home() {
  return (
    <ClickSpark>
    <main id="home">
      <SplashCursor />
      <TargetCursor />
      <HeroSection />
      <div className="skills-marquee" aria-label={`Technology stack: ${techStack.join(", ")}`}>
        <div className="skills-track" aria-hidden="true">
          <div className="skills-track-group">{techStack.map((item) => <span key={item}>{item} ✳</span>)}</div>
          <div className="skills-track-group">{techStack.map((item) => <span key={item}>{item} ✳</span>)}</div>
        </div>
      </div>

      <section className="about-section section-wrap" id="about" aria-labelledby="about-title">
        <ScrollFloatBlock className="about-intro">
          <p className="section-label">{pageContent.about.label}</p>
          <h2 id="about-title"><em>{pageContent.about.titleLead}</em> and <span>{pageContent.about.titleAccent}</span></h2>
          <p>{pageContent.about.body}</p>
          <div className="skill-grid">
            {skills.map((skill) => <article className="skill-card glow-surface" key={skill.label}><h3>{skill.label}</h3><p>{skill.value}</p></article>)}
          </div>
        </ScrollFloatBlock>
        <ScrollFloatBlock className="experience-list">
          {experience.map((item) => <article key={item.role}><div><h3>{item.role}</h3><p>{item.company}</p></div><span>{item.period}</span></article>)}
        </ScrollFloatBlock>
      </section>

      <section className="work-section section-wrap" id="work" aria-labelledby="work-title">
        <ScrollFloatBlock className="section-heading"><div><p className="section-label">{pageContent.work.label}</p><GradientText id="work-title">{pageContent.work.title}</GradientText></div><span>{projects.length} {pageContent.work.countLabel}</span></ScrollFloatBlock>
        <div className="project-grid">
          {projects.map((project) => (
            <ScrollFloatBlock key={project.title}>
              <BorderGlowCard>
                <div className="project-top"><h3>{project.title}</h3><span>{project.year}</span></div>
                <p>{project.summary}</p>
                <ul aria-label={`${project.title} technologies`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                <a className="project-action glow-surface cursor-target" href={project.demoHref}>View project <span aria-hidden="true">↗</span></a>
              </BorderGlowCard>
            </ScrollFloatBlock>
          ))}
        </div>
      </section>

      <section className="contact-section section-wrap" id="contact" aria-labelledby="contact-title">
        <ScrollFloatBlock className="contact-card">
          <h2 id="contact-title">{pageContent.contact.title}</h2>
          <div className="contact-layout">
            <ContactForm />
            <div className="contact-visual">
              <svg viewBox="0 0 320 320" role="presentation" aria-hidden="true"><path d="M48 92h224v148H48z"/><path d="m50 96 110 88 110-88"/><circle cx="246" cy="72" r="24"/><path d="m238 72 7 7 13-16"/></svg>
              <div className="contact-inline">
                <p>{pageContent.contact.infoLabel}</p>
                {contacts.map((contact) => <a className="cursor-target" href={contact.href} key={contact.label}><span>{contact.label}</span><strong>{contact.text}</strong></a>)}
              </div>
            </div>
          </div>
        </ScrollFloatBlock>
        <footer><span>{pageContent.contact.footerCopyright}</span><span>{pageContent.contact.footerLocation}</span></footer>
      </section>
      <OptionWheel />
    </main>
    </ClickSpark>
  );
}
