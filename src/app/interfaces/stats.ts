export interface Link {
  time: number;
  text: string;
}

export interface Stats {
  word: string;
  freq: number;
  links: Link[];
}

export interface StatsSummary {
  url: string;
  stats: Stats[];
}
