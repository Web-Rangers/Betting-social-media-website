import type { NextPage } from "next"
import Head from "next/head"
import styles from "../../styles/pages/Login.module.css"
import Image from "next/image";

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

                    </form>
                </div>
                <div className={styles.pageImg}>
                    <Image 
                        src="/images/login/background.png"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
        </>
    );
};

export default Login;