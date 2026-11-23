export interface CorporateField {
  id: string;
  label: string;
  value: string;
  mono?: boolean;
  note?: string;
}

export interface CapabilityItem {
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
  spanTwo?: boolean;
}

export type AppCategory = 'Utilities' | 'Productivity' | 'Commerce';

export interface PublishedApp {
  id: string;
  name: string;
  packageName: string;
  category: AppCategory;
  releaseTrack: string;
  targetSdk: string;
  version: string;
  summary: string;
  permissions: string[];
  dataSafety: string;
  playStoreUrl?: string;
}

export const COMPANY_PROFILE = {
  legalName: 'KYRKHU PRIVATE LIMITED',
  cin: 'U46305ML2023PTC014072',
  pan: 'AFTDW8989G',
  tan: 'SRSTH5478A',
  incorporationDate: '28 December 2023',
  companyType: 'Company limited by shares (Private)',
  registrar: 'Registrar of Companies, Central Registration Centre (Manesar)',
  act: 'Companies Act, 2013 (18 of 2013)',
  addressLine1: 'House No 84, Wahlyngkhat, Pynursla',
  addressLine2: 'East Khasi Hills, Meghalaya, 793110 - India',
  fullAddress:
    'House No 84, Wahlyngkhat, Pynursla, East Khasi Hills, Meghalaya, 793110 - India',
  certificatePdfUrl: '/assets/aistudio/KYRKHU_PRIVATE_LIMITED_ec60fbd1.pdf',
  mcaVerificationUrl: 'https://www.mca.gov.in',
};

export const CORPORATE_VERIFICATION_FIELDS: CorporateField[] = [
  {
    id: 'legal-name',
    label: 'Registered Legal Entity',
    value: COMPANY_PROFILE.legalName,
  },
  {
    id: 'cin',
    label: 'Corporate Identity Number (CIN)',
    value: COMPANY_PROFILE.cin,
    mono: true,
    note: 'Verifiable on Ministry of Corporate Affairs (mca.gov.in)',
  },
  {
    id: 'incorporation-date',
    label: 'Date of Incorporation',
    value: COMPANY_PROFILE.incorporationDate,
    mono: true,
  },
  {
    id: 'company-type',
    label: 'Entity Classification',
    value: COMPANY_PROFILE.companyType,
  },
  {
    id: 'pan',
    label: 'Permanent Account Number (PAN)',
    value: COMPANY_PROFILE.pan,
    mono: true,
  },
  {
    id: 'tan',
    label: 'Tax Deduction Account Number (TAN)',
    value: COMPANY_PROFILE.tan,
    mono: true,
  },
  {
    id: 'address',
    label: 'Registered Mailing Address',
    value: COMPANY_PROFILE.fullAddress,
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    number: '01',
    title: 'Native Android Application Engineering',
    summary:
      'We architect, develop, and maintain Android applications built with Kotlin, Jetpack Compose, and Android App Bundle (AAB) packaging. Every release adheres to modern background execution limits, scoped storage, and strict memory budgets.',
    deliverables: [
      'Android 15 (API 35) target SDK compliance',
      'Signed AAB builds with Play App Signing',
      'Offline-first local persistence and graceful sync',
    ],
    spanTwo: true,
  },
  {
    number: '02',
    title: 'Google Play Policy & Data Safety Governance',
    summary:
      'Dedicated privacy engineering ensuring every permission request, third-party SDK, and user data flow matches published Data Safety declarations and India DPDP Act requirements.',
    deliverables: [
      'Least-privilege permission audits',
      'Transparent account and data deletion workflows',
      'Pre-submission content rating and policy review',
    ],
  },
  {
    number: '03',
    title: 'Staged Release & Crash Telemetry',
    summary:
      'Structured rollout discipline across internal testing, closed beta tracks, and staged production rollouts with automated crash-free session monitoring prior to 100% availability.',
    deliverables: [
      'Internal & closed testing track verification',
      'Incremental 10% -> 50% -> 100% production rollouts',
      'ANR and startup latency regression checks',
    ],
  },
  {
    number: '04',
    title: 'Dedicated User Support & Lifecycle Maintenance',
    summary:
      'Direct corporate accountability for end users across India and global markets, providing timely email support, billing resolution, and predictable security patches.',
    deliverables: [
      'Direct support channel monitored in IST',
      'Quarterly dependency and security updates',
      'Clear refund, account recovery, and grievance handling',
    ],
    spanTwo: true,
  },
];

export const INITIAL_APPS: PublishedApp[] = [
  {
    id: 'kyrkhu-ledger',
    name: 'Kyrkhu Field Ledger',
    packageName: 'com.kyrkhu.fieldledger',
    category: 'Commerce',
    releaseTrack: 'Production Track',
    targetSdk: 'Android 15 (API 35)',
    version: '1.4.2',
    summary:
      'Lightweight inventory, invoice tracking, and offline receipt management built for regional merchants and field distribution teams.',
    permissions: ['Camera (Document & QR scan)', 'Network State (Sync status)'],
    dataSafety:
      'Encrypted in transit over TLS 1.3. Users may export or permanently delete all business records from within Settings or via our Data Deletion portal.',
  },
  {
    id: 'kyrkhu-tasks',
    name: 'Kyrkhu Dispatch & Tasks',
    packageName: 'com.kyrkhu.dispatch',
    category: 'Productivity',
    releaseTrack: 'Closed Testing Track',
    targetSdk: 'Android 15 (API 35)',
    version: '1.1.0',
    summary:
      'Structured daily checklist, shift handoff, and delivery confirmation application designed for small operations teams operating in low-connectivity zones.',
    permissions: ['Notifications (Shift reminders)', 'Foreground Sync'],
    dataSafety:
      'No third-party advertising SDKs. Operational logs are retained solely for active workspace members and purged on account closure.',
  },
  {
    id: 'kyrkhu-scan',
    name: 'Kyrkhu DocScan Utility',
    packageName: 'com.kyrkhu.docscan',
    category: 'Utilities',
    releaseTrack: 'Internal Review Track',
    targetSdk: 'Android 15 (API 35)',
    version: '1.0.5',
    summary:
      'On-device PDF document cropping, compression, and secure sharing utility with zero cloud upload required for standard scans.',
    permissions: ['Camera (On-device capture)'],
    dataSafety:
      'All document processing runs locally on the user device. No personal files or document images are transmitted to external servers.',
  },
];

export const APP_ADS_TXT_CONTENT = `# Official app-ads.txt specification for KYRKHU PRIVATE LIMITED
# Corporate Identity Number (CIN): U46305ML2023PTC014072
# Registered Office: House No 84, Wahlyngkhat, Pynursla, East Khasi Hills, Meghalaya, 793110 - India
#
# Authorized digital advertising seller entries will be listed below when
# monetization SDKs are active. Apps without ad SDKs do not serve ads.`;
