import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme-original/CodeBlock";

export default function EmbeddingTabs(props) {
    const {
      openaiParams,
      hideOpenai,
      azureOpenaiParams,
      hideAzureOpenai,
      googleParams,
      hideGoogle,
      awsParams,
      hideAws,
      huggingFaceParams,
      hideHuggingFace,
      ollamaParams,
      hideOllama,
      cohereParams,
      hideCohere,
      mistralParams,
      hideMistral,
      nomicParams,
      hideNomic,
      nvidiaParams,
      hideNvidia,
      fakeEmbeddingParams,
      hideFakeEmbedding,
      customVarName,
    } = props;
  
    const openAIParamsOrDefault = openaiParams ?? `model="text-embedding-3-large"`;
    const azureParamsOrDefault =
      azureOpenaiParams ??
      `\n    azure_endpoint=os.environ["AZURE_OPENAI_ENDPOINT"],\n    azure_deployment=os.environ["AZURE_OPENAI_DEPLOYMENT_NAME"],\n    openai_api_version=os.environ["AZURE_OPENAI_API_VERSION"],\n`;
    const googleParamsOrDefault = googleParams ?? `model="text-embedding-004"`;
    const awsParamsOrDefault = awsParams ?? `model_id="amazon.titan-embed-text-v2:0"`;
    const huggingFaceParamsOrDefault = huggingFaceParams ?? `model="sentence-transformers/all-mpnet-base-v2"`;
    const ollamaParamsOrDefault = ollamaParams ?? `model="llama3"`;
    const cohereParamsOrDefault = cohereParams ?? `model="embed-english-v3.0"`;
    const mistralParamsOrDefault = mistralParams ?? `model="mistral-embed"`;
    const nomicsParamsOrDefault = nomicParams ?? `model="nomic-embed-text-v1.5"`;
    const nvidiaParamsOrDefault = nvidiaParams ?? `model="NV-Embed-QA"`;
    const fakeEmbeddingParamsOrDefault = fakeEmbeddingParams ?? `size=4096`;
  
    const embeddingVarName = customVarName ?? "embeddings";
  
    const tabItems = [
      {
        value: "OpenAI",
        label: "OpenAI",
        text: `from langchain_openai import OpenAIEmbeddings\n\n${embeddingVarName} = OpenAIEmbeddings(${openAIParamsOrDefault})`,
        apiKeyName: "OPENAI_API_KEY",
        packageName: "langchain-openai",
        default: true,
        shouldHide: hideOpenai,
      },
      {
        value: "Azure",
        label: "Azure",
        text: `from langchain_openai import AzureOpenAIEmbeddings\n\n${embeddingVarName} = AzureOpenAIEmbeddings(${azureParamsOrDefault})`,
        apiKeyName: "AZURE_OPENAI_API_KEY",
        packageName: "langchain-openai",
        default: false,
        shouldHide: hideAzureOpenai,
      },
      {
        value: "Google",
        label: "Google",
        text: `from langchain_google_vertexai import VertexAIEmbeddings\n\n${embeddingVarName} = VertexAIEmbeddings(${googleParamsOrDefault})`,
        apiKeyName: undefined,
        packageName: "langchain-google-vertexai",
        default: false,
        shouldHide: hideGoogle,
      },
      {
        value: "AWS",
        label: "AWS",
        text: `from langchain_aws import BedrockEmbeddings\n\n${embeddingVarName} = BedrockEmbeddings(${awsParamsOrDefault})`,
        apiKeyName: undefined,
        packageName: "langchain-aws",
        default: false,
        shouldHide: hideAws,
      },
      {
        value: "HuggingFace",
        label: "HuggingFace",
        text: `from langchain_huggingface import HuggingFaceEmbeddings\n\n${embeddingVarName} = HuggingFaceEmbeddings(${huggingFaceParamsOrDefault})`,
        apiKeyName: undefined,
        packageName: "langchain-huggingface",
        default: false,
        shouldHide: hideHuggingFace,
      },
      {
        value: "Ollama",
        label: "Ollama",
        text: `from langchain_ollama import OllamaEmbeddings\n\n${embeddingVarName} = OllamaEmbeddings(${ollamaParamsOrDefault})`,
        apiKeyName: undefined,
        packageName: "langchain-ollama",
        default: false,
        shouldHide: hideOllama,
      },
      {
        value: "Cohere",
        label: "Cohere",
        text: `from langchain_cohere import CohereEmbeddings\n\n${embeddingVarName} = CohereEmbeddings(${cohereParamsOrDefault})`,
        apiKeyName: "COHERE_API_KEY",
        packageName: "langchain-cohere",
        default: false,
        shouldHide: hideCohere,
      },
      {
        value: "MistralAI",
        label: "MistralAI",
        text: `from langchain_mistralai import MistralAIEmbeddings\n\n${embeddingVarName} = MistralAIEmbeddings(${mistralParamsOrDefault})`,
        apiKeyName: "MISTRALAI_API_KEY",
        packageName: "langchain-mistralai",
        default: false,
        shouldHide: hideMistral,
      },
      {
        value: "Nomic",
        label: "Nomic",
        text: `from langchain_nomic import NomicEmbeddings\n\n${embeddingVarName} = NomicEmbeddings(${nomicsParamsOrDefault})`,
        apiKeyName: "NOMIC_API_KEY",
        packageName: "langchain-nomic",
        default: false,
        shouldHide: hideNomic,
      },
      {
        value: "NVIDIA",
        label: "NVIDIA",
        text: `from langchain_nvidia_ai_endpoints import NVIDIAEmbeddings\n\n${embeddingVarName} = NVIDIAEmbeddings(${nvidiaParamsOrDefault})`,
        apiKeyName: "NVIDIA_API_KEY",
        packageName: "langchain-nvidia-ai-endpoints",
        default: false,
        shouldHide: hideNvidia,
      },
      {
        value: "Fake",
        label: "Fake",
        text: `from langchain_core.embeddings import FakeEmbeddings\n\n${embeddingVarName} = FakeEmbeddings(${fakeEmbeddingParamsOrDefault})`,
        apiKeyName: undefined,
        packageName: "langchain-core",
        default: false,
        shouldHide: hideFakeEmbedding,
      },
    ];
  
    return (
        <Tabs groupId="modelTabs">
            {tabItems
                .filter((tabItem) => !tabItem.shouldHide)
                .map((tabItem) => {
                    const apiKeyText = tabItem.apiKeyName ? `import getpass

    os.environ["${tabItem.apiKeyName}"] = getpass.getpass()` : '';
                    return (
                        <TabItem
                            value={tabItem.value}
                            label={tabItem.label}
                            default={tabItem.default}
                        >
                            <CodeBlock language="bash">{`pip install -qU ${tabItem.packageName}`}</CodeBlock>              
                            <CodeBlock language="python">{apiKeyText + (apiKeyText ? "\n\n" : '') + tabItem.text}</CodeBlock>
                        </TabItem>
                    );
                })
            }
        </Tabs>
    );
  }