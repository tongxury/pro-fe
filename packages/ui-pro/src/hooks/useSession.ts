import { useState } from "react";
// import {ObjectId} from "mongodb"
// import {v4 as uuid} from "uuid"

function generateObjectId() {
    let timestamp = Math.floor(Date.now() / 1000).toString(16); // 获取当前时间戳并转换为十六进制
    let randomBytes = ((Math.random() * 0xffffff) | 0).toString(16).padStart(8, "0"); // 生成6个随机的十六进制数字
    let counter = ((Math.random() * 0xffffff) | 0).toString(16).padStart(8, "0"); // 生成6个随机的十六进制数字（模拟计数器）

    return timestamp + randomBytes + counter; // 拼接生成 ObjectId
}

function useSession() {
    // const [sessionId, setSessionId] = useState(uuid())
    const [sessionId, setSessionId] = useState(generateObjectId());

    const refresh = () => {
        // setSessionId(uuid())
        setSessionId(generateObjectId());
    };

    return {
        sessionId,
        refresh,
        set: (sessionId: string) => setSessionId(sessionId)
    };
}

export default useSession;
