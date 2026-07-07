'use client';

import { useLanguage } from '@/contexts/language-context';

export function LanguageSelector() {
  const { language, setLanguage, availableLanguages } = useLanguage();

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-full border border-royal-purple/20 bg-white p-1 shadow-sm">
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              language === lang.code
                ? 'bg-royal-purple text-white'
                : 'text-royal-purple hover:bg-royal-purple/10'
            }`}
            title={lang.name}
          >
            <span className="text-base">{lang.flag}</span>
            <span className="hidden sm:inline">{lang.name}</span>
            <span className="sm:hidden">{lang.code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
