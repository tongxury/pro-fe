import {EmbeddedCheckout, EmbeddedCheckoutProvider} from '@stripe/react-stripe-js';
import {loadStripe, Appearance} from '@stripe/stripe-js';
import {getPaymentClientSecret} from "@/api/api.ts";
import {useSearchParams} from "react-router";
import {useXTheme, XFlex} from "@pro/ui";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useRouter} from "@/hooks/useRouter.tsx";

export default function Checkout() {

    const router = useRouter()

    const {themeVars} = useXTheme()
    const [searchParams, setSearchParams] = useSearchParams()

    // 将 appearance 配置传递给 loadStripe
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

    const fetchClientSecret = async () => {
        const t = await getPaymentClientSecret({
            level: searchParams?.get("level"),
            cycle: searchParams?.get("cycle"),
            successUrl: searchParams.get("returnUrl"),
            cancelUrl: searchParams.get("returnUrl"),
        })

        return t.data?.clientSecret;
    }

    return (
        <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{
                fetchClientSecret,
                onComplete: () => {
                    console.log("onComplete");
                    // if (searchParams.get("returnUrl")) {
                    //     window.location.href = searchParams.get("returnUrl");
                    // }

                }
            }}>
            <div style={{background: 'white', height: '100vh'}}>
                <XFlex style={{height: 70, paddingInline: 20}} align={'center'}>
                    <XFlex align={'center'} gap={10} onClick={() => router.back()} style={{cursor: 'pointer'}}>
                        <ArrowLeftOutlined/>
                        返回
                    </XFlex>
                </XFlex>
                <EmbeddedCheckout className={'stripe-checkout-container'}/>
            </div>
        </EmbeddedCheckoutProvider>
    );
}
