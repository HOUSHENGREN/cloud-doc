import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons'
import propTypes from 'prop-types' // 类似于ts的类型检查

const FileSearch = ({ title, onFileSearch=(() => {}) }) => {
    const [inputActive, setInputActive] = useState(false)
    const [value, setValue] = useState('')

    const closeSearch = () => {
        // e.preventDefault() 阻止默认行为，实际发现根本不需要多做这一步
        console.log('closeSearch')
        setInputActive(false)
        setValue('')
    }

    // 按esc 、 enter
    useEffect(() => {
        const handler = (event) => {
            const { keyCode } = event
            // enter
            if(keyCode === 13 && inputActive) {
                console.log('search')
                onFileSearch(value)
            } else if (keyCode === 27 && inputActive) {
                // esc
                closeSearch()
            }
        }

        document.addEventListener('keyup', handler)
        
        return () => {
            document.removeEventListener('keyup', handler)
        }
    })

    return (
        <div className="alert alert-primary d-flex justify-content-between align-items-center">
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
                        onChange={e => {
                            setValue(e.target.value)
                        }}
                    ></input>
                    <button 
                        type="button"
                        className="icon-button"
                        onClick={closeSearch}
                    >
                        <FontAwesomeIcon title="清空" icon={faTimes} />
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

FileSearch.defaultProps = {
    title: '我的云文档'
}

export default FileSearch