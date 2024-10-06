import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
    return [{ title: 'Remix POC' }, { name: 'description', content: 'A proof of concept for Remix' }];
};

export default function Index() {
    return (
        <div className='flex flex-col gap-4'>
            <h1>Index</h1>
            <Link to='/authenticated'>Authenticate</Link>
            <Link to='/users'>Users</Link>
        </div>
    );
}
