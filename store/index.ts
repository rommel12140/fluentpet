import authReducer from '@/features/auth/authSlice';
import buttonsReducer from '@/features/buttons/buttonSlice';
import logsReducer from '@/features/logs/logsSlice';
import petReducer from '@/features/pet/petSlice';
import settingsReducer from '@/features/settings/settingsSlice';
import loadingReducer from '@/features/ui/loadingSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        buttons: buttonsReducer,
        pet:     petReducer,
        logs: logsReducer,
        settings: settingsReducer,
        loading: loadingReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;