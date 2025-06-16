import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

import useTasks from "../hooks/useTasks";
import { useMemo } from "react";

export default function TaskDetail() {

    const { tasks, setTasks, removeTask } = useTasks()

    // id dall'url
    const { id } = useParams();

    const task = useMemo(() => {
        return tasks.find(el => el.id == id)
    }, [tasks, id])

    let navigate = useNavigate();

    async function handleRemove(id) {
        try {
            await removeTask(id)

            // aggiorna le task
            setTasks(prev => prev.filter(task => task.id !== id));
            alert("Task eliminata con sucesso")

            // ritorna alla home
            navigate("/")
        } catch (error) {
            alert("Errore durante la rimozione: " + error.message);
        }
    }

    return (
        <>
            <Link to={"/"}>Home</Link>

            {task &&
                <div >
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <div>{task.status}</div>
                    <div>{task.createdAt}</div>
                    <button onClick={() => handleRemove(task.id)}>Elimina Task</button >
                </div>
            }

        </>

    )
}