import styles from "../../styles/components/ui/TextField.module.css"
import Image from "next/image"

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: "text" | "email" | string
    icon?: string
    iconClick?: (...args: any[]) => void
}

const TextField: React.FC<TextFieldProps> = (props) => {

    return (
        <div className={styles.textFieldContainer}>
            <input {...props} style={props.icon ? {paddingRight: 48} : {}} />
            {props.icon && 
                <div 
                    className={styles.icon} 
                    onClick={props.iconClick}
                    style={props.iconClick ? {cursor: "pointer"} : {}}
                >
                    <Image 
                        src={props.icon}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            }            
        </div>
    );
};

export default TextField;