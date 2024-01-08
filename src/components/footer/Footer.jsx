import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { FOOTER_WEBSITE_LABEL, FOOTER_WEBSITE_RIGHTS } from './footerString';

const Copyright = (props) => {
    return (
        <Typography mt={1} variant="body2" color="text.secondary" align="center" {...props}>
            {FOOTER_WEBSITE_RIGHTS}
            <Link className="Url_link" color="inherit" href="http://www.textricks.com/">
                {FOOTER_WEBSITE_LABEL}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default Copyright;

