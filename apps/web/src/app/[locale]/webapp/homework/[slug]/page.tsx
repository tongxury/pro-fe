import Page from "@/pages_/Webapp/Homework/Solution";
import React from "react";

export default function HomeworkHelpSolution({ params }: { params: { slug: string } }) {
    return <Page session={params.slug} />;
}
