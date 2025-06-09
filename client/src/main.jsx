import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { appStore } from './app/store'
import { useLoadUserQuery } from './app/api/authApi'
import LoaderPage from './components/LoaderPage'

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? <LoaderPage/> : <>{children}</>}</>;
};

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <BrowserRouter>
      <Custom>
         <App />
         <Toaster/>
      </Custom>
   </BrowserRouter>  
  </Provider>

)
