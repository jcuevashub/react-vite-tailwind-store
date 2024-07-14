import { createContext, useState, useEffect } from "react"
import { apiUrl } from "../api";
export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {
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
    const [order, setOrder ] = useState([])

    const [items, setItems] = useState(null);
    const [searchByTitle, setSearchByTitle] = useState(null);
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

    useEffect(() => {
        if(searchByTitle) setFilteredItems(filteredItemsByTitle(items, searchByTitle))
    },[items, searchByTitle])

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
            filteredItems
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}