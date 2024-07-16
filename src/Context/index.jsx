import { createContext, useState, useEffect } from "react"
import { apiUrl } from "../api";
export const ShoppingCartContext = createContext()

export const initializeLocalStorage = () => {
    const acccountInLocalStorage = localStorage.getItem('account')
    const signOutInLocalStorage = localStorage.getItem('sign-out')
    let parsedAccount
    let parsedSignOut

    if(!acccountInLocalStorage) {
        localStorage.setItem('account', JSON.stringify({}))
        parsedAccount = {}
    } else {
        parsedAccount = JSON.parse(acccountInLocalStorage)
    }

    if (!signOutInLocalStorage) {
        localStorage.setItem('sign-out', JSON.stringify(false))
        parsedSignOut = false
    } else {
        parsedSignOut = JSON.parse(signOutInLocalStorage)
    }
}

export const ShoppingCartProvider = ({ children }) => {
    const [account, setAccount ] = useState({})
    const [signOut, setSignOut] = useState(false)

    const [count, setCount] = useState(0)

    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    const [productToShow, setProductToShow] = useState({})
    const [cartProducts, setCartProducts] = useState([])

    // Shopping Cart . Order
    const [order, setOrder] = useState([])

    const [items, setItems] = useState(null);
    const [searchByTitle, setSearchByTitle] = useState(null);
    const [searchByCategory, setSearchByCategory] = useState(null);

    const [filteredItems, setFilteredItems] = useState(null);

    useEffect(() => {
        const fetData = async () => {
            try {
                const response = await fetch(`${apiUrl}/products`)
                const data = await response.json()
                setItems(data)
            } catch (error) {
                console.error(`Oh no, ocurrió un error: ${error}`)
            }
        }
        fetData()
    }, [])

    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.toLowerCase().includes(searchByCategory?.toLowerCase()))
    }

    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
            return filteredItemsByTitle(items, searchByTitle)
        }

        if (searchType === 'BY_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory)
        }

        if (searchType === 'BY_TITLE_AND_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle?.toLowerCase()))
        }

        if (!searchType) {
            return items
        }
    }

    useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))

    }, [items, searchByTitle, searchByCategory])

    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            searchByCategory,
            setSearchByCategory,
            account,
            setAccount,
            signOut,
            setSignOut
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}