import { useMemo, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import useTasks from "../hooks/useTasks";

export default function AddTask() {

    const { addTask } = useTasks()

    // inputs value
    const [title, setTitle] = useState("")
    const descriptionRef = useRef()
    const statusRef = useRef()

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

    const [error, setError] = useState(false)

    const titleValidation = useMemo(() => {
        setError(false)
        const validtitle = title.trim() && ![...title].some(char => symbols.includes(char))

        if (!validtitle) { setError(true) }

        return validtitle
    }, [title])

    function handleSubmit(e) {
        e.preventDefault()

        if (titleValidation) {
            const description = descriptionRef.current.value
            const status = statusRef.current.value

            const obj = {
                "title": title,
                "description": description,
                "status": status
            };

            console.log(obj);
            addTask(obj)
            alert("Task aggiunta con successo")

            // reset form
            setTitle("");
            descriptionRef.current.value = "";
            statusRef.current.value = "To do";
        }

        else alert("C'è stato un errore")
    }

    return (
        <>
            <NavBar />

            <main>
                <h1>Aggiungi Task</h1>

                <form onSubmit={e => handleSubmit(e)}>
                    <div>Titolo</div>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    <div>Descrizione</div>
                    <textarea ref={descriptionRef} />
                    <select name="" id="" ref={statusRef}>
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                    <button>Submit</button>
                </form>

                {error && <div className="error">Il titolo non può essere vuoto e non può contenere caratteri speciali</div>}
            </main>

        </>
    )
}
