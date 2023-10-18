import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import useQuery from "../use-query.params";
import { IDelete } from "../../models/action.model";

export function ListHook<T>() {
    const query = useQuery();
    const params = useParams();
    const [page, setPage] = useState<number>(1);
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
    const [deleteItemId, setDeleteItemId] = useState<string | number | null>(null);
    const [editItem, setEditItem] = useState<T | null>(null);
    const [search, setSearch] = useState<string>('');


    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSave = useCallback((evt: { isEdit: boolean }, getList: (page: number) => void, handlePageClick: (e: any) => void) => {
        setEditItem(null);
        if (evt.isEdit) {
            getList(page);
        } else {
            if (page !== 1) {
                handlePageClick({ selected: 0 });
            } else {
                getList(page);
            }
        }
        setModalShow(false);
    }, [page]);
    // [page, search]
    const handleClose = useCallback(() => {
        setEditItem(null);
        setModalShow(false);
    }, []);


    const handleCloseDeleteModal = useCallback(() => {
        setDeleteItemId(null);
        setDeleteModalShow(false);
    }, []);

    const handleDeleteItem = useCallback((items: T[], getList: (page: number) => void, handlePageClick: (e: any) => void, data: any) => {
        const deleteParams: IDelete = {
            id: deleteItemId!,
            page,
            deleteSuccessfully: items.length === 1 && page !== 1 ? (page) => handlePageClick({ selected: page - 2 }) : (page) => getList(page)
        };
        handleCloseDeleteModal();
        dispatch(data(deleteParams))
    }, [page, deleteItemId])

    const handelOpenDeleteConfirmModal = (id: string | number) => {
        setDeleteItemId(id);
        setDeleteModalShow(true);
    }
    const openModalForEditItem = (item: T) => {
        setEditItem(item);
        setModalShow(true);
    }
    return {
        page,
        setPage,
        query,
        modalShow,
        setModalShow,
        deleteModalShow,
        editItem,
        search,
        setSearch,
        navigate,
        dispatch,
        handleSave,
        handleClose,
        handleCloseDeleteModal,
        handleDeleteItem,
        handelOpenDeleteConfirmModal,
        openModalForEditItem,
        params
    }
}
export default ListHook;