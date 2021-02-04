import restRequest from "@/utils/request";

export const allMenu = () =>
  restRequest({
    url: "/service-tenant/menu/simple",
    method: "GET"
  });


