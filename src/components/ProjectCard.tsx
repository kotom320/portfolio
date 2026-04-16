import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-xl border border-border bg-card p-6 transition hover:border-accent hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold group-hover:text-accent transition">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
        </div>
        <span className="text-xs text-muted">{project.period}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted/80">
        {project.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent-light px-2.5 py-0.5 text-xs text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {project.metrics.map((m) => (
          <div key={m.label} className="text-center">
            <p className="text-lg font-bold text-accent">{m.value}</p>
            <p className="text-xs text-muted">{m.label}</p>
          </div>
        ))}
      </div>
    </Link>
  );
}
