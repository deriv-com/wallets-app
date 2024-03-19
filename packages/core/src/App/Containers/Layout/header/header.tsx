import React from 'react';
import { useLocation } from 'react-router-dom';
import { useStoreWalletAccountsList } from '@deriv/hooks';
import { routes } from '@deriv/shared';
import { observer, useStore } from '@deriv/stores';
import DefaultHeaderWallets from './defaut-header-wallets';
import TradersHubHeaderWallets from './traders-hub-header-wallets';
import { useReadLocalStorage } from 'usehooks-ts';

const Header = observer(() => {
    const { client } = useStore();
    const { accounts, is_logged_in, setAccounts, loginid, switchAccount } = client;
    const { pathname } = useLocation();

    const is_wallets_cashier_route = pathname.includes(routes.wallets_cashier);

    const traders_hub_routes =
        [
            routes.traders_hub,
            routes.traders_hub_v2,
            routes.account,
            routes.cashier,
            routes.wallets,
            routes.wallets_compare_accounts,
            routes.compare_accounts,
            routes.compare_cfds,
        ].includes(pathname) ||
        pathname.startsWith(routes.compare_cfds) ||
        is_wallets_cashier_route;

    const client_accounts = useReadLocalStorage('client.accounts');
    const { has_wallet } = useStoreWalletAccountsList();

    React.useEffect(() => {
        if (is_logged_in) {
            const accounts_keys = Object.keys(accounts ?? {});
            const client_accounts_keys = Object.keys(client_accounts ?? {});
            if (client_accounts_keys.length > accounts_keys.length) {
                setAccounts(
                    client_accounts as Record<string, ReturnType<typeof useStore>['client']['accounts'][number]>
                );
            }
        }
    }, [accounts, client_accounts, is_logged_in, loginid, setAccounts, switchAccount]);

    if (!is_logged_in) {
        return null;
    }

    if (pathname === routes.onboarding) {
        return null;
    }

    if (traders_hub_routes) {
        return <TradersHubHeaderWallets />;
    }

    return <DefaultHeaderWallets />;
});

export default Header;
