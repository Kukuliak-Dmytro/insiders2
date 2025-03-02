import { Outlet } from 'react-router'
import Header from './components/layout/Header'
function App() {
  

  return (
    <>
    <Header></Header>
      <Outlet></Outlet>
    </>
  )
}

export default App
