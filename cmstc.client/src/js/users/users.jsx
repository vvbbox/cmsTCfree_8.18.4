import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';

import { List } from './List';
import { AddEdit } from './AddEdit';


function Users() {
   // const location = useLocation();
    //const  path  = location.pathname;
    
    return (
        <>
        <div className="p-4">
            <div className="container">
                <Routes>
                    <Route path='/' element={<List />} />
                    <Route path='/add' element={<AddEdit />} />
                    <Route path='/edit/:id' element={<AddEdit />} />
                </Routes>
            </div>
        </div>
            <Outlet />
        </>
    );
}
export default Users ;