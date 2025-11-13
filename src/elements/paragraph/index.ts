/**
 * @file Paragraph element utilities for @vastare/foundry.
 * @description
 * Framework agnostic helper for generating consistent class names and attributes
 * for the <p> element. This module defines presentation variants and allows the
 * consumer to pass through any standard HTML attributes such as "lang", "dir",
 * "data-*", or "aria-*" for accessibility.
 */

// Import default paragraph SCSS.
import "./paragraph.scss";

import { composeClassNames } from "../../ts/utilities/classnames";

/**
 * Supported visual variants for paragraph elements.
 *
 * - "default" : Standard Body Text
 * - "muted"   : De-emphasised, secondary copy.
 * - "lead"    : Prominent introductory paragraph.
 */
export type ParagraphVariant = "default" | "muted" | "lead";

/**
 * Options for generating paragraph classes and attributes.
 */
export interface ParagraphOptions {
  /**
   * Visual variant applied to the paragraph.
   * Defaults to "default".
   */
  variant?: ParagraphVariant;

  /**
   * Additional class name(s) provided by the consuming UI kit or application.
   * Example: "mb-4 text-center"
   */
  className?: string;

  /**
   * Arbitrary HTML attributes (e.g. lang, dir, etc.) These are not interpreted
   * by Foundry, they are passed through for consumer rendering.
   */
  attrs?: Record<string, string>;
}

/**
 * Mapping of visual variants to CSS class strings.
 */
export const paragraphVariantClasses: Record<ParagraphVariant, string> = {
  default: "",
  muted: "vf-p--muted",
  lead: "vf-p--lead",
};

/**
 * Returns the computed class string for a <p> element.
 *
 * @example
 * getParagraphClasses({ variant: "lead" });
 * // -> "vf-p--lead"
 *
 * @example
 * getParagraphClasses({ variant: "muted", className: "mb-4" });
 * // -> "vf-p--muted mb-4"
 */
export function getParagraphClasses(options: ParagraphOptions = {}): string {
  const { variant = "default", className } = options;
  const base = paragraphVariantClasses[variant];
  return composeClassNames(base, className);
}

/**
 * Builds a unified set of attributes for the <p> element.
 * Returns `{ class: string, ...attrs }`, allowing consumers to spread
 * directly into templates or JSX.
 *
 * @example (React)
 * <p {...getParagraphAttributes({ variant: "muted", attrs: { lang: "en" } })}>
 *   Secondary text here.
 * </p>
 */
export function getParagraphAttributes(
  options: ParagraphOptions = {},
): Record<string, string> {
  const { attrs = {} } = options;
  const classString = getParagraphClasses(options);

  // Ensure existing class in attrs is merged properly.
  const mergedClass = composeClassNames(attrs.class, classString);

  return { ...attrs, class: mergedClass };
}
