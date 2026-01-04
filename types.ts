
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  timestamp: Date;
}

export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  category: string;
}
