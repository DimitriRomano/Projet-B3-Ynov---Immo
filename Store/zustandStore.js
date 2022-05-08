import create from "zustand";
import { persist } from "zustand/middleware"
import AsyncStorage from '@react-native-async-storage/async-storage'



export const useStore = create(
    persist( 
        set => ({
        bearer: undefined,
        properties: [],
        setBearer: bearer => set(state => ({ bearer: state.bearer = bearer })),
        setProperties: properties => set(state => ({ properties: state.properties = properties })),
        logOut: () => set(state => ({ bearer: state.bearer = undefined })),
        }),
        {
            name: 'bearer-storage',
            getStorage: () => AsyncStorage,
        }
    )
);

export function isAuthenticated() {
    const bearer = useStore((state) =>state.bearer);
    return bearer !== undefined;
} 

