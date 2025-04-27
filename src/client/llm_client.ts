import { LlmProvider } from "@/configuration/llm-configurations";

export interface LlmClient {
    getProvider(): LlmProvider;
    getModels(): Promise<string[]>;
    getModel(): string | null;
    setModel(model: string): Promise<void>;
    createCompletion(prompt: string): Promise<{
        role: string;
        content: string;
    }>;
}