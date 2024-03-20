import 'Sass/app/_common/components/platform-switcher.scss';

import { Icon } from '@deriv/components';
import { getPlatformInformation, getUrlBinaryBot, isMobile } from '@deriv/shared';

import { CSSTransition } from 'react-transition-group';
import { PlatformDropdown } from './platform-dropdown.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

const PlatformSwitcher = ({
    toggleDrawer,
    app_routing_history,
    platform_config = [],
    current_language,
    setTogglePlatformType,
}) => {
    const [is_open, setIsOpen] = React.useState(false);

    const is_close_drawer_fired_ref = React.useRef(false);

    React.useEffect(() => {
        platform_config.forEach(data => {
            const { name } = data;
            if (name === 'Binary Bot') {
                data.href = getUrlBinaryBot();
            }
        });
    }, [current_language, platform_config]);

    React.useEffect(() => {
        if (is_close_drawer_fired_ref.current) {
            if (typeof toggleDrawer === 'function') {
                toggleDrawer();
            }
        }
        is_close_drawer_fired_ref.current = false;
    });

    const closeDrawer = () => {
        setIsOpen(false);
        is_close_drawer_fired_ref.current = true;
    };

    return (
        <React.Fragment>
            <div
                data-testid='dt_platform_switcher'
                className={classNames(
                    'platform-switcher',
                    { 'platform-switcher--active': is_open },
                    { 'platform-switcher--is-mobile': isMobile() }
                )}
                onClick={() => setIsOpen(!is_open)}
            >
                <Icon
                    className='platform-switcher__icon'
                    icon={getPlatformInformation(app_routing_history).icon}
                    description={getPlatformInformation(app_routing_history).header}
                    width={120}
                    height={25}
                />

                <Icon className='platform-switcher__arrow' icon='IcChevronDownBold' />
            </div>
            <CSSTransition
                mountOnEnter
                appear
                in={is_open}
                classNames={{
                    enterDone: 'platform-dropdown--enter-done',
                }}
                timeout={!isMobile() && is_open ? 0 : 250}
                unmountOnExit
            >
                <PlatformDropdown
                    platform_config={platform_config}
                    closeDrawer={closeDrawer}
                    current_language={current_language}
                    app_routing_history={app_routing_history}
                    setTogglePlatformType={setTogglePlatformType}
                />
            </CSSTransition>
        </React.Fragment>
    );
};

PlatformSwitcher.propTypes = {
    platform_config: PropTypes.array,
    toggleDrawer: PropTypes.func,
    current_language: PropTypes.string,
    app_routing_history: PropTypes.array,
    is_landing_company_loaded: PropTypes.bool,
    setTogglePlatformType: PropTypes.func,
};

export default withRouter(PlatformSwitcher);
