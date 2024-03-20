import React from 'react';
import { useLocation } from 'react-router-dom';

import { ContentFlag, moduleLoader, routes, SessionStore } from '@deriv/shared';

import RedirectNoticeModal from 'App/Components/Elements/Modals/RedirectNotice';
import { observer, useStore } from '@deriv/stores';

const RedirectToLoginModal = React.lazy(() =>
    moduleLoader(() => import(/* webpackChunkName: "reset-password-modal" */ '../RedirectToLoginModal'))
);

const AppModals = observer(() => {
    const { client, ui, traders_hub } = useStore();
    const { is_authorize, is_logged_in, fetchFinancialAssessment, setCFDScore } = client;
    const { content_flag } = traders_hub;
    const { toggleAccountSignupModal } = ui;
    const temp_session_signup_params = SessionStore.get('signup_query_param');
    const url_params = new URLSearchParams(useLocation().search || temp_session_signup_params);
    const url_action_param = url_params.get('action');

    const is_eu_user = [ContentFlag.LOW_RISK_CR_EU, ContentFlag.EU_REAL, ContentFlag.EU_DEMO].includes(content_flag);

    React.useEffect(() => {
        if (is_logged_in && is_authorize) {
            fetchFinancialAssessment().then(response => {
                setCFDScore(response?.cfd_score ?? 0);
            });
        }
    }, [is_logged_in, is_authorize]);
    if (temp_session_signup_params && window.location.href.includes(routes.onboarding)) {
        toggleAccountSignupModal(true);
    } else {
        SessionStore.remove('signup_query_param');
        toggleAccountSignupModal(false);
    }

    let ComponentToLoad = null;
    if (url_action_param === 'redirect_to_login') {
        ComponentToLoad = <RedirectToLoginModal />;
    }

    return (
        <>
            <RedirectNoticeModal is_logged_in={is_logged_in} is_eu={is_eu_user} portal_id='popup_root' />
            {ComponentToLoad ? <React.Suspense fallback={<div />}>{ComponentToLoad}</React.Suspense> : null}
        </>
    );
});

export default AppModals;
