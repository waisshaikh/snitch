import { setUser, setLoading, setError, setSuccessMessage, clearError } from "../state/auth.slice.js";
import { register, login } from "../services/auth.api.js";
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


  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const data = await login({ email, password });
      dispatch(setUser(data.user));
      dispatch(setSuccessMessage(data.message || "Login successful!"));
      return { success: true, data };
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Login failed. Please try again.";
      dispatch(setError(message));
      return { success: false, error: message };
    } finally {
      dispatch(setLoading(false));
    }
  }
  

  return {
    user,
    loading,
    error,
    successMessage,
    handleRegister,
    handleLogin,
    resetMessages,
  };
};


