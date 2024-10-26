import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CreateToDoModal from "./CreateToDoModal";

const Dashboard = () => {

    const [showModal, setShowModal] = useState(false);
    return (
        <Container fluid>
            <Row className="text-dark">
                <Col md={9} className="ms-sm-auto col-lg-10 px-md-4">
                    <div className="">
                        <h1 >Dashboard</h1>
                    </div>
                    <p>To-do app Ilker</p>

                    <Button onClick={() => setShowModal(true)}>Create To Do</Button>
                    <CreateToDoModal show={showModal} handleClose={function (): void {
                        setShowModal(false);
                    }} />
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;