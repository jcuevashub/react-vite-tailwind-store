import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"
import { Link } from "react-router-dom"
import OrdersCard from "../../Componets/OrdersCard"

function MyOrders() {
  const context = useContext(ShoppingCartContext)

  return (
    <>
      <div className="flex items-center justify-center w-80">
        <h1>My Orders</h1>
      </div>
      {
        context.order.map((order, index) => (
          <Link to={`/my-orders/${index}`}>
            <OrdersCard
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts}
            />
          </Link>
        ))
      }
    </>
  )
}

export default MyOrders
