import {useEffect} from 'react';
import {ExternalLink, ShieldCheck, X} from 'lucide-react';
import {COMPANY_PROFILE, type PublishedApp} from '../data/companyData';

interface AppDetailModalProps {
  app: PublishedApp | null;
  onClose: () => void;
  onOpenPolicyTab: (tab: 'privacy' | 'terms' | 'deletion') => void;
  onContactSupport: () => void;
}

export default function AppDetailModal({
  app,
  onClose,
  onOpenPolicyTab,
  onContactSupport,
}: AppDetailModalProps) {
  useEffect(() => {
    if (!app) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [app, onClose]);

  if (!app) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-detail-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <div className="text-xs font-medium text-slate-500">
              {app.category} <span aria-hidden="true">·</span> {app.releaseTrack}
            </div>
            <h3
              id="app-detail-title"
              className="mt-1 font-display text-xl font-bold text-slate-900"
            >
              {app.name}
            </h3>
            <p className="mt-1 font-mono text-xs text-slate-600 tabular-nums">
              {app.packageName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close application details"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <p className="text-sm leading-relaxed text-slate-700">{app.summary}</p>

          <dl className="grid grid-cols-1 gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-slate-500">Publisher Entity</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">
                {COMPANY_PROFILE.legalName}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Target SDK</dt>
              <dd className="mt-1 font-mono text-sm font-medium text-slate-900 tabular-nums">
                {app.targetSdk}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Release Version</dt>
              <dd className="mt-1 font-mono text-sm font-medium text-slate-900 tabular-nums">
                v{app.version}
              </dd>
            </div>
          </dl>

          <div>
            <h4 className="font-display text-sm font-semibold text-slate-900">
              Declared Android Permissions
            </h4>
            <ul className="mt-2.5 space-y-1.5 border-t border-slate-100 pt-2.5 text-sm text-slate-700">
              {app.permissions.map((perm) => (
                <li key={perm} className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                  <span>{perm}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-slate-900">
              Data Safety &amp; Handling Summary
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{app.dataSafety}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenPolicyTab('privacy');
                }}
                className="text-sm font-medium text-blue-700 hover:text-blue-800 hover:underline cursor-pointer"
              >
                Read Privacy Policy
              </button>
              <span className="text-slate-300" aria-hidden="true">
                /
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenPolicyTab('deletion');
                }}
                className="text-sm font-medium text-blue-700 hover:text-blue-800 hover:underline cursor-pointer"
              >
                Data Deletion Request
              </button>
            </div>

            {app.playStoreUrl ? (
              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-blue-800"
              >
                View on Google Play
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onContactSupport();
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-blue-800 cursor-pointer"
              >
                Contact App Support
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
