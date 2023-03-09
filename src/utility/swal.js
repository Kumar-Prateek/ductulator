import Swal from "sweetalert2";

export function ShowSwalMsg(icon, msg) {
  Swal.fire({
    title: getSwalTitle(icon),
    text: msg,
    icon,
  });
}

export function getSwalTitle(val) {
  switch (val) {
    case "error":
      return "Error!";
    case "warning":
      return "Warning!";
    case "success":
      return "Success!";
    case "info":
      return "Info!";
    case "question":
      return "";
    default:
      return "";
  }
}

export function ShowSwalWithResult(icon, msg) {
  return Swal.fire({
    title: getSwalTitle(icon),
    text: msg,
    icon,
    showDenyButton: true,
    denyButtonText: "No",
  });
}

export function CustomSwal(icon, msg, subMsg) {
  Swal.fire({
    title: msg,
    icon,
    html: `<div style="display: flex; flex-direction: row; justify-content: flex-end; font-size: 10px"> ${subMsg}</div>`,
  });
}
