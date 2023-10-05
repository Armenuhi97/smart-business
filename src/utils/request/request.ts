import API, { pageCount } from "../../services/API";

export async function getRoleRequest(data: any, roleId: number) {
    return await API.get(`user-detail/?role=${roleId}`,
        {
            params: {
                // skip: data.isAll ? 0 : (data!.page! - 1) * 10,
                // take: data.isAll ? 100 : pageCount,
                limit: pageCount,
                offset: (data.page - 1) * 100
                // query: data.query,
                // role: data.roleId
            }
        })
}