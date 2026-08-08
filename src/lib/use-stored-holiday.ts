"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "countdown-summer:selected-holiday";

let listeners: Array<() => void> = [];
const emitChange = () => listeners.forEach((listener) => listener());

function subscribe(listener: () => void) {
  listeners.push(listener);
  window.addEventListener("storage", emitChange);
  return () => {
    listeners = listeners.filter((existing) => existing !== listener);
    window.removeEventListener("storage", emitChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

/** Reads/writes the user's remembered holiday choice, synced across tabs. */
export function useStoredHolidayId() {
  const storedId = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setStoredId = useCallback((id: string) => {
    window.localStorage.setItem(STORAGE_KEY, id);
    emitChange();
  }, []);

  return [storedId, setStoredId] as const;
}
