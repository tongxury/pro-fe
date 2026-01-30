"use client";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { fetchUserDetail } from "@/api/api";
import Boarding from "@/pages_/Onboarding/components/boarding";
import { useRouter } from "@/navigation";

const Onboarding = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [authed, setAuthed] = useState(false);
    const [data, setData] = useState();

    // const {locale} = useParams()

    useEffect(() => {
        fetchUserDetail().then((resp) => {
            console.log("resp", resp);

            if (resp?.code && resp?.code > 0) {
                router.push(`/login`);
            } else {
                setAuthed(true);
                setLoading(false);
                setData(resp?.data);
            }
        });
    }, []);

    return (
        <Spin spinning={loading} style={{ height: "100vh" }}>
            {data && <Boarding data={data} />}
        </Spin>
    );
};

export default Onboarding;
