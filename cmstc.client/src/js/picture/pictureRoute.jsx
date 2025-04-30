import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {Picturelist } from './Picturelist';
import { Pictureform } from './Pictureform';


function PictureRoute() {
    
    return (
        <div className="p-4">
            <div className="container">
                <Routes>
                    <Route exact path='/' element={<Picturelist />} />
                    <Route path='/add' element={<Pictureform />} />
                    <Route path='/edit/:id' element={<Pictureform />} />
                </Routes>
            </div>
        </div>
    );
}
export default PictureRoute ;