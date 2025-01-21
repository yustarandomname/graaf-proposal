
import type { ToastParams, ToastAction } from './types';

export const toaster = $state({ 
    error: (params: ToastParams) => {},
    promise: async (promise: Promise<any>, params: ToastParams) => await promise,
});