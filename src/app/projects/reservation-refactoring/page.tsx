"use client";

import Link from "next/link";
import { MetricCard } from "@/components/MetricCard";
import { FlowDiagram } from "@/components/FlowDiagram";

export default function ReservationPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/" className="text-sm text-muted hover:text-accent transition no-print">
        &larr; 돌아가기
      </Link>

      <div className="mt-6">
        <p className="text-sm font-medium text-accent">2024</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          예약 시스템 리팩터링
        </h1>
        <p className="mt-2 text-lg text-muted">
          오버엔지니어링 청산 및 도메인 아키텍처 재설계
        </p>
      </div>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <MetricCard label="변경 규모" value="170 파일" description="UI 전면 개편" />
        <MetricCard label="코드 변경" value="3,831줄" description="1,898 추가 / 1,933 삭제" />
        <MetricCard label="예약 유형" value="7가지" description="도메인별 분리" />
      </div>

      {/* 문제 정의 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">문제 정의</h2>
        <p className="mt-3 leading-relaxed text-muted">
          고정슬롯/구독/숙박/스크린골프/강좌/상품 등 7가지 예약 유형을 단일 모듈이 처리하고 있었습니다.
          초기 설계에서 &quot;공통화&quot;를 과도하게 추구한 결과, 비즈니스 맥락이 다른 유형들이
          하나의 분기문 안에 강하게 결합되어 단일 수정에도 사이드이펙트가 발생하는 상황이었습니다.
        </p>
      </section>

      {/* Before/After 구조 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">구조 변화</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-5 dark:border-red-900 dark:bg-red-950/20">
            <p className="text-sm font-semibold text-red-500">Before: 과도한 공통화</p>
            <div className="mt-3 space-y-2 text-xs text-muted font-mono">
              <p>reservation/</p>
              <p>&nbsp;&nbsp;index.tsx <span className="text-red-400">&larr; 7가지 유형 분기</span></p>
              <p>&nbsp;&nbsp;hooks.ts <span className="text-red-400">&larr; 모든 로직 혼재</span></p>
              <p>&nbsp;&nbsp;types.ts <span className="text-red-400">&larr; 거대 union 타입</span></p>
            </div>
            <p className="mt-3 text-xs text-red-500">
              수정 1건 &rarr; 7가지 유형 사이드이펙트 위험
            </p>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50/50 p-5 dark:border-green-900 dark:bg-green-950/20">
            <p className="text-sm font-semibold text-green-600">After: 도메인별 분리</p>
            <div className="mt-3 space-y-2 text-xs text-muted font-mono">
              <p>reservation/</p>
              <p>&nbsp;&nbsp;fixed-slot/ <span className="text-green-600">&larr; 독립</span></p>
              <p>&nbsp;&nbsp;subscription/ <span className="text-green-600">&larr; 독립</span></p>
              <p>&nbsp;&nbsp;accommodation/ <span className="text-green-600">&larr; 독립</span></p>
              <p>&nbsp;&nbsp;shared/ <span className="text-green-600">&larr; 진짜 공통만</span></p>
            </div>
            <p className="mt-3 text-xs text-green-600">
              수정 1건 &rarr; 해당 도메인에만 영향
            </p>
          </div>
        </div>
      </section>

      {/* 의사결정 과정 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">의사결정 과정</h2>
        <div className="mt-4 space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-accent">왜 공통화가 실패했는가?</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              7가지 유형이 표면적으로는 비슷해 보이지만, 실제 비즈니스 규칙(취소 정책, 결제 흐름,
              상태 전이)이 각각 달랐습니다. &quot;같아 보이는 것&quot;을 공통화한 것이 아니라
              &quot;달라야 하는 것&quot;까지 공통화한 것이 문제의 본질이었습니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-accent">왜 2단계 접근을 했는가?</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              1단계에서 도메인별로 분리한 뒤, 분리된 코드에서 진짜 동일한 패턴을 발견하고
              다시 추출하는 bottom-up 접근. 처음부터 공통화하는 top-down 방식의 실패를
              반복하지 않기 위함이었습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 접근 방법 */}
      <FlowDiagram
        title="리팩터링 전략: Bottom-Up 접근"
        steps={[
          { label: "1단계", description: "도메인별 분리" },
          { label: "2단계", description: "패턴 발견" },
          { label: "3단계", description: "진짜 공통만 추출" },
          { label: "결과", description: "독립적 확장 가능" },
        ]}
      />

      {/* 결과 */}
      <section className="mt-12 mb-8">
        <h2 className="text-xl font-bold">결과 & 회고</h2>
        <div className="mt-4 rounded-xl border border-border bg-accent-light/30 p-5">
          <ul className="space-y-2 text-sm leading-relaxed">
            <li>운영 중 에러 발생률 감소</li>
            <li>신규 예약 유형 추가 시 개발 속도 회복</li>
            <li>이후 예약 도메인 개발의 안정적 확장 기반 확보</li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            이 경험을 통해 <strong>&quot;같아 보이는 것을 공통화하지 말고, 같다고 증명된 것만 공통화하라&quot;</strong>는
            원칙을 체득했습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
