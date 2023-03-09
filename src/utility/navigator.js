const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export default function getLocation(successCallBack, errorCallBack) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      successCallBack(position);
    },
    (error) => {
      errorCallBack(error);
    },
    options
  );
}

export async function checkLocationPermission() {
  const permissionResp = await navigator.permissions
    .query({ name: "geolocation" })
    .then((resp) => resp);
  return permissionResp;
}
