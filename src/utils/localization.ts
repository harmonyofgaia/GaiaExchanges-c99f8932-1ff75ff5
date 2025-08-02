// Example: Dynamic language switcher for i18next
import i18n from '../i18n.config';

export function changeLanguage(lang: string) {
  i18n.changeLanguage(lang);
}

// Example usage: changeLanguage('fr');
