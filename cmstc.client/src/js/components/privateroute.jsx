import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '../state';



export function PrivateRoute() {
   // const navigate = useNavigate();
    const auth = useRecoilValue(authAtom);
    const role = auth?.role;
            return(  (role === 'Admin') ? <Outlet /> : <Navigate to="/Identity/Account/Login" />);
   
}

