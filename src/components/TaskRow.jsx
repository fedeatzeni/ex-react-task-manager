import React from "react";
import { Link } from "react-router-dom";

const Card = React.memo(({ task, color }) => {
    // console.log("Render");
    return (
        <Link to={`/task/${task.id}`} className={`task-row ${color}`} >
            <div className="name">{task.title}</div>
            <div>{task.status}</div>
            <div>{new Date(task.createdAt).toLocaleDateString()}</div>
        </Link>
    )
});

export default function TaskRow({ task }) {

    let color = ""
    if (task.status === "To do") color = "red"
    else if (task.status === "Doing") color = "yellow"
    else if (task.status === "Done") color = "green"

    return (
        <Card task={task} color={color} />
    )
}