import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
    return [{ title: 'Remix POC' }, { name: 'description', content: 'A proof of concept for Remix' }];
};

export default function Index() {
    return (
        <div>
            <h1>Index</h1>
        </div>
    );
}
