import {GoogleOAuthProvider} from '@react-oauth/google';


export const GoogleProvider = ({children}: { children: any }) => {

    return <GoogleOAuthProvider clientId={'586460644039-m15fqjeuoo925lk38a9unnnlpav61qk5.apps.googleusercontent.com'}>
        {children}
    </GoogleOAuthProvider>

    // return <> {children}</>
}

