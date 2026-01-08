export interface Flower {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: 'bouquet' | 'single' | 'plant' | 'occasion';
}

export interface CartItem extends Flower {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type PageView = 'home' | 'shop' | 'contact' | 'order';