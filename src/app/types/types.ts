export type Item = {
  picture: string;
  name: string;
  id: string;
  price: number;
  description: string;
};

export type ItemInCart = Item & { count: number };
