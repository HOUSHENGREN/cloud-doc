import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import propTypes from 'prop-types';
import useKeyPress from '../hooks/useKeyPress';
// import fileHelper from '../utils/fileHelper';

// const remote = require('@electron/remote');

// const saveLocation = remote.app.getPath('documents');
// console.log('saveLocation', saveLocation);

// preload.js
const { remote } = window.electron;
const saveLocation = remote.app.getPath('documents');

console.log('saveLocation', saveLocation);

const FileList = forwardRef(
  ({ files, onFileClick, onSaveEdit, onFileDelete }, ref) => {
    const [editId, setEditId] = useState(null);
    const [value, setValue] = useState('');
    const node = useRef(null);

    const [isNew, setIsNew] = useState(false);

    // const editBtnClick = (file) => {
    const editBtnClick = (file, { isNew = false }) => {
      setValue(file.title);
      setEditId(file.id);

      setIsNew(isNew);
    };

    // 暴露方法 handelValid 给父组件
    useImperativeHandle(ref, () => ({
      editBtnClick,
    }));

    const enterPressed = useKeyPress(13);
    const escPressed = useKeyPress(27);

    const closeSearch = () => {
      setEditId(null);
      setValue('');
    };

    // 按esc 、 enter
    useEffect(() => {
      if (enterPressed && editId) {
        // if (isNew) {
        //   fileHelper.writeFile(saveLocation, `${value}.md`).then(() => {
        //     onSaveEdit(editId, value);
        //     closeSearch();
        //   });
        // } else {
        onSaveEdit(editId, value, { isNew });
        closeSearch();
        // }
      } else if (escPressed && editId) {
        closeSearch();
      }
    });

    // 编辑时聚焦输入框
    useEffect(() => {
      if (editId) {
        node.current.focus();
      }
    }, [editId]);

    return (
      <ul className="list-group list-group-flush file-list">
        {files.map((file) => (
          <li
            className="list-group-item bg-light row g-0 d-flex align-items-center file-item"
            key={file.id}
          >
            {/* 非编辑状态 */}
            {editId !== file.id && (
              <>
                <span className="col-2">
                  <FontAwesomeIcon icon={faMarkdown} />
                </span>
                <span
                  className="col-6 c-link"
                  onClick={() => {
                    onFileClick(file.id);
                  }}
                >
                  {file.title}
                </span>
                <button
                  type="button"
                  className="icon-button col-2"
                  onClick={() => editBtnClick(file, { isNew: false })}
                >
                  <FontAwesomeIcon title="编辑" size="lg" icon={faEdit} />
                </button>
                <button
                  type="button"
                  className="icon-button col-2"
                  onClick={() => {
                    onFileDelete(file.id);
                  }}
                >
                  <FontAwesomeIcon title="删除" size="lg" icon={faTrash} />
                </button>
              </>
            )}

            {/* 编辑状态 */}
            {editId === file.id && (
              <>
                <span className="col-10">
                  <input
                    ref={node}
                    className="form-control"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                </span>
                <button
                  type="button"
                  className="icon-button col-2"
                  onClick={closeSearch}
                >
                  <FontAwesomeIcon title="关闭" icon={faTimes} />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    );
  }
);

// https://stackoverflow.com/questions/41771217/react-linter-airbnb-proptypes-array
FileList.propTypes = {
  files: propTypes.instanceOf(Array),
  onFileClick: propTypes.func,
  onFileDelete: propTypes.func,
  onSaveEdit: propTypes.func,
};

FileList.defaultProps = {
  files: [],
  onFileClick: () => {},
  onFileDelete: () => {},
  onSaveEdit: () => {},
};

export default FileList;
