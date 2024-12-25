'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useLocale } from 'next-intl';

type Props = {
  children: React.ReactNode;
  messages: IntlMessages;
};

export function I18nProvider({ children, messages }: Props) {
  const locale = useLocale();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
} 