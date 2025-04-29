import { LlmClient } from "@/client/llm_client";
import { 
    OllamaConfiguration, 
    OpenAIConfiguration,
    LlmProvider
} from "@/configuration/llm-configurations";
import { Model, Models } from "@/models/models";

class OpenAIClient implements LlmClient {
    private model: Model | null = null;
    private models: Model[] | null = null;
    private provider: LlmProvider;
    private apiKey: string;
    private baseUrl: string = 'https://api.openai.com';

    constructor( 
        configuration: OllamaConfiguration | OpenAIConfiguration,
    ) {
        if (!configuration.provider) {
            throw new Error("Provider is required in configuration");
        }
        this.provider = configuration.provider;
        if (this.provider === LlmProvider.OLLAMA) {
            const ollamaConfig = configuration as OllamaConfiguration;
            this.baseUrl = ollamaConfig.baseURL || 'http://localhost:11434';
        }
        this.apiKey = configuration.apiKey || '';
    }

    getProvider(): LlmProvider {
        return this.provider;
    }

    async getModels(): Promise<Models> {
        try {
            const response = await fetch(`${this.baseUrl}/v1/models`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data as Models;
            
        } catch (error) {
            console.error('Error fetching models:', error);
            throw error;
        }
    }

    getModel(): Model | null {
        return this.model;
    }

    async setModel(model: Model): Promise<void> {
        if (!this.models?.includes(model)) {
            throw new Error(`Model ${model} not found`);
        }
        this.model = model;
    }

//     async createCompletion(
//         prompt: string
//     ): Promise<{
//         role: string;
//         content: string;
//     }> {
//         if (!this.model) {
//             throw new Error("Model not set. Call setModel first.");
//         }
//         try {
//             const response = await this.client.chat.completions.create({
//                 model: this.model,
//                 messages: [
//                     {
//                         role: 'user',
//                         content: prompt
//                     }
//                 ],
//                 stream: false
//             });
//             return {
//                 role: response.choices[0].message.role,
//                 content: response.choices[0].message.content || ''
//             };
//         } catch (error) {
//             console.error('Error creating completion:', error);
//             throw error;
//         }
//     }
}

export default OpenAIClient;