import {useEffect} from 'react';
import {Download, ExternalLink, FileText, X} from 'lucide-react';
import {COMPANY_PROFILE} from '../data/companyData';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateModal({isOpen, onClose}: CertificateModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      onClick={onClose}
    >
      <div
        className="flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <div className="min-w-0">
            <h3
              id="certificate-modal-title"
              className="font-display text-lg font-semibold text-slate-900 truncate"
            >
              Certificate of Incorporation — {COMPANY_PROFILE.legalName}
            </h3>
            <p className="mt-0.5 font-mono text-xs text-slate-600 tabular-nums">
              CIN: {COMPANY_PROFILE.cin} · Issued {COMPANY_PROFILE.incorporationDate}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={COMPANY_PROFILE.certificatePdfUrl}
              download="KYRKHU_PRIVATE_LIMITED_Certificate_of_Incorporation.pdf"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-800 whitespace-nowrap shrink-0 transition-colors hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
            <a
              href={COMPANY_PROFILE.certificatePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-3.5 py-2 text-xs font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-blue-800"
            >
              <ExternalLink className="h-4 w-4" />
              Open in New Tab
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close certificate viewer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative flex-1 bg-slate-100">
          <object
            data={COMPANY_PROFILE.certificatePdfUrl}
            type="application/pdf"
            className="h-full w-full"
            aria-label="Ministry of Corporate Affairs Certificate of Incorporation PDF"
          >
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <FileText className="h-10 w-10 text-slate-400" />
              <p className="mt-4 max-w-md text-sm text-slate-700">
                Inline PDF preview is unavailable in this browser view. Use the download button above
                to open the official Certificate of Incorporation document directly.
              </p>
              <a
                href={COMPANY_PROFILE.certificatePdfUrl}
                download="KYRKHU_PRIVATE_LIMITED_Certificate_of_Incorporation.pdf"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
              >
                <Download className="h-4 w-4" />
                Download Incorporation Certificate
              </a>
            </div>
          </object>
        </div>
      </div>
    </div>
  );
}
