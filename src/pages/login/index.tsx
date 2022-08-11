import type { NextPage } from "next"
import Head from "next/head"
import styles from "../../styles/pages/Login.module.css"
import Image from "next/image"
import TextField from "../../components/ui/TextField"
import PasswordField from "../../components/ui/PasswordField"
import SubmitButton from "../../components/ui/SubmitButton"

const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Optimo Login</title>
                <meta name="description" content="Optimo betting social media login" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <div className={styles.formArea}>
                    <form className={styles.form}>
                        <h1 className={styles.loginTitle}>
                            Sign In
                        </h1>
                        <span className={styles.formText}>
                            Don’t have an account?&nbsp;&nbsp;&nbsp;
                            <a href="/register">
                                Create one
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
                            <TextField 
                                type="email" 
                                placeholder="Email Address"
                            />
                            <PasswordField 
                                placeholder="Password"
                            />
                        </div>
                        <div className={styles.formBtns}>
                            <span className={styles.formText}>
                                <a href="/forgotpassword">
                                    Forgot Password?
                                </a>
                            </span>
                            <SubmitButton>
                                Sign In
                            </SubmitButton>
                        </div>
                    </form>
                </div>
                <div className={styles.pageImg}>
                    <Image 
                        src="/images/login/background-login.png"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
        </>
    );
};

export default Login;