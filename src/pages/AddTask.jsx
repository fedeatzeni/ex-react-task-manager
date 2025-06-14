import { use, useMemo, useRef, useState } from "react";
import NavBar from "../components/NavBar";

export default function AddTask() {

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

            console.log(title, description, status);
        }
    }

    return (
        <>
            <NavBar />
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea ref={descriptionRef} />
                <select name="" id="" ref={statusRef}>
                    <option value="To do">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
                <button>Submit</button>
            </form>

            {error && <div className="error">Il titolo non può essere vuoto e non può contenere caratteri speciali</div>}
        </>
    )
}
