import style from './style.module.css'
import {Logo} from "../logo";
import logo from '../../assets/images/logo.png'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AuthApi} from "../../api/auth-api";
import {setUser} from "../../store/auth/auth-slice";

function Header(params) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.authSlice.auth.user)

    const signOut = async () => {
        await AuthApi.signOut();
        dispatch(setUser(null))
    }

    const renderAuthPerfil = (
        <div>
            <img style={{width: 40}}
                 className={"rounded-circle"}
                 alt={"bot user"}
                 src={"https://api.dicebear.com/5.x/bottts/svg?seed=" + user.email}/>
            <div>Hello, {user.email}</div>
            <Link to={"#"} onClick={signOut}>SignOut</Link>
        </div>
    )


    return (
        <div className={"row " + style.container}>
            <div className="col-xs-12 col-sm-4">
                <Logo
                    title={"Notomatic"}
                    subtitle={"Manager your notes"}
                    image={logo}
                    onClick={() => navigate("/")}/>
            </div>
            <div className="col-xs-12 col-sm-8 text-end">
                {renderAuthPerfil}
            </div>
        </div>
    )
}

export default Header;