import React from 'react';
import { useLocation } from 'react-router-dom';
import { routes } from '@deriv/shared';
import TradersHubHeaderWallets from './traders-hub-header-wallets';

const Header = () => {
    const { pathname } = useLocation();

    if (pathname === routes.onboarding) {
        return null;
    }

    return <TradersHubHeaderWallets />;
};

export default Header;
