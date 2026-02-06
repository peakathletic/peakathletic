
import { SiteContent } from '../types';
import { INITIAL_CONTENT } from '../constants';

const STORAGE_KEY = 'peak_academy_content_v1';
const MAX_SIZE_MB = 4;

export const saveContent = (content: SiteContent): boolean => {
  try {
    const jsonString = JSON.stringify(content);
    const sizeInBytes = new Blob([jsonString]).size;
    const sizeInMB = sizeInBytes / (1024 * 1024);

    if (sizeInMB > MAX_SIZE_MB) {
      console.warn(`Content size (${sizeInMB.toFixed(2)} MB) exceeds limit (${MAX_SIZE_MB} MB).`);
      return false;
    }

    localStorage.setItem(STORAGE_KEY, jsonString);
    return true;
  } catch (error) {
    console.error("Failed to save content:", error);
    return false;
  }
};

export const loadContent = (): SiteContent => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load content, reverting to default:", error);
  }
  return INITIAL_CONTENT;
};

export const resetContent = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
};
