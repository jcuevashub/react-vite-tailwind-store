import { useContext } from "react"
import Card from "../../Componets/Card"
import ProductDetail from "../../Componets/ProductDetail";
import { ShoppingCartContext } from "../../Context";

function Home() {
  const context = useContext(ShoppingCartContext)
  return (
    <>
      <div className="flex items-center justify-center relative w-80 mb-4">
      <h1 className="font-medium text-xl">Exclusive Products</h1>
      </div>
      <input 
        type="text"
        placeholder="Search a product"
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
        onChange={(event) => context.setSearchByTitle(event.target.value)} 
      />
      <section className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {
          context.items?.map(item => (
            <Card key={item.id} data={item} />
          ))
        }
      </section>
      <ProductDetail />

    </>
  )
}

export default Home
