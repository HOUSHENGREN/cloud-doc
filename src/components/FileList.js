import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import propTypes from 'prop-types'

const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {

    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file => (
                    <li 
                        className="list-group-item bg-light row d-flex align-items-center file-item"
                        key={file.id}
                    >
                        <span className="col-2">
                            <FontAwesomeIcon icon={faMarkdown}></FontAwesomeIcon>
                        </span>
                        <span className="col-8" onClick={() => { onFileClick(file.id) }}>{file.title}</span>
                        <button 
                            type="button"
                            className="icon-button col-1"
                            // onClick={() => { onSaveEdit(file.id) }}
                        >
                            <FontAwesomeIcon title="编辑" size="lg" icon={faEdit} />
                        </button>
                        <button 
                            type="button"
                            className="icon-button col-1"
                            onClick={() => { onFileDelete(file.id) }}
                        >
                            <FontAwesomeIcon title="删除" size="lg" icon={faTrash} />
                        </button>
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
    // onSaveEdit: propTypes.func
}

FileList.defaultProps = {
    files: []
}

export default FileList