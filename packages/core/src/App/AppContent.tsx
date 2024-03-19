import React from 'react';
import Cookies from 'js-cookie';
import { useRemoteConfig } from '@deriv/api';
import { DesktopWrapper } from '@deriv/components';
import { getAppId, LocalStore } from '@deriv/shared';
import { observer, useStore } from '@deriv/stores';
import { getLanguage } from '@deriv/translations';
import { Analytics } from '@deriv-com/analytics';

import AppToastMessages from './Containers/app-toast-messages.jsx';
import AppContents from './Containers/Layout/app-contents.jsx';
import Footer from './Containers/Layout/footer.jsx';
import Header from './Containers/Layout/header';
import AppModals from './Containers/Modals';
import Routes from './Containers/Routes/routes.jsx';
import Devtools from './Devtools';
import initDatadog from '../Utils/Datadog';

const AppContent: React.FC<{ passthrough: unknown }> = observer(({ passthrough }) => {
    const store = useStore();

    const { data } = useRemoteConfig();

    React.useEffect(() => {
        initDatadog(data.tracking_datadog);
        if (process.env.RUDDERSTACK_KEY) {
            const config = {
                growthbookKey: data.marketing_growthbook ? process.env.GROWTHBOOK_CLIENT_KEY : undefined,
                growthbookDecryptionKey: data.marketing_growthbook ? process.env.GROWTHBOOK_DECRYPTION_KEY : undefined,
                rudderstackKey: process.env.RUDDERSTACK_KEY,
            };
            Analytics.initialise(config);
            Analytics.setAttributes({
                account_type: LocalStore?.get('active_loginid')?.substring(0, 2) ?? 'unlogged',
                app_id: String(getAppId()),
                device_type: store?.ui?.is_mobile ? 'mobile' : 'desktop',
                device_language: navigator?.language || 'en-EN',
                user_language: getLanguage().toLowerCase(),
                country: Cookies.get('clients_country') || Cookies?.getJSON('website_status'),
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <>
            <Header />
            <AppContents>
                <Routes passthrough={passthrough} />
            </AppContents>
            <DesktopWrapper>
                <Footer />
            </DesktopWrapper>
            <AppModals />
            <AppToastMessages />
            <Devtools />
        </>
    );
});

export default AppContent;
