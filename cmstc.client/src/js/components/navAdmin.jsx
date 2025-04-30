import React from 'react';
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useUserActions } from '../actions';
import { authAtom } from '../state';
import {areaAtom } from '../state';
import Area from './areas';


const NavAdmin = () => {
    const location = useLocation();
    const userActions = useUserActions();    

    useEffect(() => { (async () => { userActions.userAuth(); return await userActions.resetUser(); })() }, []);
  //useEffect(() => { console.log('Current auth is ', auth?.username);});

const auth = useRecoilValue(authAtom);
const name = auth?.username;
const role = auth?.role;
const area = useRecoilValue(areaAtom); 

return (
    <> 
         <div  style={{ display: (role === 'Admin') ? 'block' : 'none'  }} >
                
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <ul className="navbar-nav">               
                        
                        <Link to={`/${area}`+"/Home/Index"} className="nav-item nav-link">Home</Link>
                        <Link to={`/${area}`+"/config"} className="nav-item nav-link">Config</Link>
                        <Link to={`/${area}`+"/adm"} className="nav-item nav-link">Admin</Link>
                       
                        <Link to={`/${area}`+"/view/1/1/1/1"} className="nav-item nav-link">View</Link>
                        <Link to={`/${area}`+"/picture"} className="nav-item nav-link">Picture</Link>
                        <Link to={`/${area}`+"/weather"} className="nav-item nav-link">Weather</Link>

                   
                </ul>
                <form className="container-fluid justify-content-end">
                <Area />
                <ul className="navbar-nav">
                <li className="nav-item"><a className="nav-link" href="/Identity/Account/Manage">{name}</a></li> 
                    
                </ul>
                
                </form>
            </nav>
            
            </div>
           
            <Outlet />   
            </>
        
    );
};
export default NavAdmin ;