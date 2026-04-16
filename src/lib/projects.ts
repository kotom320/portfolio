export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  tags: string[];
  summary: string;
  metrics: { label: string; value: string; description: string }[];
}

export const projects: Project[] = [
  {
    slug: "cloudfront-optimization",
    title: "인프라 비용 최적화",
    subtitle: "CloudFront 트래픽 구조 개선으로 운영 비용 절감",
    period: "2024",
    tags: ["AWS CloudFront", "Cache Strategy", "WebP", "Data Analysis"],
    summary:
      "MAU 50만 규모 서비스에서 비용 데이터를 직접 분석하여 CDN 과금 구조의 근본 원인을 규명하고, 이미지 포맷 전환과 캐시 전략 재설계로 트래픽 비용을 대폭 절감.",
    metrics: [
      {
        label: "요청 수 감소",
        value: "-82%",
        description: "CDN 총 요청 수",
      },
      {
        label: "전송량 감소",
        value: "-68%",
        description: "데이터 전송량",
      },
      {
        label: "이미지 경량화",
        value: "-94%",
        description: "대표 이미지 용량",
      },
    ],
  },
  {
    slug: "qa-recording-sdk",
    title: "QA 세션 레코딩 SDK",
    subtitle: "팀 디버깅 프로세스 혁신을 위한 내부 도구 단독 설계/개발",
    period: "2024-2025",
    tags: ["rrweb", "Shadow DOM", "Supabase", "Jira API", "SDK Design"],
    summary:
      "상용 도구 대비 비용 효율적인 세션 레코딩 SDK를 단독으로 설계·개발하여, QA 버그 리포트에 재현 가능한 녹화 링크를 첨부하는 프로세스 혁신.",
    metrics: [
      {
        label: "SDK 규모",
        value: "1,062줄",
        description: "단독 개발",
      },
      {
        label: "도입 결과",
        value: "표준 도구",
        description: "사내 QA 프로세스 채택",
      },
      {
        label: "패키지",
        value: "npm private",
        description: "@htbeyond/qaroom",
      },
    ],
  },
  {
    slug: "reservation-refactoring",
    title: "예약 시스템 리팩터링",
    subtitle: "오버엔지니어링 청산 및 도메인 아키텍처 재설계",
    period: "2024",
    tags: [
      "Architecture",
      "Refactoring",
      "Domain Separation",
      "Code Quality",
    ],
    summary:
      "7가지 예약 유형의 과도한 공통화로 인한 결합도 문제를 분석하고, 도메인 단위 분리를 통해 개발 속도를 회복한 대규모 리팩터링.",
    metrics: [
      {
        label: "변경 규모",
        value: "170 파일",
        description: "UI 전면 개편",
      },
      {
        label: "코드 변경",
        value: "3,831줄",
        description: "1,898 추가 / 1,933 삭제",
      },
      {
        label: "예약 유형",
        value: "7가지",
        description: "도메인별 분리",
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
