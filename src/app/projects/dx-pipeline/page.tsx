"use client";

import Link from "next/link";
import { MetricCard } from "@/components/MetricCard";
import { FlowDiagram } from "@/components/FlowDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";

export default function DxPipelinePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href="/"
        className="text-sm text-muted hover:text-accent transition no-print"
      >
        &larr; 돌아가기
      </Link>

      <div className="mt-6">
        <p className="text-sm font-medium text-accent">2025 ~ 2026</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          FE 개발 생산성 인프라
        </h1>
        <p className="mt-2 text-lg text-muted">
          13개 앱 배포 자동화와 디자인 시스템 협업 채널 구축
        </p>
      </div>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <MetricCard
          label="배포 자동화"
          value="13개 앱"
          description="단일 Jenkins 파이프라인"
        />
        <MetricCard
          label="배포 담당"
          value="전원 가능"
          description="특정 인원 의존 해소"
        />
        <MetricCard
          label="UI 협업"
          value="Chromatic"
          description="PR 단위 시각 회귀"
        />
      </div>

      {/* 문제 정의 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">문제 정의</h2>
        <p className="mt-3 leading-relaxed text-muted">
          팀 생산성을 잡아먹는 구조적 문제가 두 갈래로 나뉘어 있었습니다.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-red-500">① 배포 병목</p>
            <p className="mt-2 text-sm leading-relaxed">
              팀장 단일 배포 체계 + 일부 레거시의 로컬 수동 배포 스크립트.
              담당자 부재 시 QA·Native 등 타 부서 릴리즈 일정까지 지연되는 구조.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-red-500">
              ② UI 협업 단절
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              다크모드 TF에서 디자이너에게 구현 결과를 공유할 채널이 없어,
              로컬 캡처·개발 서버 화면 공유 방식으로 회귀. 컴포넌트 단위 확인 불가.
            </p>
          </div>
        </div>
      </section>

      {/* 의사결정 과정 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">의사결정 과정</h2>
        <div className="mt-4 space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-accent">
              왜 13개를 단일 파이프라인으로 묶었는가?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              클라이언트별로 파이프라인을 개별 구성하면 유지보수 비용이 13배가 됩니다.
              환경변수(<code className="rounded bg-accent-light px-1.5 py-0.5 text-xs font-mono text-accent">CLIENTS_LINE</code>)만으로
              분기하는 루프 구조가 가장 단순하고 실수를 줄이는 설계라 판단했습니다.
              &quot;기능보다 실수 방지 구조&quot;가 배포 자동화의 본질이라고 보았습니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-accent">
              왜 초기에 뺀 Storybook을 다시 도입했는가?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              TF 초기에는 일정 압박으로 Storybook을 제외했지만, 개발이 진행될수록
              디자이너와의 UI 공유가 병목이 되었습니다. &quot;설정 비용&quot;을 줄여 얻은
              속도보다 &quot;매번 반복되는 커뮤니케이션&quot; 비용이 더 커졌다고 판단,
              재도입을 결정했습니다. Storybook을 문서화 도구가 아닌
              <strong> 협업 인터페이스</strong>로 재정의한 것이 핵심 전환점.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-accent">
              왜 Teams 알림을 자동화했는가?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              배포 완료 여부가 유관 부서에 공유되지 않아,
              &quot;배포됐나요?&quot;라는 질문이 매 릴리즈마다 반복되었습니다.
              알림 자동화로 커뮤니케이션 비용을 원천 제거. 기술적으로는 작지만
              팀 단위 시간 절감이 크다고 보았습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 아키텍처 */}
      <FlowDiagram
        title="통합 배포 파이프라인"
        steps={[
          { label: "Jenkins Trigger", description: "브랜치/환경 선택" },
          { label: "CLIENTS_LINE 루프", description: "13개 앱 빌드" },
          { label: "S3 Upload", description: "환경별 버킷 분리" },
          {
            label: "CloudFront Invalidate",
            description: "prod 전용 / /index.html 한정",
          },
          { label: "Teams Webhook", description: "결과 자동 브로드캐스트" },
        ]}
      />

      {/* 비교 */}
      <ComparisonTable
        title="도입 전후 비교"
        oursLabel="개선 후"
        theirsLabel="개선 전"
        rows={[
          { feature: "배포 담당", ours: "팀원 누구나", theirs: "팀장 단일" },
          {
            feature: "레거시 배포",
            ours: "Jenkins/GH Actions",
            theirs: "로컬 수동 스크립트",
          },
          {
            feature: "배포 결과 공유",
            ours: "Teams 봇 자동",
            theirs: "구두/수동 공유",
          },
          {
            feature: "CloudFront 무효화",
            ours: "prod /index.html만",
            theirs: "/* 전체",
          },
          {
            feature: "UI 공유 채널",
            ours: "Chromatic 링크",
            theirs: "로컬 캡처/화면 공유",
          },
          {
            feature: "시각적 회귀 검증",
            ours: "PR 단위 자동",
            theirs: "없음",
          },
        ]}
      />

      {/* 구현 상세 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">구현 상세</h2>
        <div className="mt-4 space-y-3">
          {[
            "13개 멀티 클라이언트 앱의 빌드/배포를 단일 Jenkins 파이프라인으로 통합 (환경변수 기반 루프 구조로 유지보수 비용 최소화)",
            "레거시 수동 배포 스크립트를 Jenkins/GitHub Actions 기반으로 포팅하여 배포 창구 일원화, 특정 인원 의존도 완벽 해소",
            "Storybook v8.6 도입 및 20개 이상 컴포넌트 스토리 작성 — 디자이너가 직접 확인 가능한 협업 인터페이스 구축",
            "Chromatic 연동으로 PR 단위 UI 리뷰 체계 구축 — 시각적 변경을 코드 리뷰와 동시에 검증",
            "CI/CD 마지막 단계에 MS Teams 봇 연동, 배포 결과(버전·브랜치·대상 클라이언트)를 유관 부서에 자동 브로드캐스트",
            "Tailwind v4 마이그레이션 + 디자인 토큰 기반 테마 구조 정비로 다크모드 무중단 배포",
          ].map((item, i) => (
            <div key={i} className="flex gap-3">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs text-white">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 결과 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">결과 & 회고</h2>
        <div className="mt-4 rounded-xl border border-border bg-accent-light/30 p-5">
          <ul className="space-y-2 text-sm leading-relaxed">
            <li>
              <strong>배포 병목 해소</strong>: 팀원 누구나 버튼 클릭으로 릴리즈 가능.
              팀장 단일 체계로 배포하던 시절 팀원들이 지속적으로 희망했던
              구조를 실제로 구현.
            </li>
            <li>
              <strong>Teams 봇에 대한 긍정 피드백</strong>: &quot;팀장 단일 체제 때부터
              원하던 작업이었다&quot;는 팀원 피드백 수신. 배포 현황 실시간 공유가
              유관 부서 협업 리드 타임 단축으로 이어짐.
            </li>
            <li>
              <strong>시각 회귀 검증 체계 가동</strong>: PR 단위 Chromatic 리뷰가
              코드 리뷰와 함께 상시 작동. 현재는 개발자 중심 리뷰로 운영 중이며,
              디자이너 참여는 프로덕트 우선순위 회복 후 활성화 예정.
            </li>
            <li>
              <strong>3개 테마 클라이언트</strong> (BYB · POSCO · THEH)에서
              일관된 다크모드 경험 제공.
            </li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            &quot;기능 구현&quot;이 아닌 <strong>&quot;팀이 일하는 방식&quot;</strong>을 바꾸는 작업이
            장기적으로 더 큰 임팩트를 남긴다는 점을 체감한 프로젝트였습니다.
          </p>
        </div>
      </section>

      {/* 한계 인식 */}
      <section className="mt-8 mb-8">
        <h2 className="text-xl font-bold">한계 인식 & 향후 개선</h2>
        <div className="mt-4 rounded-xl border border-border bg-card p-5">
          <p className="text-sm leading-relaxed text-muted">
            Chromatic 기반 디자인 리뷰 프로세스는 도구 단에서는 준비되어 있으나,
            현재 프로덕트 개발 우선순위로 인해 디자이너 참여 단계까지는
            활성화되지 않은 상태입니다. <strong>툴 도입과 프로세스 정착은 별개 과제</strong>라는
            점을 인지하고, 다음 단계로 디자이너가 자연스럽게 리뷰 루프에 들어올 수 있는
            트리거(릴리즈 시 알림, 리뷰 요청 템플릿 등)를 준비 중입니다.
          </p>
        </div>
      </section>
    </div>
  );
}
