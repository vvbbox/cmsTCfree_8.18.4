import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {Helmet} from "react-helmet";
import { configsAtom } from '../state';
import { useConfigActions } from '../actions';



function Configlist() {
    const location = useLocation();
    const path = location.pathname;
    const configs = useRecoilValue(configsAtom);
    const configActions = useConfigActions();

    useEffect(() => {
        (async () => { await configActions.getAll(); return await configActions.resetConfigs; })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
   
     return ( 
        <div>
            <Helmet>
        <title>Config</title>
        <meta property="robots" content="noindex" data-react-helmet="true" />
        </Helmet>
             <h1>Config</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Config</Link>
            <table className="table table-striped">
                <thead>
                     <tr>
                         <th style={{ width: '5%' }}>Id</th>
                        <th style={{ width: '25%' }}>Site Name</th>
                        <th style={{ width: '35%' }}>Site URL</th>
                        <th style={{ width: '25%' }}>E-mail</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>

                     {configs?.map((config) =>
                         <tr key={config.id}>
                             <td>{config.id}</td>
                             <td>{config.siteName}</td>
                             <td>{config.siteUrl}</td>
                             <td>{config.siteEmail}</td>
                             <td style={{ whiteSpace: 'nowrap' }}>
                                 <Link to={`${path}/edit/${config.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                 <button onClick={() => configActions.delete(config.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={config.isDeleting}>
                                     {config.isDeleting
                                         ? <span className="spinner-border spinner-border-sm"></span>
                                         : <span>Delete</span>
                                     }
                                 </button>
                             </td>
                         </tr>
                     )}
                    {!configs &&
                        <tr>
                            <td colSpan={4} className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
    
}
export { Configlist };