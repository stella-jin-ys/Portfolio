import Link from "next/link";
import { pageContent, projects } from "../../portfolio-data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.demoHref.split("/").pop() }));
}

export default async function ProjectShowcase({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.demoHref.endsWith(`/${slug}`));

  return (
    <main className="showcase-page">
      <p className="section-label">{pageContent.showcase.label}</p>
      <h1>{project?.title ?? pageContent.showcase.fallbackTitle}</h1>
      <p>{pageContent.showcase.message}</p>
      <Link className="button button-secondary glow-surface" href="/#work">{pageContent.showcase.backAction} <span aria-hidden="true">←</span></Link>
    </main>
  );
}
