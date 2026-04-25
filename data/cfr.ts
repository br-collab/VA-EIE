export type CFRStatus = 'Active' | 'Amended' | 'Pending' | 'Case Law'

export interface CFRNode {
  cite: string
  title: string
  part: string
  status: CFRStatus
  summary: string
  triggers: string[]
  vaEieAction: string
}

export const cfrRules: CFRNode[] = [
  {
    cite: '§3.159(c)(1)',
    title: 'Duty to Assist — Medical Examination',
    part: '38 CFR Part 3',
    status: 'Active',
    summary:
      'VA must provide a medical examination or medical opinion when required to make a decision on a claim, including when service connection is established and the disability may have worsened.',
    triggers: ['New claim filed', 'Nexus evidence insufficient', 'C&P exam not of record'],
    vaEieAction: 'Auto-flag missing C&P exam; generate duty-to-assist notice; queue medical opinion request',
  },
  {
    cite: '§3.159(c)(4)',
    title: 'Duty to Assist — Records',
    part: '38 CFR Part 3',
    status: 'Active',
    summary:
      'VA must make reasonable efforts to obtain relevant records the claimant identifies and authorizes VA to obtain, including federal records.',
    triggers: ['STR gap identified', 'Federal records missing', 'Authorization not on file'],
    vaEieAction: 'Auto-generate records request; flag STR gap; queue authorization reminder',
  },
  {
    cite: '§3.304(f)(2)',
    title: 'PTSD — Combat Veteran Presumption',
    part: '38 CFR Part 3',
    status: 'Active',
    summary:
      'For veterans with a combat MOS, PTSD is conceded based on the veteran\'s own statement of the stressor if consistent with their service circumstances. No independent corroboration required.',
    triggers: ['PTSD claimed', 'Combat MOS confirmed', 'No corroborating records needed'],
    vaEieAction: 'Apply combat presumption; waive stressor corroboration; fast-track rating',
  },
  {
    cite: '§3.304(f)(3)',
    title: 'PTSD — Personal Assault / MST',
    part: '38 CFR Part 3',
    status: 'Active',
    summary:
      'PTSD based on personal assault (including MST) may be established through markers such as behavioral changes, treatment records, or buddy statements in lieu of official records.',
    triggers: ['PTSD claimed — MST basis', 'No official stressor record', 'Behavioral markers present'],
    vaEieAction: 'Identify MST markers in records; advise on alternative evidence; flag for specialized review',
  },
  {
    cite: '§3.303',
    title: 'Direct Service Connection',
    part: '38 CFR Part 3',
    status: 'Active',
    summary:
      'A disability may be service connected by showing: (1) a current disability, (2) in-service incurrence or aggravation, and (3) a nexus between the two. Chronic diseases may be presumed.',
    triggers: ['Current disability claimed', 'In-service event documented', 'Nexus required'],
    vaEieAction: 'Verify three-prong nexus; identify STR entries; queue nexus opinion if gap exists',
  },
  {
    cite: 'Clemons v. Shinseki (2010)',
    title: 'Claim Scope — Liberal Reading',
    part: 'Case Law — Fed. Cir.',
    status: 'Case Law',
    summary:
      'VA must liberally read a claim for PTSD to include all forms of PTSD, not just the specific stressor identified. Filing for PTSD from combat encompasses PTSD from MST if supported by evidence.',
    triggers: ['PTSD claim filed', 'Single stressor listed', 'Multiple bases may apply'],
    vaEieAction: 'Expand claim scope automatically; scan for alternate stressor bases; alert rater to liberal reading rule',
  },
  {
    cite: '§3.105(a)',
    title: 'Clear and Unmistakable Error (CUE)',
    part: '38 CFR Part 3',
    status: 'Active',
    summary:
      'A prior final VA decision may be revised if it was based on a CUE — an error of fact or law that, if corrected, would manifestly change the outcome. No benefit-of-the-doubt standard applies.',
    triggers: ['Prior final decision on file', 'Rating criteria misapplied', 'Law ignored at time of decision'],
    vaEieAction: 'Scan prior decisions for rating misapplication; flag CUE candidates; calculate retroactive award exposure',
  },
  {
    cite: '§4.10 (Feb 2026)',
    title: 'Functional Impairment — Amended Standard',
    part: '38 CFR Part 4',
    status: 'Amended',
    summary:
      'Amended February 2026 to require raters to explicitly document functional impairment as distinct from diagnosis. Ratings must reflect actual occupational and social impairment, not diagnosis alone.',
    triggers: ['Rating evaluation required', 'Functional impairment not documented', 'Post-Feb 2026 claim'],
    vaEieAction: 'Flag ratings lacking functional impairment documentation; generate §4.10 compliance checklist',
  },
  {
    cite: '§3.309/§3.320',
    title: 'PACT Act — Toxic Exposure Presumptions',
    part: '38 CFR Part 3',
    status: 'Active',
    summary:
      'Establishes presumptive service connection for veterans with certain toxic exposures (burn pits, Agent Orange, radiation) deployed in covered locations and eras. Removes nexus burden for listed conditions.',
    triggers: ['Post-9/11 or Gulf War era', 'Burn pit / toxic exposure claim', 'Covered condition on list'],
    vaEieAction: 'Auto-apply PACT presumption; verify era and location; remove nexus requirement for listed conditions',
  },
  {
    cite: '§1154(b)',
    title: 'Competent Lay Evidence — Combat Veterans',
    part: '38 USC §1154(b)',
    status: 'Active',
    summary:
      'Combat veterans are deemed competent to describe their own in-service injuries and diseases. A lay statement from a combat veteran carries the weight of medical evidence for in-service incurrence.',
    triggers: ['Combat MOS confirmed', 'No STR documenting event', 'Lay statement submitted'],
    vaEieAction: 'Elevate lay statement to near-medical weight; document combat verification; reduce STR gap penalty',
  },
]
