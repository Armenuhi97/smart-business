import React from "react";
import { Button } from "react-bootstrap";
interface TitleProps {
    title: string;
    setModalShow?: (evt: boolean) => void;
    addTitle?: string;
    isShowAdd?: boolean;
}
function Title({ title, setModalShow, addTitle, isShowAdd = true }: TitleProps) {
    return (
        <div className="d-flex align-items-center justify-content-between" >
            <h1>{title}</h1>
            {isShowAdd && <Button variant="primary" onClick={() => setModalShow!(true)}>
                {addTitle}
            </Button>}
        </div>
    )
}
export default Title;