import { useRef, useState } from "react"
import Modal from "./Modal"

export default function EditTaskModal({ show, onClose = () => { }, onSave = () => { }, task }) {

    const [title, setTitle] = useState(task.title)
    const [description, setDesciption] = useState(task.description)
    const [status, setStatus] = useState(task.status)

    const editFormRef = useRef()

    function handleSubmit(e) {
        e.preventDefault();

        const updatedTask = {
            ...task,
            title,
            description,
            status,
        };

        onSave(updatedTask);
        onClose();
    }

    return (
        <Modal
            show={show}
            onClose={onClose}
            title={"Modifica Task"}
            onConfirm={() => editFormRef.current.requestSubmit()}
            confirmText={"Salva"}
            content={
                <form onSubmit={handleSubmit} ref={editFormRef}>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea value={description} onChange={e => setDesciption(e.target.value)} />
                    <select name="" id="" value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </form>
            }
        />
    )
}