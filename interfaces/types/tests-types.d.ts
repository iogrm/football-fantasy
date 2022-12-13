type ModelDestroiersType = Record<keyof AllModels, () => Promise<void>>;
