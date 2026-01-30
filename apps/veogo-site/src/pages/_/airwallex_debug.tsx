/**
 * hpp.tsx
 * Airwallex Payment Demo - React Typescript.
 *
 * airwallex-payment-elements Hosted Payment Page integration in React Typescript
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/hpp.md
 */

import React, {useCallback, useEffect} from 'react';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import {init} from '@airwallex/components-sdk';
import {v4 as uuid} from 'uuid';
import {createPaymentIntent} from './util';

export const Index: React.FC = () => {

    const redirectHppForCheckout = useCallback(async (intentId: string, clientSecret: string, currency: string) => {
        const {payments} = await init({
            env: 'demo',
            enabledElements: ['payments'],
        });
        payments?.redirectToCheckout({
            mode: 'payment',
            currency,
            intent_id: intentId, // Required, must provide intent details
            client_secret: clientSecret, // Required
            // Customize the visual appearance of the HPP, more information can be found: https://www.airwallex.com/docs/js/payments/hosted-payment-page/#properties-appearance
            appearance: {
                mode: 'light', // choose between 'dark' and 'light'
            },
            recurringOptions: {
                card: {
                    next_triggered_by: 'customer',
                    merchant_trigger_reason: 'scheduled',
                    currency,
                },
            },
            successUrl: `${window.location.origin}/checkout-success`,
            // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#redirectToCheckout
        });
    }, []);

    const redirectHppForRecurring = useCallback(async (intentId: string, clientSecret: string, currency: string) => {
        const {payments} = await init({
            env: 'prod',
            enabledElements: ['payments'],
        });
        payments?.redirectToCheckout({
            mode: 'recurring',
            currency,
            intent_id: intentId,
            client_secret: clientSecret, // Required
            recurringOptions: {
                card: {
                    next_triggered_by: 'customer',
                    merchant_trigger_reason: 'scheduled',
                    currency,
                },
            },
            // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#redirectToCheckout
        });
    }, []);

    const redirectHpp = useCallback(
        (intentId: string, clientSecret: string, currency: string) => {
            try {
                // redirectHppForCheckout(intentId, clientSecret, currency);
                redirectHppForRecurring(intentId, clientSecret, currency);
            } catch (error) {
                console.error(error);
            }
        },
        [redirectHppForCheckout, redirectHppForRecurring],
    );

    const handleCheckout = useCallback(
        async (product: {
            url: string;
            name: string;
            desc: string;
            unit_price: number;
            currency: string;
            quantity: 1
        }) => {
            try {
                // STEP #3: Initialize Airwallex on click with appropriate production environment and other configurations
                // await init({
                //     env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
                //     enabledElements: ['payments'],
                // });
                // // STEP #4: create payment intent
                // const intent = await createPaymentIntent({
                //     request_id: uuid(),
                //     merchant_order_id: uuid(),
                //     amount: product.unit_price * product.quantity,
                //     currency: product.currency,
                //     order: {
                //         products: [product],
                //     },
                // });
                // const { id, client_secret, currency } = intent || {};


                const id = "int_hkpdmzfqfh8omhldz1a"
                const client_secret = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NTEwMTc4MzUsImV4cCI6MTc1MTAyMTQzNSwidHlwZSI6ImNsaWVudC1zZWNyZXQiLCJwYWRjIjoiSEsiLCJhY2NvdW50X2lkIjoiZWI0OGY1ZTYtNjdmZS00NmU5LTg4NTAtMjYyOWFmMjVjNTIwIiwiaW50ZW50X2lkIjoiaW50X2hrcGRtemZxZmg4b21obGR6MWEiLCJjdXN0b21lcl9pZCI6ImN1c19oa3BkbnI0dHJoNmRta251ZWpkIiwiYnVzaW5lc3NfbmFtZSI6IlR1dG9yZHVjayBMaW1pdGVkIn0.xbVIvTQ8A4oGSYGHAS-pyZ7CpIByvAL2qSsucGUMTaQ"
                const currency = "cny"
                // STEP #5: Add a button handler to trigger the redirect to HPP
                redirectHpp(id, client_secret, currency);
            } catch (error) {
                console.error(error);
            }
        },
        [redirectHpp],
    );

    useEffect(() => {
        handleCheckout({
            url: 'https://via.placeholder.com/503x570',
            name: 'Sample product',
            desc: 'Example product',
            unit_price: 68,
            currency: 'USD',
            quantity: 1,
        });
    }, [handleCheckout]);

    return <div></div>;
};

export default Index;
