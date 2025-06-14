import { useContext } from "react"
import GlobalContext from "../contexts/GlobalContext"

import NavBar from "../components/NavBar"
import TaskRow from "../components/TaskRow";

export default function TaskList() {

    const [tasks] = useContext(GlobalContext);
    // console.log(tasks);

    return (
        <>
            <NavBar />
            <div>
                {tasks.map(task => (
                    <TaskRow key={task.id} task={task} />
                ))}
            </div>
        </>
    )
}
