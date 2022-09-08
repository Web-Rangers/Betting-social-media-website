export { default as middleware } from "next-auth/middleware"

/* 
    add routes to the matcher to protect them
    from unauthenticated users
*/
export const config = { matcher: ["/user-dashboard"] }