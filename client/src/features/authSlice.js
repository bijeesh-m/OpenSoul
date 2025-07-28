import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authInstance } from "../config/axiosConfig";

// Check authentication on page load

export const checkAuthStatus = createAsyncThunk("auth/checkStatus", async (role, { rejectWithValue }) => {
    try {
        const response = await authInstance.get(`/me`);
        if (response.data.role !== role) {
            if (role === "User") {
                return window.location.replace("/login");
            }
            return window.location.replace("/admin");
        }
        return response.data;
    } catch (error) {
        return rejectWithValue("Not authenticated");
    }
});

// logout

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        await authInstance.delete("/logout", {}, { withCredentials: true });
        return null; // Clearing user state
    } catch (error) {
        return rejectWithValue("Logout failed");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(checkAuthStatus.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                console.log(action.payload)
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
