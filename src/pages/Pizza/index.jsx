import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Pizza = () => {
  const [pizza, setPizza] = useState({})
  const params = useParams()

  useEffect(() => {
    const fetchPizza = async () => {
      const res = await fetch(
        `https://6758135e60576a194d0eb1a9.mockapi.io/items/${params.id}`
      )
      const resJson = await res.json()

      setPizza(resJson)
    }
    fetchPizza()
  }, [])
  console.log(pizza.imageUrl)
  
  return (
    pizza && <div>
      <img src={`${pizza.imageUrl}`} alt="здесь должна быть пицца" />
      <h1>{pizza.title}</h1>
   
    </div>
  )
}

export default Pizza
