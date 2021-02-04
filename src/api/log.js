import restRequest from "@/utils/request";

export const listOperationLog = param =>
  restRequest({
    url: "/service-log/tenant-operation-log/list",
    method: "GET",
    params: param
  });
