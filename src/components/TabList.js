import propTypes from 'prop-types'

const TabList = ({ files,activeId, unsaveIds, onTabClick, onCloseTab}) => {
    return (
        <ul className="nav nav-pills">
            {
                files.map(file => (
                    <li className="nav-item" key={file.id}>
                        <a
                            href="#"
                            className="nav-link"
                        >
                            {file.title}
                        </a>
                    </li>
                ))
            }
        </ul>
    )
}

TabList.propTypes = {
    files: propTypes.array
}

TabList.defaultProps = {
    files: []
}

export default TabList 