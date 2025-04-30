// Editor.jsx
import React, { useEffect, useState, useRef } from 'react';
import HtmlParser from 'html-react-parser';
import Prism from 'prismjs';
import 'prismjs/themes/prism-funky.css'; // Темная тема
import '../../scss/app.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { contextAtom } from '../state';

const Editor = () => {
  // State для хранения содержимого страницы
  const [state, setState] = useState({ contents: { id: 1, pageContent: '<p>Начните редактирование...</p>' } });

  // Ref для доступа к содержимому WYSIWYG-редактора
  const editorRef = useRef(null);

  // WYSIWYG редактор
  const WYSIWYGeditor = ({ value, onChange }) => {
    // Функция для добавления HTML-тегов
    const addTag = (tag) => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        const wrapper = document.createElement(tag);
        range.deleteContents();
        range.insertNode(wrapper);
        wrapper.appendChild(document.createTextNode(selectedText));

        onChange(editorRef.current.innerHTML); // Обновляем состояние
      }
    };

    // Функция для добавления ссылки
    const addLink = () => {
      const url = prompt('Введите URL:');
      if (url) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const selectedText = range.toString();

          const link = document.createElement('a');
          link.href = url;
          link.textContent = selectedText || 'Ссылка';
          range.deleteContents();
          range.insertNode(link);

          onChange(editorRef.current.innerHTML); // Обновляем состояние
        }
      }
    };
 // Функция для добавления изображения
 const addImage = () => {
  const src = prompt('Введите URL изображения:');
   if (src) {
    const img = document.createElement('img');
    img.src = src;
    img.style.maxWidth = '100%';
    img.alt = 'Изображение';

    const editor = document.querySelector('.wysiwyg-editor [contenteditable]');
    editor.appendChild(img);

    onChange(editorRef.current.innerHTML); // Обновляем состояние
  }
};

// Функция для добавления видео (iframe)
const addVideo = () => {
  const videoUrl = prompt('Введите URL видео (YouTube или Vimeo):');
  if (videoUrl) {
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl;
    iframe.width = '560';
    iframe.height = '315';
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;

    const editor = document.querySelector('.wysiwyg-editor [contenteditable]');
    editor.appendChild(iframe);
    
    onChange(editorRef.current.innerHTML); // Обновляем состояние
  }
};
// Функция для добавления области div
const addDiv = () => {
    const _class = prompt('Введите значение свойства Class:');
  if (_class) {
    const div = document.createElement('div');
    div.className = _class;
    
    const editor = document.querySelector('.wysiwyg-editor [contenteditable]');
    editor.appendChild(div);

    onChange(editorRef.current.innerHTML); // Обновляем состояние
  }
};

    return (
      <div className="wysiwyg-editor border p-3 mb-3">
        <h5>WYSIWYG Редактор</h5>
        {/* Меню инструментов */}
        <div className="btn-toolbar mb-2">
          <div className="btn-group me-2">
            <button className="btn btn-sm btn-outline-primary" onClick={() => addTag('b')}>
              <i className="bi bi-type-bold"></i>
            </button>
            <button className="btn btn-sm btn-outline-primary" onClick={() => addTag('i')}>
              <i className="bi bi-type-italic"></i>
            </button>
            <button className="btn btn-sm btn-outline-primary" onClick={() => addTag('u')}>
              <i className="bi bi-type-underline"></i>
            </button>
          </div>
          <div className="btn-group me-2">
            <button className="btn btn-sm btn-outline-success" onClick={addLink}>
              <i className="bi bi-link"></i> Ссылка
            </button>
            <button className="btn btn-sm btn-outline-info" onClick={addImage}>
              <i className="bi bi-image"></i> Изображение
            </button>
            <button className="btn btn-sm btn-outline-warning" onClick={addVideo}>
              <i className="bi bi-camera-video"></i> Видео
            </button>
            <button className="btn btn-sm btn-outline-secondary" onClick={addDiv}>
              <i className="bi bi-camera-video"></i> Div
            </button>
          </div>
        </div>

        {/* Редактируемая область */}
        <div
          ref={editorRef}
          contentEditable="true"
          suppressContentEditableWarning={true}
          onInput={(e) => onChange(e.currentTarget.innerHTML)} // Обновляем состояние при вводе
          dangerouslySetInnerHTML={{ __html: value }}
          className="form-control p-2"
          style={{ minHeight: '150px' }}
        />
      </div>
    );
  };

    // HTML редактор с подсветкой синтаксиса
    const HTMLeditor = ({ value, onChange }) => {
      const codeRef = useRef(null);
      const [newValue, setNewValue] = useState('');

      const handleBlur = () => {
        handleContentChange(newValue);
        console.log('Input blurred');
      };

      // Подсветка синтаксиса при изменении содержимого
      useEffect(() => {
        if (codeRef.current) {
          codeRef.current.innerHTML = Prism.highlight(value, Prism.languages.html, 'html');
        }
      }, [value]);
  
      return (
        <div className="html-editor border p-3">
          <h5>HTML Редактор</h5>
          <pre className="bg-dark text-light p-2" style={{ minHeight: '150px', fontFamily: 'monospace' }}>
            <code
              ref={codeRef}
              contentEditable="true"
              suppressContentEditableWarning={true}
              onInput={(e) => setNewValue(e.currentTarget.textContent)}
              onBlur={handleBlur}
              className="language-html"
            ></code>
          </pre>
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

export {  Editor };
