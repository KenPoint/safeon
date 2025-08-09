"use client";

import React from "react";

/** Безопасный вызов gtag */
export function gaEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name, params);
  } else {
    // можно включить лог для отладки:
    // console.debug("[gaEvent skipped]", name, params);
  }
}

/** Необязательный компонент-хелпер: смонтируй и зови пропсы, если нужно */
type GAEventsProps = {
  onMountEventName?: string;
  onMountParams?: Record<string, any>;
};

const GAEvents: React.FC<GAEventsProps> = ({ onMountEventName, onMountParams }) => {
  React.useEffect(() => {
    if (onMountEventName) gaEvent(onMountEventName, onMountParams || {});
  }, [onMountEventName, onMountParams]);
  return null; // Ничего не рисуем
};

export default GAEvents;
