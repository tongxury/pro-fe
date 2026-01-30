import { addSession, saveQuestion } from "@/api/chat";
import { useRouter } from "@/navigation";
import { Question, Scenario } from "@pro/ui-pro";
import { v4 as uuid } from "uuid";

const useSession = ({ scenario }: { scenario?: Scenario }) => {
    const router = useRouter();

    const create = (question: Question) => {
        // const session_id = uuid();

        addSession({
            questions: [
                {
                    ...question,
                    prompt: { ...question.prompt, text: question?.prompt?.text || question.attachments?.[0]?.content }
                }
            ],
            scenario
        }).then((result: any) => {
            if (result.data?.id) {
                router.push(`/webapp/homework/${result.data?.id}`);
            }
        });

        // router.push(
        //     `/webapp/${category}/${session_id}?question=${JSON.stringify({ ...question, session_id })}`
        // );
    };

    return {
        create
    };
};

export default useSession;
