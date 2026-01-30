import {useNavigate} from "react-router-dom";


const useAppRouter = () => {

    const navigate = useNavigate()

    const routeTo = (to: string) => {

        if (to.startsWith("http")) {
            window.location.href = to
        } else {
            navigate(to)
        }
    }

    const routeToFollowingManage = () => {
        navigate('/following-manage')
    }
    const routeToProfile = () => {
        navigate('/profile')
    }
    const routeToPasswordSetting = () => {
        navigate('/password-setting')
    }
    const routeToWithdraw = () => {
        navigate('/commission-settlement')
    }
    const routeToWithdrawHistory = () => {
        navigate('/withdrawal-history')
    }
    const routeToExchange = (id?: string) => {
        navigate('/trade?id=' + (id || ''))
    }
    const routeToPoolProfile = (id: string) => {
        navigate('/tokens/' + id)
    }
    const routeToTokenSearch = () => {
        navigate('/token-search')
    }

    return {
        routeTo,
        goBack: () => navigate(-1),
        routeToFollowingManage,
        routeToPasswordSetting,
        routeToProfile,
        routeToWithdrawHistory,
        routeToWithdraw,
        routeToExchange,
        routeToPoolProfile,
        routeToTokenSearch
    }
}

export default useAppRouter;
