enum Role {
    DEVELOPER = 'developer',
    SYSTEM = 'system',
    USER = 'user',
    ASSISTANT = 'assistant',
    TOOL = 'tool'
};

enum ReasoningEffort {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
};

enum ContentType {
    TEXT = 'text',
    REFUSAL = 'refusal',
    CONTENT = 'content',
};

enum AudioFormat {
    WAV = 'wav',
    AAC = 'aac',
    MP3 = 'mp3',
    FLAC = 'flac',
    OPUS = 'opus',
    PCM16 = 'pcm16'
};

enum VoiceFormat {
    ALLOY = 'alloy',
    ASH = 'ash',
    BALLAD = 'ballad',
    CORAL = 'coral',
    ECHO = 'echo',
    FABLE = 'fable',
    ONYX = 'onyx',
    NOVA = 'nova',
    SAGE = 'sage',
    SHIMMER = 'shimmer',
    VERSE = 'verse',
};

enum Modalities {
    TEXT = 'text',
    AUDIO = 'audio'
};

enum ResponseFormat {
    TEXT = 'text',
    JSON_OBJECT = 'json_object',
    JSON_SCHEMA = 'json_schema'
};

enum ServiceTeir {
    AUTO = 'auto',
    DEFAULT = 'default',
    FLEX = 'flex'
};

enum ToolChoice {
    NONE = 'none',
    AUTO = 'auto',
    REQUIRED = 'required'
}

enum ToolType {
    FUNCTION = 'function',
    FILE_SEARCH = 'file_search',
    WEB_SEARCH_PREVIEW = 'web_search_preview',
    WEB_SEARCH_PREVIEW_2025_03_11 = 'web_search_preview_2025_03_11',
    COMPUTER_USE_PREVIEW = 'computer_use_preview',
}

enum ComparisonOperator {
    EQUALS = 'eq',
    NOT_EQUALS = 'ne',
    GREATER_THAN = 'gt',
    GREATER_THAN_OR_EQUALS = 'gte',
    LESS_THAN = 'lt',
    LESS_THAN_OR_EQUALS = 'lte'
};

enum CompoundOperator {
    AND = 'and',
    OR = 'or'
};

enum SearchContextSize {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
};

enum ResponseObject {
    LIST = 'list',
    MODEL = 'model',
    COMPLETION = 'completion',
    FUNCTION='function'
};

enum FinishReason {
    STOP = 'stop',
    LENGTH = 'length',
    CONTENT_FILTER = 'content_filter',
    TOOL_CALLS = 'tool_calls',
    FUNCTION_CALL = 'function_call'
};

export {
    Role,
    ReasoningEffort,
    ContentType,
    AudioFormat,
    VoiceFormat,
    Modalities,
    ResponseFormat,
    ServiceTeir,
    ToolChoice,
    ToolType,
    ComparisonOperator,
    CompoundOperator,
    SearchContextSize,
    ResponseObject,
    FinishReason
};