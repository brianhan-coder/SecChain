import router from './router'
import store from './store'
import progress from 'progress' // progress bar
import { getToken } from '@/utils/auth' // get token from cookie
import { getAsyncRoutes } from '@/utils/asyncRouter'

const whiteList = ['/login'];
router.beforeEach( async (to, from, next) => {
    progress.start()
    document.title = to.meta.title;
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
            progress.done()
        } else {
            let route = await store.state.addRoutes;
            const hasRouters = route && route.length>0;
            if ( hasRouters ) {
                next()
            } else {
                //s获取异步路由
                try {
                    const accessRoutes = getAsyncRoutes(await store.state.addRoutes );
                    // 动态路由
                    router.addRoutes(accessRoutes);
                    next({ ...to, replace: true })
                } catch (error) {
                    // error
                    next(`/login?redirect=${to.path}`)
                    progress.done()
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            progress.done()
        }
    }
})

router.afterEach(() => {
    progress.done()
})
