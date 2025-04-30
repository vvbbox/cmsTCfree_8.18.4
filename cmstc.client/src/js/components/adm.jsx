import * as React from 'react';
import { useState, useEffect } from 'react';
//import { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse, CardBody, Card, CardHeader } from 'reactstrap';
import { Container, Row, Col, Button } from 'reactstrap';
import JoditEditor from "jodit-react";

const Adm = (props) => { //props.prefix="/api"; props.token=""; props.id=0;
    
    const [state, setState] = useState({
       // _theme: "", newToggle: false, editToggle: false, delToggle: false,  contents: { id: 1, pageContent: 'xxx' }, content: undefined,
        isOpen: false, theme: [], book: [], page: [], chapter: [], 
        collapseThemes: 0, collapseChapters: 0, collapseBooks: 0, collapsePages: 0
    });

    useEffect(() => {
        
        fetch(`${props.prefix}/Themes`)
            .then(response => response.json())
            .then((data) => { setState(prevState => ({ ...prevState, theme: data })) });

        fetch(`${props.prefix}/Books`)
            .then(response => response.json())
            .then((data) => { setState(prevState => ({ ...prevState, book: data })) });

        fetch(`${props.prefix}/Chapters`)
            .then(response => response.json())
            .then((data) => { setState(prevState => ({ ...prevState, chapter: data })) });

        fetch(`${props.prefix}/Pages`)
            .then(response => response.json())
            .then((data) => { setState(prevState => ({ ...prevState, page: data })) });
    }, [props.prefix]);

    const toggle = () => { setState(prevState => ({ ...prevState, isOpen: !prevState.isOpen })); }

    const renderPages = (chapterId) => {
        return (
            state.page.map(u => {
                if (u.chapterId === chapterId) {
                    return (
                        <Card style={{ marginBottom: '1rem' }} key={u.id}>
                            <CardHeader onClick={() => { setState(prevState => ({ ...prevState, collapsePages: u.id })) }}>
                                <InputForm prefix={props.prefix} token={props.token} titleName={u.pageTitle} apiUrl="Pages" id={u.id} data={JSON.stringify({ id: `${u.id}`, pageTitle: `${u.pageTitle}`, chapterId: `${u.chapterId}`, contentId: `${u.contentId}`, onOff: `${u.onOff}`, date: `${u.date}` })} />
                            </CardHeader>
                            <Collapse isOpen={state.collapsePages === u.id}>
                                <CardBody>
                                    {(state.collapsePages === u.id) &&
                                        <EditForm prefix={props.prefix} token={props.token} titleName={u.pageTitle} apiUrl="Contents" id={u.contentId} data={JSON.stringify({ id: `${u.id}`, pageTitle: `${u.pageTitle}`, chapterId: `${u.chapterId}`, contentId: `${u.contentId}`, onOff: `${u.onOff}`, date: `${u.date}` })} />
                                    }
                                </CardBody>
                            </Collapse>
                        </Card>
                    );
                } else return false;
            })
        );
    }

    const renderChapters = (bookId) => {
        return (
            state.chapter.map(u => {
                if (u.bookId === bookId) {
                    return (
                        <Card style={{ marginBottom: '1rem' }} key={u.id}>
                            <CardHeader onClick={() => { setState(prevState => ({ ...prevState, collapseChapters: u.id, collapsePages: 0 })) }}>
                                <InputForm prefix={props.prefix} token={props.token} titleName={u.pageChapter} apiUrl="Chapters" id={u.id} data={JSON.stringify({ id: `${u.id}`, pageChapter: `${u.pageChapter}`, bookId: `${u.bookId}` })} />
                            </CardHeader>
                            <Collapse isOpen={state.collapseChapters === u.id}>
                                <CardBody>
                                    {renderPages(u.id)}
                                </CardBody>
                            </Collapse>
                        </Card>
                    )
                } else return false;
            })
        );
    }

    const renderBooks = (themesId) => {
        return (
            state.book.map(u => {
                if (u.themeId === themesId) {
                    return (
                        <Card style={{ marginBottom: '1rem' }} key={u.id}>
                            <CardHeader onClick={() => { setState(prevState => ({ ...prevState, collapseBooks: u.id, collapseChapters: 0, collapsePages: 0 })) }}>
                                <InputForm prefix={props.prefix} token={props.token} titleName={u.bookName} apiUrl="Books" id={u.id} data={JSON.stringify({ id: `${u.id}`, bookName: `${u.bookName}`, themeId: `${u.themeId}` })} />
                            </CardHeader>
                            <Collapse isOpen={state.collapseBooks === u.id}>
                                <CardBody>
                                    {renderChapters(u.id)}
                                </CardBody>
                            </Collapse>
                        </Card>
                    )
                } else return false;
            })
        );
    }

    const renderThemes = () => {
        return (
            state.theme.map(u => {
                return (
                    <Card color="success" style={{ marginBottom: '1rem' }} key={u.id}>
                        <CardHeader onClick={() => { setState(prevState => ({ ...prevState, collapseThemes: u.id, collapseBooks: 0, collapseChapters: 0, collapsePages: 0 })) }}>
                            <InputForm prefix={props.prefix} token={props.token} titleName={u.themeName} apiUrl="Themes" id={u.id} data={JSON.stringify({ id: `${u.id}`, themeName: `${u.themeName}` })} />
                        </CardHeader>
                        <Collapse isOpen={state.collapseThemes === u.id}>
                            <CardBody>
                                {renderBooks(u.id)}
                            </CardBody>
                        </Collapse>
                    </Card>
                )
            })
        );
    }

    return ( 
        <div className="container">
            <h3 className="page-header">The Content Management System</h3>
            {renderThemes()}
        </div>
    );
}

const InputForm = (props) => {
    const [state, setState] = useState({ // inputValue: props.titleName,
        // data: {}, theme: [], book: [], page: [], contents: { id: 1, pageContent: 'xxx' }, content: undefined, chapter: []
         newToggle: false, editToggle: false, delToggle: false, 
        
    });

    const selectStyle = (_newToggle, _editToggle) => {
        if (_newToggle === true || _editToggle === true) return ({ width: '100%', display: 'none' });
        else return ({ width: '100%', display: 'inline' });
    };

    const inputStyle = (_newToggle, _editToggle) => {
        if (_newToggle === true || _editToggle === true) return ({ width: '100%', display: 'inline' });
        else return ({ width: '100%', display: 'none' });
    };

    const buttonStyle = (_newToggle, _editToggle, _delToggle) => {
        if (_delToggle === true || _editToggle === true || _newToggle === true) return ({ width: '100%', display: 'inline' });
        else return ({ width: '100%', display: 'none' });
    };

    const handleSwitch = () => {
        if (state.editToggle) return edit();
        else if (state.newToggle === true) return create();
        else if (state.delToggle === true) return del();
    }

    const handleSubmit = (event) => {
        alert(event + ' : " ' + state.inputValue + ' " - сохранено');
        const navigate = useNavigate();
        navigate(0);
    }

    const edit = () => {
        // ...existing code...
        async function putData(prefix = '', token = '', url = '', data = {}) {
            const response = await fetch(`${prefix}/${url}`, {
                method: 'PUT',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
            });
            return response.json();
        }
        return handleSubmit('Изменение');
    }

    const create = () => {
        // ...existing code...
        async function postData(prefix, token = '', url = '', data = {}) {
            const response = await fetch(`${prefix}/${url}`, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(data)
            });
            return response.json();
        }
        return handleSubmit('Добавление');
    }

    const del = () => {
        // ...existing code...
        async function delData(prefix = '', token = '', url = '') {
            const response = await fetch(`${prefix}/${url}`, {
                method: 'DELETE',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
            });
            return response.json();
        }
        return handleSubmit('Удаление');
    }

    return (
        <Container fluid>
            <Row>
                <Col> <label className="" htmlFor="theme">{props.titleName}</label></Col>
                <Col xs lg="1"><label>New<input className="" type="checkbox" name="new" checked={state.newToggle} onChange={() => { setState(prevState => ({ ...prevState, newToggle: !prevState.newToggle, editToggle: false, delToggle: false })) }} /></label></Col>
                <Col xs lg="1"><label>Edit&nbsp;<input className="" type="checkbox" name="edit" checked={state.editToggle} onChange={() => { setState(prevState => ({ ...prevState, newToggle: false, editToggle: !prevState.editToggle, delToggle: false })) }} /></label></Col>
                <Col xs lg="1"><label>Del&nbsp;<input className="" type="checkbox" name="edit" checked={state.delToggle} onChange={() => { setState(prevState => ({ ...prevState, newToggle: false, editToggle: false, delToggle: !prevState.delToggle })) }} /></label></Col>
            </Row>
            <Row>
                <Col xs lg="8">
                    <input className="" style={inputStyle(state.newToggle, state.editToggle)} type="text" name="theme" defaultValue='ccc' value={state.inputValue} onChange={e => setState(prevState => ({ ...prevState, inputValue: e.target.value }))} required />
                </Col>
                <Col xs lg="1">
                    <div style={buttonStyle(state.newToggle, state.editToggle, state.delToggle)}>
                        <Button onClick={() => handleSwitch()} variant="success" type="button" className="btn btn-default">Ok</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

const EditForm = (props) => {
    const [state, setState] = useState({
        //data: {}, newToggle: false, editToggle: false, delToggle: false, theme: [], book: [], page: [], content: '', chapter: []
        inputValue: props.titleName,  contents: { id: 1, pageContent: 'xxx' }
    });

    useEffect(() => {
        fetch(`${props.prefix}/${props.apiUrl}/${props.id}`)
            .then(response => response.json())
            .then((data) => { setState(prevState => ({ ...prevState, contents: { id: data.id, pageContent: data.pageContent } })) });
    }, [props.prefix, props.apiUrl, props.id]);

    const handleSubmit = (event) => {
        alert(event + ' : " ' + state.inputValue + ' " - сохранено');
        const navigate = useNavigate();
        navigate(0);
    }

    const handleButton = () => {
        async function putData(prefix = '', token = '', url = '', data = {}) {
            const response = await fetch(`${prefix}/${url}`, {
                method: 'PUT',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
            });
            return response.json();
        }
        putData(props.prefix, props.token, `${props.apiUrl}/${props.id}`, { "id": props.id, "pageContent": state.contents.pageContent });
        return handleSubmit('Изменение');
    }

    return (
        <>
            <Button onClick={() => handleButton()} variant="success" type="button" className="btn btn-default">Save</Button>
            <JoditEditor
                value={state.contents.pageContent}
                onBlur={newContent => { setState(prevState => ({ ...prevState, contents: { id: props.id, pageContent: newContent } })) }}
            />
            <br /><hr />
        </>
    );
}

export { Adm, InputForm, EditForm };
