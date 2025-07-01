// src/app/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";
import { GlobalStyle } from "@/styles/global-style";

export const metadata: Metadata = {
  title: "가계부 대시보드",
  description: "수입과 지출을 시각화로 관리하는 앱",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <GlobalStyle />
        {children}
      </body>
    </html>
  );
}
