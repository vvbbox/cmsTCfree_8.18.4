import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import NavAdmin from './components/navAdmin';
import { useRecoilValue, useRecoilState } from 'recoil';
import '../scss/app.scss';
import { areaAtom, authAtom } from './state';
import { Adm, PrivateRoute, Editor } from './components';

const App = () => {
    const auth = useRecoilValue(authAtom);
    const [area, setArea] = useRecoilState(areaAtom);
    const token = auth?.role;
   
    const ConfigRoute = lazy(() => import('./config/configRoute'));
    const PictureRoute = lazy(() => import('./picture/pictureRoute'));
   
    const ContextRoute = lazy(() => import('./context/contextRoute'));
    const Weather = lazy(() => import('./weather/weather'));
    const PageNotFound = lazy(() => import('./components'));
    

    useEffect(() => { document.title = `You clicked ${area}`; }, [area]);
   

return (
        <>
            <BrowserRouter basename=''>
                <NavAdmin />
                <Routes>
                    <Route path={"/"}>
                        <Route index={true} element={<Navigate to='/api/view/1/1/1/1' replace />} />
                        

                        <Route path='js/second' element={<Navigate to='/js/second/index.html' replace />} />
                        <Route element={<PrivateRoute />}>
                            <Route path='Index' element={<Navigate to='/Index' replace />} />
                            <Route path='Privacy' element={<Navigate to='/Privacy' replace />} />
                            
                        </Route>
                        
                        
                        <Route path='admin' element={<Navigate to='/Identity/Account/Login' replace />} />
                        
                        <Route path='Identity/Account/Login' element={<Navigate to='/Identity/Account/Login' replace />} />
                    </Route>


                    <Route path="/api">
                        <Route path="FirstSpa" element={<Suspense fallback={<>...</>}><ContextRoute /></Suspense>} />
                        <Route index={true} element={<Navigate to='/api/view/1/1/1/1' replace />} />
                        <Route path='*' element={<Suspense fallback={<>...</>}><PageNotFound /></Suspense>} />
                        <Route path="view/*" element={<Suspense fallback={<>...</>}><ContextRoute /></Suspense>} />
                        <Route path="pagenotfound" element={<Suspense fallback={<>...</>}><PageNotFound /></Suspense>} />
                        <Route path='Identity/Account/Logout' element={<Navigate to='/Identity/Account/Logout' replace />} />
                        <Route path='Identity/Account/Login' element={<Navigate to='/Identity/Account/Login' replace />} />
                        <Route path='Identity/Account/Manage' element={<Navigate to='/Identity/Account/Manage' replace />} />
                        
                        <Route path='Identity/Admin/UsersList' element={<Navigate to='/Identity/Admin/UsersList' replace />} />
                        <Route path="config/*" element={<Suspense fallback={<>...</>}><ConfigRoute /></Suspense>} />
                        <Route path="picture/*" element={<Suspense fallback={<>...</>}><PictureRoute /></Suspense>} />
                        
                        <Route path="editor" element={<Suspense fallback={<>...</>}><Editor  /></Suspense>} />
                        
                        <Route path="adm" element={<Suspense fallback={<>...</>}><Adm prefix="/api" token={token} titleName={''} id={0} /></Suspense>} />
                        <Route path="weather" element={<Suspense fallback={<>...</>}><Weather /></Suspense>} />
                        <Route path='Home/Index' element={<Navigate to='/api/Home/Index' replace />} />
                        <Route path='Home/Privacy' element={<Navigate to='/api/Home/Privacy' replace />} />
                        <Route element={<PrivateRoute />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export { App };