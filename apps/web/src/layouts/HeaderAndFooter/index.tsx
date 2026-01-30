import React, { ReactNode } from "react";
import styles from "./index.module.scss";
import Header from "../../components/Header";
import { useRequest } from "ahooks";
import { fetchUserDetail } from "@/api/api";

export default function Layout({ children }: { children: ReactNode }) {
    const { data, loading } = useRequest(fetchUserDetail);

    return (
        <div className={styles.container}>
            {/* <Flex align={'center'} justify={'space-between'} style={{paddingInline: 30, paddingBlock: 15}}>
            <Flex gap={10}>
                <Image alt={''} src={logo} width={30}/>
                <T bold size={20}>{appName}</T>
            </Flex>
            <LocaleSelector/>
        </Flex> */}
            <Header showLocales showLogin showAd userInfo={data?.data} />
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: 30
                }}
            >
                {children}
            </div>
        </div>
    );
}
