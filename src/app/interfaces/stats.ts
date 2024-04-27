export interface Link {
    start: number;
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