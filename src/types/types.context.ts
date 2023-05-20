export interface IUser {
  id: string;
  name: string;
}
export type IContextType = {
  user: IUser | null;
  setUser: (data: IUser) => void;
};
