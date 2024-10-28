import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./App.css";
import { AuthProvider } from "./hooks/UseAuth";
import "./index.css";
import { I18nProvider } from "./modules/i18n/I18nProvider";
import { UserPreferencesContextProvider } from "./modules/user-preferences/UserPreferences";

const root = document.getElementById("root");
if (root) {
    ReactDOM.createRoot(root).render(
        <UserPreferencesContextProvider>
            <I18nProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </I18nProvider>
        </UserPreferencesContextProvider>
    );
}