import restRequest from "@/utils/request";

export const listRole = param =>
  restRequest({
    url: "/service-tenant/role/list",
    method: "GET",
    params: param
  });

export const deleteRole = id =>
  restRequest({
    url: "/service-tenant/role",
    method: "DELETE",
    params: {id:id}
  });

export const create = data =>
  restRequest({
    url: "/service-tenant/role/",
    method: "POST",
    data: data
  });

export const allRole = () =>
  restRequest({
    url: "/service-tenant/role/simple",
    method: "GET"
  });

export const detail = id =>
  restRequest({
    url: "/service-tenant/role/{id}/detail".replace(/{id}/g,id),
    method: "GET"
  });

export const modify = data =>
  restRequest({
    url: "/service-tenant/role",
    method: "PUT",
    data:data
  });



