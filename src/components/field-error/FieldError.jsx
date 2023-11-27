import style from './style.module.css'

function FieldError({message}) {
    return <span className={style.container}>{message}</span>
}

export default FieldError;