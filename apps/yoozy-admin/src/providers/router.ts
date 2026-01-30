import { createBrowserRouter, redirect } from "react-router";
import RootLayout from "@/pages/root";
import Inspiration from "@/pages/inspiration";
import Templates from "@/pages/templates";
import Prompts from "@/pages/prompt";
import UserList from "@/pages/users";
import FeedbackList from "@/pages/users/Feedback";
import AssetList from "@/pages/assets";
import AssetDetail from "@/pages/assets/Detail";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [

            {
                path: "/",
                children: [
                    {
                        path: "/",
                        loader: () => redirect("/templates")
                    },
                    {
                        path: "/templates",
                        Component: Templates
                    }
                ]
            },
            {
                path: "/",
                Component: null,
                children: [{ path: "/inspiration", Component: Inspiration }]
            },
            {
                path: "/",
                Component: null,
                children: [
                    {
                        path: "/prompts", Component: Prompts,
                    }
                ]
            },
            {
                path: "/",
                Component: null,
                children: [
                    {
                        path: "/users", Component: UserList,
                    },
                    {
                        path: "/feedbacks", Component: FeedbackList,
                    },
                    {
                        path: "/user-assets", Component: AssetList,
                    },
                    {
                        path: "/user-assets/:id", Component: AssetDetail,
                    }
                ]
            }
        ]
    }
]);
