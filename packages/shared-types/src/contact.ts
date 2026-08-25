export type ContactMessageStatusEnum = 'new' | 'read' | 'responded';

export interface IContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: ContactMessageStatusEnum;
  createdAt: string;
  updatedAt: string;
}
