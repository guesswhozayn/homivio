"use client";

import React, { useState } from "react";
import SignUp from "@/components/formComponents/SignUp";
import ConfirmSignUp from "@/components/formComponents/ConfirmSignUp";
import SignIn from "@/components/formComponents/SignIn";
import Inventory from "@/components/Inventory";

export default function Admin() {
  const [formState, setFormState] = useState("signUp");
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleFormState = (newFormState) => {
    setFormState(newFormState);
  };

  const signUp = async (form) => {
    const { username, email, password } = form;
    // sign up logic would go here
    setFormState("confirmSignUp");
  };

  const confirmSignUp = async (form) => {
    const { username, authcode } = form;
    // confirm sign up logic would go here
    setFormState("signIn");
  };

  const signIn = async (form) => {
    const { username, password } = form;
    // sign in logic would go here
    setFormState("signedIn");
    setIsAdmin(true);
  };

  const signOut = async () => {
    // sign out logic would go here
    setFormState("signUp");
    setIsAdmin(false);
  };

  const renderForm = () => {
    switch (formState) {
      case "signUp":
        return <SignUp signUp={signUp} toggleFormState={toggleFormState} />;
      case "confirmSignUp":
        return <ConfirmSignUp confirmSignUp={confirmSignUp} />;
      case "signIn":
        return <SignIn signIn={signIn} toggleFormState={toggleFormState} />;
      case "signedIn":
        return isAdmin ? (
          <Inventory signOut={signOut} />
        ) : (
          <h3>Not an admin</h3>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="max-w-fw flex flex-col">
        <div className="pt-10">
          <h1 className="text-5xl font-light">Admin Panel</h1>
        </div>
        {renderForm()}
      </div>
    </div>
  );
}
