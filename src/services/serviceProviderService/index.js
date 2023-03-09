import apiInterceptor from "services/interceptor";

export async function addProvider(payload, headers) {
  return apiInterceptor
    .post("/serviceProvider/addProvider", payload, { headers: headers })
    .then((resp) => resp.data);
}

export async function registerProvider(payload, headers) {
  return apiInterceptor
    .post("/serviceProvider/registerProvider", payload, { headers: headers })
    .then((resp) => resp.data);
}

export async function removeProvider(payload, headers) {
  return apiInterceptor
    .post("/serviceProvider/removeProvider", payload, { headers: headers })
    .then((resp) => resp.data);
}

export async function setPriority(payload, headers) {
  return apiInterceptor
    .post("/serviceProvider/setPriority", payload, { headers: headers })
    .then((resp) => resp.data);
}

export async function getProviderList(payload, headers) {
  return apiInterceptor
    .post("/serviceProvider/getProvider", payload, { headers: headers })
    .then((resp) => resp.data);
}

export async function getUserProvider(payload, headers) {
  return apiInterceptor
    .post("/serviceProvider/getUserProvider", payload, { headers: headers })
    .then((resp) => resp.data);
}
