

export interface GroceryList {
  id: number;
  title: string;
  shopId?: number;
}

export interface GroceryItem {
  item: string;
  complete: boolean;
  price: string;
  notes: string;
  groceryListId: number;
  id: number;
}

export interface Shop {
  id: number;
  name: string;
  position?: [number, number]
}
