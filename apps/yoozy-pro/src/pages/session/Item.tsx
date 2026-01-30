import React from "react";
import SessionView from "./views/SessionView";

const SessionItem = ({ x }: { x: any }) => {
    return (
        <div>
            <a href={`/sessions/${x._id}`} target="_blank" rel="noopener noreferrer" className="block h-full group relative">
                <SessionView x={x} />
            </a>
        </div>
    )
}

export default SessionItem;
