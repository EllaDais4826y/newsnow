/**
 * News source definitions and configuration
 * Each source defines a news provider with its metadata and fetch configuration
 */

export type SourceID = string

export interface SourceConfig {
  /** Unique identifier for the source */
  id: SourceID
  /** Display name of the source */
  name: string
  /** Short description of the source */
  description?: string
  /** URL to the source's homepage */
  url: string
  /** Category/type of news source */
  category: SourceCategory
  /** Language of the content */
  language: string
  /** Country/region of the source */
  region?: string
  /** How often to refresh in minutes */
  interval?: number
  /** Whether this source requires authentication */
  requiresAuth?: boolean
}

export type SourceCategory =
  | "tech"
  | "finance"
  | "general"
  | "social"
  | "entertainment"
  | "sports"
  | "science"

/**
 * All available news sources
 */
export const sources: Record<SourceID, SourceConfig> = {
  // Chinese Tech & General News
  zhihu: {
    id: "zhihu",
    name: "知乎热榜",
    description: "知乎热门话题榜单",
    url: "https://www.zhihu.com/hot",
    category: "social",
    language: "zh",
    region: "CN",
    interval: 30,
  },
  weibo: {
    id: "weibo",
    name: "微博热搜",
    description: "微博实时热搜榜",
    url: "https://s.weibo.com/top/summary",
    category: "social",
    language: "zh",
    region: "CN",
    interval: 15,
  },
  baidu: {
    id: "baidu",
    name: "百度热搜",
    description: "百度搜索热榜",
    url: "https://top.baidu.com/board",
    category: "general",
    language: "zh",
    region: "CN",
    interval: 30,
  },
  bilibili: {
    id: "bilibili",
    name: "哔哩哔哩热门",
    description: "B站全站热门视频",
    url: "https://www.bilibili.com/v/popular/rank/all",
    category: "entertainment",
    language: "zh",
    region: "CN",
    interval: 60,
  },
  // Tech News
  hackernews: {
    id: "hackernews",
    name: "Hacker News",
    description: "Top stories from Hacker News",
    url: "https://news.ycombinator.com",
    category: "tech",
    language: "en",
    region: "US",
    interval: 30,
  },
  v2ex: {
    id: "v2ex",
    name: "V2EX",
    description: "V2EX 最热主题",
    url: "https://www.v2ex.com",
    category: "tech",
    language: "zh",
    region: "CN",
    interval: 30,
  },
  // Finance
  wallstreetcn: {
    id: "wallstreetcn",
    name: "华尔街见闻",
    description: "全球财经新闻资讯",
    url: "https://wallstreetcn.com",
    category: "finance",
    language: "zh",
    region: "CN",
    interval: 15,
  },
}

/**
 * Get a source config by ID, throws if not found
 */
export function getSource(id: SourceID): SourceConfig {
  const source = sources[id]
  if (!source) {
    throw new Error(`Unknown source: ${id}`)
  }
  return source
}

/**
 * Get all sources filtered by category
 */
export function getSourcesByCategory(category: SourceCategory): SourceConfig[] {
  return Object.values(sources).filter(s => s.category === category)
}

/**
 * Get all sources filtered by language
 */
export function getSourcesByLanguage(language: string): SourceConfig[] {
  return Object.values(sources).filter(s => s.language === language)
}
