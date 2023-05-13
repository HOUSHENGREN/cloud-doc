import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import propTypes from 'prop-types'
import useKeyPress from "../hooks/useKeyPress"

const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {
    const [editId, setEditId] = useState(null)
    const [value, setValue] = useState('')
    const node = useRef(null)

    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)

    const closeSearch = () => {
        setEditId(null)
        setValue('')
    }

    // 按esc 、 enter
    useEffect(() => {
        if(enterPressed && editId) {
            onSaveEdit(editId, value)
            closeSearch()
        } else if (escPressed && editId) {
            closeSearch()
        }
    })

    // 编辑时聚焦输入框
    useEffect(() => {
        if(editId) {
            node.current.focus()
        }
    }, [editId])

    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file => (
                    <li 
                        className="list-group-item bg-light row g-0 d-flex align-items-center file-item"
                        key={file.id}
                    >
                        {/* 非编辑状态 */}
                        {   
                            editId !== file.id &&
                            <>
                                <span className="col-2">
                                    <FontAwesomeIcon icon={faMarkdown}></FontAwesomeIcon>
                                </span>
                                <span className="col-6 c-link" onClick={() => { onFileClick(file.id) }}>{file.title}</span>
                                <button 
                                    type="button"
                                    className="icon-button col-2"
                                    onClick={() => { setValue(file.title); setEditId(file.id)}}
                                >
                                    <FontAwesomeIcon title="编辑" size="lg" icon={faEdit} />
                                </button>
                                <button 
                                    type="button"
                                    className="icon-button col-2"
                                    onClick={() => { onFileDelete(file.id); console.log('onFileDelete') }}
                                >
                                    <FontAwesomeIcon title="删除" size="lg" icon={faTrash} />
                                </button>
                            </>
                        }   

                        {/* 编辑状态 */}
                        {
                            editId === file.id &&
                            <>
                                <span className="col-10">
                                    <input
                                        ref={node}
                                        className="form-control"
                                        value={value}
                                        onChange={e => {
                                            setValue(e.target.value)
                                        }}
                                    ></input>
                                </span>
                                <button 
                                    type="button"
                                    className="icon-button col-2"
                                    onClick={closeSearch}
                                >
                                    <FontAwesomeIcon title="关闭" icon={faTimes} />
                                </button>
                            </>
                        }
                    </li>
                ))
            }
        </ul>
    )
}

FileList.propTypes = {
    files: propTypes.array,
    onFileClick: propTypes.func,
    onFileDelete: propTypes.func,
    onSaveEdit: propTypes.func
}

FileList.defaultProps = {
    files: []
}

export default FileList