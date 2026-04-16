"use client";

import { MetricCard } from "@/components/MetricCard";
import { FlowDiagram } from "@/components/FlowDiagram";

export default function TouchCarouselPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <a href="/" className="text-sm text-muted hover:text-accent transition no-print">
        &larr; 돌아가기
      </a>

      <div className="mt-6">
        <p className="text-sm font-medium text-accent">2023-2024</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          커스텀 터치 제스처 캐러셀
        </h1>
        <p className="mt-2 text-lg text-muted">
          서드파티 미사용, 네이티브급 제스처 엔진 직접 구현
        </p>
      </div>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <MetricCard label="제스처" value="4종" description="스와이프/핀치/더블탭/Pull-to-dismiss" />
        <MetricCard label="사용 서비스" value="3개+" description="공용 컴포넌트" />
        <MetricCard label="릴리스" value="136회" description="@htbeyond/uikit" />
      </div>

      {/* 문제 정의 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">문제 정의</h2>
        <p className="mt-3 leading-relaxed text-muted">
          기존 서드파티 캐러셀(Swiper, Embla)이 디자인 시스템의 풀스크린 이미지 뷰어
          요구사항을 충족하지 못했습니다. 특히 핀치투줌(0.5x~3x), Pull-to-dismiss 제스처는
          서드파티에서 지원하지 않거나 커스터마이징이 제한적이었습니다.
        </p>
      </section>

      {/* 제스처 엔진 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">제스처 엔진 설계</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-accent">스와이프 방향 판별</p>
            <div className="mt-2 rounded-lg bg-foreground/5 p-3 font-mono text-xs">
              <p className="text-muted">// 터치 각도로 수평/수직 판별</p>
              <p>const angle = <span className="text-accent">Math.atan2</span>(dy, dx)</p>
              <p>const isHorizontal = Math.abs(angle) &lt; threshold</p>
            </div>
            <p className="mt-2 text-xs text-muted">
              atan2로 터치 이동 각도를 계산하여 정확한 방향 판별
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-accent">핀치투줌 (0.5x ~ 3x)</p>
            <div className="mt-2 rounded-lg bg-foreground/5 p-3 font-mono text-xs">
              <p className="text-muted">// 두 손가락 간 거리 변화로 줌 계산</p>
              <p>const dist = <span className="text-accent">Math.hypot</span>(dx, dy)</p>
              <p>const scale = clamp(dist / initDist, 0.5, 3)</p>
            </div>
            <p className="mt-2 text-xs text-muted">
              hypot으로 두 터치포인트 간 거리를 실시간 추적
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-accent">더블탭 줌</p>
            <p className="mt-2 text-sm text-muted">
              300ms 이내 연속 탭 감지 &rarr; 탭 위치 기준으로 줌인/줌아웃 토글.
              CSS transform-origin으로 탭 포인트 중심 확대.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-accent">Pull-to-dismiss</p>
            <p className="mt-2 text-sm text-muted">
              수직 드래그 거리에 비례하여 배경 opacity 감소 + 스케일 축소.
              임계값 초과 시 모달 닫기, 미만 시 스프링 애니메이션으로 복귀.
            </p>
          </div>
        </div>
      </section>

      {/* 컴포넌트 구조 */}
      <FlowDiagram
        title="Compound Component 패턴"
        steps={[
          { label: "Carousel.Wrapper", description: "제스처 컨텍스트" },
          { label: "Carousel.Image", description: "이미지 렌더링" },
          { label: "Carousel.Modal", description: "풀스크린 뷰어" },
          { label: "Carousel.Progress", description: "인디케이터" },
        ]}
      />

      {/* 왜 직접 만들었는가 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">의사결정 과정</h2>
        <div className="mt-4 rounded-xl border border-border bg-card p-5">
          <p className="text-sm font-semibold text-accent">왜 서드파티를 사용하지 않았는가?</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Swiper와 Embla를 모두 검토했으나, 핀치투줌과 Pull-to-dismiss를 동시에 지원하지 않았습니다.
            서드파티 위에 제스처 레이어를 얹는 것보다, 터치 이벤트부터 직접 처리하는 것이
            더 깔끔하고 유지보수 가능한 구조라고 판단했습니다.
          </p>
        </div>
      </section>

      {/* 결과 */}
      <section className="mt-12 mb-8">
        <h2 className="text-xl font-bold">결과</h2>
        <div className="mt-4 rounded-xl border border-border bg-accent-light/30 p-5">
          <ul className="space-y-2 text-sm leading-relaxed">
            <li>Compound Component 패턴으로 구조화하여 3개 이상 서비스에서 공용 사용</li>
            <li>@htbeyond/uikit 패키지로 배포, 136회 릴리스 운영</li>
            <li>네이티브 앱 수준의 터치 UX를 웹에서 구현하여 사용자 경험 향상</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
