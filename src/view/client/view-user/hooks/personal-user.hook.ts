import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PersonalUserHook<B>() {

    const params = useParams();
    // const user = useAppSelector((state) => state.userById.user);
    const navigate = useNavigate();
    const [user, setUser] = useState({} as B);
    useEffect(() => {
        if (!!params?.id) {
            // dispatch(getUserById(+params!.id!)).then((data: any) => {
            //     setUser(data.payload.user);
            // });
        }
    }, [params.id]);
    return {
        user,
        paramsId: params.id
    }
}
export default PersonalUserHook;