export const API_BASE_URL = "http://localhost:8080/api/v1";
export const WEBSOCKET_URL = "http://localhost:8080/websocket";

export const GRAPHQL = "/graphql";
export const USER = "/user";
export const USERS = "/users";
export const ADMIN = "/admin";
export const AUTH = "/auth";
export const REGISTRATION = "/registration";
export const CART = "/cart";
export const ORDER = "/order";
export const ORDERS = "/orders";
export const PERFUME = "/perfume";
export const PERFUMES = "/perfumes";
export const SEARCH = "/search";

// admin
export const ADMIN_ADD = ADMIN + "/add";
export const ADMIN_EDIT = ADMIN + "/edit";
export const ADMIN_DELETE = ADMIN + "/delete";
export const ADMIN_USER = ADMIN + USER;
export const ADMIN_USER_ALL = ADMIN_USER + "/all";
export const ADMIN_ORDER = ADMIN_USER + ORDER;
export const ADMIN_ORDERS = ADMIN_USER + ORDERS;
export const ADMIN_GRAPHQL = ADMIN + GRAPHQL;
export const ADMIN_GRAPHQL_USER = ADMIN_GRAPHQL + USER;
export const ADMIN_GRAPHQL_USER_ALL = ADMIN_GRAPHQL_USER + "/all";
export const ADMIN_GRAPHQL_ORDERS = ADMIN_GRAPHQL + ORDERS;
export const ADMIN_GRAPHQL_ORDER = ADMIN_GRAPHQL + ORDER;

// auth
export const AUTH_LOGIN = AUTH + "/login";
export const AUTH_FORGOT = AUTH + "/forgot";
export const AUTH_RESET = AUTH + "/reset";
export const AUTH_EDIT_PASSWORD = AUTH + "/edit/password";
export const REGISTRATION_ACTIVATE = REGISTRATION + "/activate";

// user
export const USERS_CART = USERS + CART;
export const USERS_ORDER = USERS + ORDER;
export const USERS_ORDERS = USERS + ORDERS;
export const USERS_INFO = USERS + "/info";
export const USERS_EDIT = USERS + "/edit";
export const USERS_REVIEW = USERS + "/review";
export const USERS_GRAPHQL = USERS + GRAPHQL;
export const USERS_GRAPHQL_ORDERS = USERS_GRAPHQL + ORDERS;
export const USERS_GRAPHQL_INFO = USERS_GRAPHQL + "/info";

// perfumes
export const PERFUMES_IDS = PERFUMES + "/ids";
export const PERFUMES_SEARCH = PERFUMES + SEARCH;
export const PERFUMES_SEARCH_GENDER = PERFUMES + SEARCH + "/gender";
export const PERFUMES_SEARCH_PERFUMER = PERFUMES + SEARCH + "/perfumer";
export const PERFUMES_GRAPHQL = PERFUMES + GRAPHQL;
export const PERFUMES_GRAPHQL_PERFUME = PERFUMES_GRAPHQL + PERFUME;
export const PERFUMES_GRAPHQL_PERFUMES = PERFUMES_GRAPHQL + PERFUMES;
export const PERFUMES_GRAPHQL_IDS = PERFUMES_GRAPHQL + "/ids";
