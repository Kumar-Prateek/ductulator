import { toast } from "react-toastify";

export default function showToast(type, msg) {
  return toast[type](msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
}
