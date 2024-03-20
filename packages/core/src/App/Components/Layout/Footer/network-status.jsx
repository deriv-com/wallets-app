import classNames from 'classnames';
import React from 'react';
import { Popover } from '@deriv/components';
import { localize } from '@deriv/translations';
import { isMobileOs } from '@deriv/shared';

const NetworkStatus = () => {
    const network_status_element = (
        <div
            data-testid='dt_network_status_element'
            className={classNames('network-status__circle', 'network-status__circle--online')}
        />
    );
    return (
        <div
            data-testid='dt_network_status'
            className={classNames('network-status__wrapper', {
                'network-status__wrapper--is-mobile': isMobileOs(),
            })}
        >
            {isMobileOs() ? (
                network_status_element
            ) : (
                <Popover
                    classNameBubble='network-status__tooltip'
                    alignment='top'
                    message={localize('Network status: {{status}}', {
                        status: status.tooltip || localize('Connecting to server'),
                    })}
                >
                    {network_status_element}
                </Popover>
            )}
        </div>
    );
};

export default NetworkStatus;
