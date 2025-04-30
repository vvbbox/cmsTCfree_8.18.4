import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { useFetchWrapper } from '../actions';
import { authAtom, picturesAtom, pictureAtom } from '../state';
import { areaAtom } from '../state';

function usePictureActions() {
    const area = useRecoilValue(areaAtom);
    const API_URL = `/${area}`;
    const baseUrl = `${API_URL}/Pictures`;
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);
    const setPictures = useSetRecoilState(picturesAtom);
    const setPicture = useSetRecoilState(pictureAtom);
    const resetPictures = useResetRecoilState(picturesAtom);
    const resetPicture = useResetRecoilState(pictureAtom);

    return {
        register,
        getAll,
        getById,
        update,
        delete: _delete,
        resetPictures,
        resetPicture,
    };

    // Регистрация новой картинки
    function register(data) {
        const { Id, ...rest } = data; // Удаляем поле Id
        return fetchWrapper.post(baseUrl, rest);
    }

    // Получение всех картинок
    function getAll() {
        return fetchWrapper.get(baseUrl).then(setPictures);
    }

    // Получение картинки по ID
    function getById(id) {
        return fetchWrapper.get(`${baseUrl}/${id}`)
            .then((data) => {
                if (!data) throw new Error('Picture not found');
                setPicture(data);
                return data;
            });
    }

    // Обновление картинки
    function update(id, params) {
        return fetchWrapper.put(`${baseUrl}/${id}`, params)
            .then((response) => {
                // Если нужно обновлять auth, укажите правильную логику
                // В текущем контексте этот блок может быть удалён
                return response;
            });
    }

    // Удаление картинки (с префиксом _ из-за ключевого слова delete)
    function _delete(id) {
        // Устанавливаем флаг isDeleting перед удалением
        setPictures(prevPictures => prevPictures.map(pic => 
            pic.id === id ? { ...pic, isDeleting: true } : pic
        ));

        return fetchWrapper.delete(`${baseUrl}/${id}`)
            .then(() => {
                // Удаляем из стейта после успешного удаления
                setPictures(prevPictures => prevPictures.filter(pic => pic.id !== id));
            })
            .catch(error => {
                // Восстанавливаем состояние при ошибке
                setPictures(prevPictures => prevPictures.map(pic => 
                    pic.id === id ? { ...pic, isDeleting: false } : pic
                ));
                throw error;
            });
    }
}

export { usePictureActions };
/*
/* eslint-disable @typescript-eslint/no-explicit-any 
import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { useFetchWrapper } from '../actions';
import { authAtom, picturesAtom, pictureAtom } from '../state';
//import { API_URL } from '../index';
import {areaAtom } from '../state';




function usePictureActions () {
   // const baseUrl = `/pictures`; 
   const area = useRecoilValue(areaAtom);
   const API_URL = `/${area}`;
    const baseUrl = `${API_URL}/Pictures`;
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);
    const setPictures = useSetRecoilState(picturesAtom);
    const setPicture = useSetRecoilState(pictureAtom);
   


    return {
      //  getPicture,
        register,
        getAll,
        getById,
        update,
        delete: _delete,
        resetPictures: useResetRecoilState(picturesAtom),
        resetPicture: useResetRecoilState(pictureAtom)
    }

   // function getPicture(id: number) { return ('xxx'); }

    function register(data) {
        delete (data.Id);
        return fetchWrapper.post(`${baseUrl}`, data);
    }

    function getAll() {
        return fetchWrapper.get(baseUrl).then(setPictures);
    }

    function getById(id) {
        return fetchWrapper.get(`${baseUrl}/${id}`).then(setPicture);
    }

    function update(id, params) {
        return fetchWrapper.put(`${baseUrl}/${id}`, params)
            .then(x => {
                // update stored picture if the logged in picture updated their own record
                if (id === auth?.id)
                {
                    // update local storage
                    const picture = { ...auth, ...params };
                    localStorage.setItem('picture', JSON.stringify(picture));

                   //  update auth picture in recoil state
                    setAuth(picture);
                }
                return x;
            });
    }

    // prefixed with underscored because delete is a reserved word in javascript
    function _delete(id) {
        setPictures((pictures) => pictures.map((x) => {
            // add isDeleting prop to picture being deleted
            if (x.id === id) 
                return { ...x, isDeleting: true };

            return x;
        }));


    }
}
export { usePictureActions };
*/