import apiInterceptor from "services/interceptor";

export async function addRole(payload, headers) {
  return apiInterceptor
    .post("/user/addRole", payload, { headers: headers })
    .then((resp) => resp.data);
}

export async function updateRole(payload, headers) {
  return apiInterceptor
    .post("/user/updateRole", payload, { headers: headers })
    .then((resp) => resp.data);
}

export async function getRoleData(payload, headers) {
  return apiInterceptor
    .post("/user/getRoleData", payload, { headers: headers })
    .then((resp) => resp.data);
}
