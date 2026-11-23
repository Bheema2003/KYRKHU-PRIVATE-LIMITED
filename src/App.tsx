import {useEffect, useMemo, useState} from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Plus,
  Trash2,
} from 'lucide-react';
import Header from './components/Header';
import CertificateModal from './components/CertificateModal';
import AppDetailModal from './components/AppDetailModal';
import AddAppModal from './components/AddAppModal';
import ComplianceHub, {type ComplianceTab} from './components/ComplianceHub';
import ContactSection from './components/ContactSection';
import {
  CAPABILITIES,
  COMPANY_PROFILE,
  CORPORATE_VERIFICATION_FIELDS,
  INITIAL_APPS,
  type AppCategory,
  type PublishedApp,
} from './data/companyData';

const STORAGE_KEY = 'kyrkhu_custom_apps_v1';

export default function App() {
  const [apps, setApps] = useState<PublishedApp[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as PublishedApp[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage read errors and fall back to defaults
    }
    return INITIAL_APPS;
  });

  const [categoryFilter, setCategoryFilter] = useState<'All' | AppCategory>('All');
  const [selectedApp, setSelectedApp] = useState<PublishedApp | null>(null);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [addAppModalOpen, setAddAppModalOpen] = useState(false);
  const [complianceTab, setComplianceTab] = useState<ComplianceTab>('privacy');
  const [copiedFieldId, setCopiedFieldId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
    } catch {
      // Ignore storage write errors
    }
  }, [apps]);

  const filteredApps = useMemo(() => {
    if (categoryFilter === 'All') return apps;
    return apps.filter((app) => app.category === categoryFilter);
  }, [apps, categoryFilter]);

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleOpenPolicyTab = (tab: ComplianceTab) => {
    setComplianceTab(tab);
    scrollToSection('#compliance');
  };

  const handleCopyField = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedFieldId(id);
      window.setTimeout(() => {
        setCopiedFieldId((current) => (current === id ? null : current));
      }, 1800);
    } catch {
      setCopiedFieldId(null);
    }
  };

  const handleAddApp = (newApp: PublishedApp) => {
    setApps((prev) => [newApp, ...prev]);
    setCategoryFilter('All');
  };

  const handleRemoveApp = (id: string) => {
    setApps((prev) => prev.filter((item) => item.id !== id));
  };

  const isDefaultApp = (id: string) => INITIAL_APPS.some((item) => item.id === id);

  return (
    <div id="top" className="min-h-screen bg-slate-50 text-slate-900">
      <Header onContactClick={() => scrollToSection('#contact')} />

      <main>
        {/* Hero Section */}
        <section className="border-b border-slate-200 bg-white pt-14 pb-16 lg:pt-20 lg:pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col justify-center lg:col-span-7">
                <p className="text-sm font-medium text-blue-700">
                  Incorporated Software Publisher · Meghalaya, India
                </p>

                <h1
                  className="mt-4 font-display font-bold tracking-tight text-slate-950 text-balance"
                  style={{fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', lineHeight: 1.08}}
                >
                  Android Application Publishing &amp; Mobile Software Engineering
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  {COMPANY_PROFILE.legalName} designs, verifies, and distributes native Android
                  applications on Google Play. Our engineering operations combine reliable offline
                  mobile software with transparent user privacy and corporate accountability.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('#applications')}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-blue-800 cursor-pointer"
                  >
                    Explore Application Catalog
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCertificateModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-slate-50 cursor-pointer"
                  >
                    <FileText className="h-4 w-4 text-slate-600" />
                    Inspect Incorporation Certificate
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="flex h-full flex-col justify-between rounded-xl border border-slate-800 bg-slate-900 p-7 text-slate-100 sm:p-8">
                  <div>
                    <p className="text-xs font-medium tracking-wide text-slate-400">
                      Ministry of Corporate Affairs Record
                    </p>
                    <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-white">
                      {COMPANY_PROFILE.legalName}
                    </h2>
                    <p className="mt-1 text-sm text-slate-300">
                      {COMPANY_PROFILE.companyType}
                    </p>

                    <dl className="mt-6 divide-y divide-slate-800 border-t border-b border-slate-800">
                      <div className="flex items-baseline justify-between gap-4 py-3">
                        <dt className="text-xs text-slate-400">CIN</dt>
                        <dd className="font-mono text-xs font-medium text-white tabular-nums sm:text-sm">
                          {COMPANY_PROFILE.cin}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4 py-3">
                        <dt className="text-xs text-slate-400">Incorporated</dt>
                        <dd className="font-mono text-xs font-medium text-white tabular-nums sm:text-sm">
                          {COMPANY_PROFILE.incorporationDate}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4 py-3">
                        <dt className="text-xs text-slate-400">PAN / TAN</dt>
                        <dd className="font-mono text-xs font-medium text-white tabular-nums sm:text-sm">
                          {COMPANY_PROFILE.pan} / {COMPANY_PROFILE.tan}
                        </dd>
                      </div>
                      <div className="py-3">
                        <dt className="text-xs text-slate-400">Registered Office</dt>
                        <dd className="mt-1 text-xs leading-relaxed text-slate-200 sm:text-sm">
                          {COMPANY_PROFILE.fullAddress}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCertificateModalOpen(true)}
                      className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-950 whitespace-nowrap shrink-0 transition-colors hover:bg-slate-100 cursor-pointer"
                    >
                      View Official PDF
                    </button>
                    <a
                      href={COMPANY_PROFILE.certificatePdfUrl}
                      download="KYRKHU_PRIVATE_LIMITED_Certificate_of_Incorporation.pdf"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 whitespace-nowrap shrink-0 hover:text-white hover:underline"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download Certificate
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Corporate Identity Strip */}
            <dl className="mt-12 grid grid-cols-1 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              <div className="px-6 py-5">
                <dt className="text-xs text-slate-500">Registered Entity</dt>
                <dd className="mt-1 font-display text-sm font-semibold text-slate-900">
                  {COMPANY_PROFILE.legalName}
                </dd>
              </div>
              <div className="px-6 py-5 sm:border-t sm:border-slate-200 lg:border-t-0">
                <dt className="text-xs text-slate-500">Corporate Identity Number</dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-slate-900 tabular-nums">
                  {COMPANY_PROFILE.cin}
                </dd>
              </div>
              <div className="px-6 py-5 sm:border-t sm:border-slate-200 lg:border-t-0">
                <dt className="text-xs text-slate-500">Date of Incorporation</dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-slate-900 tabular-nums">
                  {COMPANY_PROFILE.incorporationDate}
                </dd>
              </div>
              <div className="px-6 py-5 sm:border-t sm:border-slate-200 lg:border-t-0">
                <dt className="text-xs text-slate-500">Principal Jurisdiction</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">
                  East Khasi Hills, Meghalaya
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Capabilities Bento Grid */}
        <section id="capabilities" className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-xs font-medium text-blue-700">
                Engineering &amp; Distribution Standards
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance sm:text-4xl">
                Built for Long-Term Android Reliability
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Every application released under our organization account follows structured
                engineering, privacy verification, and staged rollout governance.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {CAPABILITIES.map((item) => (
                <article
                  key={item.number}
                  className={`flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-7 sm:p-8 ${
                    item.spanTwo ? 'lg:col-span-2' : 'lg:col-span-1'
                  }`}
                >
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-slate-900">
                      <span className="mr-2 font-mono text-blue-700 tabular-nums">
                        {item.number}.
                      </span>
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {item.summary}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-2 border-t border-slate-100 pt-5 text-sm text-slate-700">
                    {item.deliverables.map((del) => (
                      <li key={del} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Application Portfolio */}
        <section id="applications" className="border-t border-slate-200 bg-white py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-medium text-blue-700">
                  Google Play Publisher Portfolio
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance sm:text-4xl">
                  Managed Android Applications
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  Inspect release tracks, target Android SDK levels, permissions, and data safety
                  summaries for software published by {COMPANY_PROFILE.legalName}.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div
                  role="group"
                  aria-label="Filter applications by category"
                  className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1"
                >
                  {(['All', 'Commerce', 'Productivity', 'Utilities'] as const).map((cat) => {
                    const active = categoryFilter === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategoryFilter(cat)}
                        className={`rounded-md px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                          active
                            ? 'bg-white text-slate-950 shadow-xs'
                            : 'text-slate-600 hover:text-slate-950'
                        }`}
                      >
                        {cat === 'All' ? 'All Apps' : cat}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setAddAppModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-800 whitespace-nowrap shrink-0 transition-colors hover:bg-slate-50 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Register App
                </button>
              </div>
            </div>

            {filteredApps.length === 0 ? (
              <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-10 text-center">
                <p className="text-sm font-medium text-slate-900">
                  No applications match the selected category.
                </p>
                <button
                  type="button"
                  onClick={() => setCategoryFilter('All')}
                  className="mt-3 text-sm font-medium text-blue-700 hover:underline cursor-pointer"
                >
                  Show all applications
                </button>
              </div>
            ) : (
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredApps.map((app) => (
                  <article
                    key={app.id}
                    className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-6 transition-colors hover:border-slate-300 hover:bg-white"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                        <span>
                          {app.category} <span aria-hidden="true">·</span> {app.releaseTrack}
                        </span>
                        {!isDefaultApp(app.id) && (
                          <button
                            type="button"
                            onClick={() => handleRemoveApp(app.id)}
                            aria-label={`Remove ${app.name}`}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>

                      <h3 className="mt-3 font-display text-xl font-bold text-slate-900">
                        {app.name}
                      </h3>
                      <p className="mt-1 font-mono text-xs text-slate-500 tabular-nums">
                        {app.packageName}
                      </p>

                      <p className="mt-4 text-sm leading-relaxed text-slate-600">
                        {app.summary}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-slate-200 pt-4">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-mono tabular-nums">{app.targetSdk}</span>
                        <span className="font-mono tabular-nums">v{app.version}</span>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedApp(app)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 whitespace-nowrap shrink-0 hover:text-blue-800 hover:underline cursor-pointer"
                        >
                          Compliance Sheet
                          <ArrowRight className="h-4 w-4" />
                        </button>

                        {app.playStoreUrl && (
                          <a
                            href={app.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 whitespace-nowrap shrink-0 hover:text-slate-950"
                          >
                            Google Play
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Corporate Verification Dossier */}
        <section id="verification" className="border-t border-slate-200 bg-slate-50 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="text-xs font-medium text-blue-700">
                  Organization Account &amp; D-U-N-S Reference
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance">
                  Corporate Verification Dossier
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  The statutory registration details listed here match our Certificate of
                  Incorporation issued by the Ministry of Corporate Affairs, Government of India,
                  for Google Play Console organization verification.
                </p>

                <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
                  <h3 className="font-display text-base font-semibold text-slate-900">
                    Official Incorporation Document
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Issued by Central Registration Centre, Manesar under the {COMPANY_PROFILE.act}.
                    Registration status can be independently verified on{' '}
                    <a
                      href={COMPANY_PROFILE.mcaVerificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-700 underline hover:text-blue-800"
                    >
                      mca.gov.in
                    </a>
                    .
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCertificateModalOpen(true)}
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-slate-800 cursor-pointer"
                    >
                      <FileText className="h-4 w-4" />
                      Preview Certificate PDF
                    </button>
                    <a
                      href={COMPANY_PROFILE.certificatePdfUrl}
                      download="KYRKHU_PRIVATE_LIMITED_Certificate_of_Incorporation.pdf"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-800 whitespace-nowrap shrink-0 transition-colors hover:bg-slate-50"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-200 bg-slate-100/70 px-6 py-3.5">
                    <h3 className="font-display text-sm font-semibold text-slate-900">
                      Verified Statutory Registration Fields
                    </h3>
                  </div>

                  <dl className="divide-y divide-slate-200">
                    {CORPORATE_VERIFICATION_FIELDS.map((field) => {
                      const isCopied = copiedFieldId === field.id;
                      return (
                        <div
                          key={field.id}
                          className="flex flex-col justify-between gap-3 px-6 py-4 sm:flex-row sm:items-center"
                        >
                          <div className="min-w-0">
                            <dt className="text-xs font-medium text-slate-500">{field.label}</dt>
                            <dd
                              className={`mt-1 text-sm font-medium text-slate-900 ${
                                field.mono ? 'font-mono tabular-nums' : ''
                              }`}
                            >
                              {field.value}
                            </dd>
                            {field.note && (
                              <p className="mt-0.5 text-xs text-slate-500">{field.note}</p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCopyField(field.id, field.value)}
                            className="inline-flex items-center gap-1.5 self-start rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 whitespace-nowrap shrink-0 transition-colors hover:bg-slate-50 sm:self-center cursor-pointer"
                          >
                            {isCopied ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-700" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5 text-slate-500" />
                                Copy
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance Hub */}
        <ComplianceHub
          activeTab={complianceTab}
          onTabChange={setComplianceTab}
          apps={apps}
        />

        {/* Contact & Support */}
        <ContactSection apps={apps} />
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
            <div className="max-w-md">
              <p className="font-display text-base font-bold text-slate-900">
                {COMPANY_PROFILE.legalName}
              </p>
              <p className="mt-2 font-mono text-xs text-slate-600 tabular-nums">
                CIN: {COMPANY_PROFILE.cin} · PAN: {COMPANY_PROFILE.pan}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                {COMPANY_PROFILE.fullAddress}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-600">
              <button
                type="button"
                onClick={() => handleOpenPolicyTab('privacy')}
                className="hover:text-slate-950 hover:underline cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => handleOpenPolicyTab('terms')}
                className="hover:text-slate-950 hover:underline cursor-pointer"
              >
                Terms of Service
              </button>
              <button
                type="button"
                onClick={() => handleOpenPolicyTab('deletion')}
                className="hover:text-slate-950 hover:underline cursor-pointer"
              >
                Data Deletion
              </button>
              <button
                type="button"
                onClick={() => handleOpenPolicyTab('app-ads')}
                className="hover:text-slate-950 hover:underline cursor-pointer"
              >
                app-ads.txt
              </button>
              <button
                type="button"
                onClick={() => setCertificateModalOpen(true)}
                className="hover:text-slate-950 hover:underline cursor-pointer"
              >
                Incorporation Certificate
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-between gap-2 border-t border-slate-100 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
            <p>© 2026 {COMPANY_PROFILE.legalName}. All rights reserved.</p>
            <p>
              Incorporated under the Companies Act, 2013 ·{' '}
              <button
                type="button"
                onClick={() => scrollToSection('#contact')}
                className="font-medium text-slate-700 hover:underline cursor-pointer"
              >
                Support Desk
              </button>
            </p>
          </div>
        </div>
      </footer>

      <CertificateModal
        isOpen={certificateModalOpen}
        onClose={() => setCertificateModalOpen(false)}
      />

      <AppDetailModal
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
        onOpenPolicyTab={handleOpenPolicyTab}
        onContactSupport={() => scrollToSection('#contact')}
      />

      <AddAppModal
        isOpen={addAppModalOpen}
        onClose={() => setAddAppModalOpen(false)}
        onAddApp={handleAddApp}
      />
    </div>
  );
}
