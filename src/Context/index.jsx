import { createContext } from "react"

const ShopingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {
    <ShopingCartContext.Provider>
        {children}
    </ShopingCartContext.Provider>
}