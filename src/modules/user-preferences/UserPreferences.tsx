import React, {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState
} from "react";
export
    const USER_PREF_KEY =
        "iky-user-preferences"
export interface UserPreferences {
    time_zone: string | null;
    language: "en" | "pt" | "tr" | null;
    theme_mode: string | null;
    minimize_sidebar: boolean | null;
    custom_background_color: string | null;
}

type Props = {
    selectedLang: "en" | "pt" | "tr";
    timezone: string;
};
type ContextType = {
    setUserPreferences: Dispatch<SetStateAction<any>>;
    updateUserPreference: (key: string, value: string) => void;
    preferences: UserPreferences;
};
const prefInitialState: UserPreferences = {
    time_zone: "utc",
    language: "en",
    theme_mode: "light",
    minimize_sidebar: false,
    custom_background_color: null
};
const initialState = {
    preferences: prefInitialState,
    setUserPreferences: () => { },
    updateUserPreference: () => { },
};

const UserPreferencesContext = createContext<ContextType>(initialState);

const UserPreferencesContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [preferences, _setPreferences] = useState<any>(getUserPreferences());
    const setUserPreferences = (prop: any) => {
        _setPreferences(prop);
        setUserPreferencesInStorage(prop);
    };

    const updateUserPreference = (key: string, value: string) => {
        setUserPreferences({ ...preferences, [key]: value });
    };
    return (
        <UserPreferencesContext.Provider
            value={{
                setUserPreferences,
                updateUserPreference,
                preferences,
            }}
        >
            {children}
        </UserPreferencesContext.Provider>
    );
};
const useUserPreferences = () => {
    return useContext(UserPreferencesContext);
};

const getUserPreferences = (): UserPreferences => {
    const ls = localStorage.getItem(USER_PREF_KEY);
    if (ls) {
        try {
            return JSON.parse(ls) as UserPreferences;
        } catch (er) {
            console.error(er);
        }
    }
    return prefInitialState;
}
const removeUserPreferences = () => {
    if (!localStorage) return;
    localStorage.removeItem(USER_PREF_KEY);
};

const setUserPreferencesInStorage = (user_preferences: any) => {
    if (!localStorage) return;
    try {
        const lsValue = JSON.stringify(user_preferences);
        localStorage.setItem(USER_PREF_KEY, lsValue);
    } catch (error) {
        console.error("Error when saving preferences to localStorage.", error);
    }
};
export { UserPreferencesContextProvider, useUserPreferences };
