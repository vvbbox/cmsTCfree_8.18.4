import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import './index.css';
import { App }  from './App.jsx';

function AppWithCallbackAfterRender() {

    return <RecoilRoot>
        <App />
    </RecoilRoot>
}

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(<AppWithCallbackAfterRender />);