import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context'
import { XMarkIcon } from '@heroicons/react/24/solid'
import './styles.css'
import OrderCard from '../OrderCard';

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext)
    return (
        <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} z-10 top-98 flex-col fixed right-0 border bg-white border-black rounded-lg w-[360px] h-[calc(100vh-80px)]`}>
            <div className="flex justify-between items-center p-6">
                <h2 className="font-medium text-xl">My Order</h2>
                <div>
                    <XMarkIcon
                        className='h-6 w-6 text-black cursor-pointer'
                        onClick={() => context.closeCheckoutSideMenu()}
                    />
                </div>
            </div>
            <div className='px-6 overflow-y-scroll'>
            {
                context.cartProducts.map(product => (
                    <OrderCard
                        key={product.id}
                        title={product.title}
                        imageUrl={product.images}
                        price={product.price}
                    />
                ))
            }
            </div>
        </aside>
    )
}

export default CheckoutSideMenu