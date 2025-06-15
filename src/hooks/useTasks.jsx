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
    async function addTask(obj) {
        try {
            const response = await fetch(`${apiUrl}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            });

            const data = await response.json();

            if (data.success === false) return console.error(data.message);

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    function removeTask() { }
    function updateTask() { }

    return { tasks, setTasks, addTask, removeTask, updateTask }
}