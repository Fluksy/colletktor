import { useState } from 'react'
import { Button } from '~/lib/components/ui/button'

export default function Home() {
  const [counter, setCounter] = useState(0)
  return (
    <div>
      <p>hello from home</p>

      <Button onClick={() => setCounter((counter) => counter + 1)}>Counter: {counter}</Button>
    </div>
  )
}
