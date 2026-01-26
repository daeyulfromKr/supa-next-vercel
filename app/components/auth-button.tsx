"use client";

import { useEffect, useState } from "react";
import { supabase } from '../../lib/supabaseClient'

export default function AuthButton() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "github" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    location.reload();
  };

  return userEmail ? (
    <div className="flex gap-2 text-sm">
      
      <a onClick={handleLogout} className="text-red-500 underline">
        로그아웃
      </a>
      (<span className="text-gray-500">👤 {userEmail}</span>)
    </div>
  ) : (
    <a onClick={handleLogin} className="text-blue-600 underline">
      GitHub 로그인
    </a>
  );
}