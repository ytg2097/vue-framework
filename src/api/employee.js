import restRequest from "@/utils/request";

export const listEmployee = param =>
  restRequest({
    url: "/service-tenant/employee/list",
    method: "GET",
    params: param
  });

export const create = param =>
  restRequest({
    url: "/service-tenant/employee/",
    method: "POST",
    data: param
  });

export const modify = param =>
  restRequest({
    url: "/service-tenant/employee",
    method: "PUT",
    data: param
  });

export const remove = id =>
  restRequest({
    url: "/service-tenant/employee",
    method: "DELETE",
    params: {id:id}
  });

