import '../styles/Button.css'

interface ButtonProps {
    color: string
    children: any
    onClick?: () => void
}

export default function Button(props : ButtonProps) {
    return (
        <button onClick={props.onClick}
        className={`button button-${props.color}`}>
            {props.children}
        </button>
    )
}