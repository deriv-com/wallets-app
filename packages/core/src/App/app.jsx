import React from 'react';
import WS from 'Services/ws-methods';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import { Analytics } from '@deriv-com/analytics';
import { BreakpointProvider } from '@deriv/quill-design';
import { initFormErrorMessages, setUrlLanguage, setWebsocket, useOnLoadTranslation } from '@deriv/shared';
import { StoreProvider } from '@deriv/stores';
import { getLanguage, initializeTranslations } from '@deriv/translations';
import { FORM_ERROR_MESSAGES } from '../Constants/form-error-messages';
import AppContent from './AppContent';
import initHotjar from '../Utils/Hotjar';
import 'Sass/app.scss';

const AppWithoutTranslation = ({ root_store }) => {
    const l = window.location;
    const base = l.pathname.split('/')[1];
    const has_base = /^\/(br_)/.test(l.pathname);
    const [is_translation_loaded] = useOnLoadTranslation();

    React.useEffect(() => {
        const loadExternalScripts = async () => {
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

            await delay(3000);
            window.LiveChatWidget.init();

            await delay(2000);
            initHotjar(root_store.client);
        };

        initializeTranslations();

        // TODO: [translation-to-shared]: add translation implemnentation in shared
        setUrlLanguage(getLanguage());
        initFormErrorMessages(FORM_ERROR_MESSAGES);
        root_store.common.setPlatform();

        // Set maximum timeout before we load livechat in case if page loading is disturbed or takes too long
        const max_timeout = setTimeout(loadExternalScripts, 15 * 1000); // 15 seconds

        window.addEventListener('load', () => {
            clearTimeout(max_timeout);
            loadExternalScripts();
        });

        return () => {
            window.removeEventListener('load', loadExternalScripts);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const platform_passthrough = {
        root_store,
        WS,
    };

    setWebsocket(WS);

    React.useEffect(() => {
        if (!root_store.client.email) {
            Analytics.reset();
        }
    }, [root_store.client.email]);

    return (
        <>
            {is_translation_loaded ? (
                <Router basename={has_base ? `/${base}` : null}>
                    <BreakpointProvider>
                        <StoreProvider store={root_store}>
                            <AppContent passthrough={platform_passthrough} />
                        </StoreProvider>
                    </BreakpointProvider>
                </Router>
            ) : (
                <></>
            )}
        </>
    );
};

AppWithoutTranslation.propTypes = {
    root_store: PropTypes.object,
};
const App = withTranslation()(AppWithoutTranslation);

export default App;
