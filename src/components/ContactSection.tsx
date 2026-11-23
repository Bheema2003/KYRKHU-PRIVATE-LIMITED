import {useState, type FormEvent} from 'react';
import {CheckCircle2, Clock, MapPin, Building2} from 'lucide-react';
import {COMPANY_PROFILE, type PublishedApp} from '../data/companyData';

interface ContactSectionProps {
  apps: PublishedApp[];
}

export default function ContactSection({apps}: ContactSectionProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Google Play Organization Verification');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submittedRef, setSubmittedRef] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setError('Please enter your name and message details.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid reply email address.');
      return;
    }

    setError('');
    setSubmittedRef(`INQ-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setMessage('');
    setSubmittedRef('');
    setError('');
  };

  return (
    <section id="contact" className="border-t border-slate-200 bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium text-blue-700">
              Corporate Correspondence &amp; App Support
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Direct Support &amp; Organization Contact
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Reach our engineering and compliance desk for application user support, Play Console
              organization verification inquiries, or enterprise software partnerships.
            </p>

            <div className="mt-8 space-y-6 border-t border-slate-200 pt-8">
              <div className="flex items-start gap-3.5">
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                <div>
                  <p className="text-xs font-medium text-slate-500">Registered Corporate Entity</p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-900">
                    {COMPANY_PROFILE.legalName}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-slate-600 tabular-nums">
                    CIN: {COMPANY_PROFILE.cin}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                <div>
                  <p className="text-xs font-medium text-slate-500">Registered Office Address</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-700">
                    {COMPANY_PROFILE.addressLine1}
                    <br />
                    {COMPANY_PROFILE.addressLine2}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Support &amp; Verification Hours
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-slate-900">
                    Monday – Saturday, 09:30 – 18:30 IST
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Inquiries submitted through this form are reviewed within one business day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              {submittedRef ? (
                <div className="py-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
                    Support Inquiry Submitted
                  </h3>
                  <p className="mt-1 font-mono text-xs text-slate-500 tabular-nums">
                    Reference ID: {submittedRef}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Thank you, <span className="font-medium text-slate-900">{fullName}</span>. Your
                    inquiry regarding <span className="font-medium text-slate-900">{subject}</span>{' '}
                    has been recorded for review by {COMPANY_PROFILE.legalName}. Our team will
                    respond to <span className="font-mono text-slate-900">{email}</span>.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      Send a Support or Verification Inquiry
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Responses are handled within one business day by {COMPANY_PROFILE.legalName}.
                    </p>
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                    >
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-slate-700">
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-slate-700">
                        Reply Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-700">
                      Subject / Application
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                    >
                      <option value="Google Play Organization Verification">
                        Google Play Organization Verification
                      </option>
                      <option value="User Support & Bug Report">User Support &amp; Bug Report</option>
                      <option value="Privacy & Data Protection">Privacy &amp; Data Protection</option>
                      {apps.map((app) => (
                        <option key={app.id} value={`App Support: ${app.name}`}>
                          App Support: {app.name} ({app.packageName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-slate-700">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your inquiry, device model, or verification details..."
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <p className="text-xs text-slate-500">
                      Handled by {COMPANY_PROFILE.legalName} Support Desk (IST)
                    </p>
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-blue-800 cursor-pointer"
                    >
                      Submit Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
