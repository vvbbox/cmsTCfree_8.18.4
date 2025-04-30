import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { areaAtom } from '../state';
import '../../scss/app.scss';
import gb from "./gb.svg";
import ru from "./ru.svg";
import { App } from '../App';

const Area = () => {
    const location = useLocation();
    const [area, setArea] = useRecoilState(areaAtom);
    const prefix = location.pathname.slice(0, 4);

    useEffect(() => {
        if (prefix === "/api") {
            setArea("api");
        } else if (prefix === "/Identity") {
            setArea("Identity");
        } else {
            setArea("main");
        }
    }, [prefix, setArea]);

    const logo =  (prefix === '/api')
        ? "Area - Api "
        : (prefix === '/Identity')
        ? "Area - Identity"
        : "Area - Main";

    return (
        <div className="dropdown">
            <button className="btn btn-outline-success dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                {logo}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
                    <a className={`dropdown-item ${prefix === '' ? 'active' : ''}`} href="/Index">
                        Main {prefix === '' && <span className="float-end">✔</span>}
                    </a>
                </li>
                
                <li>
                    <a className={`dropdown-item ${prefix === '/api' ? 'active' : ''}`} href="/api/Home/Index">
                        API {prefix === '/api' && <span className="float-end">✔</span>}
                    </a>
                </li>
                <li>
                    <a className={`dropdown-item ${prefix === '/Identity' ? 'active' : ''}`} href="/Identity/Account/Login">
                        Identity {prefix === '/Identity' && <span className="float-end">✔</span>}
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Area;