/*
import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { useFetchWrapper } from '../actions';
import { authAtom, contextsAtom, contextAtom } from '../state';
import { areaAtom } from '../state';

function useContextActions() {
    const area = useRecoilValue(areaAtom);
    const API_URL = `/${area}`;
    const baseUrl = `${API_URL}/Context`;
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);
    const setContext = useSetRecoilState(contextAtom);
    const setContexts = useSetRecoilState(contextsAtom);
    const resetContext = useResetRecoilState(contextAtom);
    const resetContexts = useResetRecoilState(contextsAtom);

    return {
        register,
        getAll,
        getById,
        update,
        delete: _delete,
        resetContext,
        resetContexts,
    };

    function register(data) {
        const { Id, ...rest } = data; // Удаляем Id из данных
        return fetchWrapper.post(baseUrl, rest);
    }

    function getAll() {
        return fetchWrapper.get(baseUrl).then(setContexts);
    }

    function getById(idT, idB, idC, idP) {
        return fetchWrapper.get(`${baseUrl}/${idT}/${idB}/${idC}/${idP}`)
            .then(data => {
                if (!data || data.length === 0) return null;

                const theme = data[0];
                const book = theme.books?.[0];
                const chapter = book?.chapters?.[0];
                const page = chapter?.pages?.[0];
                const content = page?.content;

                return {
                    theme: {
                        id: theme.id,
                        themeName: theme.themeName,
                        books: {
                            id: book?.id,
                            bookName: book?.bookName,
                            chapters: {
                                id: chapter?.id,
                                pageChapter: chapter?.pageChapter,
                                pages: {
                                    id: page?.id,
                                    pageTitle: page?.pageTitle,
                                    content: content ? {
                                        id: content.id,
                                        pageContent: content.pageContent,
                                    } : null,
                                },
                            },
                        },
                    },
                };
            })
            .then(setContext);
    }

    function update(url, id, params) {
        return fetchWrapper.put(`${url}/${id}`, params)
            .then(response => {
                if (auth && id === auth.id) {
                    const updatedAuth = { ...auth, ...params };
                    localStorage.setItem('user', JSON.stringify(updatedAuth));
                    setAuth(updatedAuth);
                }
                return response;
            });
    }

    function _delete(id) {
        setContexts(prevContexts => prevContexts.map(item => 
            item.id === id ? { ...item, isDeleting: true } : item
        ));

        return fetchWrapper.delete(`${baseUrl}/${id}`)
            .then(() => {
                setContexts(prevContexts => prevContexts.filter(item => item.id !== id));
            })
            .catch(error => {
                setContexts(prevContexts => prevContexts.map(item => 
                    item.id === id ? { ...item, isDeleting: false } : item
                ));
                throw error;
            });
    }
}

export { useContextActions };

*/
import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { useFetchWrapper } from '../actions';
import { authAtom, contextsAtom, contextAtom } from '../state';
//import { API_URL } from '../index';
import {areaAtom } from '../state';


function useContextActions () {
   
   // const baseUrl = '/Context';// `${API_URL}/Context`;
   const area = useRecoilValue(areaAtom);
    const API_URL = `/${area}`;
    const baseUrl = `${API_URL}/Context`;
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);
    const setContext = useSetRecoilState(contextAtom);
    const setContexts = useSetRecoilState(contextsAtom);
    

    return {
       // getContext,
        register,
        getAll,
        getById,
        update,
        delete: _delete,
        resetContext: useResetRecoilState(contextAtom),
        resetContexts: useResetRecoilState(contextsAtom),
     
    }

       function register(data) {
        delete (data.Id);
        return fetchWrapper.post(`${baseUrl}`, data);
    }

    function getAll() {
        return fetchWrapper.get(baseUrl).then(setContexts);
    }

    function getById(idT, idB, idC, idP) {
        return fetchWrapper.get(`${baseUrl}/${idT}/${idB}/${idC}/${idP}`)
            .then(data => {
                
                data = {theme: {
                    id: data[0].id, themeName: data[0].themeName,
                        books: {
                            id: data[0].books[0].id, bookName: data[0].books[0].bookName,
                            chapters: {
                                id: data[0].books[0].chapters[0].id, pageChapter: data[0].books[0].chapters[0].pageChapter,
                                pages: {
                                    id: data[0].books[0].chapters[0].pages[0].id, pageTitle: data[0].books[0].chapters[0].pages[0].pageTitle,
                                    content: { id: data[0].books[0].chapters[0].pages[0].content.id, pageContent: data[0].books[0].chapters[0].pages[0].content.pageContent }
                                
                            }
                        }
                    }
                }
                }; return data
            })
            .then(setContext);
    }

    function update(url,id, params) {
        return fetchWrapper.put(`${url}/${id}`, params)
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
        setContext((users) => users.map((x) => {
            // add isDeleting prop to user being deleted
            if (x.id === id) 
                return { ...x, isDeleting: true };

            return x;
        }));


    }
}
export { useContextActions };
