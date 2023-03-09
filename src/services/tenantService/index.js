import apiInterceptor from "services/interceptor";
import formDataInterceptor from "services/interceptor/formDataInterceptor";

export async function addTenant(payload, headers) {
  return formDataInterceptor
    .post("/user/addTenant", payload, { headers })
    .then((resp) => resp.data);
}

export async function removeTenant(payload, headers) {
  return apiInterceptor.post("/user/removeTenant", payload, { headers }).then((resp) => resp.data);
}

export async function getAllTenant(headers) {
  return formDataInterceptor.get("/user/getAllTenant", { headers }).then((resp) => resp.data);
}
