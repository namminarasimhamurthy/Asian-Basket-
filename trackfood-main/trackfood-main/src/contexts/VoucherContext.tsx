import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Voucher {
    code: string;
    amount: number; // €5 or €10
    minOrderValue: number;
    issuedAt: string;
    expiresAt: string;
    isUsed: boolean;
    orderId: string;
}

interface VoucherContextType {
    vouchers: Voucher[];
    generateVoucher: (orderTotal: number, orderId: string) => Voucher | null;
    applyVoucher: (code: string) => { success: boolean; discount: number; error?: string };
    getValidVouchers: () => Voucher[];
    markVoucherAsUsed: (code: string) => void;
    appliedVoucher: Voucher | null;
    clearAppliedVoucher: () => void;
}

const VoucherContext = createContext<VoucherContextType | undefined>(undefined);

const VOUCHERS_KEY = 'asian_basket_vouchers';

export const VoucherProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);

    // Load vouchers from localStorage
    useEffect(() => {
        if (user) {
            const savedVouchers = localStorage.getItem(`${VOUCHERS_KEY}_${user.id}`);
            if (savedVouchers) {
                try {
                    setVouchers(JSON.parse(savedVouchers));
                } catch (e) {
                    console.error('Error loading vouchers:', e);
                }
            }
        } else {
            setVouchers([]);
        }
    }, [user]);

    // Save vouchers to localStorage
    const saveVouchers = (newVouchers: Voucher[]) => {
        if (user) {
            localStorage.setItem(`${VOUCHERS_KEY}_${user.id}`, JSON.stringify(newVouchers));
        }
    };

    // Generate voucher code
    const generateVoucherCode = (): string => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'AB-';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    };

    // Generate voucher based on order total
    const generateVoucher = (orderTotal: number, orderId: string): Voucher | null => {
        if (!user) return null;

        let voucherAmount = 0;
        let minOrderValue = 0;

        if (orderTotal >= 100) {
            voucherAmount = 10;
            minOrderValue = 20; // Minimum order to use the voucher
        } else if (orderTotal >= 50) {
            voucherAmount = 5;
            minOrderValue = 10;
        }

        if (voucherAmount === 0) return null;

        const now = new Date();
        const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days validity

        const newVoucher: Voucher = {
            code: generateVoucherCode(),
            amount: voucherAmount,
            minOrderValue,
            issuedAt: now.toISOString(),
            expiresAt: expiresAt.toISOString(),
            isUsed: false,
            orderId
        };

        const updatedVouchers = [...vouchers, newVoucher];
        setVouchers(updatedVouchers);
        saveVouchers(updatedVouchers);

        return newVoucher;
    };

    // Get valid (non-expired, non-used) vouchers
    const getValidVouchers = (): Voucher[] => {
        const now = new Date();
        return vouchers.filter(v =>
            !v.isUsed && new Date(v.expiresAt) > now
        );
    };

    // Apply voucher to checkout
    const applyVoucher = (code: string): { success: boolean; discount: number; error?: string } => {
        const voucher = vouchers.find(v => v.code === code);

        if (!voucher) {
            return { success: false, discount: 0, error: 'Invalid voucher code' };
        }

        if (voucher.isUsed) {
            return { success: false, discount: 0, error: 'This voucher has already been used' };
        }

        const now = new Date();
        if (new Date(voucher.expiresAt) < now) {
            return { success: false, discount: 0, error: 'This voucher has expired' };
        }

        setAppliedVoucher(voucher);
        return { success: true, discount: voucher.amount };
    };

    // Mark voucher as used
    const markVoucherAsUsed = (code: string) => {
        const updatedVouchers = vouchers.map(v =>
            v.code === code ? { ...v, isUsed: true } : v
        );
        setVouchers(updatedVouchers);
        saveVouchers(updatedVouchers);
        setAppliedVoucher(null);
    };

    // Clear applied voucher
    const clearAppliedVoucher = () => {
        setAppliedVoucher(null);
    };

    return (
        <VoucherContext.Provider
            value={{
                vouchers,
                generateVoucher,
                applyVoucher,
                getValidVouchers,
                markVoucherAsUsed,
                appliedVoucher,
                clearAppliedVoucher
            }}
        >
            {children}
        </VoucherContext.Provider>
    );
};

export const useVouchers = () => {
    const context = useContext(VoucherContext);
    if (!context) {
        throw new Error('useVouchers must be used within VoucherProvider');
    }
    return context;
};
