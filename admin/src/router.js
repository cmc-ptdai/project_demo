import user from './components/content/users/index'
import Vegetable from './components/content/product/vegetable/index'
import Dashboard from './components/content/Dashboard/index'

const router = [
  {path: '/users', exact: true, Component: user},
  {path: '/', exact: true, Component: Dashboard},
  {path: '/vegetable', exact: true, Component: Vegetable},
]

export default router;
