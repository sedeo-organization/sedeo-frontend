import * as SecureStore from "expo-secure-store";

export const saveJwt = async (jwt: string) => {
    try {
        await SecureStore.setItemAsync("jwt", jwt, {
            keychainAccessible: SecureStore.WHEN_UNLOCKED,
        });
        console.log("JWT saved successfully");
    } catch (error) {
        console.log("Error saving JWT:", error);
        throw error;
    }
};

export const getJwt = async () => {
    try {
        const token = await SecureStore.getItemAsync("jwt");
        if (token) {
            console.log("JWT retrieved successfully:", token);
        } else {
            console.log("No JWT found");
            return null;
        }
        return token;
    } catch (error) {
        console.log("Error retrieving JWT:", error);
        throw error;
    }
};

export const deleteJwt = async () => {
    try {
        await SecureStore.deleteItemAsync("jwt");
        console.log("JWT deleted successfully");
    } catch (error) {
        console.log("Error deleting JWT:", error);
        throw error;
    }
};
