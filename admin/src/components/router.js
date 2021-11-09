import user from './content/users/index'
import Products from './content/product/index'
import Dashboard from './content/Dashboard/index'
import Orders from './content/Orders/Orders'
import Comments from './content/comments/Comments'
import Evaluates from './content/evaluates/Evaluates'
import Warehouse from './content/warehouse/Warehouse'
import Notfound from './content/Notfound'
import Slides from './content/slides/Slide'
import ReplyNewComment from './content/comments/ReplyNewComments'

const router = [
  {path: '/body', exact: true, Component: Dashboard},
  {path: '/body/users', exact: true, Component: user},
  {path: '/body/slides', exact: true, Component: Slides},
  {path: '/body/vegetable',typeID:  'rau', exact: true, Component: Products},
  {path: '/body/tubers',typeID:  'cu', exact: true, Component: Products},
  {path: '/body/mushroom',typeID:  'nam', exact: true, Component: Products},
  {path: '/body/fruit',typeID:  'qua', exact: true, Component: Products},
  {path: '/body/orders', exact: true, Component: Orders},
  {path: '/body/warehouse', exact: true, Component: Warehouse},
  {path: '/body/evaluates/:id', exact: true, Component: Evaluates},
  {path: '/body/comments/:id', exact: true, Component: Comments},
  {path: '/body/comments/:id/:idComment', exact: true, Component: ReplyNewComment},
  {path: '*', exact: true, Component: Notfound},
]

export default router;