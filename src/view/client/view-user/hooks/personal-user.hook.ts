import { useEffect, useState } from "react";
import { getUserDetails } from "../../slice/client.slice";

function PersonalUserHook<B>(params: any, dispatch: any) {
    const [user, setUser] = useState({} as B);
    useEffect(() => {
        if (!!params?.id) {
            dispatch(getUserDetails(+params!.id!)).then((data: any) => {
                setUser(data.payload);
            });
        }
    }, [params.id]);
    return {
        user,
        paramsId: params.id
    }
}
export default PersonalUserHook;