export const KANBAN = { path: "/dashboard" }
export const BOARD = { path: KANBAN.path + "/board/:id"}
export const PROJECT_LIST = { path: KANBAN.path + "/project-list"}
export const CREATE_PROJECT = { path: KANBAN.path + "/create-project"}
export const SIGN_UP = { path: "/auth/signup" }
export const LOGIN = { path: "/auth/login" }