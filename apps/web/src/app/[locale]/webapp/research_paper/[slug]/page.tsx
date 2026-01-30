import Page from "@/pages_/Webapp/ResearchPaper/Solution/index";
import React from "react";

export default function HomeworkHelpSolution({ params }: { params: { slug: string } }) {
    return <Page sessionId={params.slug} />;
}
