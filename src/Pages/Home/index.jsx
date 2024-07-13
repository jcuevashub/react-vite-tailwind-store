import { useEffect, useState } from "react"
import Card from "../../Componets/Card"
import { apiUrl } from "../../api";
import ProductDetail from "../../Componets/ProductDetail";

function Home() {
  const [items, setItems] = useState(null);

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

  return (
    <>
      Home
      <section className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {
          items?.map(item => (
            <Card key={item.id} data={item} />
          ))
        }
      </section>
      <ProductDetail />
    </>
  )
}

export default Home
