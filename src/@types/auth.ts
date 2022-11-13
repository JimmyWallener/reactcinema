export interface IAuth {
  logged: boolean;
  id: string;
}

export type AuthContextType = {
  loggedInUser: IAuth;
  setLoggedInUser: (auth: IAuth) => void;
};
