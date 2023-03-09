import { useSoftUIController } from "context";

const AuthHeader = (payload) => {
  const [controller, _dispatch] = useSoftUIController();
  const { sessionId, userId } = controller;
  return {
    userId,
    sessionId,
    ...payload,
  };
};

export default AuthHeader;
