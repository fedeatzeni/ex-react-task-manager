import { useEffect, useState } from "react";

export default function useTasks() {

    const apiUrl = import.meta.env.VITE_APP_URL_API;

    const [tasks, setTasks] = useState([])

    async function fetchData() {
        const res = await fetch(`${apiUrl}/tasks`)
        const data = await res.json()
        setTasks(data)
    }

    useEffect(() => { fetchData() }, [])
    // console.log(tasks);


    //functions
    function addTask() { }
    function removeTask() { }
    function updateTask() { }

    return { tasks, setTasks, addTask, removeTask, updateTask }
}