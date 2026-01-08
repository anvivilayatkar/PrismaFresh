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

export type PageView = 'home' | 'shop' | 'contact' | 'order';
