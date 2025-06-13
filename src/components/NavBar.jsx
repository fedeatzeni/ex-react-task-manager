import { NavLink } from "react-router-dom"

export default function NavBar() {
    return (
        <nav>
            <NavLink to={"/"}>Task list</NavLink>
            <NavLink to={"/add-task"}>Add task</NavLink>
        </nav>
    )
}