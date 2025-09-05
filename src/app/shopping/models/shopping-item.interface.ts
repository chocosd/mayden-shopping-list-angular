export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  order: number;
  bought: boolean;
}

export interface ShoppingCart {
  items: ShoppingItem[];
  total: number;
  spendLimit: number;
  title?: string;
}

export type SlimShoppingItem = Pick<ShoppingItem, 'name' | 'quantity' | 'price'>;
