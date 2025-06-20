import { useCallback, useContext, useMemo, useState } from "react"
import GlobalContext from "../contexts/GlobalContext"

import NavBar from "../components/NavBar"
import TaskRow from "../components/TaskRow";
import useTasks from "../hooks/useTasks";
import { Link } from "react-router-dom";

// debounce
function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
}

export default function TaskList() {

    // const [tasks] = useContext(GlobalContext);
    const { tasks } = useTasks()
    // console.log(tasks);

    //sort
    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, SetSortOrdere] = useState(1)

    //search
    const [searchQuery, setSearchQuery] = useState("")

    function handleSort(value) {
        if (sortBy === value) SetSortOrdere(sortOrder * -1)
        else setSortBy(value)
    }
    // console.log(sortBy, sortOrder);

    const filtredTasks = useMemo(() => {
        let result = [...tasks];

        if (searchQuery !== "") {
            result = result.filter(el =>
                el.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                el.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
                el.createdAt.includes(searchQuery)
            );
        }

        result.sort((a, b) => {
            if (sortBy === "title") return a.title.localeCompare(b.title) * sortOrder;

            else if (sortBy === "status") {
                const statusOrder = ["To do", "Doing", "Done"];
                const indexA = statusOrder.indexOf(a.status);
                const indexB = statusOrder.indexOf(b.status);
                return (indexA - indexB) * sortOrder;
            }

            else if (sortBy === "createdAt") return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder;
        });

        return result;
    }, [tasks, sortBy, sortOrder, searchQuery])

    const debounceSearch = useCallback(debounce(setSearchQuery, 500), [])

    return (
        <>
            <NavBar />
            <main>
                <h1>Lista Task</h1>

                <input type="text" placeholder="Cerca..." onChange={e => debounceSearch(e.target.value)} />
                <div className="tb">
                    <div className={`task-row`} >
                        <Link className="name" onClick={() => handleSort("title")}>Titolo</Link>
                        <Link onClick={() => handleSort("status")}>Stato</Link>
                        <Link onClick={() => handleSort("createdAt")}>Data di creazione</Link>
                    </div>
                    <div>
                        {filtredTasks.map(task => (
                            <TaskRow key={task.id} task={task} />
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}
