/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly PACKAGE_VERSION: string;
    readonly VITE_ENV: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
