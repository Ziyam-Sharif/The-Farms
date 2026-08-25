export interface IReview {
  _id: string;
  product: string;
  user: {
    _id: string;
    name: string;
  };
  rating: number;
  title: string;
  body: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}
