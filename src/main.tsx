import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/reactQuery.ts'
import { Toaster } from "@/components/ui/toaster"
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <Toaster />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
