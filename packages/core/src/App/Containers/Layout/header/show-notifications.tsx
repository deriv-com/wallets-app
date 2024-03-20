import React from 'react';
import { Localize } from '@deriv/translations';
import { ToggleNotifications } from 'App/Components/Layout/Header';

const ShowNotifications = () => {
    const notifications = [];
    return (
        <div data-testid='dt_traders_hub_show_notifications' className='traders-hub-header__notification'>
            <ToggleNotifications
                count={notifications.length}
                tooltip_message={<Localize i18n_default_text='View notifications' />}
            />
        </div>
    );
};

export default ShowNotifications;
