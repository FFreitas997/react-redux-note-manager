import style from './style.module.css'

export default function Input({placeholder, onChange, type, value}) {

    return (
        <input type={type || 'text'}
               value={value}
               className={style.input}
               onChange={(e) => onChange(e.target.value)}
               placeholder={placeholder}/>
    )
}