export interface ROIMetrics {
  roiRatio: string
  tenYearBenefit: string
  errorReduction: string
  fteHours: string
  investment: string
  breakEven: string
  remandReduction: string
  cueAvoidance: string
  productivity: string
}

export const metrics: ROIMetrics = {
  roiRatio:        '42:1',
  tenYearBenefit:  '$11B',
  errorReduction:  '70%',
  fteHours:        '1.8M',
  investment:      '$260M',
  breakEven:       'Year 1',
  remandReduction: '$525M–$790M',
  cueAvoidance:    '$150M–$720M',
  productivity:    '$180M–$250M',
}
