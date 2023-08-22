import { css } from "@emotion/react";

export const kanbanStyle = css`
  display: flex;
  gap: 0.8rem;
  // flex-wrap: wrap;
  height: 80vh;
  margin: 1rem;
  overflow: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const kanbanColumnStyle = css`
  background-color: #fff;
  height: 100%;
  padding: 1rem;

  &:first-of-type {
    flex-grow: 1;
  }
  &:last-of-type {
    min-width: 20%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
