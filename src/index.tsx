import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { I18nProvider } from "./modules/i18n/I18nProvider";
import { UserPreferencesContextProvider } from "./modules/user-preferences/UserPreferences";

const root = document.getElementById("root");
if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <UserPreferencesContextProvider>
                <I18nProvider>
                    <App />
                </I18nProvider>
            </UserPreferencesContextProvider>
        </React.StrictMode>
    );
}