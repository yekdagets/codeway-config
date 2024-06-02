const cache = {
  configs: null,
  lastUpdated: null,
};

const getCache = () => cache;

const setCache = (configs) => {
  cache.configs = configs;
  cache.lastUpdated = new Date();
};

const invalidateCache = () => {
  cache.configs = null;
  cache.lastUpdated = null;
};

module.exports = {
  getCache,
  setCache,
  invalidateCache,
};
