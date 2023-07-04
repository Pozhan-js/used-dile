import { RouterMount, createRouter } from 'uni-simple-router';
import { verifyUserInfo, verifyLogin } from "@/common/function/project";
const router = createRouter({
    platform: process.env.VUE_APP_PLATFORM,
    routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach(async (to, _, next) => {
    let { meta } = to;
    try {
        if (meta.verifyLogin) await verifyLogin();
        if (meta.verifyInfo) await verifyUserInfo();
        next();
    } catch (error) {
        error instanceof Function && error(() => router.$lockStatus = false);
    }
});
export {
    router,
    RouterMount
}
