"use client";

import { MetricCard } from "@/components/MetricCard";
import { FlowDiagram } from "@/components/FlowDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";

export default function QaSdkPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <a href="/" className="text-sm text-muted hover:text-accent transition no-print">
        &larr; 돌아가기
      </a>

      <div className="mt-6">
        <p className="text-sm font-medium text-accent">2024-2025</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          QA 세션 레코딩 SDK
        </h1>
        <p className="mt-2 text-lg text-muted">
          팀 디버깅 프로세스 혁신을 위한 내부 도구 단독 설계/개발
        </p>
      </div>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <MetricCard label="SDK 규모" value="1,062줄" description="단독 개발" />
        <MetricCard label="도입 결과" value="표준 도구" description="사내 QA 프로세스 채택" />
        <MetricCard label="패키지" value="npm" description="@htbeyond/qaroom" />
      </div>

      {/* 문제 정의 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">문제 정의</h2>
        <p className="mt-3 leading-relaxed text-muted">
          QA 엔지니어가 버그를 스크린샷+텍스트로 전달하는 방식이었고,
          &quot;재현이 안 됩니다&quot;라는 응답이 반복되며 개발-QA 간 커뮤니케이션 비용이 높았습니다.
          상용 세션 레코딩 도구(LogRocket, FullStory 등)는 비용 부담이 컸고,
          사내 Jira 워크플로우와의 연동이 제한적이었습니다.
        </p>
      </section>

      {/* 비교 */}
      <ComparisonTable
        title="상용 도구 vs 자체 SDK 비교"
        oursLabel="자체 SDK (qaroom)"
        theirsLabel="상용 도구 (LogRocket 등)"
        rows={[
          { feature: "월 비용", ours: "Supabase 무료 티어", theirs: "월 수백만 원" },
          { feature: "Jira 연동", ours: "원클릭 티켓 생성", theirs: "제한적 커스터마이징" },
          { feature: "DOM 녹화", ours: "rrweb 기반", theirs: "자체 엔진" },
          { feature: "네트워크 로그", ours: "fetch/XHR 몽키패칭", theirs: "지원" },
          { feature: "콘솔 로그", ours: "console 몽키패칭", theirs: "지원" },
          { feature: "도입 방법", ours: "initQaRoom() 한 줄", theirs: "스크립트 삽입" },
        ]}
      />

      {/* 의사결정 과정 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">의사결정 과정</h2>
        <div className="mt-4 space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-accent">왜 직접 만들었는가?</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              상용 도구는 월 수백만 원 비용 + 사내 Jira 연동 커스터마이징 불가.
              rrweb이라는 오픈소스 DOM 녹화 라이브러리를 발견하고, 이를 기반으로
              네트워크/콘솔 캡처와 Jira 연동을 직접 붙이면 사내 니즈에 최적화된 도구를 만들 수 있다고 판단했습니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-accent">왜 Shadow DOM을 선택했는가?</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              iframe은 호스트 앱과의 이벤트 통신이 복잡하고, 일반 DOM 삽입은
              호스트 앱의 CSS가 SDK UI를 깨뜨리는 문제가 있었습니다.
              Shadow DOM이 스타일 격리와 DOM 접근성을 동시에 해결하는 최적의 선택지였습니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-accent">왜 롤링 버퍼 방식인가?</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              세션 전체를 녹화하면 메모리가 선형 증가합니다. 실제 버그 리포트에
              필요한 것은 &quot;버그 발생 직전 N분&quot;이므로, 60초 간격 청크를 롤링하여
              최근 N분만 유지하는 구조로 설계했습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 아키텍처 */}
      <FlowDiagram
        title="SDK 아키텍처"
        steps={[
          { label: "rrweb 녹화", description: "DOM 스냅샷" },
          { label: "롤링 버퍼", description: "60초 청크" },
          { label: "lz-string 압축", description: "300K 분할" },
          { label: "Supabase", description: "스토리지" },
          { label: "rrweb-player", description: "리플레이어" },
        ]}
      />

      <FlowDiagram
        title="Jira 연동 플로우"
        steps={[
          { label: "버그 발견", description: "QA 엔지니어" },
          { label: "SDK 버튼 클릭", description: "녹화 저장" },
          { label: "Edge Function", description: "Jira API 프록시" },
          { label: "티켓 자동 생성", description: "녹화 링크 첨부" },
        ]}
      />

      {/* 구현 상세 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">구현 상세</h2>
        <div className="mt-4 space-y-3">
          {[
            "rrweb 기반 DOM 녹화 + fetch/XHR/console 몽키패칭으로 네트워크/콘솔 로그 자동 캡처",
            "lz-string 압축 + 300K 청크 분할로 Supabase row 사이즈 제한 내 효율적 스토리지",
            "rrweb-player 리플레이어 + 콘솔/네트워크 로그 타임라인 동기화 뷰어 (React 19 SPA)",
            "Supabase Edge Function 기반 Jira Cloud API 프록시로 원클릭 티켓 생성",
            "npm private 패키지(@htbeyond/qaroom)로 배포, initQaRoom() 한 줄로 앱에 주입",
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

      {/* 한계 인식 */}
      <section className="mt-12 mb-8">
        <h2 className="text-xl font-bold">한계 인식 & 향후 개선</h2>
        <div className="mt-4 rounded-xl border border-border bg-accent-light/30 p-5">
          <p className="text-sm leading-relaxed">
            현재 SDK가 단일 파일(1,062줄)로 구성되어 있어, 향후 <strong>플러그인 아키텍처</strong>로
            분리하여 네트워크/콘솔 캡처를 선택적으로 활성화할 수 있는 구조로 개선이 필요합니다.
          </p>
        </div>
      </section>
    </div>
  );
}
