/**
 * Browser API Type Definitions
 * Proper TypeScript types for browser APIs that don't have types in @types/dom
 */

/**
 * Network Information API
 * https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API
 */
export interface NetworkInformation extends EventTarget {
  /**
   * Returns the effective bandwidth estimate in megabits per second
   */
  downlink?: number

  /**
   * Returns the effective type of the connection
   * '4g', '4g-lte', '3g', '2g', 'slow-2g'
   */
  effectiveType: "4g" | "3g" | "2g" | "slow-2g" | "unknown"

  /**
   * Returns the maximum download speed in megabits per second
   */
  max?: number

  /**
   * Returns the estimated effective round-trip time in milliseconds
   */
  rtt?: number

  /**
   * Returns true if the user agent has enabled a reduced data mode
   */
  saveData: boolean

  /**
   * The change event fires when any of the connection properties change
   */
  onchange?: ((this: NetworkInformation, ev: Event) => void) | null
}

/**
 * Extended Navigator with NetworkInformation API
 */
export interface NavigatorWithConnection extends Navigator {
  /**
   * Returns a NetworkInformation object
   */
  connection?: NetworkInformation
}

/**
 * Document with webkit fullscreen support
 */
export interface DocumentWithWebkitFullscreen extends Document {
  /**
   * Webkit prefixed fullscreen enabled property
   */
  webkitFullscreenEnabled?: boolean

  /**
   * Webkit prefixed fullscreen element
   */
  webkitFullscreenElement?: Element | null

  /**
   * Webkit prefixed exit fullscreen method
   */
  webkitExitFullscreen?: () => Promise<void>
}

/**
 * HTMLVideoElement with webkit fullscreen support
 */
export interface HTMLVideoElementWithWebkit extends HTMLVideoElement {
  /**
   * Webkit prefixed request fullscreen
   */
  webkitRequestFullscreen?: () => Promise<void>
}

/**
 * Element with fullscreen support (webkit)
 */
export interface ElementWithWebkitFullscreen extends Element {
  /**
   * Webkit prefixed request fullscreen
   */
  webkitRequestFullscreen?: () => Promise<void>
}
