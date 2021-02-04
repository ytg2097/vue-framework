import Vue from "vue";
import Router from "vue-router";
import Layout from "@/components/Layout";

Vue.use(Router);

export const constantRouterMap = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/login"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true
  },

  {
    path: "/",
    name: "dashboard",
    redirect: "/dashboard",
    component: Layout,
    children: [{
      path: "dashboard",
      name: "Dashboard",
      component: () => import("@/views/dashboard/index"),
      meta: { title: "首页", icon: "dashboard" }
    }]
  },

  {
    path: "/account",
    name: "account",
    redirect: "/account",
    component: Layout,
    children: [
      {
        path: "list",
        name: "AccountList",
        component: () => import("@/views/system/account/index"),
        meta: { title: "账户",icon: "dashboard" }
      },
      {
        path: "add",
        name: "AccountAdd",
        component: () => import("@/views/system/account/add"),
        meta: { title: "新增"},
        hidden: true
      },
      {
        path: "edit",
        name: "AccountEdit",
        component: () => import("@/views/system/account/edit"),
        meta: { title: "新增"},
        hidden: true
      },
      {
        path: "info",
        name: "Personal",
        component: () => import("@/views/system/account/info"),
        meta: { title: "info"},
        hidden: true
      }

    ]
  },

  {
    path: "/log",
    name: "log",
    redirect: "/log",
    component: Layout,
    children: [
      {
        path: "list",
        name: "LogList",
        component: () => import("@/views/system/log/index"),
        meta: { title: "日志",icon: "dashboard" }
      }
    ]
  },

  {
    path: "/employee",
    name: "employee",
    redirect: "/employee",
    component: Layout,
    children: [
      {
        path: "list",
        name: "EmployeeList",
        component: () => import("@/views/system/employee/index"),
        meta: { title: "人员",icon: "dashboard" }
      },
    ]
  },

  {
    path: "/role",
    name: "role",
    redirect: "/role",
    component: Layout,
    children: [
      {
        path: "list",
        name: "RoleList",
        component: () => import("@/views/system/role/index"),
        meta: { title: "角色",icon: "dashboard" }
      },
      {
        path: "add",
        name: "RoleAdd",
        component: () => import("@/views/system/role/add"),
        meta: { title: "角色新增",icon: "dashboard" },
        hidden: true
      },
      {
        path: "edit",
        name: "RoleEdit",
        component: () => import("@/views/system/role/edit"),
        meta: { title: "角色编辑增",icon: "dashboard" },
        hidden: true
      },
    ]
  }

];


export default new Router({
  routes: constantRouterMap
});
