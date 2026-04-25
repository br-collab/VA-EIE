'use client'

import React from 'react'
import SectionLabel from '@/components/SectionLabel'
import Badge from '@/components/Badge'

const builderBrings = [
  'VA-EIE source code — all components, data layer, API routes',
  'CFR rule graph with 38 CFR Parts 3 & 4 encoded',
  'MOS-to-CFR inference engine (30 MOS codes, extensible)',
  'CUE risk scoring methodology and retroactive exposure model',
  'Anthropic claude-sonnet-4-6 integration for rater queue generation',
  'PACT Act presumption layer — §3.309/§3.320 full implementation',
  'Real-time Federal Register amendment sync architecture',
  'Evidence sufficiency classifier with §5107(b) benefit-of-the-doubt weighting',
]

const partnerBrings = [
  'SDVOSB certification — eligible for VA set-aside contract vehicles',
  'KSTP VA EMM prime contract ($63.5M) — existing delivery vehicle',
  'Eleven09 federal relationships and contracting infrastructure',
  'Past performance on VA IT delivery — required for competitive response',
  'BD and capture management for VA OIT / VBMS procurement pipeline',
  'Contract vehicle access (GSA MAS, CIO-SP3, or equivalent)',
  'Compliance and ATO support for VA network deployment',
]

const licenseTerms = [
  { term: 'License Type', value: 'Exclusive federal deployment rights' },
  { term: 'Authorship', value: 'Builder retains IP authorship and commercial rights' },
  { term: 'Royalty Basis', value: 'Percentage of VA contract award value' },
  { term: 'Set-Aside Eligibility', value: 'SDVOSB — Eleven09/KSTP qualifies' },
  { term: 'TAM', value: '$40B–$60B federal claims tech addressable market' },
  { term: 'Break-Even', value: 'Year 1 (per ROI model at $260M investment)' },
  { term: 'Exclusivity Scope', value: 'VA / federal benefits adjudication only' },
  { term: 'Commercial Rights', value: 'Builder retains for non-federal deployment' },
]

export default function CommercialStructure() {
  return (
    <div className="space-y-6">
      <div>
        <SectionLabel>Deal Structure — What Each Party Brings</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Builder */}
          <div className="border-0.5 border-va-border bg-va-white">
            <div className="bg-va-navy px-4 py-2 flex items-center gap-3">
              <span className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gold">
                Builder Contribution
              </span>
              <Badge variant="gold">IP + Technology</Badge>
            </div>
            <ul className="px-4 py-3 space-y-2">
              {builderBrings.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="font-dm-mono text-va-green text-xs mt-0.5 shrink-0">›</span>
                  <span className="font-sans text-xs text-va-gray-dark leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner */}
          <div className="border-0.5 border-va-border bg-va-white">
            <div className="bg-va-blue-dark px-4 py-2 flex items-center gap-3">
              <span className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gold">
                Eleven09 / KSTP Contribution
              </span>
              <Badge variant="blue">Vehicle + BD</Badge>
            </div>
            <ul className="px-4 py-3 space-y-2">
              {partnerBrings.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="font-dm-mono text-va-blue text-xs mt-0.5 shrink-0">›</span>
                  <span className="font-sans text-xs text-va-gray-dark leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* License Terms Table */}
      <div>
        <SectionLabel>License Term Summary</SectionLabel>
        <div className="border-0.5 border-va-border bg-va-white overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-va-gray-light border-b border-va-border">
                <th className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gray-mid text-left px-4 py-2 w-1/3">
                  Term
                </th>
                <th className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gray-mid text-left px-4 py-2">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {licenseTerms.map((row, idx) => (
                <tr
                  key={row.term}
                  className={`border-b border-va-border last:border-b-0 ${
                    idx % 2 === 0 ? 'bg-va-white' : 'bg-va-gray-light'
                  }`}
                >
                  <td className="font-dm-mono text-[11px] text-va-gray-mid px-4 py-2 align-top">
                    {row.term}
                  </td>
                  <td className="font-sans text-xs text-va-gray-dark px-4 py-2 align-top">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
