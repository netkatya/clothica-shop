'use client';

import { useTolgee } from "@tolgee/react";
import { useState, useEffect } from "react";
import css from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher() {
  const tolgee = useTolgee();
  const [currentLang, setCurrentLang] = useState(tolgee?.getLanguage() || "uk");

  useEffect(() => {
    if (!tolgee) return;

    const interval = setInterval(() => {
      const lang = tolgee.getLanguage() || "uk";
      setCurrentLang(lang);
    }, 100);

    return () => clearInterval(interval);
  }, [tolgee]);

  const switchLang = () => {
    if (!tolgee) return;

    const next = currentLang === "uk" ? "en" : "uk";
    tolgee.changeLanguage(next);
    document.documentElement.lang = next;
    setCurrentLang(next);
  };

  if (!tolgee) return null;

  return (
    <button onClick={switchLang} className={css.fixedButton}>
      {currentLang === "uk" ? "UK" : "EN"}
    </button>
  );
}
