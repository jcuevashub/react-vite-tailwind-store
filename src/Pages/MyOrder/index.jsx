import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../../Componets/OrderCard';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

function MyOrder() {
    const context = useContext(ShoppingCartContext)

    return (
        <>
            <div className="flex items-center justify-center w-80 mb-6">
                <Link to='/my-orders'>
                    <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer mr-5" />
                </Link>
                <h1>My Order</h1>
            </div>
            <div className='flex flex-col w-80'>
                {
                    context.order?.slice(-1)[0].products.map(product => (
                        <OrderCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            imageUrl={product.images}
                            price={product.price}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default MyOrder
