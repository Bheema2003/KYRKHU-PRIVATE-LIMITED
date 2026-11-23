import {useEffect, useState, type FormEvent} from 'react';
import {X} from 'lucide-react';
import type {AppCategory, PublishedApp} from '../data/companyData';

interface AddAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddApp: (app: PublishedApp) => void;
}

export default function AddAppModal({isOpen, onClose, onAddApp}: AddAppModalProps) {
  const [name, setName] = useState('');
  const [packageName, setPackageName] = useState('com.kyrkhu.');
  const [category, setCategory] = useState<AppCategory>('Utilities');
  const [releaseTrack, setReleaseTrack] = useState('Production Track');
  const [version, setVersion] = useState('1.0.0');
  const [targetSdk, setTargetSdk] = useState('Android 15 (API 35)');
  const [summary, setSummary] = useState('');
  const [permissionsRaw, setPermissionsRaw] = useState('Network State, Notifications');
  const [dataSafety, setDataSafety] = useState(
    'Data encrypted in transit. Users can request account and data deletion at any time via the compliance portal.',
  );
  const [playStoreUrl, setPlayStoreUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPkg = packageName.trim();
    const trimmedSummary = summary.trim();

    if (!trimmedName || !trimmedPkg || !trimmedSummary) {
      setError('Please complete the application name, Android package ID, and summary.');
      return;
    }

    if (!/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+$/i.test(trimmedPkg)) {
      setError('Package ID must follow Android reverse-domain format (e.g. com.kyrkhu.myapp).');
      return;
    }

    const permissions = permissionsRaw
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    onAddApp({
      id: `app-${Date.now()}`,
      name: trimmedName,
      packageName: trimmedPkg,
      category,
      releaseTrack,
      targetSdk: targetSdk.trim() || 'Android 15 (API 35)',
      version: version.trim() || '1.0.0',
      summary: trimmedSummary,
      permissions: permissions.length > 0 ? permissions : ['Standard Internet Access'],
      dataSafety: dataSafety.trim(),
      playStoreUrl: playStoreUrl.trim() || undefined,
    });

    setName('');
    setPackageName('com.kyrkhu.');
    setSummary('');
    setPlayStoreUrl('');
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-app-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h3 id="add-app-title" className="font-display text-lg font-bold text-slate-900">
              Register Android Application
            </h3>
            <p className="mt-0.5 text-xs text-slate-600">
              Add an app to your public KYRKHU PRIVATE LIMITED publishing directory.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close registration modal"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="app-name" className="block text-xs font-medium text-slate-700">
                App Display Name
              </label>
              <input
                id="app-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kyrkhu PayTrack"
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="app-package" className="block text-xs font-medium text-slate-700">
                Android Package ID
              </label>
              <input
                id="app-package"
                type="text"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                placeholder="com.kyrkhu.appname"
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="app-category" className="block text-xs font-medium text-slate-700">
                Category
              </label>
              <select
                id="app-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as AppCategory)}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
              >
                <option value="Utilities">Utilities</option>
                <option value="Productivity">Productivity</option>
                <option value="Commerce">Commerce</option>
              </select>
            </div>

            <div>
              <label htmlFor="app-track" className="block text-xs font-medium text-slate-700">
                Play Console Track
              </label>
              <select
                id="app-track"
                value={releaseTrack}
                onChange={(e) => setReleaseTrack(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
              >
                <option value="Production Track">Production Track</option>
                <option value="Open Testing Track">Open Testing Track</option>
                <option value="Closed Testing Track">Closed Testing Track</option>
                <option value="Internal Review Track">Internal Review Track</option>
              </select>
            </div>

            <div>
              <label htmlFor="app-version" className="block text-xs font-medium text-slate-700">
                Version
              </label>
              <input
                id="app-version"
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="app-sdk" className="block text-xs font-medium text-slate-700">
                Target SDK Level
              </label>
              <input
                id="app-sdk"
                type="text"
                value={targetSdk}
                onChange={(e) => setTargetSdk(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="app-url" className="block text-xs font-medium text-slate-700">
                Google Play URL (Optional)
              </label>
              <input
                id="app-url"
                type="url"
                value={playStoreUrl}
                onChange={(e) => setPlayStoreUrl(e.target.value)}
                placeholder="https://play.google.com/store/apps/details?id=..."
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="app-summary" className="block text-xs font-medium text-slate-700">
              Application Purpose &amp; Description
            </label>
            <textarea
              id="app-summary"
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe what the application does for users."
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="app-perms" className="block text-xs font-medium text-slate-700">
              Permissions (Comma-Separated)
            </label>
            <input
              id="app-perms"
              type="text"
              value={permissionsRaw}
              onChange={(e) => setPermissionsRaw(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="app-safety" className="block text-xs font-medium text-slate-700">
              Data Safety Summary
            </label>
            <textarea
              id="app-safety"
              rows={2}
              value={dataSafety}
              onChange={(e) => setDataSafety(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 cursor-pointer"
            >
              Save to Directory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
