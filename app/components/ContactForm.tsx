"use client";

import { useState, type FormEvent } from "react";
import { pageContent } from "../portfolio-data";

type FormStatus = "idle" | "sending" | "success" | "error";
const endpoint = "https://formsubmit.co/ajax/stella.jin123@gmail.com";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const copy = pageContent.contact.form;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      <input type="hidden" name="_subject" value="New portfolio message" />
      <input type="text" name="_honey" className="form-honey" tabIndex={-1} autoComplete="off" />
      <label><span>{copy.nameLabel}</span><input type="text" name="name" placeholder={copy.namePlaceholder} autoComplete="name" required /></label>
      <label><span>{copy.emailLabel}</span><input type="email" name="email" placeholder={copy.emailPlaceholder} autoComplete="email" required /></label>
      <label><span>{copy.messageLabel}</span><textarea name="message" placeholder={copy.messagePlaceholder} rows={6} required /></label>
      <button className="form-submit glow-surface cursor-target" type="submit" disabled={status === "sending"}>{status === "sending" ? copy.sendingAction : copy.submitAction}<span aria-hidden="true">↗</span></button>
      <p className={`form-status is-${status}`} aria-live="polite">
        {status === "success" && copy.successMessage}
        {status === "error" && copy.errorMessage}
      </p>
    </form>
  );
}
