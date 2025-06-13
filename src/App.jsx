import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

//pages
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"

//context
import GlobalContext from "./contexts/GlobalContext"


function App() {
	const apiUrl = import.meta.env.VITE_APP_URL_API;

	const [task, setTask] = useState([])

	async function fetchData() {
		const res = await fetch(`${apiUrl}/tasks`)
		const data = await res.json()
		setTask(data)
	}

	useEffect(() => { fetchData }, [])

	console.log(task);

	return (
		<>
			<GlobalContext.Provider value={[task, setTask]}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<TaskList />} />
						<Route path="/add-task" element={<AddTask />} />

					</Routes>
				</BrowserRouter>

			</GlobalContext.Provider>
		</>
	)
}

export default App