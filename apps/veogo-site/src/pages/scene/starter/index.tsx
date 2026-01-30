import {useParams} from "react-router";
import Analysis from "./Analysis";
import CoverAnalysis from "./CoverAnalysis";
import Script from "./Script";
import PreAnalysis from "./PreAnalysis";
import LimitAnalysis from "./LimitAnalysis";
import Leaderboard from "./leaderboard";

const Scene = () => {

    const {scene} = useParams();

    return (
        <div style={{marginInline: 'auto', width: '100%',}}>
            {scene === "leaderboard" && <Leaderboard/>}
            {scene === "coverAnalysis" && <CoverAnalysis/>}
            {scene === "analysis" && <Analysis/>}
            {scene === "duplicateScript" && <Script/>}
            {scene === "preAnalysis" && <PreAnalysis/>}
            {scene === "limitAnalysis" && <LimitAnalysis/>}
        </div>
    )
}
export default Scene;
