export interface IAuth {
  logged: boolean;
  token: string;
}

export type AuthContextType = {
  loggedInUser: IAuth;
  setLoggedInUser: (auth: IAuth) => void;
};
