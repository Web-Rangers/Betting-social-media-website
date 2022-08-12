import styles from "../../styles/components/ui/TextField.module.css"
import Image from "next/image"

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: "text" | "email" | string
    icon?: string
    iconClick?: (...args: any[]) => void
}

const TextField: React.FC<TextFieldProps> = (props) => {
    const {iconClick, ...inputProps} = props

    return (
        <div className={styles.textFieldContainer}>
            <input {...inputProps} style={inputProps.icon ? {paddingRight: 48} : {}} />
            {inputProps.icon && 
                <div 
                    className={styles.icon} 
                    onClick={iconClick}
                    style={iconClick ? {cursor: "pointer"} : {}}
                >
                    <Image 
                        src={inputProps.icon}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            }            
        </div>
    );
};

export default TextField;