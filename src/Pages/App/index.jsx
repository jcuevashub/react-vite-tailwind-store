import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom'
import Home from "../Home"
import MyAccount from "../MyAccount"
import MyOrder from "../MyOrder"
import MyOrders from "../MyOrders"
import NotFound from "../NotFound"
import SignIn from "../SignIn"
import Navbar from '../../Componets/Navbar'
import Layout from '../../Componets/Layout'
import { ShoppingCartContext, ShoppingCartProvider } from '../../Context'
import CheckoutSideMenu from '../../Componets/CheckoutSideMenu'
import { useContext } from 'react'

const AppRoutes = () => {

    const context = useContext(ShoppingCartContext)
  
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)

    //Sign Out
    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)

    //Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = Object.keys(context.account).length === 0
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState
    const isUserSignOut = context.signOut || parsedSignOut

    let routes = useRoutes([
        { path: '/', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate  replace to={'/sign-in'}/> },
        { path: '/mensclothing', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate  replace to={'/sign-in'}/> },
        { path: '/womensclothing', element:hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate  replace to={'/sign-in'}/> },
        { path: '/electronics', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate  replace to={'/sign-in'}/>},
        { path: '/jewelery', element:hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate  replace to={'/sign-in'}/> },
        { path: '/my-account', element: <MyAccount /> },
        { path: '/my-order', element: <MyOrder /> },
        { path: '/my-orders', element: <MyOrders /> },
        { path: '/my-orders/last', element: <MyOrder /> },
        { path: '/my-orders/:id', element: <MyOrder /> },
        { path: '/sign-in', element: <SignIn /> },
        { path: '/*', element: <NotFound /> },
    ])

    return routes;
}

function App() {
    return (
        <ShoppingCartProvider>
            <BrowserRouter>
            <Navbar />
                <CheckoutSideMenu />
                <Layout>
                    <AppRoutes />
                </Layout>
            </BrowserRouter>
        </ShoppingCartProvider>
    )
}

export default App
