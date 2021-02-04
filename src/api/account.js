import restRequest from "@/utils/request";

export const listAccount = param =>
  restRequest({
    url: "/service-tenant/account/list",
    method: "GET",
    params: param
  });


export const toggleAccountStatus = id =>
  restRequest({
    url: "/service-tenant/account/status/toggle",
    method: "PUT",
    params: {id:id}
  });

export const deleteAccount = id =>
  restRequest({
    url: "/service-tenant/account",
    method: "DELETE",
    params: {id:id}
  });

export const create = data =>
  restRequest({
    url: "/service-tenant/account/",
    method: "POST",
    data: data
  });

export const detail = id =>
  restRequest({
    url: "/service-tenant/account/{id}".replace(/{id}/g,id),
    method: "GET"
  });

export const modify = data =>
  restRequest({
    url: "/service-tenant/account",
    method: "PUT",
    data:data
  });


