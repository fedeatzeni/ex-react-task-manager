import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

//pages
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"
import TaskDetail from "./pages/TaskDetail"

//context
import GlobalContext from "./contexts/GlobalContext"

//hooks
import useTasks from "./hooks/useTasks"

function App() {

	const { tasks, addTask, removeTask, updateTask } = useTasks()

	return (
		<>
			<GlobalContext.Provider value={[tasks]}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<TaskList />} />
						<Route path="/add-task" element={<AddTask />} />

						<Route path="/task/:id" element={<TaskDetail />} />
					</Routes>
				</BrowserRouter>

			</GlobalContext.Provider>
		</>
	)
}

export default App