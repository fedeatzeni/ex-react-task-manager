import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import useTasks from "../hooks/useTasks";
import { useMemo, useState } from "react";

export default function TaskDetail() {

    const { tasks } = useTasks()

    // id dall'url
    const { id } = useParams();

    const task = useMemo(() => {
        return tasks.find(el => el.id == id)
    }, [tasks, id])


    return (
        <>
            <Link to={"/"}>Home</Link>

            {task &&
                <div >
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <div>{task.status}</div>
                    <div>{task.createdAt}</div>
                    <button onClick={() => console.log("Elimino task")}>Elimina Task</button>
                </div>
            }
        </>

    )
}