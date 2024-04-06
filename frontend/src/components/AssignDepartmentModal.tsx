
"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

const AssignDepartmentModal: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState("");

     const handleSendEmail = async () => {
        console.log(email);
        // send email logic with mailjet api
            

    }

    return (
        <>
            <Button color="purple" onClick={() => setOpenModal(true)}>Assign Department</Button>
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Assign Departments</Modal.Header>
                <Modal.Body className="flex">
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button color="purple" onClick={handleSendEmail}>Send Email</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="purple" onClick={() => setOpenModal(false)}>I accept</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AssignDepartmentModal;