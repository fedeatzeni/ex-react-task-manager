import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

import useTasks from "../hooks/useTasks";
import { useMemo, useState } from "react";

import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {

    //modal
    const [show, setShow] = useState(false)
    const [editShow, setEditShow] = useState(false)

    const { tasks, setTasks, removeTask, updateTask } = useTasks()

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

    async function handleEdit(updatedTask) {
        try {
            await updateTask(updatedTask);

            setTasks(prev =>
                prev.map(task =>
                    task.id === updatedTask.id ? updatedTask : task
                )
            );

            setEditShow(false);
            alert("Task modificata con successo");
        } catch (error) {
            alert("Errore nella modifica: " + error.message);
        }
    }

    return (
        <>
            <Link to={"/"}>Home</Link>

            {task &&
                <>
                    <div >
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <div>{task.status}</div>
                        <div>{task.createdAt}</div>
                        <button onClick={() => setShow(true)}>Elimina Task</button >
                        <button onClick={() => setEditShow(true)}>Modifica Task</button >
                    </div>

                    <Modal
                        show={show}
                        onClose={() => setShow(false)}
                        title={"Elimina la Task"}
                        onConfirm={() => handleRemove(task.id)}
                        content={"Vuoi davvero eliminare la Task?"}
                    />

                    <EditTaskModal
                        show={editShow}
                        onClose={() => setEditShow(false)}
                        onSave={handleEdit}
                        task={task}
                    />
                </>
            }
        </>

    )
}