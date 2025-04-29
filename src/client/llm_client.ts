import { LlmProvider } from "@/configuration/llm-configurations";
import { Models, Model } from "@/models/models";

export interface LlmClient {
    getProvider(): LlmProvider;
    getModels(): Promise<Models>;
    getModel(): Model | null;
    setModel(model: Model): Promise<void>;
    // createCompletion(prompt: string): Promise<{
    //     role: string;
    //     content: string;
    // }>;
}