/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import { SignInData, SignUpData } from "../../types";
import { apiClient } from "@/utils/axios";
import { useRouter, useSearchParams } from "next/navigation";

export const TOAST_PROP: ToastOptions<{}> = {
  position: "top-center",
  hideProgressBar: true,
  closeOnClick: true,
  closeButton: true,
};

interface IContext {
  signIn: (loginData: SignInData) => Promise<boolean>;
  signUp: (signUpData: SignUpData) => Promise<boolean>;
  loading: boolean;
  data: SignUpData | null;
  authenticated: boolean;
  signOut: () => void;
  openLoginModal: boolean;
}

export const AuthContext = createContext({} as IContext);

type intialState = {
  authenticated: boolean;
  loading: boolean;
  data: SignUpData | null;
};

export default function Provider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const params = useSearchParams();

  const openLoginModal = Boolean(params.get("login"));
  const tokenExpired = Boolean(params.get("expired"));

  const [authState, setAuthState] = useState<intialState>({
    authenticated: false,
    loading: false,
    data: null,
  });

  const signIn = async (signInData: SignInData) => {
    try {
      setAuthState({ ...authState, loading: true, data: null });
      const promise = apiClient.post(`/auth/signin`, {
        ...signInData,
      });
      const res = await toast.promise(
        promise,
        {
          pending: "Signing in...",
          success: "Welcome Back!!",
        },
        TOAST_PROP
      );
      console.log(res.data);
      setAuthState({ loading: false, data: res.data, authenticated: true });
      return true;
    } catch (error: any) {
      toast.error(
        error.response.data.error
          ? error.response.data.error
          : "Failed to sign in!!",
        TOAST_PROP
      );
      setAuthState({ authenticated: false, loading: false, data: null });
      router.refresh();
      return false;
    }
  };

  const signUp = async (signUpData: SignUpData) => {
    try {
      setAuthState({ authenticated: false, loading: true, data: null });
      const promise = apiClient.post(`/auth/signup`, {
        ...signUpData,
        first_name: signUpData.first_name.toLowerCase(),
        last_name: signUpData.last_name.toLowerCase(),
      });
      const res = await toast.promise(
        promise,
        {
          pending: "Signing up...",
          success: "Signed in successfully!! Welcome!",
        },
        TOAST_PROP
      );
      setAuthState({ loading: false, data: res.data, authenticated: true });
      return true;
    } catch (error: any) {
      toast.error(
        error.response.data.error
          ? error.response.data.error
          : "Failed to sign Up!!",
        TOAST_PROP
      );
      setAuthState({ authenticated: false, loading: false, data: null });
      return false;
    }
  };

  const signOut = () => {
    toast
      .promise(
        apiClient.get("/auth/signout"),
        { pending: "Signing Out..." },
        TOAST_PROP
      )
      .then((res) => {
        setAuthState({ loading: false, data: null, authenticated: false });
        toast.info(res.data.message, TOAST_PROP);
      })
      .catch((err) => {
        toast.error("Failed to sign out!!", TOAST_PROP);
      });
  };

  const fetchUser = () => {
    setAuthState({ loading: true, data: null, authenticated: false });

    apiClient
      .get(`/auth/me`)
      .then((res) => {
        console.log(res.data);

        setAuthState({
          loading: false,
          data: res.data,
          authenticated: true,
        });
      })
      .catch((err) => {
        setAuthState({ authenticated: false, loading: false, data: null });
        router.replace("/?login=true");
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    router.refresh();
    openLoginModal &&
      setAuthState({ authenticated: false, loading: false, data: null });
  }, [openLoginModal]);

  useEffect(() => {
    if (tokenExpired) {
      signOut();
      toast.info("You have been logged out!!Login again!", TOAST_PROP);
      router.replace("/");
      router.refresh();
    }
  }, [tokenExpired]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        ...authState,
        openLoginModal,
      }}
    >
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
}
