// Editor.jsx
import React, { useEffect, useState } from 'react';
import HtmlParser from 'html-react-parser';
import '../../scss/app.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { contextAtom } from '../state';

const Editor = () => {
  // State для хранения содержимого страницы
  const [state, setState] = useState({ contents: { id: 1, pageContent: '<p>Начните редактирование...</p>' } });

  // WYSIWYG редактор
  const WYSIWYGeditor = ({ value, onChange }) => {
    return (
      <div className="wysiwyg-editor border p-3 mb-3">
        <h5>WYSIWYG Редактор</h5>
        <div
          contentEditable="true"
          suppressContentEditableWarning={true}
          onInput={(e) => onChange(e.currentTarget.innerHTML)}
          dangerouslySetInnerHTML={{ __html: value }}
          className="form-control p-2"
          style={{ minHeight: '150px' }}
        />
      </div>
    );
  };

  // HTML редактор с подсветкой синтаксиса
  const HTMLeditor = ({ value, onChange }) => {
    return (
      <div className="html-editor border p-3">
        <h5>HTML Редактор</h5>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="form-control bg-dark text-light"
          style={{ minHeight: '150px', fontFamily: 'monospace' }}
        />
      </div>
    );
  };

  // Обработчик изменения содержимого
  const handleContentChange = (newContent) => {
    setState((prevState) => ({
      ...prevState,
      contents: { ...prevState.contents, pageContent: newContent },
    }));
  };

  return (
    <div className="container mt-5">
      {/* WYSIWYG Редактор */}
      <WYSIWYGeditor value={state.contents.pageContent} onChange={handleContentChange} />

      {/* HTML Редактор */}
      <HTMLeditor value={state.contents.pageContent} onChange={handleContentChange} />

      {/* Предварительный просмотр */}
      <div className="mt-4">
        <h5>Предварительный просмотр:</h5>
        <div className="border p-3">{HtmlParser(state.contents.pageContent)}</div>
      </div>
    </div>
  );
};

export { Editor };
