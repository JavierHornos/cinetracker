import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState(null); // null | "enviando" | "enviado" | {error}

  const volver = window.location.origin + window.location.pathname;

  async function conGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: volver } });
    if (error) setEstado({ error: error.message });
  }

  async function conMail(e) {
    e.preventDefault();
    setEstado("enviando");
    const { error } = await supabase.auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: volver } });
    setEstado(error ? { error: error.message } : "enviado");
  }

  return (
    <main className="pantalla-centro">
      <div className="login">
        <div className="logo">🎬 CINETRACKER</div>
        <p>Las 1001 películas del libro, un recorrido por el cine argentino y tu lista. Marcá lo que vas viendo desde el celu o la compu.</p>

        <button className="boton blanco" style={{ width: "100%" }} onClick={conGoogle}>
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.6 5.4 2.6 13.3l7.8 6C12.3 13.4 17.7 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17.5z" />
            <path fill="#FBBC05" d="M10.4 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.3.8-4.7l-7.8-6C1 16.5 0 20.1 0 24s1 7.5 2.6 10.7l7.8-6z" />
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.7-3.9-13.6-9.8l-7.8 6C6.6 42.6 14.6 48 24 48z" />
          </svg>
          ENTRAR CON GOOGLE
        </button>

        <div className="separador">o con tu mail</div>

        {estado === "enviado" ? (
          <div className="mensaje">Listo. Te mandamos un link a <b>{email}</b>. Abrilo desde este mismo dispositivo para entrar.</div>
        ) : (
          <form onSubmit={conMail}>
            <input className="campo" type="email" required autoComplete="email" inputMode="email"
              placeholder="tu@mail.com" value={email} onChange={e => setEmail(e.target.value)} />
            <button className="boton rojo" disabled={estado === "enviando"}>
              {estado === "enviando" ? "ENVIANDO…" : "MANDAME EL LINK"}
            </button>
          </form>
        )}
        {estado?.error && <div className="mensaje error">No se pudo: {estado.error}</div>}
      </div>
    </main>
  );
}
