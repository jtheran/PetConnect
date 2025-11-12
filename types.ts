
export enum View {
  Home = 'HOME',
  Map = 'MAP',
  LostFound = 'LOST_FOUND',
  Messages = 'MESSAGES',
  Profile = 'PROFILE',
  EditProfile = 'EDIT_PROFILE',
}

export enum NotificationType {
  NewMessage = 'NEW_MESSAGE',
  LostPetUpdate = 'LOST_PET_UPDATE',
  NewFollower = 'NEW_FOLLOWER',
  PostLike = 'POST_LIKE',
}

export interface Notification {
  id: string;
  type: NotificationType;
  text: string;
  timestamp: string; // ISO string
  isRead: boolean;
  relatedUser?: {
      name: string;
      avatar: string;
  };
}


export interface Pet {
  id: string;
  name: string;
  breed: string;
  avatar: string;
  bio?: string;
}

export interface User {
  id: string;
  name:string;
  avatar: string;
  pets: Pet[];
}

export interface Post {
  id: string;
  user: User;
  pet: Pet;
  image: string;
  caption: string;
  likes: number;
  comments: number;
}

export interface Story {
  id: string;
  user: User;
  image: string;
  timestamp: string; // ISO string
}