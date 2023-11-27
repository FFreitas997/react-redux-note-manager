import style from './style.module.css'
import {useState} from "react";
import {Trash} from 'react-bootstrap-icons'

function TextCard({title, content, subtitle, onClick, onClickTrash}) {
    const [isCardHovered, setIsCardHovered] = useState(false);
    const [isTrashHovered, setIsTrashHovered] = useState(false);

    const onClickTrash_ = (e) => {
        onClickTrash();
        e.stopPropagation();
    }

    return (
        <div className={"card " + style.container}
             onClick={onClick}
             style={{borderColor: isCardHovered ? '#0d6efd' : 'transparent'}}
             onMouseEnter={() => setIsCardHovered(true)}
             onMouseLeave={() => setIsCardHovered(false)}
        >
            <div className="card-body">
                <div className={style.title_row}>
                    <h5 className="card-title">{title}</h5>
                    <Trash size={20}
                           onClick={onClickTrash_}
                           onMouseEnter={() => setIsTrashHovered(true)}
                           onMouseLeave={() => setIsTrashHovered(false)}
                           style={{color: isTrashHovered ? '#ff7373' : '#b8b8b8'}}/>
                </div>
                <h6 className={"card-subtitle mb-2 text-muted " + style.subtitle}>{subtitle}</h6>
                <p className={"card-text " + style.text_content}>{content}</p>
            </div>
        </div>
    );
}

export default TextCard;