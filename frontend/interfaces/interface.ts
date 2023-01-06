export interface IResponseData {
  status: string;
  message: string;
  data: any;
  marker: IMarker;
  markers: IMarker[];
  user: IUser;
  users: IUser[];
}

export interface IMarker {
  _id: string;
  user: IUser;
  longitude: number;
  latitude: number;
  markerType: string;
  description: string;
}
export interface IMarkerInput {
  user: string;
  longitude: number;
  latitude: number;
  markerType: string;
  description: string;
}

export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  markers: IMarker[];
}

export interface IUserInput {
  firstname?: string;
  lastname?: string;
  email: string;
  password?: string;
  newPassword?: string;
}
