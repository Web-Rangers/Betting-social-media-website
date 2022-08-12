import type { NextPage } from "next"
import Head from "next/head"
import styles from "../../styles/pages/Login.module.css"
import Image from "next/image"
import TextField from "../../components/ui/TextField"
import PasswordField from "../../components/ui/PasswordField"
import SubmitButton from "../../components/ui/SubmitButton"
import { useState } from "react"
import Link from "next/link"

const Register: NextPage = () => {
    const [passwordCheck, setPasswordCheck] = useState([false, false, false, false])

    function checkPassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPasswordCheck([
            e.target.value?.length >= 12,

            e.target.value?.split("")
                .filter(letter => (
                    isNaN(parseInt(letter))
                    &&
                    letter.toLowerCase() != letter.toUpperCase()
                    &&
                    letter == letter.toUpperCase()
                ))
                .length > 0,

            e.target.value?.split("")
                .filter(letter => !isNaN(parseInt(letter)))
                .length > 0,

            e.target.value?.split("")
                .filter(letter => (
                    isNaN(parseInt(letter))
                    &&
                    letter.toLowerCase() == letter.toUpperCase()
                ))
                .length > 0
        ])
    }

    return (
        <>
            <Head>
                <title>Optimo Registration</title>
                <meta name="description" content="Optimo betting social media login" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <div className={styles.formArea}>
                    <form className={styles.form}>
                        <h1 className={styles.loginTitle}>
                            Sign Up
                        </h1>
                        <span className={styles.formText}>
                            You already have an account?&nbsp;&nbsp;&nbsp;
                            <a href="/login">
                                Sign In
                            </a>
                        </span>
                        <div className={styles.socials}>
                            <div className={styles.social}>
                                <Image 
                                    src="/images/login/facebook.svg"
                                    width={24}
                                    height={24}
                                />
                            </div>
                            <div className={styles.social}>
                                <Image 
                                    src="/images/login/google.svg"
                                    width={24}
                                    height={24}
                                />
                            </div>
                            <div className={styles.social}>
                                <Image 
                                    src="/images/login/twitter.svg"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </div>
                        <span className={styles.separatorOr}>
                            OR
                        </span>
                        <div className={styles.fields}>
                            <div className={styles.row}>
                                <TextField 
                                    type="text" 
                                    placeholder="First Name"
                                />
                                <TextField 
                                    type="text" 
                                    placeholder="Last Name"
                                />
                            </div>
                            <TextField 
                                type="email" 
                                placeholder="Email Address"
                            />
                            <TextField 
                                type="nickname" 
                                placeholder="Nickname"
                                icon="/images/login/dice.svg"
                                iconClick={()=>{}}
                            />
                            <PasswordField 
                                name="password"
                                placeholder="Password"
                                onChange={checkPassword}
                            />
                            <PasswordField 
                                name="repeat_password"
                                placeholder="Repeat Password"
                            />
                        </div>
                        <div className={styles.passwordDescription}>
                            <span className={styles.passwordTitle}>
                                Your password must:
                            </span>
                            <span
                                className={`
                                    ${styles.checkOption} 
                                    ${passwordCheck[0] && styles.active}
                                `}
                            >
                                Be at least 12 characters
                            </span>
                            <span
                                className={`
                                    ${styles.checkOption} 
                                    ${passwordCheck[1] && styles.active}
                                `}
                            >
                                Include at least one uppercase letter
                            </span>
                            <span
                                className={`
                                    ${styles.checkOption} 
                                    ${passwordCheck[2] && styles.active}
                                `}
                            >
                                Include at least one number
                            </span>
                            <span
                                className={`
                                    ${styles.checkOption} 
                                    ${passwordCheck[3] && styles.active}
                                `}
                            >
                                Include at least one symbol
                            </span>
                            <label className={styles.checkTerms}>
                                <input type={'checkbox'} name="agree_to_terms" />
                                <div className={styles.checkBox} />
                                <span className={styles.checkText}>
                                    I confirm that I am over 18 years old and I agree with the <Link href="/login"><a>Terms and Conditions and Privacy Policy.</a></Link>
                                </span>
                            </label>
                        </div>
                        <div className={styles.formBtns}>
                            <SubmitButton>
                                Sign Un
                            </SubmitButton>
                        </div>
                    </form>
                </div>
                <div className={styles.pageImg}>
                    <Image 
                        src="/images/login/background-register.png"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
        </>
    );
};

export default Register;