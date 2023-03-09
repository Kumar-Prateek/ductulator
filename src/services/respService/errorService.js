import { Messages } from "constants/messages";
import Swal from "sweetalert2";
import { CustomSwal } from "utility/swal";
import showToast from "utility/toast";

export function errorService({ resp, isGet, isToast }) {
  if (resp && resp?.responseMessage) {
    showRespMessage(resp, isGet, isToast);
  }
}

function showRespMessage(resp, isGet, isToast) {
  if (isGet && isToast) {
    if (resp?.responseCode?.toString() !== "204")
      showToast(
        "error",
        resp?.responseMessage
          ? resp?.responseMessage + "\n" + resp?.responseFrom
          : Messages.noResp + "\n" + resp?.responseFrom
      );
  } else {
    if (!Swal.isVisible()) {
      CustomSwal("error", resp?.responseMessage ?? Messages.noResp, resp?.responseFrom);
    }
  }
}
