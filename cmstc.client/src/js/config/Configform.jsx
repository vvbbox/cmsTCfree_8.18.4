import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRecoilValue } from 'recoil';
import { configAtom } from '../state';
import { useConfigActions } from '../actions/config.actions.js';
import { useAlertActions } from '../actions/alert.actions.js';



function Configform() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const mode = { add: !id, edit: !!id };
    const configActions = useConfigActions();
    const alertActions = useAlertActions();
    const config = useRecoilValue(configAtom);

    // form validation rules 
    const validationSchema = Yup.object().shape(
        {
          //  Id: Yup.string().required('Id is required'),
            siteName: Yup.string(),//.required('Site Name is required'),
            siteUrl: Yup.string(),//.required('URL is required'),
            siteEmail: Yup.string(),//.required('E-mail is required').min(6, 'Password must be at least 6 characters'),
            connectionStr: Yup.string(),//.required('Connection string is required'),
            topAdv: Yup.string(),//.required('Code is required'),
            bottomAdv: Yup.string(),//.required('Code is required'),
            rightAdv: Yup.string(),//.required('Code is required'),
            globalCss: Yup.string(),//.required('CSS is required'),
            localCss: Yup.string(),//.required('CSS is required'),
            footer: Yup.string()//.required('Footer html code is required')
        });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        // fetch config details into recoil state in edit mode

        if (mode.edit) { configActions.getById(id); }
        return configActions.resetConfig;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // set default form values after config set in recoil state (in edit mode)
        if (mode.edit && config) { reset(config); }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config])

    function onSubmit(data) {
        return mode.add ? createConfig(data) : updateConfig(id, data);
    }

    function createConfig(data) {
        return configActions.register(data)
            .then(() => {
                navigate('/config');
                alertActions.success('Config added');
            });
    }

    function updateConfig(id, data) {
        return configActions.update(id, data)
            .then(() => {
                navigate('/config');
                alertActions.success('Config updated');
            });
    }

    const loading = mode.edit && !config;
    return (
        <>
            <div className="card m-3">
                <h1>{mode.add ? 'Add Config' : 'Edit Config'}</h1>
                <div className="card-body">
            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)}>
               
                    <div className="form-group">
                        <label>Site name</label>
                        <input id="siteName" type="text" {...register('siteName')} className={`form-control ${errors.siteName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.siteName?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Site URL</label>
                        <input id="siteUrl" type="text" {...register('siteUrl')} className={`form-control ${errors.siteUrl ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.siteUrl?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input id="siteEmail" type="text" {...register('siteEmail')} className={`form-control ${errors.siteEmail ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.siteEmail?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Connection string</label>
                                <input id="connectionStr" type="text" {...register('connectionStr')} className={`form-control ${errors.connectionStr ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.connectionStr?.message}</div>
                    </div>
                            <div className="form-group">
                                <label>Top advertise frame</label>
                                <input id="bottomAdv:" type="text" {...register('topAdv')} className={`form-control ${errors.topAdv ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.topAdv?.message}</div>
                            </div>
                    <div className="form-group">
                        <label>Bottom advertise frame</label>
                        <input id="bottomAdv:" type="text" {...register('bottomAdv')} className={`form-control ${errors.bottomAdv ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.bottomAdv?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Right advertise frame</label>
                        <input id="rightAdv" type="text" {...register('rightAdv')} className={`form-control ${errors.rightAdv ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.rightAdv?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Global CSS</label>
                        <input id="globalCss" type="text" {...register('globalCss')} className={`form-control ${errors.globalCss ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.globalCss?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Local CSS</label>
                        <input id="localCss" type="text" {...register('localCss')} className={`form-control ${errors.localCss ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.localCss?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Footer frame</label>
                        <input id="footer" type="text" {...register('footer')} className={`form-control ${errors.footer ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.footer?.message}</div>
                    </div>
                            <div className="form-group">
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Save
                                </button>
                                <button onClick={() => reset(config)} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                                <Link to="/config" className="btn btn-link">Cancel</Link>
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
export { Configform };