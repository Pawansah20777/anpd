
import { Navigate,Outlet } from 'react-router-dom';

const Private=() =>{
    const userAuth=localStorage.getItem('users');
    const adminAuth = localStorage.getItem("admins");
    return userAuth || adminAuth?<Outlet/>:<Navigate to="/Signin"/>
}
export default Private;