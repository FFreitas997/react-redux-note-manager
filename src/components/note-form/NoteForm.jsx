import style from './style.module.css'
import {PencilFill, TrashFill} from "react-bootstrap-icons";
import ButtonPrimary from "../button-primary/ButtonPrimary";
import {useState} from "react";
import {ValidatorService} from "../../service/Validator";
import FieldError from "../field-error/FieldError";

function NoteForm({isEditable = true, note, title, onClickEdit, onClickTrash, onSubmit}) {
    const [formValues, setFormvValues] = useState({title: note?.title || '', content: note?.content || ''})
    const [formErrors, setFormErrors] = useState({title: note?.title ? undefined : true, content: note?.content ? undefined : true})

    const validator = {
        title: (value) => ValidatorService.min(value, 3) || ValidatorService.max(value, 20),
        content: (value) => ValidatorService.min(value, 3)
    }
    const validate = (field, value) => setFormErrors({...formErrors, [field]: validator[field](value)})

    const hasErrors = () => {
        for (const field in formErrors) {
            if (formErrors[field])
                return true;
        }
        return false;
    }

    const updateForm = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormvValues({...formValues, [name]: value})
        validate(name, value);
    }

    const actionIcons = (
        <>
            <div className={"col-1"}>
                {onClickEdit && <PencilFill onClick={onClickEdit} className={style.icon}/>}
            </div>
            <div className={"col-1"}>
                {onClickTrash && <TrashFill onClick={onClickTrash} className={style.icon}/>}
            </div>
        </>
    )

    const titleInput = (
        <div className={"mb-5"}>
            <label className={"form-label"}>Title</label>
            <input onChange={updateForm} type={"text"} name={"title"} className={"form-control"} value={formValues.title}/>
            <FieldError message={formErrors.title}/>
        </div>
    )

    const contentInput = (
        <div className={"mb-5"}>
            <label className={"form-label"}>Content</label>
            <textarea onChange={updateForm} name={"content"} className={"form-control"} rows={5} value={formValues.content}/>
            <FieldError message={formErrors.content}/>
        </div>
    )

    const submitBtn = (
        <div className={style.submit_btn}>
            <ButtonPrimary isDisabled={hasErrors()} onClick={() => onSubmit(formValues)}>Submit</ButtonPrimary>
        </div>
    )

    return (
        <div className={style.container}>
            <div className={"row justify-content-space-between"}>
                <div className={"col-10"}>
                    <h2 className={"mb-3"}>{title}</h2>
                </div>
                {actionIcons}
            </div>
            <div className={"mb-3 " + style.title_input_container}>{isEditable && titleInput}</div>
            <div className={"mb-3"}>{isEditable ? contentInput : <pre>{note.content}</pre>}</div>
            {onSubmit && submitBtn}
        </div>
    )
}

export default NoteForm;