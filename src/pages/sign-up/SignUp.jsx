import style from './style.module.css'
import ButtonPrimary from "../../components/button-primary/ButtonPrimary";
import {Link, useNavigate} from "react-router-dom";
import Input from "../../components/input/Input";
import AuthLayout from "../../layouts/AuthLayout";
import {useState} from "react";
import {AuthApi} from "../../api/auth-api";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/auth/auth-slice";

export default function SignUp(params) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        if (password !== passwordRepeat){
            alert("The passwords don't match. Please try again")
            return;
        }
        try {
            const user = await AuthApi.signUp(email, password)
            dispatch(setUser(user));
            navigation("/")
        } catch (e) {
            alert("SignUp failed. Something went wrong!")
            setEmail("")
            setPassword("")
            setPasswordRepeat("")
        }
    }

    const form = (
        <div className={style.formContainer}>
            <h2 className={style.title}>
                SignUp<br/>to access your team notes
            </h2>
            <form onSubmit={submit} className={style.formGroup}>
                <Input value={email} type={"text"} placeholder={"Email"} onChange={setEmail}/>
                <Input value={password} type={"password"} placeholder={"Password"} onChange={setPassword}/>
                <Input value={passwordRepeat} type={"password"} placeholder={"Password (repeat)"} onChange={setPasswordRepeat}/>
                <ButtonPrimary type={"submit"} className={style.button}>Sign Up!</ButtonPrimary>
                <span>
                   Already have an account <Link to={"/signin"}>SignIn</Link>
                </span>
            </form>
        </div>
    )

    return <AuthLayout>{form}</AuthLayout>;
}