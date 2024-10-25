import { useUserPreferences } from "../user-preferences/UserPreferences";

const itemClass = "";
type Props = {
    toggleBtnClass?: string;
    toggleBtnIconClass?: string;
    menuPlacement?: string;
    menuTrigger?: string;
};

const shortNameSvgNameTable = {
    tr: "tr",
    pt: "pt",
    en: "gb",
};
const LanguageSwitcher = ({
    toggleBtnClass = "toggle-button",
    menuPlacement = "bottom-start",
    menuTrigger = "{default: 'click', lg: 'hover'}",
}: Props) => {
    const { updateUserPreference, preferences } = useUserPreferences();
    const locale =
        preferences && preferences.language ? preferences.language : "en";
    const setLanguage = (lang: string) => {
        updateUserPreference("language", lang);
    };
    function clsx(arg0: string, toggleBtnClass: string): string | undefined {
        throw new Error("Function not implemented.");
    }

    return (
        <>
            {/* begin::Menu toggle */}
            <a
                href="#"
                className={clsx("btn btn-icon", toggleBtnClass)}
                data-iky-menu-trigger={menuTrigger}
                data-iky-menu-placement={menuPlacement}
            >
                <div className={itemClass}>
                    <span className="menu-icon" data-iky-element="icon">
                        <img
                            src={`/media/flags4x3/${shortNameSvgNameTable[locale]}.svg`}
                            className="svg"
                            alt={`${locale} flag`}
                        />
                    </span>
                </div>
            </a>
            {/* begin::Menu toggle */}

            {/* begin::Menu */}
            <div
                className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px"
                data-iky-menu="true"
            >
                {/* begin::Menu item */}
                <div className="menu-item px-3 my-0">
                    <a
                        onClick={() => {
                            if (locale !== "en") setLanguage("en");
                        }}
                        className={locale === "en" ? "menu-link active" : "menu-link"}
                    >
                        <span className="menu-icon" data-iky-element="icon">
                            <img
                                src={`/media/flags4x3/${shortNameSvgNameTable[locale]}.svg`}
                                className="svg"
                                alt={`${locale} flag`}
                            />
                        </span>
                        <span className="menu-title">English</span>
                    </a>
                </div>
                {/* end::Menu item */}

                {/* begin::Menu item */}
                <div className="menu-item px-3 my-0">
                    <a
                        onClick={() => {
                            if (locale !== "tr") setLanguage("tr");
                        }}
                        className={locale === "tr" ? "menu-link active" : "menu-link"}
                    >
                        <span className="menu-icon" data-iky-element="icon">
                            <img
                                src={`/media/flags4x3/${shortNameSvgNameTable[locale]}.svg`}
                                className="svg"
                                alt={`${locale} flag`}
                            />
                        </span>
                        <span className="menu-title">Turkish</span>
                    </a>
                </div>
                {/* end::Menu item */}

                {/* begin::Menu item */}
                <div className="menu-item px-3 my-0">
                    <a
                        href="#"
                        onClick={() => {
                            if (locale !== "pt") setLanguage("pt");
                        }}
                        className={locale === "pt" ? "menu-link active" : "menu-link"}
                    >
                        <span className="menu-icon" data-iky-element="icon">
                            <img
                                src={`/media/flags4x3/${shortNameSvgNameTable[locale]}.svg`}
                                className="svg"
                                alt={`${locale} flag`}
                            />
                        </span>
                        <span className="menu-title">Dutch</span>
                    </a>
                </div>
                {/* end::Menu item */}
            </div>
            {/* end::Menu */}
        </>
    );
};

export { LanguageSwitcher };
