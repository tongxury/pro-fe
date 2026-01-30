import {useNavigate} from "react-router";
import {useTranslation as useTranslations} from "@/hooks/useTranslation.ts";


export const useRouter = () => {

    const navigate = useNavigate()

    return {
        push: (key: string) => navigate(key),
    }
}


export const useTranslation = () => useTranslations()

