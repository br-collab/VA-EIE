'use client'

import React, { useState } from 'react'
import MetricCard from '@/components/MetricCard'
import DecisionEngine from '@/components/panels/DecisionEngine'
import IPAssets from '@/components/panels/IPAssets'
import ProofOfConcept from '@/components/panels/ProofOfConcept'
import CommercialStructure from '@/components/panels/CommercialStructure'
import PathToMarket from '@/components/panels/PathToMarket'
import Simulator from '@/components/Simulator'
import { metrics } from '@/data/metrics'

type TabId = 'decision' | 'ip' | 'proof' | 'commercial' | 'path' | 'simulator'

interface Tab {
  id: TabId
  label: string
}

const tabs: Tab[] = [
  { id: 'decision',   label: 'Decision Engine' },
  { id: 'ip',         label: 'IP Assets' },
  { id: 'proof',      label: 'Proof of Concept' },
  { id: 'commercial', label: 'Commercial Structure' },
  { id: 'path',       label: 'Path to Market' },
  { id: 'simulator',  label: 'Live Simulator' },
]

const metaDots = [
  'CFR live Apr 2026',
  'H.R. 3854 Senate pending',
  'KSTP VA EMM prime $63.5M',
  'SDVOSB set-aside eligible',
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>('decision')
  const [simulatorContext, setSimulatorContext] = useState<string | undefined>(undefined)

  const openSimulator = (context: string) => {
    setSimulatorContext(context)
    setActiveTab('simulator')
  }

  return (
    <div className="min-h-screen bg-va-gray-light">
      {/* Top bar */}
      <div className="bg-va-navy border-b border-va-blue-dark">
        <div className="max-w-6xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <span className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gold">
            VA · EIE · v1.0
          </span>
          <span className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gray-mid">
            Confidential Commercial Brief
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-va-navy border-b-0.5 border-va-border">
        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* Eyebrow */}
          <div className="font-dm-mono text-[11px] uppercase tracking-[0.2em] text-va-gold mb-4">
            VA · EIE · v1.0 · Confidential commercial brief
          </div>

          {/* H1 */}
          <h1 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl text-va-white leading-tight mb-3">
            VA Evidence{' '}
            <span className="text-va-blue">Intelligence</span>{' '}
            Engine
          </h1>

          {/* Sub copy */}
          <p className="font-sans text-[15px] text-va-gray-light max-w-2xl leading-relaxed mb-6">
            A licensed regulatory AI engine that transforms 38 CFR into machine-executable rater
            action queues — eliminating adjudication errors, cutting remands, and delivering
            year-one ROI on federal VA contract deployment.
          </p>

          {/* Meta dots */}
          <div className="flex flex-wrap gap-x-5 gap-y-1.5">
            {metaDots.map((dot) => (
              <div key={dot} className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-va-gold" />
                <span className="font-dm-mono text-[11px] text-va-gray-mid uppercase tracking-widest">
                  {dot}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="bg-va-navy border-b border-va-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetricCard
              number={metrics.roiRatio}
              label="Federal ROI Ratio"
              subLabel="vs $260M investment"
              className="bg-va-blue-dark border-va-blue"
            />
            <MetricCard
              number={metrics.tenYearBenefit}
              label="10-Year Net Benefit"
              subLabel="federal basis"
              className="bg-va-blue-dark border-va-blue"
            />
            <MetricCard
              number={metrics.errorReduction}
              label="Error Reduction"
              subLabel="adjudication target"
              className="bg-va-blue-dark border-va-blue"
            />
            <MetricCard
              number={metrics.fteHours}
              label="FTE Hours Recovered"
              subLabel="annual basis"
              className="bg-va-blue-dark border-va-blue"
            />
          </div>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="bg-va-white border-b border-va-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  font-dm-mono text-[11px] uppercase tracking-widest
                  px-4 py-3 border-b-2 whitespace-nowrap shrink-0
                  focus:outline-none focus:shadow-focus transition-colors
                  ${
                    activeTab === tab.id
                      ? 'border-b-va-navy text-va-navy'
                      : 'border-b-transparent text-va-gray-mid hover:text-va-navy hover:border-b-va-border'
                  }
                `}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                {tab.label}
                {tab.id === 'simulator' && (
                  <span className="ml-1.5 inline-block w-1.5 h-1.5 bg-va-green rounded-full align-middle" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Panel Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === 'decision' && <DecisionEngine />}
        {activeTab === 'ip' && <IPAssets />}
        {activeTab === 'proof' && <ProofOfConcept />}
        {activeTab === 'commercial' && <CommercialStructure />}
        {activeTab === 'path' && <PathToMarket onOpenSimulator={openSimulator} />}
        {activeTab === 'simulator' && <Simulator prefillContext={simulatorContext} />}
      </div>

      {/* Footer */}
      <footer className="border-t border-va-border bg-va-white mt-8">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <span className="font-dm-mono text-[10px] uppercase tracking-widest text-va-gray-mid">
            VA-EIE · Confidential · Licensed IP — Not for distribution
          </span>
          <span className="font-dm-mono text-[10px] text-va-gray-mid">
            Eleven09 / KSTP · Federal VA Contract Pitch · Apr 2026
          </span>
        </div>
      </footer>
    </div>
  )
}
