import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BottomBtn = ({text, colorClass, icon, onBntClick}) => {

    return (
        <button
            type="button"
            className={`btn btn-block no-border ${colorClass}`}
            onClick={onBntClick}
        >
            <FontAwesomeIcon size='lg' icon={icon} />
            {text}
        </button>
    )
}

export default BottomBtn