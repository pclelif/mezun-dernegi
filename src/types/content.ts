export type Announcement = { id: string; title: string; slug: string; content: string; imageUrl?: string; publishedAt: string; };
export type Event = { id: string; title: string; slug: string; description: string; startsAt: string; endsAt?: string; location?: string; imageUrl?: string; };
export type BoardMember = { id: string; fullName: string; role: string; imageUrl?: string; order: number; };
export type FAQ = { id: string; question: string; answer: string; order: number; };
