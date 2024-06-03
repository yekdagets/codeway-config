export const cache = {
  configs: null,
  lastUpdated: null,
};

export const getCache = () => cache;

export const setCache = (configs) => {
  cache.configs = configs;
  cache.lastUpdated = new Date();
};

export const invalidateCache = () => {
  cache.configs = null;
  cache.lastUpdated = null;
};
