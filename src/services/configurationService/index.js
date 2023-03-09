import apiInterceptor from "services/interceptor";
import formDataInterceptor from "services/interceptor/formDataInterceptor";

export async function generateToken(headers) {
  return apiInterceptor
    .get("/serviceProvider/generateToken", { headers })
    .then((resp) => resp.data);
}

export function getGenerateToken(headers) {
  return apiInterceptor.get("/serviceProvider/getToken", { headers }).then((resp) => resp.data);
}

export function whitelistIp(payload, headers) {
  return apiInterceptor
    .post("/serviceProvider/addIpAddress", payload, { headers })
    .then((resp) => resp.data);
}

export function getAllowedIP(headers) {
  return apiInterceptor.get("/serviceProvider/getAllowedIP", { headers }).then((resp) => resp.data);
}

export function uploadDocument(payload, headers) {
  return formDataInterceptor.post("/uploadFiles", payload, { headers }).then((resp) => resp.data);
}
