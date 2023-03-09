export function successService(resp) {
  if (resp && resp?.responseCode?.toString() === "200") {
    return true;
  } else {
    return false;
  }
}
