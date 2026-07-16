import { CONSENT_STORAGE_KEY, type ConsentState } from "@/lib/analytics";

type Listener = () => void;

const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function getConsentSnapshot(): ConsentState {
  if (typeof window === "undefined") return "unknown";
  const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (stored === "granted" || stored === "denied") return stored;
  return "unknown";
}

export function getConsentServerSnapshot(): ConsentState {
  return "unknown";
}

export function subscribeConsent(listener: Listener): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("grw:consent-updated", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("grw:consent-updated", listener);
  };
}

export function setConsent(next: ConsentState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, next);
  window.dispatchEvent(
    new CustomEvent("grw:consent-updated", { detail: { consent: next } }),
  );
  emit();
}
