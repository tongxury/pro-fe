import {useXTheme, XFlex, XText} from "@pro/ui";
import {formatTime} from "@pro/hooks";
import {CSSProperties, useEffect, useState} from "react";
import {EventSourceMessage, fetchEventSource} from "@microsoft/fetch-event-source";
import {getAuthToken} from "@/utils";
import AnswerView from "@/components/Question/V2/AnswerView";
import {useGlobalState} from "@/hooks/global";
import Waiting from "@/components/Question/V2/Waiting";
import {getPrompt} from "@/constants/prompt.tsx";

const GeneratingView = ({data, onComplete}: { data: any, onComplete: () => void }) => {
    const {themeVars} = useXTheme();

    const {mutateUser} = useGlobalState()
    const styles = {
        container: {
            padding: 5,
            backgroundColor: themeVars.colorBgL2,
            borderRadius: '8px',
            marginBottom: '24px',
            border: `1px solid ${themeVars.colorBorder}`,
            display: 'flex',
            flexDirection: 'column',
        } as CSSProperties,
        questionHeader: {
            marginBottom: '16px',
        } as CSSProperties,
        questionId: {
            fontSize: '16px',
            color: themeVars.colorTextPrimary,
            marginBottom: '8px',
        } as CSSProperties,
        questionTitle: {
            color: themeVars.colorTextPrimary,
            fontSize: '18px',
            fontWeight: 600,
        } as CSSProperties,
        questionText: {
            color: themeVars.colorTextL1,
            marginTop: '8px',
        } as CSSProperties,
    };

    // const [lastChunkId, setLastChunkId] = useLocalStorageState('lastChunkId_' + data?._id)
    // const [chunks, {loading}] = useListQuestionAnswerChunks({questionId: data?._id})

    const [text, setText] = useState('')

    useEffect(() => {

        const ctrl = new AbortController();

        fetchEventSource(`${import.meta.env.VITE_API_URL}/api/ag/v1/answer-chunks-stream`, {
            method: "POST",
            body: JSON.stringify({
                questionId: data?._id,
                // lastChunkId: lastChunkId,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: getAuthToken() as any,
            },
            onopen: async (response) => {
                console.log('onopen', response);
            },
            onmessage: (ev: EventSourceMessage) => {
                console.log('onmessage', ev);
                const obj = JSON.parse(ev.data);
                if (obj.data) {
                    setText(prevState => prevState + obj.data);
                }
            },
            onerror: (err) => {
                console.log('onerror', err);
            },
            onclose: () => {
                console.log('EventSource connection closed');
                mutateUser()
                onComplete()
            },
            openWhenHidden: true,
            signal: ctrl.signal,
        }).then();

    }, [])


    return (
        <XFlex vertical style={styles.container}>
            <XFlex align={'center'} justify={'space-between'} style={{padding: 10}}>
                <XText style={{}} size={20} color={themeVars.colorPrimary}>
                    {data?.prompt?.id ? getPrompt(data?.prompt?.id)?.text : data?.prompt?.content}
                </XText>

                <XText style={styles.questionId}>
                    {formatTime(data?.createdAt)}
                </XText>
            </XFlex>
            {
                (!data.text && !text) ?
                    <Waiting onComplete={onComplete}/> :

                    <AnswerView data={{...data?.answer, text}} generating/>
            }
        </XFlex>
    );
};

export default GeneratingView;
