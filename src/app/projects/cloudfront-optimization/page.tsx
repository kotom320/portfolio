"use client";

import Link from "next/link";
import { MetricCard } from "@/components/MetricCard";
import { BeforeAfter } from "@/components/BeforeAfter";
import { FlowDiagram } from "@/components/FlowDiagram";
import { RelatedPosts } from "@/components/RelatedPosts";
import { projects } from "@/lib/projects";

const related =
  projects.find((p) => p.slug === "cloudfront-optimization")?.relatedPosts ?? [];

// 민감 정보(실비용)는 표기하지 않고 상대 지수(기준월=100)로 추이만 표현
const costIndexData = [
  { name: "1월 (기준)", before: 100, after: 100 },
  { name: "2월", before: 100, after: 38 },
  { name: "3월", before: 100, after: 23 },
];

const trafficData = [
  { name: "총 요청 수 (만)", before: 1240, after: 220 },
  { name: "데이터 전송 (GB)", before: 845, after: 270 },
];

const imageData = [
  { name: "PNG 원본", before: 850, after: 0 },
  { name: "WebP 변환", before: 0, after: 51 },
];

export default function CloudFrontPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href="/"
        className="text-sm text-muted hover:text-accent transition no-print"
      >
        &larr; 돌아가기
      </Link>

      <div className="mt-6">
        <p className="text-sm font-medium text-accent">2024</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          인프라 비용 최적화
        </h1>
        <p className="mt-2 text-lg text-muted">
          CloudFront 트래픽 구조 개선으로 운영 비용 절감
        </p>
      </div>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <MetricCard
          label="월 CDN 비용"
          value="-77.5%"
          description="3개월 내 달성"
        />
        <MetricCard
          label="요청 수 감소"
          value="-82%"
          description="Edge 캐시 활용"
        />
        <MetricCard
          label="이미지 경량화"
          value="-94%"
          description="WebP 전환"
        />
      </div>

      {/* 비용 요약 */}
      <div className="mt-4 rounded-xl border border-accent/30 bg-accent-light/20 p-4">
        <p className="text-xs text-muted">
          <strong className="text-accent">월별 CDN 비용 추이</strong> — 1월 기준 100 &rarr; 2월 38 &rarr; 3월 23 (상대 지수).
          데이터 기반 분석과 3단계 구조 개선(무효화 범위 한정 / Cache-Control immutable / WebP 전환)이 누적되며 점진적으로 절감 효과 확보.
          <span className="ml-1 text-muted/70">※ 실비용 절대값은 사내 대외비로 표기 생략</span>
        </p>
      </div>

      {/* 문제 정의 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">문제 정의</h2>
        <p className="mt-3 leading-relaxed text-muted">
          대규모 사용자 환경(MAU 50만)에서 트래픽 증가에 따라 CloudFront 비용이 기하급수적으로 폭증했습니다.
          단순히 &quot;비용이 높다&quot;는 현상이 아니라, 비용 지표를 직접 분석하여 두 가지 근본 원인을 규명했습니다.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-red-500">원인 1</p>
            <p className="mt-1 text-sm">
              배포 시 <code className="rounded bg-accent-light px-1.5 py-0.5 text-xs font-mono text-accent">/*</code> 전체 무효화로 인한 대규모 리소스 재다운로드
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-red-500">원인 2</p>
            <p className="mt-1 text-sm">
              고해상도 이미지(PNG/JPEG)의 포맷 한계로 인한 과도한 데이터 전송량
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
              왜 이미지 최적화부터 시작했는가?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              비용 구조를 분석한 결과, Data Transfer가 전체 비용의 가장 큰 비중을 차지하고 있었고
              그 중 이미지가 압도적이었습니다. 서버 측 이미지 리사이징은 이미 적용되어 있었으나
              포맷 자체의 한계(PNG/JPEG)가 있어 WebP 전환이 가장 높은 ROI를 가진 선택지라고 판단했습니다.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-accent">
              왜 무효화 범위를 /index.html로 한정했는가?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Vite 빌드 아웃풋은 해시 기반 파일명(assets/index.abc123.js)을 사용하므로
              파일명 자체가 버전 역할을 합니다. index.html만 무효화하면 브라우저가
              새 엔트리포인트를 받아 자연스럽게 새 해시 자산을 요청하게 되어,
              나머지 자산의 Edge 캐시를 보존할 수 있다고 판단했습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 캐시 전략 다이어그램 */}
      <FlowDiagram
        title="개선된 캐시 무효화 전략"
        steps={[
          { label: "배포 실행", description: "Vite build" },
          { label: "/index.html만 무효화", description: "기존: /* 전체" },
          { label: "Edge 캐시 유지", description: "해시 기반 자산" },
          { label: "비용 절감", description: "MISS율 감소" },
        ]}
      />

      {/* Before/After 차트 */}
      <BeforeAfter title="월별 CDN 비용 상대 지수 (1월=100)" data={costIndexData} />
      <BeforeAfter title="트래픽 변화 (2주간 비교)" data={trafficData} />
      <BeforeAfter title="이미지 용량 비교 (KB)" data={imageData} />

      {/* 구현 상세 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">구현 상세</h2>
        <div className="mt-4 space-y-3">
          <div className="flex gap-3">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs text-white">
              1
            </span>
            <p className="text-sm leading-relaxed">
              이미지 파이프라인에 WebP 포맷 변환 전면 도입 &rarr; 대표 이미지 용량 약 94% 경량화
            </p>
          </div>
          <div className="flex gap-3">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs text-white">
              2
            </span>
            <p className="text-sm leading-relaxed">
              배포 무효화 범위를 <code className="rounded bg-accent-light px-1.5 py-0.5 text-xs font-mono text-accent">/*</code> &rarr; <code className="rounded bg-accent-light px-1.5 py-0.5 text-xs font-mono text-accent">/index.html</code>로 한정하여 Edge 캐시 유지 구조로 개선
            </p>
          </div>
          <div className="flex gap-3">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs text-white">
              3
            </span>
            <p className="text-sm leading-relaxed">
              정적 자산에 Cache-Control <code className="rounded bg-accent-light px-1.5 py-0.5 text-xs font-mono text-accent">immutable</code> 정책 적용으로 오리진(S3) 호출 억제
            </p>
          </div>
        </div>
      </section>

      {/* 회고 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">회고</h2>
        <div className="mt-4 rounded-xl border border-border bg-accent-light/30 p-5">
          <p className="text-sm leading-relaxed">
            초기 중간 데이터에서는 효과가 불분명하게 보이는 구간이 있었으나,
            단기 데이터에 흔들리지 않고 장기 추적한 결과 가설이 맞았음을 확인했습니다.
            데이터 기반 의사결정에서 <strong>관찰 기간의 중요성</strong>을 배운 프로젝트였습니다.
          </p>
        </div>
      </section>

      {/* 블로그 cross-link */}
      <RelatedPosts posts={related} />
    </div>
  );
}
