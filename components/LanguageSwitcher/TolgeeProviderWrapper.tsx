'use client';

import { TolgeeProvider } from "@tolgee/react";
import { tolgee } from "@/lib/tolgee";

export default function TolgeeProviderWrapper({ children }: { children: React.ReactNode }) {
  return <TolgeeProvider tolgee={tolgee}>{children}</TolgeeProvider>;
}