import user from './components/content/users/index'
import Product from './components/content/product/index'

const router = [
  {path: '/', exact: true, Component: user},
  {path: '/product', exact: true, Component: Product},
]

export default router;
