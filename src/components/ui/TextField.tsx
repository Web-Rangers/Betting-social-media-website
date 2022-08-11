import type { NextComponentType } from "next"
import { ChangeEvent } from "react"
import styles from "../../styles/components/ui/Login.module.css"

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: "text" | "email" | string
}

const TextField: React.FC<TextFieldProps> = (props) => {

    return (
        <div className={styles.textFieldContainer}>
            <input {...props} />
        </div>
    );
};

export default TextField;