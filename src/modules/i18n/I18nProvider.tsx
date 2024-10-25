import { ReactNode } from "react";
import { IntlProvider } from "react-intl";


import { useUserPreferences } from "../user-preferences/UserPreferences";
import enMessages from "./messages/en.json";
import ptMessages from "./messages/pt.json";
import trMessages from "./messages/tr.json";

const allMessages = {
    tr: trMessages,
    en: enMessages,
    pt: ptMessages,
};

const I18nProvider = ({ children }: { children: ReactNode }) => {
    const { preferences } = useUserPreferences();
    const locale =
        preferences && preferences.language ? preferences.language : "en";
    const messages = allMessages[locale];
    return (
        <IntlProvider locale={locale} messages={messages}>
            {children}
        </IntlProvider>
    );
};

export { I18nProvider };
