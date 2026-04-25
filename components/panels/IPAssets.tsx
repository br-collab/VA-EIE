'use client'

import React from 'react'
import IPCard from '@/components/IPCard'
import RuleRow from '@/components/RuleRow'
import SectionLabel from '@/components/SectionLabel'

const ipCards = [
  {
    title: 'Regulatory Knowledge Graph',
    description:
      'Comprehensive encoding of 38 CFR Parts 3 and 4 as machine-executable rule nodes, including amendment tracking, effective dates, and inter-rule dependencies. Not available from any commercial vendor.',
    tag: 'Core IP',
  },
  {
    title: 'MOS-to-CFR Inference Engine',
    description:
      'Proprietary mapping of all DOD occupational specialties to applicable CFR triggers, presumption thresholds, and duty-to-assist obligations. Enables instant regulatory path determination from MOS code alone.',
    tag: 'Core IP',
  },
  {
    title: 'CUE Risk Scoring Model',
    description:
      'Structured methodology for identifying Clear and Unmistakable Error patterns in prior VA decisions. Generates retroactive award exposure estimates and prioritizes correction queue.',
    tag: 'Methodology',
  },
  {
    title: 'Real-Time CFR Amendment Sync',
    description:
      'Automated ingestion of Federal Register updates to 38 CFR with semantic diffing, backward-compatibility analysis, and rater notification. Includes Feb 2026 §4.10 functional impairment amendment.',
    tag: 'System',
  },
  {
    title: 'Evidence Sufficiency Classifier',
    description:
      'Multi-factor classifier that scores evidence packages against CFR requirements per condition. Identifies gaps, recommends development actions, and applies benefit-of-the-doubt weighting per §5107(b).',
    tag: 'Model',
  },
  {
    title: 'PACT Act Presumption Layer',
    description:
      'Full implementation of §3.309/§3.320 toxic exposure presumptions with era verification, covered location cross-reference, and automatic nexus bypass for 23 listed condition categories.',
    tag: 'Core IP',
  },
]

const moatRows = [
  {
    icon: 'info' as const,
    title: 'Domain Expertise Barrier',
    cite: '38 CFR §3–4',
    action:
      'Correct regulatory encoding requires VA adjudication experience that cannot be replicated by general AI vendors without years of specialized training data curation.',
  },
  {
    icon: 'info' as const,
    title: 'Primary Source Dependency',
    cite: '38 USC §5107',
    action:
      'Engine logic must trace directly to statutory and regulatory text. Summaries or secondary sources introduce error drift that creates liability in federal adjudication contexts.',
  },
  {
    icon: 'info' as const,
    title: 'Regulatory Freshness Requirement',
    cite: '§4.10 (Feb 2026)',
    action:
      'VA rules change via Federal Register rulemaking. Stale rule logic creates CUE exposure for VA. Continuous amendment tracking is a non-negotiable operational requirement, not a feature.',
  },
]

export default function IPAssets() {
  return (
    <div className="space-y-6">
      <div>
        <SectionLabel>Licensed Intellectual Property Assets</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ipCards.map((card) => (
            <IPCard
              key={card.title}
              title={card.title}
              description={card.description}
              tag={card.tag}
            />
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Competitive Moat — Why This Cannot Be Replicated Quickly</SectionLabel>
        <div className="border-0.5 border-va-border bg-va-white">
          <div className="px-4 py-2">
            {moatRows.map((row) => (
              <RuleRow
                key={row.cite}
                icon={row.icon}
                title={row.title}
                cite={row.cite}
                action={row.action}
                lightSurface={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
