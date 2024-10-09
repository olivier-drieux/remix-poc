import { useNavigate } from '@remix-run/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';

export async function loader({ params }: Params);

export default function User() {
    const navigate = useNavigate();

    return (
        <Dialog
            defaultOpen
            modal
            onOpenChange={(open: boolean) => {
                open ? undefined : navigate(-1);
            }}
        >
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>Name</div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
