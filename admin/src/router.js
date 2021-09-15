import user from './components/content/users/index'
import Product from './components/content/product/index'
import Dashboard from './components/content/Dashboard/index'

const router = [
  {path: '/users', exact: true, Component: user},
  {path: '/', exact: true, Component: Dashboard},
  {path: '/products', exact: true, Component: Product},
]

export default router;
