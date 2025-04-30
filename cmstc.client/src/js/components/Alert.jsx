//import { useEffect, useContext } from 'react';
import { useRecoilValue } from 'recoil';

import { alertAtom } from '../state';
import { useAlertActions } from '../actions';
//import { UNSAFE_NavigationContext } from 'react-router-dom';



function Alert() {
  //  const { navigator } = useContext(UNSAFE_NavigationContext); // the browser history object 
    const alert = useRecoilValue(alertAtom);
    const alertActions = useAlertActions();
/*
    useEffect(() => {
        // clear alert on location change
        const unlisten = navigator.listen(alertActions.clear);

        // stop the listener when component unmounts
        return unlisten;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
*/
    if (!alert) return null;

    return (
        <div className="container">
            <div className="m-3">
                <div className={`alert alert-dismissable ${alert.type}`}>
                    <Link className="close" onClick={alertActions.clear}>&times;</Link>
                    {alert.message}
                </div>
            </div>
        </div>
    );
}
export { Alert };