import React, { useState } from "react";
import Title from "../../../components/title/title";
import { Table } from "react-bootstrap";
import Paginate from "../../../components/pagination/pagination";
import * as AiIcons from "react-icons/ai";
import ListHook from "../../../utils/hooks/list.hook";
import { pageCount } from "../../../services/API";
import DeleteConfirmModal from '../../../components/delete-confim/delete-confirm.component';
import { IBroker } from "../models/broker.model";
import BrokerListProps from "./hooks/broker-list.hook";
import AddEditBroker from "../add-edit-broker/add-edit-broker";
import { deleteBroker } from "../slice/broker.slice";

function BrokerList() {
    const {
        page,
        setPage,
        query,
        search,
        setSearch,
        navigate,
        dispatch,
        params,
        editItem,
        modalShow,
        handleClose,
        handelOpenDeleteConfirmModal,
        handleCloseDeleteModal,
        handleDeleteItem,
        deleteModalShow,
        handleSave,
        setModalShow,
        openModalForEditItem
    } = ListHook<IBroker>();
    const {
        brokers,
        count,
        handleGetBrokerList,
        handlePageClick,
        title,
        goToViewPage
    } = BrokerListProps(query, setSearch, setPage, search, dispatch, navigate, params);

    return (
        <div>
            <Title title={title} isShowAdd={true} setModalShow={setModalShow} />

            {!!brokers?.length && <Table className='mt-2' striped bordered hover>
                <thead>
                    <tr>
                        <th>N</th>
                        <th>Կազմակերպություն</th>
                        <th>ՀՎՀՀ</th>
                        <th>Էլ․հասցե</th>
                        <th>Հեռ․</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {brokers.map((user: IBroker, ind: number) => {
                        return (
                            <tr key={user.id}>
                                <td>{(ind + 1) + ((page - 1) * pageCount)}</td>
                                <td>{user.organization_name}</td>
                                <td>{user.hvhh}</td>
                                <td>{user.email}</td>
                                <td>{user.phone_number}</td>
                                <td><span onClick={() => { openModalForEditItem(user) }} className='action-btn'><AiIcons.AiOutlineEdit /> </span></td>
                                <td><span onClick={() => handelOpenDeleteConfirmModal(user.id!)} className='action-btn red'><AiIcons.AiOutlineDelete /> </span></td>
                                <td><span onClick={() => { goToViewPage(user.id!) }} className='action-btn'><AiIcons.AiOutlineEye /> </span></td>

                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            }
            {!!brokers?.length && <Paginate page={page} handlePageClick={handlePageClick} count={Math.ceil(count! / pageCount)} />}
            {<DeleteConfirmModal
                text='Դուք ցանկանու՞մ եք ջնջել այս հաշվապահին'
                show={deleteModalShow}
                handleClose={handleCloseDeleteModal}
                onSave={() => handleDeleteItem(brokers!, handleGetBrokerList, handlePageClick, deleteBroker)}
            />}
            <AddEditBroker
                editItem={editItem}
                show={modalShow}
                onHide={handleClose}
                onSave={(evt: any) => handleSave(evt, handleGetBrokerList, handlePageClick)}
            />
        </div>
    )
}
export default BrokerList;