import { Button } from "@/components/ui/button"
import { useUser } from "./hooks/useAuth"

function App() {
  const { data: user } = useUser()

  console.log(user)

  return (
    <>
      <Button>Click me</Button>
      <p className="read-the-docs text-cyan-300">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
