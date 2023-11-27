import style from './style.module.css'
import ButtonPrimary from "../../components/button-primary/ButtonPrimary";
import {Link, useNavigate} from "react-router-dom";
import Input from "../../components/input/Input";
import AuthLayout from "../../layouts/AuthLayout";
import {useState} from "react";
import {AuthApi} from "../../api/auth-api";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/auth/auth-slice";

export default function SignIn(params) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const user = await AuthApi.signIn(email, password)
            dispatch(setUser(user));
            navigation("/")
        } catch (e) {
            alert("Authentication failed: Please check if your email and password")
            setEmail("")
            setPassword("")
        }
    }

    const form = (
        <div className={style.formContainer}>
            <h2 className={style.title}>
                Signin<br/>
                to access your team notes
            </h2>
            <form onSubmit={submit} className={style.formGroup}>
                <Input value={email} type={"text"} placeholder={"Email"} onChange={setEmail}/>
                <Input value={password} type={"password"} placeholder={"Password"} onChange={setPassword}/>
                <ButtonPrimary type={"submit"} className={style.button}>Sign in!</ButtonPrimary>
                <span>
                    You haven't created an account yet ? Want are you waiting for, just click in the following link <Link
                    to={"/signup"}>Signup</Link>
                </span>
            </form>
        </div>
    )

    return <AuthLayout>{form}</AuthLayout>;
}