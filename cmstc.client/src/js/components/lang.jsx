import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { areaAtom } from '../state';
import '../../scss/app.scss';
import gb from "./gb.svg";
import ru from "./ru.svg";
import { App } from '../App';

const Lang = () => {
    const location = useLocation();
    const [area, setArea] = useRecoilState(areaAtom);
    const prefix = location.pathname.slice(0, 4);

    useEffect(() => {
        if (prefix === "/rus") {
            setArea("rus");
        } else if (prefix === "/eng") {
            setArea("eng");
        } else {
            setArea("api");
        }
    }, [prefix, setArea]);

    const logo = (prefix === '/eng') 
        ? <span><img src={gb} style={{height: "3vh", width: "auto"}} alt="" /><b> - English </b></span>
        : (prefix === '/rus') 
        ? <span><img src={ru} style={{height: "3vh", width: "auto"}} alt="" /><b> - Russian </b></span>
        : <span><img src={ru} style={{height: "3vh", width: "auto"}} alt="" /><b> - Api </b></span>;

    return (
        <div className="dropdown-center dropstart">
            <button className="btn btn-outline-success btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                {logo}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                    <a className={`dropdown-item ${prefix === '/eng' ? 'active' : ''}`} href="/eng">
                        English {prefix === '/eng' && <span className="float-end">✔</span>}
                    </a>
                </li>
                <li>
                    <a className={`dropdown-item ${prefix === '/rus' ? 'active' : ''}`} href="/rus">
                        Russian {prefix === '/rus' && <span className="float-end">✔</span>}
                    </a>
                </li>
               
            </ul>
        </div>
    );
};

export default Lang;