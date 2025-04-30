import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { useFetchWrapper } from '../actions';
import { authAtom, configsAtom, configAtom } from '../state';
import { areaAtom } from '../state';

function useConfigActions() {
    const area = useRecoilValue(areaAtom);
    const API_URL = `/${area}`;
    const baseUrl = `${API_URL}/Configs`;
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);
    const setConfigs = useSetRecoilState(configsAtom);
    const setConfig = useSetRecoilState(configAtom);
    const resetConfigs = useResetRecoilState(configsAtom);
    const resetConfig = useResetRecoilState(configAtom);

    return {
        register,
        getAll,
        getById,
        update,
        delete: _delete,
        resetConfigs,
        resetConfig,
    };

    // Регистрация новой конфигурации
    function register(data) {
        const { Id, ...rest } = data; // Удаляем поле Id
        return fetchWrapper.post(baseUrl, rest);
    }

    // Получение всех конфигураций
    function getAll() {
        return fetchWrapper.get(baseUrl).then(setConfigs);
    }

    // Получение конкретной конфигурации по ID
    function getById(id) {
        return fetchWrapper.get(`${baseUrl}/${id}`)
            .then(data => {
                setConfig(data);
                return data;
            });
    }

    // Обновление конфигурации
    function update(id, params) {
        return fetchWrapper.put(`${baseUrl}/${id}`, params)
            .then(response => {
                if (auth && id === auth.id) {
                    const updatedAuth = { ...auth, ...params };
                    localStorage.setItem('user', JSON.stringify(updatedAuth));
                    setAuth(updatedAuth);
                }
                return response;
            });
    }

    // Удаление конфигурации (с префиксом _ из-за ключевого слова delete)
    function _delete(id) {
        // Устанавливаем флаг isDeleting перед удалением
        setConfigs(prevConfigs => prevConfigs.map(config => 
            config.id === id ? { ...config, isDeleting: true } : config
        ));

        return fetchWrapper.delete(`${baseUrl}/${id}`)
            .then(() => {
                // Удаляем из стейта после успешного удаления
                setConfigs(prevConfigs => prevConfigs.filter(config => config.id !== id));
            })
            .catch(error => {
                // Восстанавливаем состояние если удаление провалилось
                setConfigs(prevConfigs => prevConfigs.map(config => 
                    config.id === id ? { ...config, isDeleting: false } : config
                ));
                throw error;
            });
    }
}

export { useConfigActions };
/*
import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { useFetchWrapper } from '../actions';
import { authAtom, configsAtom, configAtom } from '../state';
//import { API_URL } from '../index';
import {areaAtom } from '../state';

function useConfigActions () {
   // const baseUrl = `/users`; 
    const area = useRecoilValue(areaAtom);
    const API_URL = `/${area}`;
    const baseUrl = `${API_URL}/Configs`;
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);
    const setConfigs = useSetRecoilState(configsAtom);
    const setConfig = useSetRecoilState(configAtom);
    

    return {
      //  getConfig,
        register,
        getAll,
        getById,
        update,
        delete: _delete,
        resetConfigs: useResetRecoilState(configsAtom),
        resetConfig: useResetRecoilState(configAtom)
    }

  //  function getConfig(id: number) { return ('xxx'); }

    function register(data) {
        delete (data.Id);
        return fetchWrapper.post(`${baseUrl}`, data);
    }

    function getAll() {
        return fetchWrapper.get(baseUrl).then(setConfigs);
    }

    function getById(id) {
        return fetchWrapper.get(`${baseUrl}/${id}`).then(setConfig);
    }

    function update(id, params) {
        return fetchWrapper.put(`${baseUrl}/${id}`, params)
            .then(x => {
                // update stored user if the logged in user updated their own record
                if (id === auth?.id)
                {
                    // update local storage
                    const user = { ...auth, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                   //  update auth user in recoil state
                    setAuth(user);
                }
                return x;
            });
    }

    // prefixed with underscored because delete is a reserved word in javascript
    function _delete(id) {
        setConfigs((users) => users.map((x) => {
            // add isDeleting prop to user being deleted
            if (x.id === id) 
                return { ...x, isDeleting: true };

            return x;
        }));


    }
}
export { useConfigActions };
*/