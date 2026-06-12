import { jsx as _jsx } from "react/jsx-runtime";
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { router } from './routes';
import './index.css';
function App() {
    return (_jsx(AuthProvider, { children: _jsx(RouterProvider, { router: router }) }));
}
export default App;
