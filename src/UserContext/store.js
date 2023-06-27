import { createContext } from "react";

const userInfo = {
  id: "101",
  name: "user1",
  email: "user@1.com",
};

const UserContext = createContext(userInfo);

export default UserContext;
