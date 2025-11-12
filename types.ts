

export enum View {
  Home = 'HOME',
  Map = 'MAP',
  Messages = 'MESSAGES',
  Profile = 'PROFILE',
  EditProfile = 'EDIT_PROFILE',
  EditPet = 'EDIT_PET',
  PetDetail = 'PET_DETAIL',
  NewGroup = 'NEW_GROUP',
}

export enum NotificationType {
  NewMessage = 'NEW_MESSAGE',
  LostPetUpdate = 'LOST_PET_UPDATE',
  NewFollower = 'NEW_FOLLOWER',
  PostLike = 'POST_LIKE',
  GroupInvite = 'GROUP_INVITE',
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
  groupId?: string;
  groupName?: string;
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

export interface Conversation {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    isGroup: boolean;
    members: User[];
}

export type ReportStatus = 'Lost' | 'Found' | 'Adoption';

export interface Report {
  id: string;
  petName: string;
  status: ReportStatus;
  location: string;
  date: string;
  image: string;
  breed: string;
  description?: string;
}