import { useRecoilState } from 'recoil';
//import { history } from './history.js';//'../actions/history.js';
import { authAtom } from '../state';
import { useNavigate } from 'react-router-dom';
import { useAlertActions } from '../actions';
//import { API_URL } from '../index';



function useFetchWrapper() {
    const navigate = useNavigate();
    const [auth, setAuth] = useRecoilState(authAtom);
    const alertActions = useAlertActions();
    const API_URL = '';
    
    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE')
    };

    
     function request(method) {
        return (url, body) => {
            const requestOptions = {
                method,
                headers: authHeader(url)
            };
           // console.log(url); 
            if (body) {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body);
            }
        async function getJson() {return await fetch(url, requestOptions).then(response=> response.json());};
        //async function getJson() {return await fetch(url, requestOptions).then(handleResponse);};
        const data =  getJson(); //console.log(data); 
            return data;
        }
    }
    
    
    function authHeader(url) {
        // return auth header with jwt if user is logged in and request is to the api url
        const token = auth?.token;
        const isLoggedIn = !!token;
        const isApiUrl = url.startsWith(API_URL);
        
        if (isLoggedIn && isApiUrl) { return { Authorization: `Bearer ${token}` }; } 
        else { return {}; }
    }
    
    function handleResponse(response) { //console.log('xxx', response.json());
        return response.text().then(text => { const data = text && JSON.parse(text);
            
            if (!response.ok) {
                if ([401, 403].includes(response.status) && auth?.token) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    localStorage.removeItem('user');
                    setAuth(null);
                    navigate('/account/login');
                    
                }
    
                const error = (data && data.message) || response.statusText;
                alertActions.error(error);
                return Promise.reject(error);
            }
    
            return data;
        });
    }  
}
export { useFetchWrapper };
