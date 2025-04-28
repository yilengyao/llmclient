import { LlmClient } from "@/client/llm_client";
import { 
    LlmProvider,
    LlmConfiguration,
    OllamaConfiguration,
    OpenAIConfiguration
} from "@/configuration/llm-configurations";
import OpenAIClient from "@/client/openai_client";

let llmClient: LlmClient | null = null;

/**
 * @description Retrieves the available LLM providers
 * @returns {LlmProvider[]} - An array of available LLM providers
 */
const getLlmProviders = (): LlmProvider[] => {
    return Object.values(LlmProvider);
};

/**
 * @description Retrieves the current LLM provider
 * @returns {LlmProvider | null} - The current LLM provider or null if not set
 */
const getLlmProvider = (): LlmProvider | null => {
    if (!llmClient) {
        return null;
    }
    return llmClient.getProvider();
};

/**
 * @description Private method that validates the LLM configuration object
 * @param configuration - LLM configuration object
 * @returns {void}
 * @throws Will throw an error if the configuration is invalid
 */
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

/**
 * @description Creates an LLM client based on the provided configuration
 * @param configuration - LLM configuration object
 * @throws Will throw an error if the configuration is invalid or if the client cannot be created
 * @returns {Promise<void>} - A promise that resolves when the client is created
 */
const createLlmClient = async (configuration: LlmConfiguration) => {
    // Validate the configuration before creating the client
    validateConfiguration(configuration);

    // Create the LLM client based on the provider
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

/**
 * @description Clears the cached LLM client instance
 * This is useful for logout flows or when switching configurations
 * @param {void}
 * @returns {void}
 * @throws {void}
 */
const clearLlmClient = (): void => {
    llmClient = null;
};

/**
 * @description Retrieves the available models for the current LLM client
 * @returns {Promise<string[]>} - A promise that resolves to an array of model names
 * @throws Will throw an error if the client is not initialized or if fetching models fails
 */
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


// const createCompletion = async (prompt: string): Promise<{
//     role: string;
//     content: string;
// }> => {
//     if (!llmClient) {
//         throw new Error("LLM client not initialized. Call createLlmClient first.");
//     }
//     return await llmClient.createCompletion(prompt);
// };

export {
    getLlmProviders,
    getLlmProvider,
    createLlmClient,
    clearLlmClient,
    getModels,
    setModel,
    // createCompletion
};