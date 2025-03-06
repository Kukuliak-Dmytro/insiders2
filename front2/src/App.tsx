import { Outlet } from 'react-router'
import Header from './components/layout/Header'
import {QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SpinnerOverlay } from './components/layout/SpinnerOverlay'
function App() {
  
  const queryClient=new QueryClient()
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Header></Header>
        <Outlet></Outlet>
        <ReactQueryDevtools></ReactQueryDevtools>
        <SpinnerOverlay></SpinnerOverlay>
    </QueryClientProvider>
    </>
  )
}

export default App
