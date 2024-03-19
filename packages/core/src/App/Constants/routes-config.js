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

const getModules = () => {
    const modules = [
        {
            path: routes.wallets,
            component: Wallets,
            is_authenticated: true,
            getTitle: () => localize('Wallets'),
        },
        { path: routes.root, component: RouterRedirect, getTitle: () => '', to: '/wallets' },
    ];

    return modules;
};

// Order matters
// TODO: search tag: test-route-parent-info -> Enable test for getting route parent info when there are nested routes
const initRoutesConfig = ({ is_appstore, is_eu_country }) => [
    { path: routes.index, component: RouterRedirect, getTitle: () => '', to: routes.root },
    { path: routes.endpoint, component: Endpoint, getTitle: () => 'Endpoint' }, // doesn't need localization as it's for internal use
    { path: routes.redirect, component: Redirect, getTitle: () => localize('Redirect') },
    ...getModules({ is_appstore, is_eu_country }),
];

let routesConfig;

// For default page route if page/path is not found, must be kept at the end of routes_config array
const route_default = { component: Page404, getTitle: () => localize('Error 404') };

// is_deriv_crypto = true as default to prevent route ui blinking
const getRoutesConfig = ({ is_appstore = true, is_eu_country }) => {
    if (!routesConfig) {
        routesConfig = initRoutesConfig({ is_appstore, is_eu_country });
        routesConfig.push(route_default);
    }
    return routesConfig;
};

export default getRoutesConfig;
