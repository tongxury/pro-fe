import {createBrowserRouter} from "react-router";
import HomeLayout from "@/pages/home/layout";
import Home from "@/pages/home";
import RootLayout from "@/pages/root";
import SceneLayout from "@/pages/scene/layout.tsx";
import Scene from "@/pages/scene/starter";
import Session from "@/pages/scene/session.tsx";
import AboutUs from "@/pages/_/aboutUs.tsx";
import Privacy from "@/pages/_/privacy.tsx";
import Terms from "@/pages/_/terms.tsx";
import Debug from "@/pages/_/airwallex_debug.tsx";
import Error from "@/pages/_/error.tsx";
import {createElement} from "react";
import Checkout from "@/pages/checkout";
import Install from "@/pages/_/install.tsx";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        // errorElement: createElement(Error),
        children: [
            {
                // index: true,
                path: '/',
                Component: HomeLayout,
                children: [
                    {path: "/", Component: Home},
                ]
            },

            {
                path: '/',
                Component: SceneLayout,
                children: [
                    {path: "/scenes/:scene", Component: Scene},
                    {path: "/scenes/:scene/sessions/:sessionId", Component: Session},
                ]
            },
            {
                path: '/checkout',
                Component: Checkout,
            },
            {
                path: '/install',
                Component: Install,
            },
            {
                path: '/aboutUs',
                Component: AboutUs,
            },
            {
                path: '/privacy',
                Component: Privacy,
            },
            {
                path: '/terms',
                Component: Terms,
            },
            // {
            //     path: '/for__debug',
            //     Component: Debug,
            // }
        ]
    }
])
