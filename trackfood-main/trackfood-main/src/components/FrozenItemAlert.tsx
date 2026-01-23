import { AlertCircle, Snowflake, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface FrozenItemAlertProps {
    isOpen: boolean;
    onProceed: () => void;
    onModify: () => void;
}

const FrozenItemAlert = ({ isOpen, onProceed, onModify }: FrozenItemAlertProps) => {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Snowflake className="h-6 w-6 text-blue-600" />
                        </div>
                        <AlertDialogTitle className="text-xl">Frozen Items Notice</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-base">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-2">
                            <div className="flex gap-2">
                                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium text-amber-800">Outside Dublin Delivery</p>
                                    <p className="text-amber-700 mt-1">
                                        Your order contains frozen items. For deliveries outside Dublin,
                                        <span className="font-semibold"> frozen items will be delivered the next day </span>
                                        to ensure freshness and quality.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2 sm:gap-0">
                    <Button
                        variant="outline"
                        onClick={onModify}
                        className="gap-2"
                    >
                        <X className="h-4 w-4" />
                        Modify Order
                    </Button>
                    <Button
                        onClick={onProceed}
                        className="bg-primary hover:bg-primary/90 gap-2"
                    >
                        <Snowflake className="h-4 w-4" />
                        Proceed Anyway
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default FrozenItemAlert;
