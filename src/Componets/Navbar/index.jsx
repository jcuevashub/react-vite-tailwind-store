import { NavLink } from "react-router-dom"
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { ShoppingBagIcon } from "@heroicons/react/24/solid"
import ShoppingCart from "../ShoppingCart"

const Navbar = () => {
    const activeStyle = 'underline underline-offset-4'
    const context = useContext(ShoppingCartContext)

    //Sign Out
    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    const isUserSignOut = context.signOut || parsedSignOut

    // Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)

    // Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

    const handleSignOut = () => {
        const stringifiedSignOut = JSON.stringify(true)
        localStorage.setItem('sign-out', stringifiedSignOut)
        context.setSignOut(true)
    }

    const renderView = () => {
        if (hasUserAnAccount && !isUserSignOut) {
            return (
                <>
                    <li className="text-black/60">
                        {parsedAccount?.email}
                    </li>
                    <li>
                        <NavLink to='/my-orders' className={({ isActive }) => isActive ? activeStyle : undefined}>
                            My Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/my-account' className={({ isActive }) => isActive ? activeStyle : undefined}>
                            My Account
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/sign-in' className={({ isActive }) => isActive ? activeStyle : undefined}
                            onClick={() => handleSignOut()}>
                            Sign Out
                        </NavLink>
                    </li>
                </>
            )
        } else {
            return (
                <li>
                    <NavLink to='/sign-in' className={({ isActive }) => isActive ? activeStyle : undefined}
                        onClick={() => handleSignOut()}
                    >
                        Sign in
                    </NavLink>
                </li>
            )

        }
    }

    return (
        <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm bg-white">
            <ul className="flex items-center gap-3">
                <li className="font-semibold text-lg">
                    <NavLink
                        to={`${isUserSignOut ? '/sign-in' : '/'}`}>
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/' onClick={() => context.setSearchByCategory()} className={({ isActive }) => isActive ? activeStyle : undefined}>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/mensclothing' onClick={() => context.setSearchByCategory('men\'s clothing')} className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Men's clothing
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/womensclothing' onClick={() => context.setSearchByCategory('women\'s clothing')} className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Women's clothing
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/electronics' onClick={() => context.setSearchByCategory('electronics')} className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/jewelery' onClick={() => context.setSearchByCategory('jewelery')} className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Jewelery
                    </NavLink>
                </li>
            </ul>
            <ul className="flex items-center gap-3">
                {renderView()}
                <li className="flex items-center">
                 <ShoppingCart />
                </li>
            </ul>
        </nav>
    )
}

export default Navbar