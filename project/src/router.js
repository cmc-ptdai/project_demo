import Home from './components/product/Home'
import NotFound from './components/product/NotFound'
import Cart from './components/product/Cart'
import Product from './components/product/ProfileProduct'
import Products from './components/product/Products'
import searchProduct from './components/menu/search/SearchProductByName'

// const AuthLogin = Component => {
//   const [isOk, setIsOk] = useState(true)
//   return (
//     <>
//       {
//         isOk ? <Component /> : <Redirect to='/' />
//       }
//     </>
//   )
// }
const router = [
  {path: '/', exact: true, Component: Home},
  {path: '/vegetable', exact: true,type:'rau', Component: Products},
  {path: '/tubers', exact: true,type:'cu', Component: Products},
  {path: '/mushroom', exact: true,type:'nam', Component: Products},
  {path: '/fruit', exact: true,type:'qua', Component: Products},
  {path: '/cart', exact: true, Component: Cart},
  {path: '/products/:id', exact: true, Component: Product},
  {path: '/products', exact: true, type: '', Component: Products},
  {path: '/searchProducts', exact: true, type: '', Component: searchProduct},
  {path: '', exact: true, Component: NotFound}
]

export default router
