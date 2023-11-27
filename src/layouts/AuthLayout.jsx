import style from './style.module.css'
import {ReactComponent as LogoSVG} from "../assets/images/logo.svg";

export default function AuthLayout({children}) {

    const header = (
        <div className={style.header}>
            <LogoSVG className={style.logoTop}/>
            <h3 className={style.logoTitle}>Notomatic</h3>
        </div>
    )

    const background = (
        <div>
            <div className={"d-flex"}>
                <LogoSVG className={style.logo}/>
                <h1 className={style.logoTxt}>Notomatic</h1>
            </div>
            <p style={{color: 'white'}}>One place for the team notes</p>
        </div>
    )

    return (
        <div className={style.root}>
            {header}
            <div className={style.leftSection}>
                {children}
            </div>
            <div className={"d-none d-lg-flex " + style.rightSection}>
                {background}
            </div>
        </div>
    )
}