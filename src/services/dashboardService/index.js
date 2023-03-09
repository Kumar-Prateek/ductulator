import apiInterceptor from "services/interceptor";

export async function getActiveUser(payload) {
  return apiInterceptor.get("/user/activeUser", payload).then((resp) => resp.data);
}

export async function getUsageReport(payload) {
  return apiInterceptor.post("/user/usageReport", payload).then((resp) => resp.data);
}

export function getProviderUsage(payload) {
  return apiInterceptor.post("/user/providerUsage", payload).then((resp) => resp.data);
}

export function getTenantUsage(payload) {
  return apiInterceptor.post("/user/tenantUsage", payload).then((resp) => resp.data);
}

export function getPendingInvoice() {
  return apiInterceptor.get("/user/pendingInvoice").then((resp) => resp.data);
}

export function getTenantPendingInvoice(headers) {
  return apiInterceptor.get("/user/tenantPendingInvoice", { headers }).then((resp) => resp.data);
}

export function getPlanExpiration() {
  return apiInterceptor.get("/user/planExpiration").then((resp) => resp.data);
}

export function getMobileNumberRecord(payload) {
  return apiInterceptor.post("/user/mobileNumberRecord", payload).then((resp) => resp.data);
}

export function getMessageIdRecord(payload) {
  return apiInterceptor.post("/user/messageIdRecord", payload).then((resp) => resp.data);
}

export function getTenantMinuteCount(payload) {
  return apiInterceptor.post("/user/minuteCount", payload).then((resp) => resp.data);
}

export function getTenantHourCount(payload) {
  return apiInterceptor.post("/user/hourCount", payload).then((resp) => resp.data);
}
