"use client";

import { Button, Modal, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

const EditMetricModal: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [field, setField] = useState(
        "Percentage of Supplier Facilities in compliance with wastewater discharge permits"
    );
    const [description, setDescription] = useState(
        "Calculate the percentages by dividing the number of supplier facilities (in each respective category) in compliance with wastewater discharge permits or contractual agreements by the total number of supplier facilities (in each respective category)"
    )
    const [file, setFile] = useState<File | null>(null);
    const [isChecked, setIsChecked] = useState(false);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        // console.log(email);
    };

    return (
        <>
            <MdEdit onClick={() => setOpenModal(true)} />
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Edit metric fields</Modal.Header>
                <Modal.Body className="flex">
                    <form className="flex max-w-md flex-col gap-4 w-full mx-auto">
                        <div>
                            <div className="mb-2 block">
                                <Label className="font-bold text-md" value="Field Title" />
                            </div>
                            <TextInput type="field" value={field} required />
                        </div>
                        <div className="mb-2 block">
                            <Label className="font-bold text-md" value="Description" />
                            <Textarea value={description} required />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                            />
                            <Label className="font-bold text-md">Template Required</Label>
                        </div>
                        <div>
                            <input type="file" onChange={handleFileChange} />

                        </div>
                        <div className="mb-2 block">
                            <Label className="font-bold text-md" value="Frequency" />
                            <p className="text-sm">
                                A reminder will be sent to the relevant departments 3 days
                                before the deadline.
                            </p>
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                Monthly
                            </span>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                                Weekly
                            </span>
                            <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                                Custom
                            </span>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="purple"
                        onClick={() => {
                            setOpenModal(false);
                            handleSubmit();
                        }}
                    >
                        Confirm
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditMetricModal;