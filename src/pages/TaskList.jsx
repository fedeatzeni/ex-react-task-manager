import { useContext, useMemo, useState } from "react"
import GlobalContext from "../contexts/GlobalContext"

import NavBar from "../components/NavBar"
import TaskRow from "../components/TaskRow";
import useTasks from "../hooks/useTasks";

export default function TaskList() {

    // const [tasks] = useContext(GlobalContext);
    const { tasks } = useTasks()
    // console.log(tasks);

    //sort
    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, SetSortOrdere] = useState(1)

    function handleSort(value) {
        if (sortBy === value) SetSortOrdere(sortOrder * -1)
        else setSortBy(value)
    }
    // console.log(sortBy, sortOrder);

    const sort = useMemo(() => {

        if (sortBy === "title") {
            tasks.sort((a, b) => {
                return a.title.localeCompare(b.title) * sortOrder;
            });
        }

        if (sortBy === "status") {
            tasks.sort((a, b) => {
                const statusOrder = ["To do", "Doing", "Done"];
                const indexA = statusOrder.indexOf(a.status);
                const indexB = statusOrder.indexOf(b.status);
                return (indexA - indexB) * sortOrder;
            });
        }

        if (sortBy === "createdAt") {
            tasks.sort((a, b) => {
                return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder;
            });
        }

    }, [tasks, sortBy, sortOrder])


    return (
        <>
            <NavBar />
            <div className={`task-row`} >
                <div className="name" onClick={() => handleSort("title")}>Titolo</div>
                <div onClick={() => handleSort("status")}>Stato</div>
                <div onClick={() => handleSort("createdAt")}>Data di creazione</div>
            </div>
            <div>
                {tasks.map(task => (
                    <TaskRow key={task.id} task={task} />
                ))}
            </div>
        </>
    )
}
