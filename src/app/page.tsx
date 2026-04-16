import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

const skills = [
  {
    category: "Core",
    items: ["React", "TypeScript", "React Query (TanStack Query v5)", "Tailwind CSS v4"],
  },
  {
    category: "Experience",
    items: ["Next.js", "Vue.js", "Recoil", "Redux Toolkit", "Storybook", "Chromatic"],
  },
  {
    category: "DevOps & Tools",
    items: ["AWS (CloudFront, S3)", "Jenkins", "GitHub Actions", "Sentry", "Supabase"],
  },
  {
    category: "AI & Productivity",
    items: ["Claude Code 활용 코드 리뷰/리팩터링/QA 자동화"],
  },
];

const blogHighlights = [
  {
    title: "CloudFront 비용 최적화 시리즈",
    description: "MAU 50만 서비스에서 CDN 비용을 데이터 기반으로 분석하고 최적화한 과정",
    count: "시리즈",
  },
  {
    title: "QA SDK 개발기",
    description: "rrweb 기반 세션 레코딩 SDK를 설계하고 개발한 전 과정",
    count: "6편",
  },
  {
    title: "React Query 시리즈",
    description: "v4에서 v5로의 마이그레이션과 실전 패턴 정리",
    count: "7편",
  },
  {
    title: "JavaScript 런타임 딥다이브",
    description: "이벤트루프, 마이크로태스크, 비동기 처리의 내부 동작",
    count: "시리즈",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <p className="text-sm font-medium text-accent">Frontend Developer</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          고동욱
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          전국 87만 회원, MAU 50만 규모의 아파트 통합 플랫폼에서 커뮤니티/예약/전자투표
          핵심 도메인의 프론트엔드 개발을 담당하며, 인프라 비용 최적화와 팀 생산성
          개선을 주도해 온 프론트엔드 엔지니어입니다.
        </p>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted/80">
          &quot;왜 이 구조여야 하는가&quot;를 먼저 고민하고, 팀이 더 빠르게 일할 수 있는
          도구와 아키텍처를 만드는 데 집중합니다.
        </p>
        <div className="mt-6 flex gap-4 text-sm">
          <a
            href="https://github.com/kotom320"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border px-4 py-2 transition hover:border-accent hover:text-accent"
          >
            GitHub
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
          각 프로젝트를 클릭하면 문제 정의부터 의사결정 과정, 구현 상세, 결과까지
          확인할 수 있습니다.
        </p>
        <div className="mt-8 grid gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="pb-16">
        <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="text-sm font-semibold text-accent">
                {group.category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-accent-light px-3 py-1 text-xs text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="pb-16">
        <h2 className="text-2xl font-bold tracking-tight">Blog Highlights</h2>
        <p className="mt-2 text-sm text-muted">
          11개월간 76편의 기술 포스트를 연재하며, 업무에서 마주친 실제 문제의 원인 분석과 해결 과정을 기록
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {blogHighlights.map((post) => (
            <div
              key={post.title}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-semibold">{post.title}</h3>
                <span className="shrink-0 rounded-full bg-accent-light px-2 py-0.5 text-xs text-accent">
                  {post.count}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {post.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Summary */}
      <section className="pb-16">
        <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold">에이치티비욘드 (HTBeyond)</h3>
                <p className="text-sm text-muted">프론트엔드 개발자</p>
              </div>
              <span className="text-sm text-muted">2022.02 ~ 현재</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted/80">
              아파트 주거 통합 플랫폼 &apos;BYB&apos; (회원 87만 / MAU 50만 / DAU 5.3만)의
              커뮤니티 핵심 도메인 FE 전담. 13개 멀티 클라이언트 앱 배포 운영,
              27회 정기 릴리스 및 32회 핫픽스 대응.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold">하마랩 (HAMA LAB)</h3>
                <p className="text-sm text-muted">프론트엔드 개발자</p>
              </div>
              <span className="text-sm text-muted">
                2020.05 ~ 2021.11
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted/80">
              다양한 도메인의 웹/앱 서비스 MVP를 3~6개월 단위로 반복 출시.
              Vue.js 및 Ionic 활용 하이브리드 앱/어드민 개발.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
