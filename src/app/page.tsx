import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

const BLOG_URL = "https://kotom320-til.vercel.app";

const heroMetrics = [
  { value: "95만+", label: "서비스 회원" },
  { value: "890", label: "아파트 단지" },
  { value: "5년", label: "프론트엔드 경력" },
];

const skills = [
  {
    category: "Core",
    items: ["React", "TypeScript", "React Query (TanStack Query v5)", "Tailwind CSS v4"],
  },
  {
    category: "Experience",
    items: ["Next.js", "Vue.js", "Storybook / Chromatic", "Recoil / Redux Toolkit"],
  },
  {
    category: "DevOps & Infra",
    items: ["AWS (CloudFront, S3)", "Jenkins", "GitHub Actions", "Sentry", "Supabase"],
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6">

      {/* Hero */}
      <section className="py-16 md:py-24">
        <p className="text-sm font-semibold tracking-widest text-accent uppercase">
          Frontend Developer
        </p>
        <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">
          고동욱
        </h1>

        {/* 핵심 수치 */}
        <div className="mt-8 grid grid-cols-3 gap-6 rounded-2xl border border-border bg-card p-6">
          {heroMetrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-3xl font-bold text-accent md:text-4xl">{m.value}</p>
              <p className="mt-1 text-xs text-muted">{m.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
          전국 최대 규모 아파트 통합 플랫폼에서 커뮤니티·예약·전자투표 핵심 도메인을 담당했습니다.
          &quot;왜 이 구조여야 하는가&quot;를 먼저 고민하고, 팀이 더 빠르게 일할 수 있는
          도구와 아키텍처를 만드는 데 집중합니다.
        </p>

        <div className="mt-6 flex gap-3 text-sm">
          <a
            href="https://github.com/kotom320"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border px-4 py-2 transition hover:border-accent hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border px-4 py-2 transition hover:border-accent hover:text-accent"
          >
            TIL Blog
          </a>
          <a
            href="mailto:kotom320@gmail.com"
            className="rounded-lg bg-accent px-4 py-2 text-white transition hover:opacity-90"
          >
            Contact
          </a>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="pb-16">
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
        <p className="mt-2 text-sm text-muted">
          실제 문제를 정의하고 해결한 과정을 담았습니다. 각 카드를 클릭하면 의사결정 근거와 구현 상세를 볼 수 있습니다.
        </p>
        <div className="mt-8 grid gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="pb-16">
        <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-bold">에이치티비욘드 (HTBeyond)</h3>
                <p className="text-sm text-muted">Frontend Developer</p>
              </div>
              <span className="text-sm text-muted shrink-0">2022.02 ~ 현재</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted/90">
              <li className="flex gap-2"><span className="text-accent shrink-0">›</span><span>전국 95만 회원 / 890단지 규모 아파트 통합 플랫폼 FE 개발</span></li>
              <li className="flex gap-2"><span className="text-accent shrink-0">›</span><span>커뮤니티·예약·전자투표 핵심 도메인 전담, 13개 멀티 클라이언트 운영</span></li>
              <li className="flex gap-2"><span className="text-accent shrink-0">›</span><span>CloudFront 인프라 비용 최적화, Jenkins 배포 파이프라인 구축, Storybook 기반 디자인 시스템 협업 체계 도입</span></li>
              <li className="flex gap-2"><span className="text-accent shrink-0">›</span><span>27회 정기 릴리스 / 32회 핫픽스 대응</span></li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-bold">하마랩 (HAMA LAB)</h3>
                <p className="text-sm text-muted">Frontend Developer</p>
              </div>
              <span className="text-sm text-muted shrink-0">2020.05 ~ 2021.11</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted/90">
              <li className="flex gap-2"><span className="text-accent shrink-0">›</span><span>다양한 도메인의 웹/앱 서비스 MVP를 3~6개월 단위로 반복 출시</span></li>
              <li className="flex gap-2"><span className="text-accent shrink-0">›</span><span>Vue.js / Ionic 활용 하이브리드 앱·어드민 개발</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="pb-16">
        <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="text-xs font-semibold tracking-widest uppercase text-accent">
                {group.category}
              </h3>
              <ul className="mt-3 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <span className="text-accent/50">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
