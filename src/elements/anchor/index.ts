import "./anchor.scss";

export type ParagraphVariant = "base" | "muted" | "lead";

export const paragraphClasses: Record<ParagraphVariant, string> = {
  base: "vf-p",
  muted: "vf-p vf-p-muted",
  lead: "vf-p vf-p-lead"
};
