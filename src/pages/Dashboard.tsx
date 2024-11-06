import { Button, Col, Container, Row } from "react-bootstrap";
import { useToDo } from "../modules/todo-context/ToDoContext";
import ToDoList from "./todo/ToDoList";

const Dashboard = () => {

    const { setShowModal, setCurrentAction } = useToDo();
    return (
        <Container fluid>
            <h2 className="text-dark border-bottom pb-2">Dashboard</h2>
            <Row className="text-dark">
                <Col>
                    <ToDoList />
                </Col>

            </Row>
            <Button
                className="bg-success px-4 py-3"
                style={{ fontWeight: 'bold', position: 'fixed', bottom: '20px', right: '48%', borderRadius: '1rem' }}
                onClick={() => {
                    setCurrentAction("create");
                    setShowModal(true);
                }}
            >
                + New To Do
            </Button>
        </Container>
    );
};

export default Dashboard;