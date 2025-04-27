import OpenAI from "openai";
import { LlmClient } from "@/client/llm_client";
import { 
    OllamaConfiguration, 
    OpenAIConfiguration,
    LlmProvider
} from "@/configuration/llm-configurations";

class OpenAIClient implements LlmClient {
    private client: OpenAI;
    private model: string | null = null;
    private models: string[] | null = null;
    private provider: LlmProvider;

    constructor( 
        configuration: OllamaConfiguration | OpenAIConfiguration,
    ) {
        this.client = new OpenAI(configuration);
        if (!configuration.provider) {
            throw new Error("Provider is required in configuration");
        }
        this.provider = configuration.provider;
    }

    getProvider(): LlmProvider {
        return this.provider;
    }

    async getModels(): Promise<string[]> {
        try {
            const response = await this.client.models.list();
            return response.data.map((model) => model.id)
        } catch (error) {
            console.error('Error fetching models:', error);
            throw error;
        }
    }

    getModel(): string | null {
        return this.model;
    }

    async setModel(model: string) {
        this.models = await this.getModels();
        if (!this.models?.includes(model)) {
            throw new Error(`Model ${model} not found`);
        }
        this.model = model;
    }

    async createCompletion(
        prompt: string
    ): Promise<{
        role: string;
        content: string;
    }> {
        if (!this.model) {
            throw new Error("Model not set. Call setModel first.");
        }
        try {
            const response = await this.client.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                stream: false
            });
            return {
                role: response.choices[0].message.role,
                content: response.choices[0].message.content || ''
            };
        } catch (error) {
            console.error('Error creating completion:', error);
            throw error;
        }
    }
}

export default OpenAIClient;