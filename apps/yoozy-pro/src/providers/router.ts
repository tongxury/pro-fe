import { createBrowserRouter, redirect } from "react-router";
import RootLayout from "@/pages/root";
import Home from "@/pages/home";
import SmartvideoStarter from "@/pages/create/smartvideo/task/starter.tsx";
import SmartvideoLayout from "@/pages/create/smartvideo/layout.tsx";
import Inspiration from "@/pages/inspiration";
import Task from "@/pages/create/smartvideo/task";
import Product from "@/pages/product";
import Asset from "@/pages/asset";
import Login from "@/pages/login/Login.tsx";
import Templates from "@/pages/templates";
import Credit from "@/pages/credit";
import AssetEditorPage from "@/pages/asset/edit";
import AssetDetail from "@/pages/asset/detail/index";
import Support from "@/pages/support";
import CreateLayout from "@/pages/create/layout";
import SegmentReplication from "@/pages/create/segment-replication/index";
import VideoGeneration from "@/pages/create/video-generation";
import TemplateReplication from "@/pages/create/template-replication";
import SessionList from "@/pages/session/List";
import SessionDetail from "@/pages/session/Detail";
import MyAsset from "@/pages/my-asset";
import MyWorkflow from "@/pages/my-workflow";
import WorkflowDetail from "@/pages/my-workflow/Detail";

export const router = createBrowserRouter([
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/support",
        Component: Support
    },
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "create",
                Component: CreateLayout,
                children: [
                    {
                        index: true,
                        loader: () => redirect("/create/template-replication")
                    },
                    {
                        path: "smart-video",
                        Component: SmartvideoLayout,
                        children: [
                            {
                                index: true,
                                loader: () => redirect("/create/smart-video/starter")
                            },
                            {
                                path: "starter",
                                Component: SmartvideoStarter
                            },
                            {
                                path: "tasks/:taskId",
                                Component: Task
                            }
                        ]
                    },
                    {
                        path: "segment-replication",
                        Component: SegmentReplication
                    },
                    {
                        path: "video-generation",
                        Component: VideoGeneration
                    },
                    {
                        path: "template-replication",
                        Component: TemplateReplication
                    }
                ]
            },
            {
                path: "inspiration",
                Component: Inspiration
            },
            {
                path: "templates",
                Component: Templates
            },
            {
                path: "products",
                Component: Product
            },
            {
                path: "my-assets",
                Component: MyAsset
            },
            {
                path: "my-workflows",
                Component: MyWorkflow
            },
            {
                path: "my-workflows/:id",
                Component: WorkflowDetail
            },
            {
                path: "my-assets/:id",
                Component: AssetEditorPage
            },
            {
                path: "asset-detail/:id",
                Component: AssetDetail
            },
            {
                path: "sessions",
                Component: SessionList
            },
            {
                path: "sessions/:id",
                Component: SessionDetail
            },
            {
                path: "credit",
                Component: Credit
            }
        ]
    }
]);
