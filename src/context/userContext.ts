import { User } from "interfaces";
import React from "react";

const UserContext = React.createContext<User>({
  id: "",
  username: "",
  country: "",
  age: null,
});

export const UserProvider = UserContext.Provider;
export default UserContext;
