import React from "react";
import { Table } from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import OrganizationProps from "../../hooks/organization.hook";
import Title from "../../../../components/title/title";
import { IOrganization } from "../../model/organozation.model";
import { pageCount } from "../../../../services/API";
import Paginate from "../../../../components/pagination/pagination";
import DeleteConfirmComponent from "../../../../components/delete-confim/delete-confirm.component";
import AddEditOrganization from "../add-edit-organization";
import ListHook from "../../../../utils/hooks/list.hook";
import { deleteOrganization } from "../../slice/organization.slice";


function OrganizationList({ type }: { type:string }) {
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
    } = OrganizationProps(query, setSearch, setPage, search, dispatch, navigate, params, type);

    return (
        <div>
            <Title title='Կազմակերպություններ' isShowAdd={false} setModalShow={setModalShow} />

            {!!organizations?.length && <Table className='mt-2' striped bordered hover>
                <thead>
                    <tr>
                        <th>N</th>
                        <th>Անուն</th>
                        <th>ՀՎՀՀ</th>
                        <th>Հասցե</th>
                        <th>Մենեջեր</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {organizations.map((organization: IOrganization, ind: number) => {
                        return (
                            <tr key={organization.id}>
                                <td>{(ind + 1) + ((page - 1) * pageCount)}</td>
                                <td>{organization.name}</td>
                                <td>{organization.hvhh}</td>
                                <td>{organization.address?.length && organization.address[0].name}</td>
                                <td>{organization.managers?.length &&
                                    <span>{organization.managers[0].user.first_name} {organization.managers[0].user.last_name}</span>}</td>
                                <td><div onClick={() => { openModalForEditItem(organization) }} className='action-btn'><AiIcons.AiOutlineEdit /> </div></td>
                                <td><span onClick={() => handelOpenDeleteConfirmModal(organization.id!)} className='action-btn red'><AiIcons.AiOutlineDelete /> </span></td>
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