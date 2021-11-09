import Login from './components/content/login/Login'
import Body from './components/index'
//import Notfound from './components/content/Notfound'

const router = [
  {path: '/', exact: true, Component: Login},
  {path: '/body', exact: false, Component: Body},
  {path: '*', exact: false, Component: Login},
]

export default router;
