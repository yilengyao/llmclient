import { LlmProvider } from "@/configuration/llm_configurations";
import { Models, Model } from "@/models/response/models";
import { ChatRequest } from "@/models/request/chat_request";
import { ChatCompletion } from "@/models/response/chat_completion";

export interface LlmClient {
    getProvider(): LlmProvider;
    getCachedModels(): Model[] | null;
    getModels(): Promise<Models>;
    getModel(): Model | null;
    setModel(model: Model): void;
    createCompletion(request: ChatRequest): Promise<ChatCompletion>
}