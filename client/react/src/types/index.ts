export interface User {
  id:    number;
  name:  string;
  email: string;
  plan:  string;
}

export interface Site {
  id:        number;
  name:      string;
  domain:    string;
  siteId:    string;
  timezone:  string;
  createdAt: string;
}

export interface StatsData {
  pageviews:       number;
  uniqueVisitors:  number;
  topPages:        { url: string; views: number }[];
  topReferrers:    { referrer: string; views: number }[];
  deviceBreakdown: { device: string; count: number }[];
  browserBreakdown:{ browser: string; count: number }[];
  viewsOverTime:   { date: string; views: number }[];
}