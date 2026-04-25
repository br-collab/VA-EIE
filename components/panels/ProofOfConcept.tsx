'use client'

import React from 'react'
import ProofBox from '@/components/ProofBox'
import SectionLabel from '@/components/SectionLabel'
import Badge from '@/components/Badge'

const proofBoxes = [
  {
    label: 'Thesis Confirmed',
    body: 'VA adjudication error patterns are structurally predictable from MOS, era, and condition type. A rules engine encoding 38 CFR can identify those patterns at intake — before rater assignment — with demonstrable consistency.',
  },
  {
    label: 'TERA Finding',
    body: 'Toxic Exposure Risk Activity (TERA) documentation is absent or incomplete in an estimated majority of Post-9/11 claims where PACT Act presumptions apply. EIE auto-detection closes this gap at intake without rater intervention.',
  },
  {
    label: 'Underpayment Pattern',
    body: 'Systematic application of pre-Feb 2026 §4.10 standard to post-amendment claims creates a recoverable underpayment pattern. CUE engine identifies affected decisions and calculates retroactive correction exposure.',
  },
  {
    label: 'What Was Not Proven',
    body: 'This proof of concept does not prove claim outcome prediction — only action path determination. Individual veteran outcomes depend on evidence quality and examiner judgment outside engine scope.',
  },
]

export default function ProofOfConcept() {
  return (
    <div className="space-y-6">
      <div>
        <SectionLabel>Proof of Concept — Findings</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {proofBoxes.map((box) => (
            <ProofBox key={box.label} label={box.label} body={box.body} />
          ))}
        </div>
      </div>

      {/* Legislation Status Card */}
      <div>
        <SectionLabel>Legislation Status — H.R. 3854</SectionLabel>
        <div className="border-0.5 border-va-border bg-va-white">
          <div className="bg-va-navy px-4 py-2 flex items-center justify-between gap-3">
            <span className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gold">
              Veterans Benefits Improvement Act of 2025
            </span>
            <Badge variant="amber">Senate Pending</Badge>
          </div>
          <div className="px-4 py-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="border-0.5 border-va-border px-3 py-2">
                <div className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gray-mid mb-1">
                  House Vote
                </div>
                <div className="font-sans text-sm text-va-gray-dark font-medium">Passed</div>
                <div className="font-dm-mono text-[10px] text-va-gray-mid">Sep 15, 2025</div>
              </div>
              <div className="border-0.5 border-va-border px-3 py-2">
                <div className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gray-mid mb-1">
                  Senate Referral
                </div>
                <div className="font-sans text-sm text-va-gray-dark font-medium">Referred</div>
                <div className="font-dm-mono text-[10px] text-va-gray-mid">Sep 16, 2025</div>
              </div>
              <div className="border-0.5 border-va-border px-3 py-2">
                <div className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gray-mid mb-1">
                  Current Status
                </div>
                <div className="font-sans text-sm text-va-amber font-medium">Passed House — Senate Next</div>
                <div className="font-dm-mono text-[10px] text-va-gray-mid">No committee action since referral</div>
              </div>
            </div>
            <p className="font-sans text-xs text-va-gray-mid leading-relaxed">
              If enacted, H.R. 3854 would expand §3.159 duty-to-assist obligations and codify certain
              EIE-applicable evidence standards. Senate committee action is the next required step.
              No hearing scheduled as of Apr 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
