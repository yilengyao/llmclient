import { LlmClient } from "@/client/llm_client";
import { 
    LlmProvider,
    LlmConfiguration,
    OllamaConfiguration,
    OpenAIConfiguration
} from "@/configuration/llm-configurations";
import OpenAIClient from "@/client/openai_client";

let llmClient: LlmClient | null = null;

const getLlmProviders = (): LlmProvider[] => {
    return Object.values(LlmProvider);
};

const getLlmProvider = (): LlmProvider | null => {
    if (!llmClient) {
        return null;
    }
    return llmClient.getProvider();
};

const validateConfiguration = (configuration: LlmConfiguration): void => {
    // Check if provider exists first
    if (!configuration.provider) {
        throw new Error("LLM provider is required in configuration");
    }
    // Then validate provider-specific requirements
    switch (configuration.provider) {
        case LlmProvider.OPENAI:
            const openaiConfig = configuration as OpenAIConfiguration;
            if (!openaiConfig.apiKey) {
                throw new Error("OpenAI requires an API key");
            }
            break;
        case LlmProvider.OLLAMA:
            const ollamaConfig = configuration as OllamaConfiguration;
            if (!ollamaConfig.baseURL) {
                throw new Error("Ollama requires a base URL");
            }
            break;
        default:
            throw new Error(`Unsupported LLM provider: ${configuration.provider}`);
    }
};

const createLlmClient = async (configuration: LlmConfiguration) => {
    switch (configuration.provider) {
        case LlmProvider.OLLAMA:
        case LlmProvider.OPENAI:
            llmClient = new OpenAIClient(configuration);
            break;
        default:
            throw new Error(`Unsupported LLM provider: ${configuration.provider}`);
    }

    try {
        // Direct call is fine here since we just created the client
        const models = await llmClient.getModels();
        
        if (!models || models.length === 0) {
            throw new Error(`No models found for ${llmClient.getProvider()}`);
        }
    } catch (error: any) {
        // Handle API errors gracefully
        throw new Error(`Failed to fetch models: ${error.message}`);
    }
};

const getModels = async (): Promise<string[]> => {
    if (!llmClient) {
        throw new Error("LLM client not initialized. Call createLlmClient first.");
    }
    return await llmClient.getModels();
};

const setModel = async (model: string): Promise<void> => {
    if (!llmClient) {
        throw new Error("LLM client not initialized. Call createLlmClient first.");
    }
    await llmClient.setModel(model);
}


const createCompletion = async (prompt: string): Promise<{
    role: string;
    content: string;
}> => {
    if (!llmClient) {
        throw new Error("LLM client not initialized. Call createLlmClient first.");
    }
    return await llmClient.createCompletion(prompt);
};

export {
    getLlmProviders,
    getLlmProvider,
    createLlmClient,
    getModels,
    setModel,
    createCompletion
};