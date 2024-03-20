import * as React from 'react';
import classNames from 'classnames';
import { DesktopWrapper, Icon, MobileWrapper, Popover, StaticUrl } from '@deriv/components';
import { routes } from '@deriv/shared';
import platform_config from 'App/Constants/platform-config';
import ToggleMenuDrawer from 'App/Components/Layout/Header/toggle-menu-drawer.jsx';
import DerivBrandLogo from 'Assets/SvgComponents/header/deriv-rebranding-logo.svg';
import DerivBrandShortLogo from 'Assets/SvgComponents/header/deriv-logo-short.svg';
import WalletsLogo from 'Assets/SvgComponents/header/wallets-logo.svg';
import ShowNotifications from './show-notifications';
import TradersHubOnboarding from './traders-hub-onboarding';

const TradersHubHeaderWallets = () => {
    return (
        <header className={classNames('traders-hub-header')}>
            <div className='traders-hub-header__menu-left'>
                <MobileWrapper>
                    <ToggleMenuDrawer {...{ platform_config }} />
                    <div className={classNames('traders-hub-header__logo-wrapper')}>
                        <StaticUrl href='/'>
                            <DerivBrandLogo className='traders-hub-header__logo' />
                        </StaticUrl>
                    </div>
                </MobileWrapper>
                <DesktopWrapper>
                    <div className='traders-hub-header-wallets__logo'>
                        <StaticUrl href='/'>
                            <DerivBrandShortLogo />
                        </StaticUrl>
                    </div>
                    <WalletsLogo
                        className='traders-hub-header-wallets__logo'
                        onClick={() => history.push(routes.wallets)}
                    />
                </DesktopWrapper>
            </div>
            <DesktopWrapper>
                <div className='traders-hub-header__menu-right'>
                    <div className='traders-hub-header__divider' />
                    <div className='traders-hub-header__menu-right--items'>
                        <div className='traders-hub-header__menu-right--items--onboarding'>
                            <TradersHubOnboarding />
                        </div>
                        <div className='traders-hub-header__menu-right--items--notifications'>
                            <ShowNotifications />
                        </div>
                        <Popover
                            classNameBubble='account-settings-toggle__tooltip'
                            alignment='bottom'
                            message='Manage account settings'
                            should_disable_pointer_events
                            zIndex={'9999'}
                        >
                            <a className='traders-hub-header__setting' href={routes.personal_details}>
                                <Icon icon='IcUserOutline' size={20} />
                            </a>
                        </Popover>
                    </div>
                </div>
            </DesktopWrapper>
        </header>
    );
};

export default TradersHubHeaderWallets;
