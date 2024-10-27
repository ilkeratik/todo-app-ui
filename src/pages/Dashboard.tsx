import { Button, Col, Container, Row } from "react-bootstrap";
import { useToDo } from "../modules/todo-context/ToDoContext";
import ToDoList from "./todo/ToDoList";

const Dashboard = () => {

    const { setShowModal, setCurrentAction } = useToDo();
    return (
        <Container fluid>
            <Row className="text-dark">
                <Col>
                    <div className="">
                        <h3>To Do</h3>
                    </div>
                    <ToDoList />
                    <Button onClick={() => {
                        setCurrentAction("create");
                        setShowModal(true)
                    }}>Create New To Do</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;