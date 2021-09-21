export interface FbResponse {
  name: string;
}

export interface Product {
  type: string;
  id: string;
  title: string;
  photo?: string;
  info: any;
  price: string;
  date: Date;
}
