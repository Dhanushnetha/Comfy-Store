import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorElement } from './Components'
import {About, Cart, Checkout, Error, HomeLayout, Landing, Login, Orders, Products, Register, SingleProduct} from './Pages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

//loaders
import {loader as landingLoader } from './Pages/Landing'
import {loader as singleProductLoader } from './Pages/SingleProduct'
import {loader as productsLoader } from './Pages/Products'
import {loader as checkoutLoader } from './Pages/Checkout'
import {loader as ordersLoader } from './Pages/Orders'

import {action as registerAction} from './Pages/Register'
import {action as loginAction} from './Pages/Login'
import {action as checkoutAction} from './Components/CheckoutForm'

import { store } from './store'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    }
  }
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout/>,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing/>,
        errorElement: <ErrorElement/>,
        loader: landingLoader(queryClient),
      },
      {
        path: 'products',
        element: <Products/>,
        errorElement : <ErrorElement/>,
        loader: productsLoader(queryClient),
      },
      {
        path: 'products/:id',
        element: <SingleProduct/>,
        errorElement : <ErrorElement/>,
        loader: singleProductLoader(queryClient),
      },
      {
        path: 'cart',
        element: <Cart/>,
      },
      {
        path: 'about',
        element: <About/>,
      },
      {
        path: 'checkout',
        element: <Checkout/>,
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient),
      },
      {
        path: 'orders',
        element: <Orders/>,
        loader: ordersLoader(store, queryClient),
      }
    ]
  },
  {
    path: '/login',
    element: <Login/>,
    errorElement: <Error/>,
    action: loginAction(store),
  },
  {
    path: '/register',
    element: <Register/>,
    errorElement: <Error/>,
    action: registerAction,
  }
])

const App = () => {
  return ( <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false}/>
  </QueryClientProvider> )
}
export default App