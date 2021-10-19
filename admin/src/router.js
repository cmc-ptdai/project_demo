import user from './components/content/users/index'
import Products from './components/content/product/index'
import Dashboard from './components/content/Dashboard/index'
import Orders from './components/content/Orders/Orders'

const router = [
  {path: '/', exact: true, Component: Dashboard},
  {path: '/users', exact: true, Component: user},
  {path: '/vegetable',typeID:  'rau', exact: true, Component: Products},
  {path: '/tubers',typeID:  'cu', exact: true, Component: Products},
  {path: '/mushroom',typeID:  'nam', exact: true, Component: Products},
  {path: '/fruit',typeID:  'qua', exact: true, Component: Products},
  {path: '/orders', exact: true, Component: Orders},
]

export default router;
