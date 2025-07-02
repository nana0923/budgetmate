"use client";

import { Global, css } from "@emotion/react";

export const GlobalStyle = () => (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        font-family: "Pretendard", sans-serif;
        background: #f7f8fa;
        color: #222;
      }
      a {
        text-decoration: none;
        font-weight: normal;
        color: #222;
        cursor: pointer;
      }
      input {
        font-family: "Pretendard", sans-serif;
      }

      @media (max-width: 500px) {
        * {
          font-size: 0.9rem;
        }
      }
    `}
  />
);
