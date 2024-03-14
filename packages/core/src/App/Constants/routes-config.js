import React from 'react';
import { Redirect as RouterRedirect } from 'react-router-dom';
import { makeLazyLoader, routes, moduleLoader } from '@deriv/shared';
import { Loading } from '@deriv/components';
import { localize } from '@deriv/translations';
import Redirect from 'App/Containers/Redirect';
import Endpoint from 'Modules/Endpoint';
import CFDCompareAccounts from '@deriv/cfd/src/Containers/cfd-compare-accounts';

// Error Routes
const Page404 = React.lazy(() => import(/* webpackChunkName: "404" */ 'Modules/Page404'));

const CFD = React.lazy(() =>
    moduleLoader(() => {
        // eslint-disable-next-line import/no-unresolved
        return import(/* webpackChunkName: "cfd" */ '@deriv/cfd');
    })
);

const Cashier = React.lazy(() =>
    moduleLoader(() => {
        // eslint-disable-next-line import/no-unresolved
        return import(/* webpackChunkName: "cashier" */ '@deriv/cashier');
    })
);

const AppStore = React.lazy(() =>
    moduleLoader(() => {
        // eslint-disable-next-line import/no-unresolved
        return import(/* webpackChunkName: "appstore" */ '@deriv/appstore');
    })
);

const Wallets = React.lazy(() =>
    moduleLoader(() => {
        // eslint-disable-next-line import/no-unresolved
        return import(/* webpackChunkName: "wallets" */ '@deriv/wallets');
    })
);

const TradersHub = React.lazy(() =>
    moduleLoader(() => {
        // eslint-disable-next-line import/no-unresolved
        return import(/* webpackChunkName: "tradershub" */ '@deriv/tradershub');
    })
);

const Cashier_V2 = React.lazy(() =>
    moduleLoader(() => {
        // eslint-disable-next-line import/no-unresolved
        return import(/* webpackChunkName: "cashier-v2" */ '@deriv/cashier-v2');
    })
);

const getModules = () => {
    const modules = [
        {
            path: routes.dxtrade,
            component: props => <CFD {...props} platform='dxtrade' />,
            getTitle: () => localize('Deriv X'),
        },
        {
            path: routes.compare_cfds,
            component: CFDCompareAccounts,
            getTitle: () => localize('Compare CFD accounts'),
        },
        {
            path: routes.mt5,
            component: props => <CFD {...props} platform='mt5' />,
            getTitle: () => localize('MT5'),
        },
        {
            path: routes.traders_hub,
            component: AppStore,
            is_authenticated: true,
            getTitle: () => localize("Trader's Hub"),
        },
        {
            path: routes.wallets,
            component: Wallets,
            is_authenticated: true,
            getTitle: () => localize('Wallets'),
        },
        {
            path: routes.traders_hub_v2,
            component: TradersHub,
            is_authenticated: true,
            getTitle: () => localize('Trader’s Hub V2'),
        },
        {
            path: routes.cashier_v2,
            component: Cashier_V2,
            is_authenticated: true,
            getTitle: () => localize('Cashier'),
        },
        {
            path: routes.onboarding,
            component: AppStore,
            is_authenticated: false,
            getTitle: () => localize('Appstore'),
            routes: [
                {
                    path: routes.traders_hub,
                    component: AppStore,
                    getTitle: () => localize("Trader's Hub"),
                },
                {
                    path: routes.onboarding,
                    component: AppStore,
                    is_authenticated: false,
                    getTitle: () => localize('Onboarding'),
                },
            ],
        },
        {
            path: routes.cashier,
            component: Cashier,
            is_modal: true,
            is_authenticated: true,
            getTitle: () => localize('Cashier'),
            icon_component: 'IcCashier',
            routes: [
                {
                    path: routes.cashier_deposit,
                    component: Cashier,
                    getTitle: () => localize('Deposit'),
                    icon_component: 'IcCashierAdd',
                    default: true,
                },
                {
                    path: routes.cashier_withdrawal,
                    component: Cashier,
                    getTitle: () => localize('Withdrawal'),
                    icon_component: 'IcCashierMinus',
                },
                {
                    path: routes.cashier_pa,
                    component: Cashier,
                    getTitle: () => localize('Payment agents'),
                    icon_component: 'IcPaymentAgent',
                },
                {
                    path: routes.cashier_acc_transfer,
                    component: Cashier,
                    getTitle: () => localize('Transfer'),
                    icon_component: 'IcAccountTransfer',
                },
                {
                    path: routes.cashier_pa_transfer,
                    component: Cashier,
                    getTitle: () => localize('Transfer to client'),
                    icon_component: 'IcAccountTransfer',
                },
                {
                    id: 'gtm-onramp-tab',
                    path: routes.cashier_onramp,
                    component: Cashier,
                    getTitle: () => localize('Fiat onramp'),
                    icon_component: 'IcCashierOnRamp',
                },
                {
                    path: routes.cashier_transactions_crypto,
                    component: Cashier,
                    is_invisible: true,
                },
            ],
        },
    ];

    return modules;
};

const lazyLoadComplaintsPolicy = makeLazyLoader(
    () => moduleLoader(() => import(/* webpackChunkName: "complaints-policy" */ 'Modules/ComplaintsPolicy')),
    () => <Loading />
);

// Order matters
// TODO: search tag: test-route-parent-info -> Enable test for getting route parent info when there are nested routes
const initRoutesConfig = ({ is_appstore, is_eu_country }) => [
    { path: routes.index, component: RouterRedirect, getTitle: () => '', to: routes.root },
    { path: routes.endpoint, component: Endpoint, getTitle: () => 'Endpoint' }, // doesn't need localization as it's for internal use
    { path: routes.redirect, component: Redirect, getTitle: () => localize('Redirect') },
    {
        path: routes.complaints_policy,
        component: lazyLoadComplaintsPolicy(),
        getTitle: () => localize('Complaints policy'),
        icon_component: 'IcComplaintsPolicy',
        is_authenticated: true,
    },
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
