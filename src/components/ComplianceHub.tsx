import {useState, type FormEvent} from 'react';
import {Check, Copy} from 'lucide-react';
import {APP_ADS_TXT_CONTENT, COMPANY_PROFILE, type PublishedApp} from '../data/companyData';

export type ComplianceTab = 'privacy' | 'terms' | 'deletion' | 'app-ads';

interface ComplianceHubProps {
  activeTab: ComplianceTab;
  onTabChange: (tab: ComplianceTab) => void;
  apps: PublishedApp[];
}

const TABS: {id: ComplianceTab; label: string}[] = [
  {id: 'privacy', label: 'Privacy Policy'},
  {id: 'terms', label: 'Terms of Service'},
  {id: 'deletion', label: 'Account & Data Deletion'},
  {id: 'app-ads', label: 'app-ads.txt Specification'},
];

export default function ComplianceHub({
  activeTab,
  onTabChange,
  apps,
}: ComplianceHubProps) {
  const [copiedAds, setCopiedAds] = useState(false);

  // Account / Data deletion form state
  const [deletionEmail, setDeletionEmail] = useState('');
  const [deletionApp, setDeletionApp] = useState(apps[0]?.packageName || 'all');
  const [deletionScope, setDeletionScope] = useState<'full-account' | 'partial-data'>('full-account');
  const [deletionError, setDeletionError] = useState('');
  const [deletionSubmittedRef, setDeletionSubmittedRef] = useState('');

  const handleCopyAdsTxt = async () => {
    try {
      await navigator.clipboard.writeText(APP_ADS_TXT_CONTENT);
      setCopiedAds(true);
      window.setTimeout(() => setCopiedAds(false), 2000);
    } catch {
      setCopiedAds(false);
    }
  };

  const handleDeletionSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedEmail = deletionEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setDeletionError('Enter a valid email address associated with your application account.');
      return;
    }
    setDeletionError('');
    const refCode = `DEL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setDeletionSubmittedRef(refCode);
    setDeletionEmail('');
  };

  return (
    <section id="compliance" className="border-t border-slate-200 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-blue-700">
            Play Console Policy &amp; Legal Documentation
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance sm:text-4xl">
            User Privacy, Terms, and Data Safety Governance
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Every mobile application published by {COMPANY_PROFILE.legalName} adheres to Google
            Play User Data Policies and the Digital Personal Data Protection (DPDP) Act, 2023.
          </p>
        </div>

        <div className="mt-10">
          <div
            role="tablist"
            aria-label="Legal and compliance documents"
            className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onTabChange(tab.id)}
                  className={`rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 lg:p-10">
            {activeTab === 'privacy' && (
              <div id="privacy-policy" className="max-w-4xl space-y-6 text-sm leading-relaxed text-slate-700">
                <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-slate-200 pb-4">
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    Corporate &amp; Application Privacy Policy
                  </h3>
                  <span className="font-mono text-xs text-slate-500 tabular-nums">
                    Effective Date: 01 January 2026
                  </span>
                </div>

                <p>
                  This Privacy Policy governs the collection, use, storage, and disclosure of
                  information across mobile applications published on Google Play and web services
                  operated by <strong>{COMPANY_PROFILE.legalName}</strong> (CIN:{' '}
                  <span className="font-mono">{COMPANY_PROFILE.cin}</span>), having its registered
                  office at {COMPANY_PROFILE.fullAddress}.
                </p>

                <div className="space-y-2">
                  <h4 className="font-display text-base font-semibold text-slate-900">
                    1. Information We Collect
                  </h4>
                  <p>
                    Depending on the specific application you use, we collect only the minimum data
                    strictly necessary to provide core functionality:
                  </p>
                  <ul className="list-disc space-y-1.5 pl-5">
                    <li>
                      <strong>Account &amp; Contact Information:</strong> Name, email address, or
                      business identifier voluntarily provided during account registration or support
                      inquiries.
                    </li>
                    <li>
                      <strong>Device &amp; Diagnostic Telemetry:</strong> Crash logs, Android OS
                      version, and app version identifiers collected solely to maintain stability and
                      resolve defects.
                    </li>
                    <li>
                      <strong>Device Permissions:</strong> Camera, storage, or notification
                      permissions are requested strictly at runtime only when you initiate a feature
                      requiring them.
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display text-base font-semibold text-slate-900">
                    2. How We Use and Protect Data
                  </h4>
                  <p>
                    We do not sell personal data to third parties. All data transmitted between our
                    Android applications and backend infrastructure is encrypted in transit using
                    TLS 1.2/1.3. Access to production records is restricted to authorized personnel.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display text-base font-semibold text-slate-900">
                    3. Data Retention &amp; Grievance Officer
                  </h4>
                  <p>
                    Personal data is retained only for as long as your account remains active or as
                    required under applicable Indian law. You may request access, correction, or
                    deletion of your data at any time through the Account &amp; Data Deletion
                    portal, the Support Inquiry form on this website, or by written correspondence
                    to our registered office at {COMPANY_PROFILE.fullAddress}.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div id="terms-of-service" className="max-w-4xl space-y-6 text-sm leading-relaxed text-slate-700">
                <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-slate-200 pb-4">
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    Terms of Service
                  </h3>
                  <span className="font-mono text-xs text-slate-500 tabular-nums">
                    Jurisdiction: Meghalaya, India
                  </span>
                </div>

                <p>
                  By downloading, installing, or using any Android software application published by{' '}
                  <strong>{COMPANY_PROFILE.legalName}</strong> on Google Play, you agree to these
                  Terms of Service.
                </p>

                <div className="space-y-2">
                  <h4 className="font-display text-base font-semibold text-slate-900">
                    1. Software License
                  </h4>
                  <p>
                    {COMPANY_PROFILE.legalName} grants you a limited, non-exclusive,
                    non-transferable, revocable license to install and operate our applications on
                    authorized Android devices solely for lawful personal or internal business use.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display text-base font-semibold text-slate-900">
                    2. Acceptable Use &amp; Restrictions
                  </h4>
                  <p>
                    You agree not to reverse-engineer, decompile, redistribute modified APKs,
                    circumvent security controls, or use our software for fraudulent or unauthorized
                    automated scraping.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display text-base font-semibold text-slate-900">
                    3. Updates, Availability &amp; Governing Law
                  </h4>
                  <p>
                    We periodically release software updates via Google Play to improve security and
                    compatibility. These Terms are governed by the laws of India, with exclusive
                    jurisdiction in the courts of East Khasi Hills, Meghalaya.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'deletion' && (
              <div id="data-deletion" className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="space-y-5 text-sm leading-relaxed text-slate-700 lg:col-span-6">
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    Account &amp; User Data Deletion Policy
                  </h3>
                  <p>
                    In compliance with Google Play Data Safety requirements, users of any{' '}
                    {COMPANY_PROFILE.legalName} Android application can permanently delete their
                    account and associated personal data either inside the application or through this
                    verified web request form.
                  </p>

                  <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-5">
                    <h4 className="font-display text-sm font-semibold text-slate-900">
                      How Deletion Requests Are Processed
                    </h4>
                    <ol className="list-decimal space-y-2 pl-5 text-slate-600">
                      <li>
                        Submit the registered account email and target application package using the
                        form alongside.
                      </li>
                      <li>
                        Our compliance team verifies ownership via a confirmation message sent to
                        your registered email address.
                      </li>
                      <li>
                        All user profile records, uploaded files, and workspace logs are permanently
                        purged within <strong>7 business days</strong> (unless minimal invoice
                        records must be retained under statutory tax laws).
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="rounded-xl border border-slate-200 bg-white p-6">
                    <h4 className="font-display text-base font-semibold text-slate-900">
                      Submit Account or Data Deletion Request
                    </h4>
                    <p className="mt-1 text-xs text-slate-600">
                      Processed by {COMPANY_PROFILE.legalName} Compliance Team
                    </p>

                    {deletionSubmittedRef ? (
                      <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                        <p className="text-sm font-semibold text-emerald-900">
                          Deletion Request Logged
                        </p>
                        <p className="mt-1 font-mono text-xs text-emerald-800 tabular-nums">
                          Reference ID: {deletionSubmittedRef}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-emerald-800">
                          Your request has been recorded under the reference ID above. Please retain
                          this identifier for any follow-up inquiries via the Support form.
                        </p>
                        <button
                          type="button"
                          onClick={() => setDeletionSubmittedRef('')}
                          className="mt-4 rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-medium text-emerald-900 hover:bg-emerald-100 cursor-pointer"
                        >
                          Submit Another Request
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleDeletionSubmit} className="mt-5 space-y-4">
                        {deletionError && (
                          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
                            {deletionError}
                          </p>
                        )}

                        <div>
                          <label
                            htmlFor="del-email"
                            className="block text-xs font-medium text-slate-700"
                          >
                            Registered Account Email
                          </label>
                          <input
                            id="del-email"
                            type="email"
                            value={deletionEmail}
                            onChange={(e) => setDeletionEmail(e.target.value)}
                            placeholder="user@example.com"
                            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="del-app"
                            className="block text-xs font-medium text-slate-700"
                          >
                            Application
                          </label>
                          <select
                            id="del-app"
                            value={deletionApp}
                            onChange={(e) => setDeletionApp(e.target.value)}
                            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                          >
                            {apps.map((app) => (
                              <option key={app.id} value={app.packageName}>
                                {app.name} ({app.packageName})
                              </option>
                            ))}
                            <option value="all">All KYRKHU PRIVATE LIMITED Applications</option>
                          </select>
                        </div>

                        <div>
                          <span className="block text-xs font-medium text-slate-700">
                            Deletion Scope
                          </span>
                          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50">
                              <input
                                type="radio"
                                name="deletionScope"
                                checked={deletionScope === 'full-account'}
                                onChange={() => setDeletionScope('full-account')}
                                className="accent-blue-700"
                              />
                              Delete Account &amp; All Data
                            </label>
                            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50">
                              <input
                                type="radio"
                                name="deletionScope"
                                checked={deletionScope === 'partial-data'}
                                onChange={() => setDeletionScope('partial-data')}
                                className="accent-blue-700"
                              />
                              Delete Activity Data Only
                            </label>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-800 cursor-pointer"
                        >
                          Request Data Deletion
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'app-ads' && (
              <div id="app-ads" className="max-w-4xl space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      Developer Website &amp; app-ads.txt Declaration
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Google Play verifies publisher domain ownership via this corporate website and
                      the standard <span className="font-mono">/app-ads.txt</span> specification.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAdsTxt}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-800 whitespace-nowrap shrink-0 hover:bg-slate-50 cursor-pointer"
                  >
                    {copiedAds ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-700" />
                        Copied Specification
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy app-ads.txt
                      </>
                    )}
                  </button>
                </div>

                <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-900 p-5 font-mono text-xs leading-relaxed text-slate-100">
                  {APP_ADS_TXT_CONTENT}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
