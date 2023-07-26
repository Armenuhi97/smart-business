import React from "react";
import ListHook from "../../../../../utils/hooks/list.hook";
import { IOrganization } from "./model/organozation.model";
import OrganizationProps from "./hooks/organization.hook";
import { Table } from "react-bootstrap";
import { pageCount } from "../../../../../services/API";
import Paginate from "../../../../../components/pagination/pagination";
import DeleteConfirmComponent from "../../../../../components/delete-confim/delete-confirm.component";
import Title from "../../../../../components/title/title";
import AddEditOrganization from './component/add-edit-organization';
import * as AiIcons from "react-icons/ai";

function OrganizationList() {
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
    } = ListHook<IOrganization>();
    const {
        organizations,
        count,
        handleGetOrganizationList,
        handlePageClick,
        goToOrganizationPage,
        deleteOrganization
    } = OrganizationProps(query, setSearch, setPage, search, dispatch, navigate, params);

    return (
        <div>
            <Title title='Կազմակերպություններ' isShowAdd={true} setModalShow={setModalShow} />

            {!!organizations?.length && <Table className='mt-2' striped bordered hover>
                <thead>
                    <tr>
                        <th>N</th>
                        <th>ԱՆուն</th>
                        <th>ՀՎՀՀ</th>
                        <th></th>
                        <th></th>
                        {/* <th></th>
                        <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {organizations.map((organization: IOrganization, ind: number) => {
                        return (
                            <tr key={organization.id}>
                                <td>{(ind + 1) + ((page - 1) * pageCount)}</td>
                                <td>{organization.name}</td>
                                <td>{organization.hvhh}</td>
                                <td><div onClick={() => { openModalForEditItem(organization) }} className='action-btn'><AiIcons.AiOutlineEdit /> </div></td>

                                <td></td>
                                {/* <td><span onClick={() => { goToUserPage(user) }} className='action-btn'><AiIcons.AiOutlineEdit /> </span></td>
                                <td><span onClick={() => handelOpenDeleteConfirmModal(user.id!)} className='action-btn red'><AiIcons.AiOutlineDelete /> </span></td> */}

                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            }
            {!!organizations?.length && <Paginate page={page} handlePageClick={handlePageClick} count={Math.ceil(count / pageCount)} />}
            <DeleteConfirmComponent
                show={deleteModalShow}
                handleClose={handleCloseDeleteModal}
                onSave={() => handleDeleteItem(organizations, handleGetOrganizationList, handlePageClick, deleteOrganization)}
            />
            <AddEditOrganization
                editItem={editItem}
                show={modalShow}
                onHide={handleClose}
                onSave={(evt: any) => handleSave(evt, handleGetOrganizationList, handlePageClick)}
            />
        </div>
    )
}
export default OrganizationList;