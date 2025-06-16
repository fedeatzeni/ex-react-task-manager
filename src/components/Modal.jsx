import ReactDOM from "react-dom";

export default function Modal({ title, content, show, onClose = () => { }, onConfirm = () => { }, confirmText }) {

    return show && ReactDOM.createPortal(
        <div className="modal-container">
            <div className="modal">
                <h2>{title}</h2>
                {content}
                <div>
                    <button onClick={onConfirm}>{confirmText || "Conferma"}</button>
                    <button onClick={onClose}>Annulla</button>
                </div>
            </div>
        </div>,
        document.body
    )
}