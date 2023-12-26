import { Button, Modal } from "react-bootstrap"
import React from 'react';

function ModalContent(props: any) {
    return (
        <Modal
            show={props.show} onHide={props.handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props?.children ? props.children : ''}
            </Modal.Body>
            {!props?.isShowFooter && <Modal.Footer>
                <Button onClick={props.onSave}>{props.saveButtonText ? props.saveButtonText : 'Պահպանել'}</Button>
                <Button variant="secondary" onClick={props.handleClose}>Փակել</Button>
            </Modal.Footer>}
        </Modal>
    )
}

export default ModalContent;