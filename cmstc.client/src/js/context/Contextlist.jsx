import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import HtmlParser from 'html-react-parser';
import { useRecoilValue } from 'recoil';
import { contextAtom, contextsAtom } from '../state';
import { useContextActions } from '../actions';



function Contextlist() {
    const location = useLocation();
    const  path  = location.pathname;
    const contexts = useRecoilValue(contextsAtom);
    const context = useRecoilValue(contextAtom);
    const contextActions = useContextActions();

  //  useEffect(() => { contextActions.getAll();  return contextActions.resetContexts; }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { contextActions.getById(1, 1, 1, 1); return contextActions.resetContext; }, []);

    useEffect(() => {
        (async function () {
            try {
                await contextActions.getAll(); return contextActions.resetContexts; 
            } catch (e) {
                console.error(e);
            }
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function ThemeRender(_contexts) {
        if (_contexts !== null) {
            return (_contexts.map((u, i) =>
                <div key={u.id || i} className="accordion" id="accordionExample">
                    <div className="row">
                        <div className="accordion-item " key={u.id}>
                            <h3 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${i}`} aria-expanded="true" aria-controls={`collapseOne${i}`}>
                                    <h3>{u.id}. {u.themeName}</h3>
                                </button>
                            </h3>
                        </div>
                    </div>
                    <div id={`collapseOne${i}`} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            {BookRender(_contexts, i, u.id) }
                        </div></div></div> ));
        }
        else return ("Content Null");
    }

    function BookRender(_contexts, i, u_id) {      
        return (_contexts[i].books.map((uu, ii) => {
            if (uu.themeId === u_id) {
                return (
                    <div key={uu.id || ii} className="accordion" id="accordionExample2">
                        <div className="row">
                            <div className="accordion-item" key={uu.id}>
                                <h3 className="accordion-header" id="headingTwo">
                                    <button onClick={() => { }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseTwo${ii}`} aria-expanded="false" aria-controls={`collapseTwo${ii}`}>
                                        <h6>{uu.id}. {uu.bookName}</h6>
                                    </button>
                                </h3>
                            </div>
                        </div>
                        <div id={`collapseTwo${ii}`} className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample2">
                            <div className="accordion-body">
                                {ChapterRender(_contexts, i, ii, u_id, uu.id)}
                            </div></div></div>);
            } else return false;
        }))
    }

    function ChapterRender(_contexts, i, ii, u_id, uu_id) {
        return ( _contexts[i].books[ii].chapters.map((uuu, iii) => {
                if (uuu.bookId === uu_id) {                    
                    return (
                        <div key={uuu.id || iii} className="accordion" id="accordionExample3">
                            <div className="row">

                                <div className="accordion-item" key={uuu.id}>
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseThree${iii}`} aria-expanded="false" aria-controls={`collapseThree${iii}`}>
                                            <h5>{uuu.id}. {uuu.pageChapter}</h5>
                                        </button>
                                    </h2>
                                </div>
                            </div>
                            <div id={`collapseThree${iii}`} className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample3">
                                <div className="accordion-body">
                                    {PageRender(_contexts, i, ii, iii, u_id, uu_id, uuu.id)}
                            </div></div></div>);
            } else return false;
        }))
    }

    function PageRender(_contexts, i, ii, iii, u_id, uu_id, uuu_id) {
        return (_contexts[i].books[ii].chapters[iii].pages.map((uuuu, iiii) => {
            if (uuuu.chapterId === uuu_id) {         
                return (
                    <div key={uuuu.id || iiii} className="accordion" id="accordionExample4">
                        <div className="row">
                            <div className="accordion-item col-9" key={uuuu.id}>
                                <h2 className="accordion-header" id="headingFour">
                                    <button onClick={() => { contextActions.getById(u_id, uu_id, uuu_id, uuuu.id); return contextActions.resetContext; }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseFour${iiii}`} aria-expanded="false" aria-controls={`collapseFour${iiii}`}>
                                        {uuuu.id}. {uuuu.pageTitle}{}
                                    </button>
                                </h2>
                            </div>
                            <div className="col-3">
                                <Link to={`${path}/add`} className="btn btn-sm btn-success mr-1">Add</Link>
                                <Link to={`${path}/edit/${u_id}` + `/${uu_id}` + `/${uuu_id}` + `/${uuuu.id}`} className="btn btn-sm btn-warning mr-1">Edit</Link>
                                <button onClick={() => contextActions.delete(uuuu.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={contexts.isDeleting}>
                                    {_contexts.isDeleting ? <span className="spinner-border spinner-border-sm"></span> : <span>Delete</span>}
                                </button>
                            </div></div>
                        <div id={`collapseFour${iiii}`} className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample4">
                            <div className="accordion-body">
                                <div><>
                                <View /> 
                                </></div>
                            </div></div></div>);
            } else return false;
        }))
    }

    function View() {
        if (context !== null) {
            return (HtmlParser(context.theme.books.chapters.pages.content.pageContent))
        }
        else return ("Content Null");
    }

        return (
            <>
                <div className="card m-3 alfa">
                    <h1 className="card-header text-success" > Context</h1>
                    <div className="card-body">
                        {ThemeRender(contexts)}
                        </div>
                        
                        </div>

</>
        );
}
export default Contextlist ;