import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const Layout = ({ children, title }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("nav", { className: "bg-white shadow", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between h-16", children: [_jsx("div", { className: "flex items-center", children: _jsx("h1", { className: "text-2xl font-bold text-blue-600", children: "EasySLR" }) }), _jsx("div", { className: "flex items-center space-x-4", children: user && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-sm text-gray-700", children: user.email }), _jsx("button", { onClick: handleLogout, className: "px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100", children: "Logout" })] })) })] }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [title && _jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-8", children: title }), children] })] }));
};
export default Layout;
