import apiInterceptor from "services/interceptor";

export async function getAllPlans(payload) {
  return apiInterceptor.post("/user/getPlans", payload).then((resp) => resp.data);
}

export async function getMyPlans(payload) {
  return apiInterceptor.post("/user/userPlans", payload).then((resp) => resp.data);
}

export async function registerPlan(payload) {
  return apiInterceptor.post("/user/registerPlan", payload).then((resp) => resp.data);
}

export async function addPlan(payload) {
  return apiInterceptor.post("/user/addPlan", payload).then((resp) => resp.data);
}
