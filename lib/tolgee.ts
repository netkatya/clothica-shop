'use client';

import { Tolgee, DevTools, FormatSimple } from "@tolgee/react";
import uk from "@/i18n/uk.json";
import en from "@/i18n/en.json";

export const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .init({
    availableLanguages: ["uk", "en"],
    defaultLanguage: "uk",
    fallbackLanguage: "uk",
    staticData: {
      uk,
      en,
    },
  });