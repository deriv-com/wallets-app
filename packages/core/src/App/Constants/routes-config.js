import React from 'react';
import { Redirect as RouterRedirect } from 'react-router-dom';
import { routes, moduleLoader } from '@deriv/shared';
import { localize } from '@deriv/translations';
import Redirect from 'App/Containers/Redirect';
import Endpoint from 'Modules/Endpoint';

// Error Routes
const Page404 = React.lazy(() => import(/* webpackChunkName: "404" */ 'Modules/Page404'));

const Wallets = React.lazy(() =>
    moduleLoader(() => {
        // eslint-disable-next-line import/no-unresolved
        return import(/* webpackChunkName: "wallets" */ '@deriv/wallets');
    })
);

const routesConfig = [
    { path: routes.endpoint, component: Endpoint, getTitle: () => 'Endpoint' },
    { path: routes.redirect, component: Redirect, getTitle: () => localize('Redirect') },
    {
        path: routes.wallets,
        component: Wallets,
        is_authenticated: true,
        getTitle: () => localize('Wallets'),
    },
    { path: routes.root, component: RouterRedirect, getTitle: () => '', to: routes.wallets },
    { component: Page404, getTitle: () => localize('Error 404') },
];

// is_deriv_crypto = true as default to prevent route ui blinking
const getRoutesConfig = () => {
    return routesConfig;
};

export default getRoutesConfig;
