import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

export const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useSelector(store=>store.auth);

    if(!isAuthenticated){
        toast.error("You need to Login to access this page")
        return <Navigate to="/login"/>
    }

    return children;
}
export const AuthenticatedUser = ({children}) => {
    const {isAuthenticated} = useSelector(store=>store.auth);

    if(isAuthenticated){
        toast.error("You are already Logged In");
        return <Navigate to="/"/>
    }

    return children;
}

export const AdminRoute = ({children}) => {
    const {user, isAuthenticated} = useSelector(store=>store.auth);

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }

    if(user?.role !== "tutor"){
        toast.error("You are not authorized to access this page")
        return <Navigate to="/"/>
    }

    return children;
}