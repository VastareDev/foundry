/**
 * @file Entry point for the @vastare/foundry library.
 * @description
 * Re-exports all element modules and defines the current foundry version.
 * 
 * Consumers can import:
 * - Global exports via: import * as Foundry from "@vastare/foundry";
 * - Individual elements via: import { paragraphClasses } from "@vastare/foundry/elements/paragraph";
 */

export * as elements from "./elements";

/**
 * @constant foundryVersion
 * @description Semantic version identifier for the current foundry build.
 * @type {string}
 */
export const foundryVersion = "0.0.2";
