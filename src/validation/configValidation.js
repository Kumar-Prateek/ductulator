import * as Yup from "yup";
import { ipv4Regex, ipv6Regex, urlRegex } from "./regex";

export const ipValidation = Yup.object().shape({
  ip: Yup.string()
    .required("Please enter ip")
    .test("value", "Please provide a valid ip", (value) => {
      return ipv4Regex.test(value) || ipv6Regex.test(value) || urlRegex.test(value);
    }),
});
