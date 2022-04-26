import create from "zustand";

export const useStore = create(set => ({
    bearer: "test",
    setBearer: bearer => set(state => ({ bearer: state.bearer = bearer })),
}));

