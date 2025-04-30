import { React, useEffect, useState } from 'react';
import { useParams, useNavigate, Link} from 'react-router-dom';
import HtmlParser from 'html-react-parser';
import { useRecoilValue } from 'recoil';
import { areaAtom, authAtom, contextAtom, configAtom, contextsAtom } from '../state';
import {  useConfigActions, useContextActions } from '../actions';
import { Helmet } from "react-helmet";
//import Lang from '../components/lang.jsx';
import '../../scss/app.scss';

import 'bootstrap-icons/font/bootstrap-icons.css';

import PageNotFound from '../components/PageNotFound.jsx';

function Contextview() {
    const navigate = useNavigate();
    const config = useRecoilValue(configAtom);
    const configActions = useConfigActions();
    //const location = useLocation();
    //const path = location.pathname;
    const params = useParams();
    const [idT, setIdT] = useState(() => { if (params.idT) { return Number(params.idT) } else {return 1} });
    const [idB, setIdB] = useState(() => { if (params.idB) { return Number(params.idB) } else { return 1 } });
    const [idC, setIdC] = useState(() => { if (params.idC) { return Number(params.idC) } else { return 1 } });
    const [idP, setIdP] = useState(() => { if (params.idP) { return Number(params.idP) } else { return 1 } });
    
    const contexts = useRecoilValue(contextsAtom);
    const context = useRecoilValue(contextAtom);
    const contextActions = useContextActions(); 
    
    const auth = useRecoilValue(authAtom);
    const name = auth?.username;
    const role = auth?.role;
    const area = useRecoilValue(areaAtom);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { (async () => { await contextActions.getById(idT, idB, idC, idP) })(); return contextActions.resetContext(); }, [idT, idB, idC, idP]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { (async () => { await contextActions.getAll(); })(); return  contextActions.resetContexts(); }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { (async () => { await configActions.getById(1) })(); return  configActions.resetConfig(); }, []);
 
    
function ThemeRender(themes) {
        if (themes !== null && config !== null) {
           
            return (
                <>
                    <div>
                    <nav className="navbar navbar-expand-md navbar-light bg-warning">                        
                            <Link className="navbar-brand font-weight-bold" href="#"><h4>&nbsp;&nbsp;{config.siteName}</h4></Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/"><i className="bi bi-bank text-black" ></i></a>
                                    </li>

                                    {themes.map((theme, i) =>
                                    <div key={theme.id || i}>
                                        <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle text-dark" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {theme.themeName}
                                            </Link>
                                            <ul className="dropdown-menu">
                                                {BookRender(themes, i, theme.id)}
                                            </ul>
                                        </li>
                                        </div>
                                    )}
                                    
                                </ul> </div>

              
                        </nav></div>
                </> )
    }

        else return ("Content null");
    }
    var leftMenu = '';
    function BookRender(themes, i, themeId) {
       
        return (themes[i].books.map((book, ii) => {
           if (book.id===idB) leftMenu = ChapterRender(themes, i, ii, themeId, book.id);
            return (
                <div key={book.id || ii}>
                    <li><Link
                        onClick={async () => { await
                            setIdT(themeId);
                            setIdB(book.id);
                            setIdC(themes[i].books[ii].chapters[0].id);
                            setIdP(themes[i].books[ii].chapters[0].pages[0].id);
                            navigate(`/${area}`+'/view/' + `${themeId}` + '/' + `${book.id}` + '/' + `${themes[i].books[ii].chapters[0].id}` + '/' + `${themes[i].books[ii].chapters[0].pages[0].id}`);
                            }}  className="dropdown-item"> - {book.bookName}
                    </Link></li>
                </div>);
        }
        ));
    }

    

    function ChapterRender(themes, i, ii, themeId, bookId) {

        if (themes) {
          
            return (
                <>
                <div className="card text-black border-success bg-transparent" >
                    <div className="card-header text-success ">
                        <h5><strong>{themes[i].books[ii].bookName}</strong></h5>
                    </div>

                    {themes[i].books[ii].chapters.map((chapter, iii) => { return (
                        
                        <div key={chapter.id || iii}>
                            <div className="accordion" id="accordionExample3">
                               
                                <div className="accordion-item">
                                    <h6 className="accordion-header" id="headingThree">
                                        <Link type="button" className="  text-success btn-sm" data-bs-toggle="collapse" data-bs-target={`#collapseThree${iii}`} aria-expanded="true" aria-controls={`collapseThree${iii}`}>
                                            <strong>- {chapter.pageChapter}</strong>
                                        </Link>
                                    </h6>
                                </div>
                            </div>
                            <div id={`collapseThree${iii}`} className="accordion-collapse collapse show" aria-labelledby="headingThree" data-bs-parent="#accordionExample3">
                                    <div className="accordion-body">
                                        {PageRender(themes, i, ii, iii, themeId, bookId, chapter.id)}
                                </div></div>
                        </div>
                        );
                    })
                    }
                </div>
            </>);
        }
         }  
        
    function PageRender(themes, i, ii, iii, themeId, bookId, chapterId) {
       
        return(themes[i].books[ii].chapters[iii].pages.map((page, iiii) => {
            return(
                <div  key={page.id || iiii}>
                <nav>
                    <ul className="nav flex-column nav-underline">
                        <li key={page.id || iiii} className="nav-item">
                            <Link className="nav-link text-black"
                             to={`/${area}`+'/view/' + `${themeId}` + '/' + `${bookId}` + '/' + `${chapterId}` + '/' + `${page.id}`}
                            onClick={ () => { setIdC(chapterId); setIdP(page.id);} } ><small>- {page.pageTitle}</small>
                            </Link>
                        </li>
                    </ul>
                </nav>
                </div>
            );

        }));
    }
   
    function MemoTag() { 
        if (context !== null) {
        const title = `${context.theme.books.chapters.pageChapter}`+'--'+`${context.theme.books.chapters.pages.pageTitle}` ; 
        const str = `${context.theme.books.chapters.pages.content.pageContent}`;
        const pos = str.indexOf("<em>");
        let description = '';
        if (pos !== -1) {
        description = str.slice(pos + 4, pos + 159);
        } else {description = "No description"};
        return (<Helmet
                title={title} 
                meta={[{"name": "description", "content": `${description}`},
                       {"name":'keywords', "content":'CMS, React .Net Core CMS'}]} />)
        }
        //else return ("Content Null");
    }
   
    const DelayedView = () => {
        const [view, setView] = useState('');
        const notFound = PageNotFound;

        // Use setTimeout to update the message after 1000 milliseconds (1 seconds)
        useEffect(() => {const timeoutId = setTimeout(() => { setView(notFound);}, 1000);
      
          // Cleanup function to clear the timeout if the component unmounts
          
          return () => clearTimeout(timeoutId);
        }, []); // Empty dependency array ensures the effect runs only once
        
       if (context !== null || undefined)
            { 
                return (HtmlParser(context.theme.books.chapters.pages.content.pageContent)) 
            }

            else return (<div> {view} </div>);
      };
    

    function View() { 
       
  
        if (context !== null || undefined)
       {
         // return({message})
          return (HtmlParser(context.theme.books.chapters.pages.content.pageContent))
        }
        else return <div className="text-center p-3"><PageNotFound /></div>;//  return ("Content null");
     
    }


    function AdView (_content)  {
        if (_content != null) {
            const content = loading ? <p><em>Loading...</em></p> : HtmlParser(_content);
            return (<> <div>{content} </div> </>);
        }
        
    }

    
    const loading = !context && !contexts && !config;
    
    if (!loading) {
        
       return (
            <> 
                
            {MemoTag()}
                <div className="container-xl-12">
                    {ThemeRender(contexts)}
                   </div>
                <br />
                <div className="row px-4">
                    <div className="col-2">
                          
                        {leftMenu}
                    </div>

                    <div className="col-8">
                    
                    <DelayedView /> 
                    </div>

                    <div className="col-2">                        
                        { AdView(config?.rightAdv) } <br/>
                    </div>

                    <div className="row">
                        <div className="card-img-top">{AdView(config?.bottomAdv)}</div>
                    </div>
                </div>
                
            </>
        )
    }
    else {
        return (
            <div className="text-center p-3">
                loading ...........................
                <br /><br /><br />
                <span className="spinner-border spinner-border-lg align-center"></span>
                
            </div >);
    }
        
        
}
export default Contextview ;
