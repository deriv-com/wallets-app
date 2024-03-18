import { getPlatformSettings } from '../brand';
import { routes } from '../routes';

type TRoutingHistory = {
    action: string;
    hash: string;
    key: string;
    pathname: string;
    search: string;
}[];

/*
 * These functions exist because we want to refresh the browser page on switch between Bot and the rest of the platforms.
 * */

export const platform_name = Object.freeze({
    DBot: getPlatformSettings('dbot').name,
    DTrader: getPlatformSettings('trader').name,
    DXtrade: getPlatformSettings('dxtrade').name,
    DMT5: getPlatformSettings('mt5').name,
    SmartTrader: getPlatformSettings('smarttrader').name,
    BinaryBot: getPlatformSettings('bbot').name,
    DerivGO: getPlatformSettings('go').name,
});

export const CFD_PLATFORMS = Object.freeze({
    MT5: 'mt5',
    DXTRADE: 'dxtrade',
    CTRADER: 'ctrader',
});

export const isBot = () =>
    /^\/bot/.test(window.location.pathname) ||
    (/^\/(br_)/.test(window.location.pathname) && window.location.pathname.split('/')[2] === 'bot');

export const isMT5 = () =>
    /^\/mt5/.test(window.location.pathname) ||
    (/^\/(br_)/.test(window.location.pathname) && window.location.pathname.split('/')[2] === CFD_PLATFORMS.MT5);

export const isDXtrade = () =>
    /^\/derivx/.test(window.location.pathname) ||
    (/^\/(br_)/.test(window.location.pathname) && window.location.pathname.split('/')[2] === 'derivx');

export const isNavigationFromDerivGO = () => window.sessionStorage.getItem('config.platform') === 'derivgo';

export const isNavigationFromP2P = () => window.sessionStorage.getItem('config.platform') === 'dp2p';

export const getPathname = () => {
    if (isBot()) return platform_name.DBot;
    if (isMT5()) return platform_name.DMT5;
    if (isDXtrade()) return platform_name.DXtrade;
    switch (window.location.pathname.split('/')[1]) {
        case '':
            return platform_name.DTrader;
        case 'reports':
            return 'Reports';
        case 'cashier':
            return 'Cashier';
        default:
            return platform_name.SmartTrader;
    }
};

export const getPlatformInformation = (routing_history: TRoutingHistory) => {
    return { header: platform_name.DTrader, icon: getPlatformSettings('trader').icon };
};

export const getActivePlatform = (routing_history: TRoutingHistory) => {
    return platform_name.DTrader;
};

export const getPlatformRedirect = (routing_history: TRoutingHistory) => {
    return { name: platform_name.DTrader, route: routes.trade };
};

export const isNavigationFromPlatform = (
    app_routing_history: TRoutingHistory,
    platform_route: string,
    should_ignore_parent_path = false
) => {
    return false;
};

export const isNavigationFromExternalPlatform = (routing_history: TRoutingHistory, platform_route: string) => {
    return false;
};
