import React, { useState } from "react";
import Title from "../../../components/title/title";
import { Table } from "react-bootstrap";
import Paginate from "../../../components/pagination/pagination";
import * as AiIcons from "react-icons/ai";
import ListHook from "../../../utils/hooks/list.hook";
import { pageCount } from "../../../services/API";
import DeleteConfirmModal from '../../../components/delete-confim/delete-confirm.component';
import { deleteLawyer } from "../slice/lawyer.slice";
import { ILawyer } from "../models/lawyer.model";
import LawyerListProps from "./hooks/lawyer-list.hook";
import AddEditLawyer from "../add-edit-lawyer/add-edit-lawyer";

function LawyerList() {
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
    } = ListHook<ILawyer>();
    const {
        lawyers,
        count,
        handleGetLawyerList,
        handlePageClick,
        title,
        goToViewPage
    } = LawyerListProps(query, setSearch, setPage, search, dispatch, navigate, params);

    return (
        <div>
            <Title title={title} isShowAdd={true} setModalShow={setModalShow} />

            {!!lawyers?.length && <Table className='mt-2' striped bordered hover>
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
                    {lawyers.map((user: ILawyer, ind: number) => {
                        return (
                            <tr key={user.id}>
                                <td>{(ind + 1) + ((page - 1) * pageCount)}</td>
                                <td>{user.company_name}</td>
                                <td>{user.tin}</td>
                                <td>{user.user?.email}</td>
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
            {!!lawyers?.length && <Paginate page={page} handlePageClick={handlePageClick} count={Math.ceil(count! / pageCount)} />}
            {<DeleteConfirmModal
                text='Դուք ցանկանու՞մ եք ջնջել այս իրավաբանին'
                show={deleteModalShow}
                handleClose={handleCloseDeleteModal}
                onSave={() => handleDeleteItem(lawyers!, handleGetLawyerList, handlePageClick, deleteLawyer)}
            />}
            <AddEditLawyer
                editItem={editItem}
                show={modalShow}
                onHide={handleClose}
                onSave={(evt: any) => handleSave(evt, handleGetLawyerList, handlePageClick)}
            />
        </div>
    )
}
export default LawyerList;