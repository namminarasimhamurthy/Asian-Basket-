// Razorpay payment integration

declare global {
    interface Window {
        Razorpay: any;
    }
}

export interface RazorpayOptions {
    key: string;
    amount: number; // in paise
    currency: string;
    name: string;
    description: string;
    order_id?: string;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    theme?: {
        color?: string;
    };
    handler: (response: RazorpayResponse) => void;
    modal?: {
        ondismiss?: () => void;
    };
}

export interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
}

// Load Razorpay script dynamically
export const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

// Initialize and open Razorpay checkout
export const initiatePayment = async (
    amount: number, // in dollars
    customerInfo: { name: string; email: string; phone: string },
    onSuccess: (paymentId: string) => void,
    onFailure: (error: string) => void
): Promise<void> => {
    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
        onFailure('Failed to load payment gateway. Please try again.');
        return;
    }

    // Note: In production, you should get the key from environment variables
    // and create orders on your backend
    const options: RazorpayOptions = {
        key: 'rzp_test_XXXXXXXXXX', // Replace with your Razorpay Test/Live Key
        amount: Math.round(amount * 100), // Convert to paise
        currency: 'USD',
        name: 'Flavor on Wheels',
        description: 'Food Order Payment',
        prefill: {
            name: customerInfo.name,
            email: customerInfo.email,
            contact: customerInfo.phone,
        },
        theme: {
            color: '#0f172a', // Primary color
        },
        handler: (response: RazorpayResponse) => {
            // Payment successful
            onSuccess(response.razorpay_payment_id);
        },
        modal: {
            ondismiss: () => {
                onFailure('Payment cancelled');
            },
        },
    };

    try {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    } catch (error) {
        onFailure('Failed to initialize payment gateway');
    }
};

// For demo purposes - simulate a successful payment
export const simulatePayment = (
    amount: number,
    onSuccess: (paymentId: string) => void,
    onProgress?: (message: string) => void
): Promise<void> => {
    return new Promise((resolve) => {
        onProgress?.('Initializing payment...');

        setTimeout(() => {
            onProgress?.('Processing payment...');
        }, 500);

        setTimeout(() => {
            onProgress?.('Verifying transaction...');
        }, 1500);

        setTimeout(() => {
            const paymentId = `pay_demo_${Date.now()}`;
            onSuccess(paymentId);
            resolve();
        }, 2500);
    });
};
