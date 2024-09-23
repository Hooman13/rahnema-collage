export interface IUserInfo {
  bio: string;
  email: string;
  fName: string;
  imageUrl: string;
  isPrivate: false;
  lName: string;
  username: string;
}

export interface IMessage {
  messageId: string;
  content?: string;
  image?: string;
  isOwned: boolean;
  createdAt: string;
}