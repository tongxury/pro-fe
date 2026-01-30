import {Button, Modal} from "antd";
import React, {useEffect, useState} from "react";
import {useXTheme, XFlex, XText} from "@pro/ui";
import eventBus, {eventTypes} from "@/utils/eventBus";
import {useRouter} from "@/i18n/routing";
import PricingView from "@/components/Pricing/View";
import {getPaymentClientSecret, getPaymentIntent} from "@/api/api.ts";
import ModalOrDrawer from "@/components/ModalOrDrawer";
import {init} from "@airwallex/components-sdk";


const PricingModal = () => {


    const router = useRouter()
    const [open, setOpen] = useState(false);
    const {themeVars} = useXTheme()

    const [plan, setPlan] = useState<any>()
    const [clientSecret, setClientSecret] = useState<any>()

    useEffect(() => {
        eventBus.addListener(eventTypes.OpenPricingModal, () => {
            setOpen(true);
        });
        return () => {
            eventBus.removeAllListeners(eventTypes.OpenPricingModal);
        };
    }, []);


    const onSubmit = async (option: any) => {


        const parts = option.id?.split("-")

        // stripe
        // router.push(`/checkout?level=${parts[0]}&cycle=${parts[1]}&returnUrl=${window.location.href}`)

        // airwallex
        await payByAirwallex(parts[0], parts[1], window.location.href)

        setOpen(false);

    }

    const payByAirwallex = async (level: string, cycle: string, successUrl: string) => {

        const d = await getPaymentIntent({level, cycle, successUrl})
        const {clientSecret, amount, id, currency} = d?.data || {}

        const {payments} = await init({
            env: 'prod',
            enabledElements: ['payments'],
        });
        payments?.redirectToCheckout({
            mode: 'payment',
            currency,
            intent_id: id, // Required, must provide intent details
            client_secret: clientSecret, // Required
            // recurringOptions: {
            //     card: {
            //         next_triggered_by: 'customer',
            //         merchant_trigger_reason: 'scheduled',
            //         currency,
            //     },
            // },
            // theme: {
            //     popupWidth: 418,
            //     popupHeight: 549,
            // },
            successUrl: successUrl,
            // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#redirectToCheckout
        });
    }


    return <>
        <ModalOrDrawer
            onOpenChange={open => setOpen(open)}
            open={open}>

            {/*<StripeView fetchClientSecret={fetchClientSecret}/>*/}
            {/*{*/}
            {/*    plan ? <StripeView fetchClientSecret={fetchClientSecret}/> : <PricingView onSubmit={onSubmit}/>*/}
            {/*}*/}
            <PricingView onSubmit={onSubmit}/>
        </ModalOrDrawer>
    </>;
}

export default PricingModal;
