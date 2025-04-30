import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Configlist } from './Configlist';
import {  Configform } from './Configform';


function ConfigRoute() {
   
    return (
        <div className="p-4">
            <div className="container">
                <Routes>
                    <Route exact path='/' element={<Configlist />} />
                    <Route path='/add' element={<Configform />} />
                    <Route path='/edit/:id' element={<Configform />} />
                </Routes>
            </div>
        </div>
    );
}
export default ConfigRoute ;