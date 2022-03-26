import { mdiBell, mdiBellAlert } from "@mdi/js";
import { useDemoReducerContextState } from "./reducer";

export const IconLeft = () => {
  const { clicked } = useDemoReducerContextState();
  return (
    <svg style={{ height: 24, width: 24 }}>
      <path
        d={clicked ? mdiBellAlert : mdiBell}
        strokeWidth="1"
        stroke="black"
        fill={"pink"}
      ></path>
    </svg>
  );
};
