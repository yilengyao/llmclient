import { 
    ResponseObject,
    FinishReason,
    ServiceTeir
} from "@/models/enums";
import { LogProbs } from "@/models/response/log_prob";
import { Message } from "@/models/response/message";
import { Usage } from "@/models/response/usage";

interface ChatCompletion {
    id: string;
    object: ResponseObject.COMPLETION;
    created: number;
    model: string;
    system_fingerprint?: string;
    choices: Array<Choice>;
    usage: Usage;
    service_teir?: ServiceTeir | null;
};

interface Choice {
    index: number;
    message: Message;
    finished_reason: FinishReason; 
    logprobs?: LogProbs | null;
};

export {
    ChatCompletion,
    Choice
};