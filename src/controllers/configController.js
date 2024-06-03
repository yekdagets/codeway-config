import admin from "../firebaseAdmin.js";
const db = admin.firestore();
import { getCache, setCache, invalidateCache } from "../utils/cache.js";

export const getAllConfigs = async (req, res) => {
  const { country } = req.query;

  try {
    const cache = getCache();

    if (cache.configs) {
      console.log("Serving from cache");
      const configs = cache.configs.map((config) => {
        if (
          country &&
          config.countryConfigs &&
          config.countryConfigs[country]
        ) {
          return {
            id: config.id,
            key: config.key,
            createDate: config.createDate,
            description: config.countryConfigs[country].description,
            value: config.countryConfigs[country].value,
            version: config.version,
            updatedAt: config.updatedAt,
          };
        }
        return config;
      });
      return res.status(200).json(configs);
    }

    const configsSnapshot = await db.collection("configs").get();
    const configs = configsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, ...data };
    });

    setCache(configs);

    const responseConfigs = configs.map((config) => {
      if (country && config.countryConfigs && config.countryConfigs[country]) {
        return {
          id: config.id,
          key: config.key,
          createDate: config.createDate,
          description: config.countryConfigs[country].description,
          value: config.countryConfigs[country].value,
          version: config.version,
          updatedAt: config.updatedAt,
        };
      }
      return config;
    });

    res.status(200).json(responseConfigs);
  } catch (error) {
    res.status(500).send("Error getting configurations");
  }
};

export const addConfig = async (req, res) => {
  const { key, value, description } = req.body;
  try {
    const newConfig = {
      key,
      value,
      description,
      createDate: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      countryConfigs: {},
    };
    const docRef = await db.collection("configs").add(newConfig);
    invalidateCache();
    res.status(201).json({ id: docRef.id, ...newConfig });
  } catch (error) {
    res.status(500).send("Error adding configuration");
  }
};

export const updateConfig = async (req, res) => {
  const { id } = req.params;
  const { key, value, description, country, countrySpecific, version } =
    req.body;

  try {
    const configRef = db.collection("configs").doc(id);
    const configDoc = await configRef.get();

    if (!configDoc.exists) {
      return res.status(404).send("Configuration not found");
    }

    const currentConfig = configDoc.data();

    if (currentConfig.version !== version) {
      return res.status(409).send("Configuration version mismatch");
    }

    const updatedConfig = {
      ...currentConfig,
      version: currentConfig.version + 1,
      updatedAt: new Date().toISOString(),
    };

    if (countrySpecific && country) {
      if (!updatedConfig.countryConfigs) {
        updatedConfig.countryConfigs = {};
      }

      if (value === "" && description === "") {
        delete updatedConfig.countryConfigs[country];
      } else {
        updatedConfig.countryConfigs[country] = { value, description };
      }
    } else {
      updatedConfig.key = key;
      updatedConfig.value = value;
      updatedConfig.description = description;
    }

    await configRef.set(updatedConfig);
    invalidateCache();
    res.status(200).send("Configuration updated");
  } catch (error) {
    console.error("Error updating configuration:", error);
    res.status(500).send("Internal server error");
  }
};

export const deleteConfig = async (req, res) => {
  const { id } = req.params;
  const { country } = req.query;
  try {
    const configRef = db.collection("configs").doc(id);
    if (country) {
      const doc = await configRef.get();
      if (!doc.exists) {
        return res.status(404).send("Configuration not found");
      }

      const updateData = {
        [`countryConfigs.${country}`]: admin.firestore.FieldValue.delete(),
      };

      await configRef.update(updateData);
      invalidateCache();
      return res.status(200).send("Country-specific configuration deleted");
    } else {
      await configRef.delete();
      invalidateCache();
      return res.status(200).send("Configuration deleted");
    }
  } catch (error) {
    res.status(500).send("Error deleting configuration");
  }
};
