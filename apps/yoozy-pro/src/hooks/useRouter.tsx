import {useNavigate} from "react-router";

export const useRouter = () => {

    const navigate = useNavigate();

    return {
        push: (path: string) => {
            navigate(path);
        },
        back: () => navigate(-1),

    }
}
