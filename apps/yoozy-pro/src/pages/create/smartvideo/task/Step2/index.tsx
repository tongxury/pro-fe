import { TemplateOptionView } from "./TemplateOptionDetail";
import Templates from "./Templates";




export default function Step2({ data, onChange, enable }: {
    data: any,
    onChange: (data: any) => void,
    enable?: boolean
}) {

    if (!enable) {
        return <div className="w-full">
            <TemplateOptionView x={data?.template} defaultExpanded />
            {/*{JSON.stringify(data)}*/}
        </div>
    }

    return <Templates data={data} onChange={onChange} />;
}
