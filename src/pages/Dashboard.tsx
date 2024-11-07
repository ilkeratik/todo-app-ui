import { Button, Col, Container, Row } from "react-bootstrap";
import { useToDo } from "../modules/todo-context/ToDoContext";
import ToDoList from "./todo/ToDoList";

const Dashboard = () => {

    const { setShowModal, setCurrentAction } = useToDo();
    return (
        <Container fluid>
            <h2 className="text-dark border-bottom pb-2 text-center">Dashboard</h2>
            <Row className="text-dark">
                <Col>
                    <ToDoList />
                </Col>

            </Row>
            <Button
                className="bg-success py-3 px-5"
                style={{ fontWeight: 'bold', position: 'fixed', bottom: '20px', right: '40%', borderRadius: '1.25rem' }}
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