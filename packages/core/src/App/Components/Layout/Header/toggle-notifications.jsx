import classNames from 'classnames';
import React, { useState } from 'react';
import { Counter, DesktopWrapper, Icon, MobileWrapper, Popover } from '@deriv/components';
import NotificationsDialog from 'App/Containers/NotificationsDialog';
import 'Sass/app/modules/notifications-dialog.scss';

const ToggleNotificationsDrawer = ({ count, tooltip_message, should_disable_pointer_events = false }) => {
    const [visible, setVisible] = useState(false);

    const toggleDialog = () => setVisible(!visible);

    const notifications_toggler_el = (
        <div
            className={classNames('notifications-toggle__icon-wrapper', {
                'notifications-toggle__icon-wrapper--active': visible,
            })}
            onClick={toggleDialog}
        >
            <Icon className='notifications-toggle__icon' icon='IcBell' />
            {!!count && <Counter count={count} className='notifications-toggle__step' />}
        </div>
    );

    return (
        <div className={classNames('notifications-toggle')}>
            <DesktopWrapper>
                <Popover
                    classNameBubble='notifications-toggle__tooltip'
                    alignment='bottom'
                    message={tooltip_message}
                    should_disable_pointer_events={should_disable_pointer_events}
                    zIndex={9999}
                >
                    {notifications_toggler_el}
                </Popover>
                {visible && <NotificationsDialog />}
            </DesktopWrapper>
            <MobileWrapper>
                {notifications_toggler_el}
                {visible && <NotificationsDialog />}
            </MobileWrapper>
        </div>
    );
};

export default ToggleNotificationsDrawer;
