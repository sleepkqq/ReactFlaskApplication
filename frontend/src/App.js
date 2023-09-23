import {Routes, Route} from "react-router-dom";
import {Container} from "react-bootstrap"
import {Home} from "./pages/Home";
import {Register} from "./pages/Register";
import {Login} from "./pages/Login";

function App() {
    return (
        <Container>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Container>
    )
}

export default App
