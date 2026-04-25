/**
 * Shared type definitions for NewsNow
 * Used across both server and client code
 */

/** Supported news source identifiers */
export type SourceID =
  | "hackernews"
  | "producthunt"
  | "github"
  | "v2ex"
  | "weibo"
  | "zhihu"
  | "bilibili"
  | "douyin"
  | "baidu"
  | "sspai"
  | "juejin"
  | "36kr"
  | "solidot"
  | "oschina"
  | "cnbeta"
  | "ithome"
  | "zaobao"
  | "bloomberg"
  | "wsj"
  | "nytimes"

/** A single news item returned from a source */
export interface NewsItem {
  id: string
  title: string
  url: string
  /** Extra info such as author, score, comment count */
  extra?: {
    info?: string
    icon?: string
    date?: number | string
  }
  /** Mobile-specific URL if different from desktop */
  mobileUrl?: string
}

/** Metadata describing a news source */
export interface SourceInfo {
  name: string
  title: string
  description?: string
  type: "hottest" | "newest" | "tech" | "finance" | "social" | "international"
  /** Language/region tag, e.g. "zh-CN", "en-US" */
  language?: string
  /** URL to the source's home page */
  home?: string
  /** Whether the source requires authentication to fetch */
  requiresAuth?: boolean
}

/** API response wrapper for a news source */
export interface SourceResponse {
  id: SourceID
  updatedTime: number
  items: NewsItem[]
}

/** Cache entry stored server-side */
export interface CacheEntry {
  items: NewsItem[]
  /** Unix timestamp (ms) when this entry was fetched */
  updatedTime: number
}

/** Query parameters accepted by the /api/s/:id endpoint */
export interface FetchParams {
  /** Force a cache refresh even if data is fresh */
  force?: boolean
}

/** Column layout configuration for the UI */
export interface ColumnConfig {
  sourceId: SourceID
  /** Display order within the grid */
  order?: number
}

/** User preferences persisted in local storage */
export interface UserPreferences {
  columns: ColumnConfig[]
  theme: "light" | "dark" | "system"
  /** Interval in minutes between auto-refreshes (0 = disabled) */
  refreshInterval: number
}

/** Utility: format a number for display (e.g. 1200 -> "1.2k") */
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}
