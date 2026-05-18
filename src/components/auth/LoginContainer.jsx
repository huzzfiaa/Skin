import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUser } from "../../features/m/auth/authSlice";
import image from "../../assets/a-digital-abstract-composition-featuring_IQbpNyAkQNeroGx_o8nVoQ_Py_lV21MQgeKTkEEe82TQw_cover_sd.jpeg"
import { getUserDocument, createUserDocument } from "../../firebase/firestore"; // ✅ missing import fixed
import { loginUser, loginWithGoogle } from "../../firebase/auth";

import AuthCard from "./AuthCard";
import LoginForm from "./LoginForm";
import GoogleButton from "./GoogleButton";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await loginUser(email, password);
      const userDoc = await getUserDocument(result.user.uid);
      const role = userDoc?.role || "user";
      dispatch(setUser({ uid: result.user.uid, email: result.user.email, role }));
      navigate(role === "admin" ? "/admin" : "/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await loginWithGoogle();
      let userDoc = await getUserDocument(result.user.uid);
      if (!userDoc) {
        await createUserDocument(result.user, "user");
        userDoc = await getUserDocument(result.user.uid);
      }
      const role = userDoc?.role || "user";
      dispatch(setUser({ uid: result.user.uid, email: result.user.email, role }));
      navigate(role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ Outer wrapper — full screen, image as background, nothing overlapped
    <div
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* ✅ Background image — sits behind everything using absolute + z-0 */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: "none" }}
      />

      {/* ✅ Dark overlay so card is readable over any image */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "rgba(10, 8, 6, 0.55)" }}
      />

      {/* ✅ Card sits on top at z-20 — never overlapped by image */}
      <div className="relative z-20 w-full max-w-md px-4">
        <AuthCard>
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onSubmit={handleLogin}
            error={error}
            loading={loading}
          />

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.1em",
            }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          </div>

          <GoogleButton onClick={handleGoogleLogin} loading={loading} />
        </AuthCard>
      </div>
    </div>
  );
};

export default LoginContainer;