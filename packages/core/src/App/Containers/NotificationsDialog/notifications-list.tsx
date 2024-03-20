import classNames from 'classnames';
import React from 'react';
import { Icon, Text } from '@deriv/components';
import { toTitleCase } from '@deriv/shared';

const NotificationsList = () => {
    const notifications = [];

    const getNotificationItemIcon = item => {
        const { type } = item;
        if (['contract_sold', 'info', 'news', 'promotions'].includes(type)) {
            return 'IcAlertInfo';
        } else if (type === 'p2p_completed_order') {
            return 'IcAlertAnnounce';
        }
        return `IcAlert${toTitleCase(type)}`;
    };

    return (
        <React.Fragment>
            {notifications.map(item => (
                <div className='notifications-item' key={item.key}>
                    <Text as='h2' className='notifications-item__title' weight='bold' size='xs' color='prominent'>
                        {item.type && (
                            <Icon
                                icon={getNotificationItemIcon(item)}
                                className={classNames('notifications-item__title-icon', {
                                    [`notifications-item__title-icon--${item.type}`]: item.type,
                                })}
                            />
                        )}
                        {item.header}
                    </Text>
                    <div className='notifications-item__message'>{item.message}</div>
                </div>
            ))}
        </React.Fragment>
    );
};

export default NotificationsList;
