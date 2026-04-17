import type { RelatedPost } from "@/lib/projects";
import { BLOG_BASE } from "@/lib/projects";

const kindLabel: Record<NonNullable<RelatedPost["kind"]>, string> = {
  overview: "Overview",
  series: "Series",
  "deep-dive": "Deep Dive",
};

export function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (!posts.length) return null;

  // 종류 순: overview → series → deep-dive
  const order: RelatedPost["kind"][] = ["overview", "series", "deep-dive"];
  const sorted = [...posts].sort(
    (a, b) =>
      order.indexOf(a.kind ?? "deep-dive") -
      order.indexOf(b.kind ?? "deep-dive")
  );

  return (
    <section className="mt-16 border-t border-border pt-10 no-print">
      <h2 className="text-xl font-bold">블로그에서 더 자세히</h2>
      <p className="mt-2 text-sm text-muted">
        이 프로젝트의 의사결정 과정과 트러블슈팅을 글로 풀어 정리했습니다.
      </p>
      <div className="mt-6 grid gap-2">
        {sorted.map((post) => (
          <a
            key={post.slug}
            href={`${BLOG_BASE}/blog/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3 transition hover:border-accent hover:shadow-sm"
          >
            {post.kind && (
              <span className="mt-0.5 shrink-0 rounded bg-accent-light px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-accent">
                {kindLabel[post.kind]}
              </span>
            )}
            <span className="flex-1 text-sm leading-relaxed group-hover:text-accent transition-colors">
              {post.title}
            </span>
            <span className="shrink-0 text-muted group-hover:text-accent transition-colors">
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
