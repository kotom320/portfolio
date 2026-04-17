export interface RelatedPost {
  slug: string;
  title: string;
  kind?: "overview" | "series" | "deep-dive";
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  tags: string[];
  summary: string;
  metrics: { label: string; value: string; description: string }[];
  /** TIL 블로그에 있는 이 프로젝트의 확장편 */
  relatedPosts?: RelatedPost[];
}

export const BLOG_BASE = "https://til-git-main-kotom320s-projects.vercel.app";

export const projects: Project[] = [
  {
    slug: "cloudfront-optimization",
    title: "인프라 비용 최적화",
    subtitle: "CloudFront 트래픽 구조 개선으로 운영 비용 절감",
    period: "2024",
    tags: ["AWS CloudFront", "Cache Strategy", "WebP", "Data Analysis"],
    summary:
      "MAU 50만 규모 서비스에서 비용 데이터를 직접 분석하여 CDN 과금 구조의 근본 원인을 규명하고, 이미지 포맷 전환과 캐시 전략 재설계로 월 CDN 운영 비용을 3개월 내 77.5% 절감.",
    metrics: [
      {
        label: "월 CDN 비용",
        value: "-77.5%",
        description: "3개월 내 달성",
      },
      {
        label: "요청 수 감소",
        value: "-82%",
        description: "Edge 캐시 활용",
      },
      {
        label: "이미지 경량화",
        value: "-94%",
        description: "WebP 전환",
      },
    ],
    relatedPosts: [
      {
        slug: "cloudfront-invalidation-scope",
        title: "CloudFront Invalidation 범위 최적화: /* → /index.html로 Data transfer 완화",
        kind: "deep-dive",
      },
      {
        slug: "cloudfront-invalidation-result",
        title: "CloudFront 비용 분석: Invalidation 범위 변경이 실제 비용에 미친 영향",
        kind: "deep-dive",
      },
    ],
  },
  {
    slug: "qa-recording-sdk",
    title: "세션 레코딩 SDK",
    subtitle: "상용 도구 대비 비용 0원으로 개발·디자인 검증 프로세스 구축",
    period: "2026.03",
    tags: ["rrweb", "Shadow DOM", "Supabase", "Jira API", "SDK Design"],
    summary:
      "상용 세션 레코딩 도구(LogRocket 등)의 월 수백만 원 비용 부담을 해소하기 위해 rrweb 기반 자체 SDK와 뷰어, Jira 연동 Edge Function까지 단독 설계·구현. 현재 개발자·디자이너의 UI 검증 및 버그 리포팅 보조 도구로 활용.",
    metrics: [
      {
        label: "운영 비용",
        value: "0원",
        description: "Supabase 무료 티어",
      },
      {
        label: "도입 방법",
        value: "1줄",
        description: "initQaRoom() 호출",
      },
      {
        label: "커버 영역",
        value: "3종",
        description: "DOM / 네트워크 / 콘솔",
      },
    ],
    relatedPosts: [
      {
        slug: "qaroom-01-planning",
        title: "QA 기록방을 만든 이유 — 우아콘2025에서 시작된 아이디어",
        kind: "series",
      },
      {
        slug: "qaroom-02-sdk",
        title: "rrweb으로 브라우저 화면 녹화하기 — qaroom SDK 구현",
        kind: "series",
      },
      {
        slug: "qaroom-03-viewer",
        title: "rrweb-player로 세션 재생 뷰어 만들기",
        kind: "series",
      },
      {
        slug: "qaroom-04-firebase",
        title: "Firebase Firestore 연동과 문서 크기 제한 문제",
        kind: "series",
      },
      {
        slug: "qaroom-05-supabase",
        title: "Firebase에서 Supabase로 마이그레이션하기",
        kind: "series",
      },
      {
        slug: "qaroom-06-jira",
        title: "브라우저에서 Jira API를 못 쓰는 이유 — CORS와 Supabase Edge Function",
        kind: "series",
      },
      {
        slug: "rrweb-long-chunk-bug",
        title: "rrweb 녹화 중 화면 꺼짐으로 생긴 19시간짜리 청크 버그",
        kind: "deep-dive",
      },
    ],
  },
  {
    slug: "reservation-refactoring",
    title: "예약 도메인 아키텍처 재설계",
    subtitle: "과도한 공통화로 인한 결합도 문제를 도메인 분리로 해소",
    period: "2024",
    tags: [
      "Architecture",
      "Refactoring",
      "Domain Separation",
      "Code Quality",
    ],
    summary:
      "7가지 예약 유형이 단일 모듈에 결합되어 수정 1건이 전체 유형에 파급되던 구조를, bottom-up 도메인 분리로 재설계해 각 유형이 독립적으로 진화할 수 있는 기반을 구축.",
    metrics: [
      {
        label: "도메인 격리",
        value: "7개 유형",
        description: "단일 분기 → 독립 모듈",
      },
      {
        label: "수정 파급 범위",
        value: "전체 → 단일",
        description: "사이드이펙트 차단",
      },
      {
        label: "신규 유형 추가",
        value: "독립 확장",
        description: "기존 유형 영향 없음",
      },
    ],
  },
  {
    slug: "dx-pipeline",
    title: "FE 개발 생산성 인프라",
    subtitle: "13개 앱 배포 자동화와 디자인 시스템 협업 채널 구축",
    period: "2025 ~ 2026",
    tags: [
      "Jenkins",
      "GitHub Actions",
      "Storybook",
      "Chromatic",
      "CI/CD",
      "MS Teams",
    ],
    summary:
      "팀장 단일 배포 체계와 수동 배포 레거시로 인한 배포 병목을 해소하고, 디자인 시스템 협업 인터페이스를 구축해 FE 팀의 배포·검증·협업 생산성을 체계적으로 개선.",
    metrics: [
      {
        label: "배포 자동화",
        value: "13개 앱",
        description: "단일 Jenkins 파이프라인",
      },
      {
        label: "배포 담당",
        value: "전원 가능",
        description: "특정 인원 의존 해소",
      },
      {
        label: "UI 협업",
        value: "Chromatic",
        description: "PR 단위 시각 회귀",
      },
    ],
    relatedPosts: [
      {
        slug: "jenkins-webview-pipeline",
        title: "Jenkins로 WebView 프로젝트 배포 파이프라인 구축하기",
        kind: "deep-dive",
      },
      {
        slug: "storybook-chromatic-design-system",
        title: "다크모드 대응 과정에서 Storybook·Chromatic으로 디자인 시스템 협업 개선",
        kind: "deep-dive",
      },
      {
        slug: "storybook-tsconfig",
        title: "Storybook 도입 과정에서 이해하게 된 tsconfig의 진짜 역할",
        kind: "deep-dive",
      },
    ],
  },
  {
    slug: "touch-carousel",
    title: "커스텀 터치 제스처 캐러셀",
    subtitle: "서드파티 미사용, 네이티브급 제스처 엔진 직접 구현",
    period: "2023-2024",
    tags: [
      "Touch Gesture",
      "Math",
      "Compound Component",
      "Pinch-to-Zoom",
      "React",
    ],
    summary:
      "기존 서드파티 캐러셀이 충족하지 못한 풀스크린 이미지 뷰어 요구사항을 위해, 수학 기반 제스처 엔진과 Compound Component 패턴의 재사용 가능한 캐러셀을 직접 설계·구현.",
    metrics: [
      {
        label: "제스처",
        value: "4종",
        description: "스와이프/핀치/더블탭/Pull-to-dismiss",
      },
      {
        label: "사용 서비스",
        value: "3개+",
        description: "공용 컴포넌트",
      },
      {
        label: "릴리스",
        value: "136회",
        description: "@htbeyond/uikit",
      },
    ],
  },
];
