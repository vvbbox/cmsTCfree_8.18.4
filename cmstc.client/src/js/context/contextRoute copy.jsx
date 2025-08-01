import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

function ContextRoute() {
        const Contextview = lazy(() => import('./Contextview'));
 
    return (
        <>
                <Routes>
                        <Route path='/' element={<Suspense fallback={<>...</>}><Contextview /></Suspense>} />
                        <Route path={'/:idT/:idB/:idC/:idP'} element={<Suspense fallback={<>...</>}><Contextview /></Suspense>} />
                </Routes>
              
        </>
    );
}
export default ContextRoute;