import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../models/user.model";

function PersonalUserHook() {

    const params = useParams();
    // const user = useAppSelector((state) => state.userById.user);
    const navigate = useNavigate();
    const [user, setUser] = useState({} as IUser);
    useEffect(() => {
        if (!!params?.id) {
            // dispatch(getUserById(+params!.id!)).then((data: any) => {
            //     setUser(data.payload.user);
            // });
        }
    }, [params.id]);
    return {
        user
    }
}
export default PersonalUserHook;