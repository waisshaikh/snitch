import { setUser, setLoading, setError, setSuccessMessage, clearError } from "../state/auth.slice.js";
import { register } from "../services/auth.api.js";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error, successMessage } = useSelector((state) => state.auth);

  async function handleRegister({ email, contact, password, fullname, isSeller = false }) {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const data = await register({ email, contact, password, fullname, isSeller });
      dispatch(setUser(data.user));
      dispatch(setSuccessMessage(data.message || "Registration successful!"));
      return { success: true, data };
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Registration failed. Please try again.";
      dispatch(setError(message));
      return { success: false, error: message };
    } finally {
      dispatch(setLoading(false));
    }
  }

  const resetMessages = () => {
    dispatch(clearError());
  };

  return {
    user,
    loading,
    error,
    successMessage,
    handleRegister,
    resetMessages,
  };
};

