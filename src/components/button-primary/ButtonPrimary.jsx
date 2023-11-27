import style from './style.module.css'

function ButtonPrimary({type, className, onClick, isDisabled, children}) {
    return (
        <button onClick={onClick}
                type={type || "button"}
                className={`btn btn-primary ${style.button} ${className}`}
                disabled={isDisabled}
        >
            {children}
        </button>
    )
}

export default ButtonPrimary;