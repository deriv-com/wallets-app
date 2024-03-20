import React from 'react';
import { routes } from '@deriv/shared';
import { Link } from 'react-router-dom';

const EndpointNote = () => {
    const server_url = localStorage.getItem('config.server_url');
    return server_url ? (
        <span style={{ fontSize: 'var(--text-size-xs)', color: 'var(--brand-red-coral)' }}>
            The server{' '}
            <Link className='account-settings-toggle' to={routes.endpoint}>
                endpoint
            </Link>{' '}
            is: {server_url}
        </span>
    ) : null;
};

export { EndpointNote };
