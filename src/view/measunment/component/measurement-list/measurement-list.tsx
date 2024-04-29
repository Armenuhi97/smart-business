import React from "react";
import { Table } from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import { IMeasurement } from "../../model/measurement.model";
import ListHook from "../../../../utils/hooks/list.hook";
import Title from "../../../../components/title/title";
import { pageCount } from "../../../../services/API";
import { deleteMeasurement } from "../../slice/measurement.slice";
import DeleteConfirmComponent from "../../../../components/delete-confim/delete-confirm.component";
import MeasurementProps from "../../hooks/measurement.hook";
import AddEditMeasurement from "../add-edit-measurement";


function MeasurementList() {
    const {
        page,
        setPage,
        query,
        search,
        setSearch,
        navigate,
        dispatch,
        params,
        modalShow,
        editItem,
        handelOpenDeleteConfirmModal,
        handleCloseDeleteModal,
        handleDeleteItem,
        handleClose,
        handleSave, setModalShow,
        openModalForEditItem,
        deleteModalShow
    } = ListHook<IMeasurement>();
    
    const {
        measurements,
        count,
        handleGetMeasurementList,
        handlePageClick,
    } = MeasurementProps(query, setSearch, setPage, search, dispatch, navigate, params);

    return (
        <div className="w-80 m-auto">
            <Title title='Չափումներ' isShowAdd={true} setModalShow={setModalShow} />

            {!!measurements?.length && <Table className='mt-2'  striped bordered hover>
                <thead>
                    <tr>
                        <th>N</th>
                        <th>Անուն</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {measurements.map((measurement: IMeasurement, ind: number) => {
                        return (
                            <tr key={measurement.id}>
                                <td width={20}>{(ind + 1) + ((page - 1) * pageCount)}</td>
                                <td>{measurement.name}</td>
                                <td width={30}><div onClick={() => { openModalForEditItem(measurement) }} className='action-btn'><AiIcons.AiOutlineEdit /> </div></td>
                                <td width={30}><span onClick={() => handelOpenDeleteConfirmModal(measurement.id!)} className='action-btn red'><AiIcons.AiOutlineDelete /> </span></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            }
            {/* {!!measurement?.length && <Paginate page={page} handlePageClick={handlePageClick} count={Math.ceil(count / pageCount)} />} */}
            <DeleteConfirmComponent
                show={deleteModalShow}
                handleClose={handleCloseDeleteModal}
                onSave={() => handleDeleteItem(measurements, handleGetMeasurementList, handlePageClick, deleteMeasurement)}
            />
            <AddEditMeasurement
                editItem={editItem}
                show={modalShow}
                onHide={handleClose}
                onSave={(evt: any) => handleSave(evt, handleGetMeasurementList, handlePageClick)}
            />
        </div>
    )
}
export default MeasurementList;