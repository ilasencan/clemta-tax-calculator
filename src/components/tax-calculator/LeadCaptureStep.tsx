'use client';

import { useState } from 'react';

interface LeadCaptureStepProps {
  onSubmit: (name: string, email: string) => void;
  onBack: () => void;
}

export default function LeadCaptureStep({ onSubmit, onBack }: LeadCaptureStepProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  function handleSubmit() {
    const trimmedEmail = email.trim();
    if (!trimmedEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    onSubmit(name.trim(), trimmedEmail);
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          See Your Tax Estimate
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter your name and email to view your personalized tax calculation.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--clemta-blue)] focus:border-transparent text-gray-900 bg-white"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--clemta-blue)] focus:border-transparent text-gray-900 bg-white ${
            emailError ? 'border-red-400' : 'border-gray-300'
          }`}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError('');
          }}
        />
        {emailError && (
          <p className="text-sm text-red-500 mt-1">{emailError}</p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!name.trim() || !email.trim()}
          className="flex-1 py-3 px-4 bg-[var(--clemta-blue)] text-white font-semibold rounded-lg hover:bg-[var(--clemta-blue-dark)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          View Results
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center">
        By submitting, you agree to receive tax-related communications from Clemta.
        We respect your privacy and will never share your information.
      </p>
    </div>
  );
}
