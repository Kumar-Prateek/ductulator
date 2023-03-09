import apiInterceptor from "services/interceptor";

export async function getOtp(payload) {
  return apiInterceptor.post("/getOtp", payload).then((resp) => resp.data);
}

export async function verifyOtp(payload) {
  return apiInterceptor.post("/verifyOtp", payload).then((resp) => resp.data);
}

export async function resendOtp(payload, headers) {
  return apiInterceptor.post("/resendOtp", payload, { headers }).then((resp) => resp.data);
}

export async function logout(payload, headers) {
  return apiInterceptor.post("/user/logout", payload, { headers }).then((resp) => resp.data);
}
