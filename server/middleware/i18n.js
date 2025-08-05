import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const languages = ['en', 'fr'];
const translations = {};

for (const lang of languages) {
  const filePath = path.join(__dirname, '..', 'locales', `${lang}.json`);
  translations[lang] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function i18nMiddleware(req, res, next) {
  const lang = req.acceptsLanguages(...languages) || 'en';
  req.lang = lang;
  req.t = (key) => translations[lang][key] || translations['en'][key] || key;
  next();
}
