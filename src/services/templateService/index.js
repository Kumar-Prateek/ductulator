import apiInterceptor from "services/interceptor";

export async function addtemplate(payload, headers) {
  return apiInterceptor
    .post("/serviceProvider/addtemplate", payload, { headers })
    .then((resp) => resp.data);
}
