import { BrowserRouter, Routes, Route } from "react-router-dom"

//pages
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"


function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<TaskList />} />
					<Route path="/add-task" element={<AddTask />} />

				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App