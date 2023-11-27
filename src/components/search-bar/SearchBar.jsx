import style from './style.module.css'
import {Search} from 'react-bootstrap-icons'

export default function SearchBar({onChange, placeholder}) {
    return (
        <div>
            <Search size={25} className={style.icon}/>
            <input type={"text"}
                   className={style.input}
                   onChange={(e) => onChange(e.target.value)}
                   placeholder={placeholder}/>
        </div>
    )
}