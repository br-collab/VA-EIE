'use client'

import React from 'react'
import TimelineStep from '@/components/TimelineStep'
import SectionLabel from '@/components/SectionLabel'

interface PathToMarketProps {
  onOpenSimulator: (context: string) => void
}

const steps = [
  {
    head: 'Finalize VA-EIE v1.0 Demo Build',
    sub: 'Complete interactive simulator, all five panels, and live CFR rule engine. Package as pitch-ready web application hosted on Railway.',
  },
  {
    head: 'Prepare IP License Term Sheet',
    sub: 'Draft exclusive federal deployment license covering SDVOSB set-aside eligibility, royalty structure on VA contract award value, and retained commercial rights.',
  },
  {
    head: 'Outreach to Lewis / Eleven09',
    sub: 'Initiate licensing conversation with a focused pitch deck: ROI model, live demo link, IP asset summary, and proposed deal structure. Follow KSTP VA EMM vehicle angle.',
  },
  {
    head: 'Conduct Q&A Readiness Review',
    sub: 'Prepare responses to anticipated objections: build-vs-buy, integration timeline, FISMA/ATO path, incumbent displacement risk, and royalty rate justification.',
  },
  {
    head: 'Build VA CTO / OIT Brief',
    sub: 'Prepare a separate technical brief for VA Office of Information and Technology and VBMS program office. Focus on VBMS integration architecture, rater workflow change impact, and §4.10 compliance urgency.',
  },
  {
    head: 'Contract Award and Deployment',
    sub: 'Execute license agreement, begin SDVOSB set-aside proposal preparation, target VA OIT procurement cycle. Year 1 break-even per ROI model at $260M federal investment basis.',
  },
]

export default function PathToMarket({ onOpenSimulator }: PathToMarketProps) {
  return (
    <div className="space-y-6">
      <div>
        <SectionLabel>Path to Market — 6-Step Plan</SectionLabel>
        <div className="border-0.5 border-va-border bg-va-white px-5 py-5">
          {steps.map((step, idx) => (
            <TimelineStep
              key={step.head}
              number={idx + 1}
              head={step.head}
              sub={step.sub}
              isLast={idx === steps.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Action Card */}
      <div>
        <SectionLabel>Immediate Actions</SectionLabel>
        <div className="border-0.5 border-va-border bg-va-white">
          <div className="bg-va-navy px-4 py-2">
            <span className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gold">
              Launch Workstreams
            </span>
          </div>
          <div className="px-4 py-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() =>
                onOpenSimulator(
                  'Draft outreach to Lewis at Eleven09 regarding VA-EIE licensing opportunity. Frame around KSTP VA EMM prime contract and SDVOSB set-aside eligibility. Include ROI 42:1 and $11B 10-year benefit.'
                )
              }
              className="
                flex-1 bg-va-navy text-va-white font-sans text-xs font-medium
                border-0.5 border-va-navy px-4 py-2.5 text-center
                hover:bg-va-blue-dark transition-colors
                focus:outline-none focus:shadow-focus
              "
            >
              Draft Outreach to Lewis
            </button>
            <button
              onClick={() =>
                onOpenSimulator(
                  'Prepare Q&A readiness document for VA-EIE pitch. Cover: build vs buy analysis, FISMA/ATO path, VBMS integration timeline, incumbent displacement risk, and royalty rate justification against $260M investment.'
                )
              }
              className="
                flex-1 bg-va-blue text-va-white font-sans text-xs font-medium
                border-0.5 border-va-blue px-4 py-2.5 text-center
                hover:bg-va-blue-dark transition-colors
                focus:outline-none focus:shadow-focus
              "
            >
              Prep Q&amp;A
            </button>
            <button
              onClick={() =>
                onOpenSimulator(
                  'Build VA CTO brief for VA Office of Information and Technology. Focus on VBMS integration architecture, rater workflow efficiency gains, §4.10 Feb 2026 compliance urgency, and CUE risk reduction. Target OIT procurement cycle.'
                )
              }
              className="
                flex-1 bg-va-white text-va-navy font-sans text-xs font-medium
                border-0.5 border-va-navy px-4 py-2.5 text-center
                hover:bg-va-gray-light transition-colors
                focus:outline-none focus:shadow-focus
              "
            >
              Build VA CTO Brief
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
