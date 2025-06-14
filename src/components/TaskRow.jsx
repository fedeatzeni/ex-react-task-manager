import React from "react";

const Card = React.memo(({ task, color }) => {
    // console.log("Render");
    return (
        <div className={`task-row ${color}`} >
            <div className="name">{task.title}</div>
            <div>{task.status}</div>
            <div>{task.createdAt}</div>
        </div>
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