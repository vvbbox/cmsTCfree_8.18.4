import { useEffect  } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
//import { yupResolver } from '@hookform/resolvers/yup';
//import * as Yup from 'yup';
import { useRecoilValue } from 'recoil';
import { pictureAtom } from '../state';
import { usePictureActions } from '../actions/picture.actions';
import { useAlertActions } from '../actions/alert.actions';



function Pictureform({ history }) {
    const params = useParams();
    const id = params.id;
    const mode = { add: !id, edit: !!id };
    const pictureActions = usePictureActions();
    const alertActions = useAlertActions();
    const picture = useRecoilValue(pictureAtom);

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setValue, reset, formState } = useForm();// (formOptions);
    const { errors, isSubmitting } = formState;
   
    useEffect(() => {
        // fetch picture details into recoil state in edit mode

        if (mode.edit) { pictureActions.getById(id); }
        return pictureActions.resetPicture;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // set default form values after picture set in recoil state (in edit mode)
        if (mode.edit && picture) { reset(picture); }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [picture])

    function onSubmit(data) {
        return mode.add ? createPicture(data) : updatePicture(id, data);
    }

    function createPicture(data) {
        return pictureActions.register(data)
            .then(() => {
                history.push('/picture');
                alertActions.success('Picture added');
            });
    }

    function updatePicture(id, data) {
        return pictureActions.update(id, data)
            .then(() => {
                history.push('/picture');
                alertActions.success('Picture updated');
            });
    }
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            //fileReader.readAsArrayBuffer(file);
            fileReader.readAsDataURL(file);
            fileReader.onload = () => { resolve(fileReader.result); };
            fileReader.onerror = (error) => { reject(error); };
        });
    };
/*    const convertToByte = (file: Blob) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            //fileReader.readAsDataURL(file);
            fileReader.onload = () => { resolve(fileReader.result); };
            fileReader.onerror = (error) => { reject(error); };
        });
    };
    const decoder = new TextDecoder('UTF-8');

    const toString = (bytes: Iterable<number>) => {
        const array = new Uint8Array(bytes);
        return decoder.decode(array);
    }; 
    const [postImage, setPostImage] = useState({ myFile: "", byteFile: []}); 
    */
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
         const base64 = await convertToBase64(file);
       // const byteArray: unknown = await convertToByte(file);
       // setPostImage({ ...postImage, myFile: base64 as string });
        //setPostImage({ ...postImage, byteFile: byteArray });
        // const byteFile = await getAsByteArray(file)
        //setValue('imageData', toString((byteArray as Array<any>)));
        setValue('imageData',  (base64).slice(23) );
    };
    const loading = mode.edit && !picture;
    return (
        <>
            <div className="card m-3">
                <h1>{mode.add ? 'Add Picture' : 'Edit Picture'}</h1>
                <div className="card-body">
            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)}>
               
                    <div className="form-group">
                        <label>Image</label>
                        <input id="image" type="text" {...register('image')} className={`form-control ${errors.image ? 'is-invalid' : ''}`} />
                               
                        <div className="invalid-feedback">{`${errors.image?.message}`}</div>
                    </div>
                    <div className="form-group">
                        <label>Title</label>
                        <input id="imageTitle" type="text" {...register('imageTitle')} className={`form-control ${errors.imageTitle ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{`${ errors.imageTitle?.message }`}</div>
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <input id="imageType" type="text" {...register('imageType')} className={`form-control ${errors.imageType ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{`${errors.imageType?.message}`}</div>
                    </div>
                    <div className="form-group">
                        <label>Hight</label>
                                <input id="imageHight" type="text" {...register('imageHight')} className={`form-control ${errors.imageHight ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{`${errors.imageHight?.message}`}</div>
                    </div>
                            <div className="form-group">
                                <label>Width</label>
                                <input id="text:" type="text" {...register('imageWidth')} className={`form-control ${errors.imageWidth ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{`${errors.imageWidth?.message}`}</div>
                            </div>
                    <div className="form-group">
                        <label>Text</label>
                        <input id="text:" type="text" {...register('text')} className={`form-control ${errors.text ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{`${errors.text?.message}`}</div>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <input id="author" type="text" {...register('author')} className={`form-control ${errors.author ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{`${errors.author?.message}`}</div>
                    </div>
                    <div className="form-group">
                        <label>Url</label>
                        <input id="imageUrl" type="text" {...register('imageUrl')} className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{`${errors.imageUrl?.message}`}</div>
                    </div>
                    <div className="form-group">
                        <label>Icon</label>
                        <input id="imageIcon" type="text" {...register('imageIcon')} className={`form-control ${errors.imageIcon ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{`${errors.imageIcon?.message}`}</div>
                    </div>
                   
                            <div className="form-group">
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Save
                                </button>
                                <button onClick={() => reset(picture)} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                                <Link to="/config" className="btn btn-link">Cancel</Link>
                            </div>

                            <div className="form-group">
                                <label>ImageData</label>
                                <input id="imageData" type="text" {...register('imageData')} className={`form-control ${errors.imageData ? 'is-invalid' : ''}`} />
                                <img src={`/Pictures/image${id}.jpg`} alt="" height="180px" ></img>
                                <div className="invalid-feedback">{`${errors.imageData?.message}`}</div>

                                <input
                                    type="file"
                                    aria-label="Image"
                                    name="myFile"
                                    accept=".jpeg, .png, .jpg"
                                    onChange={(e) => handleFileUpload(e)}
                                />
                            </div>
                            
                        </form>  
                       
            }
            {loading &&
                <div className="text-center p-3">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
                    }
                </div></div>
            
        </>
    );
}
export { Pictureform };