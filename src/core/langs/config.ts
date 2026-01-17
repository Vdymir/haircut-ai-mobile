/* eslint-disable import/no-named-as-default-member */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./locales/en/translation.json";
import translationES from "./locales/es/translation.json";

const LANGUAGE_KEY = "language";

export const languages = {
  english: "en",
  spanish: "es",
};

const resources = {
  en: { translation: translationEn },
  es: { translation: translationES },
};

export const getStoredLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage) return savedLanguage;

    const locales = getLocales();
    const deviceLanguage = locales[0].languageCode || "en";

    const supportedLanguages = Object.keys(resources);
    const defaultLanguage = "en";

    return supportedLanguages.includes(deviceLanguage)
      ? deviceLanguage
      : defaultLanguage;
  } catch (error) {
    console.error("Error getting stored language:", error);
    return "en";
  }
};

export const setLanguage = async (language: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
    await i18n.changeLanguage(language);
  } catch (error) {
    console.error("Error setting language:", error);
  }
};

export const initI18n = async () => {
  try {
    const savedLanguage = await getStoredLanguage();

    await i18n.use(initReactI18next).init({
      compatibilityJSON: "v4",
      resources,
      lng: savedLanguage,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

    return true;
  } catch (error) {
    console.error("Error initializing i18n:", error);
    return false;
  }
};

export default i18n;
