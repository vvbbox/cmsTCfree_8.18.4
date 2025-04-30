import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {Helmet} from "react-helmet";
import { picturesAtom } from '../state';
import { usePictureActions } from '../actions/picture.actions';
import {areaAtom } from '../state';


function Picturelist() {
    const location = useLocation();
    const path = location.pathname;
    const pictures = useRecoilValue(picturesAtom);
    const pictureActions = usePictureActions();
    const area = useRecoilValue(areaAtom);
    const API_URL = `/${area}`;
    const baseUrl = `${API_URL}/Pictures`;

    useEffect(() => { pictureActions.getAll();  return pictureActions.resetPictures;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

   // return (<h1>Picture</h1>);
    
     return ( 
        <div>
            <Helmet>
        <title>Pictures</title>
        <meta property="robots" content="noindex" data-react-helmet="true" />
        </Helmet>
             <h1>Pictures</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Picture</Link>
            <table className="table table-striped">
                <thead>
                     <tr>
                         <th style={{ width: '5%' }}>Id</th>                                               
                        <th style={{ width: '5%' }}>Title</th>
                         <th style={{ width: '5%' }}>Type</th>
                         <th style={{ width: '5%' }}>Hight</th>
                         <th style={{ width: '5%' }}>Width</th>
                         <th style={{ width: '10%' }}>Text</th>
                         <th style={{ width: '10%' }}>Author</th>
                         <th style={{ width: '10%' }}>Url</th>
                         <th style={{ width: '10%' }}>Icon</th>
                         <th style={{ width: '10%' }}></th>
                         <th style={{ width: '30%' }}>Image</th>
                    </tr>
                </thead>
                <tbody>

                     {pictures?.map((picture) =>
                         <tr key={picture.id}>
                             <td>{picture.id}</td>
                             
                             <td>{picture.imageTitle}</td>
                             <td>{picture.imageType}</td>
                             <td>{picture.imageHight}</td>
                             <td>{picture.imageWidth}</td>
                             <td>{picture.text}</td>
                             <td>{picture.author}</td>                  
                             <td>{picture.imageUrl}</td>
                             <td><img src={`${baseUrl}/image${picture.id}.jpg`} alt="" height="80px" ></img></td>
                            
                             <td style={{ whiteSpace: 'nowrap' }}>
                                 <Link to={`${path}/edit/${picture.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                 <button onClick={() => pictureActions.delete(picture.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={picture.isDeleting}>
                                     {picture.isDeleting
                                         ? <span className="spinner-border spinner-border-sm"></span>
                                         : <span>Delete</span>
                                     }
                                 </button>
                             </td>
                             <td>{picture.image}</td>
                         </tr>
                     )}
                    {!pictures &&
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
export { Picturelist };