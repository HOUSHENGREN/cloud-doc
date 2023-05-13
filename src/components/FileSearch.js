import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons'
import propTypes from 'prop-types' // 类似于ts的类型检查
import useKeyPress from "../hooks/useKeyPress"

/**
 * 当enterPressed值发生变化时，useKeyPress 文件的useEffect 会执行，
 * 同时，本文件内也有 useEffect，谁先执行？
 * 
 */

const FileSearch = ({ title, onFileSearch=(() => {}) }) => {
    const [inputActive, setInputActive] = useState(false)
    const [value, setValue] = useState('')
    const node = useRef(null)
    
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)

    const closeSearch = () => {
        setInputActive(false)
        setValue('')
        onFileSearch('') // 此时，外层filter时就能得到整个files数组
    }

    // 按esc 、 enter
    useEffect(() => {
        if(enterPressed && inputActive) {
            onFileSearch(value)
        } else if (escPressed && inputActive) {
            closeSearch()
        }
    })

    // 编辑时聚焦输入框
    useEffect(() => {
        if(inputActive) {
            node.current.focus()
        }
    }, [inputActive])

    return (
        <div className="alert alert-primary d-flex justify-content-between align-items-center mb-0">
            {
                !inputActive && 
                <>
                    <span>{title}</span>
                    <button 
                        type="button"
                        className="icon-button"
                        size="lg"
                        onClick={() => { setInputActive(true) }}
                    >
                        {/* <FontAwesomeIcon icon={faSearch} /> */}
                        <FontAwesomeIcon title="搜索" icon={faMagnifyingGlass} />
                        {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
                        {/* <FontAwesomeIcon icon="fa-brands fa-searchengin" /> */}
                    </button>
                </>
            }
            {
                inputActive && 
                <>
                    <input
                        className="form-control"
                        value={value}
                        ref={node}
                        onChange={e => {
                            setValue(e.target.value)
                        }}
                    ></input>
                    <button 
                        type="button"
                        className="icon-button"
                        onClick={closeSearch}
                    >
                        <FontAwesomeIcon title="关闭" icon={faTimes} />
                    </button>
                </>
            }
        </div>
    )
}

// 传参校验
FileSearch.propTypes = {
    title: propTypes.string,
    onFileSearch: propTypes.func.isRequired
}

// 默认值
FileSearch.defaultProps = {
    title: '我的云文档'
}

export default FileSearch