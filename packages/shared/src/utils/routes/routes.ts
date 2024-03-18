import { getUrlSmartTrader, getUrlBinaryBot } from '../url/helpers';

export const routes = {
    error404: '/404',
    index: '/index',
    root: '/',
    redirect: '/redirect',
    trade: '/',
    endpoint: '/endpoint',
    account_limits: 'https://app.deriv.com/account/account-limits',

    // Wallets
    wallets: '/wallets',
    wallets_cashier: '/wallets/cashier',
    wallets_withdrawal: '/wallets/cashier/withdraw',
    wallets_compare_accounts: '/wallets/compare-accounts',
};
