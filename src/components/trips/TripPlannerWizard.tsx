"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { StopOver } from "@/types/trip";
import { buildBookingMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { SITE_URL } from "@/constants/contacts";
import { X, ArrowLeft, ArrowRight, CalendarDays, Route, Users } from "lucide-react";
import { FORT_JESUS_TRIP_CONTENT } from "@/content/trips/fort-jesus-trip";

type TripPlannerWizardProps = {
  readonly tripName: string;
  readonly stops: ReadonlyArray<StopOver>;
  readonly ctaLabel?: string;
};

type OneWayFareRow = {
  readonly stops: number;
  readonly adultKes: number;
  readonly childKes: number;
  readonly under5: string;
};

const RETURN_FARES: Record<number, number> = {
  1: 800,
  2: 1200,
  3: 1500,
  8: 5000,
};

function clampInt(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, Math.trunc(value)));
}

function formatDateHuman(dateValue: string) {
  const [y, m, d] = dateValue.split("-").map((v) => Number(v));
  if (!y || !m || !d) return dateValue;
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function TripPlannerWizard({ tripName, stops, ctaLabel = "Plan a trip" }: TripPlannerWizardProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [fromStopId, setFromStopId] = useState<string>(stops[0]?.id ?? "");
  const [toStopId, setToStopId] = useState<string>(stops[stops.length - 1]?.id ?? "");
  const [tripType, setTripType] = useState<"one_way" | "return">("one_way");
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("09:30");

  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const fromIndex = useMemo(() => Math.max(0, stops.findIndex((s) => s.id === fromStopId)), [fromStopId, stops]);
  const toIndex = useMemo(() => Math.max(0, stops.findIndex((s) => s.id === toStopId)), [toStopId, stops]);
  const fromStop = stops[fromIndex] ?? stops[0];
  const toStop = stops[toIndex] ?? stops[stops.length - 1];

  const stopsTravelled = useMemo(() => Math.abs(toIndex - fromIndex), [fromIndex, toIndex]);

  const fareRow = useMemo(() => {
    const oneWay = FORT_JESUS_TRIP_CONTENT.hopOnHopOff.fares.oneWay as unknown as ReadonlyArray<OneWayFareRow>;
    return oneWay.find((r) => r.stops === stopsTravelled) ?? null;
  }, [stopsTravelled]);

  const adultFare = fareRow?.adultKes ?? 0;
  const childFare = fareRow?.childKes ?? Math.round(adultFare * 0.5);
  const returnFare = useMemo(() => (tripType === "return" ? (RETURN_FARES[stopsTravelled] ?? null) : null), [stopsTravelled, tripType]);

  const safeAdults = clampInt(adults, 0, 20);
  const safeChildren = clampInt(children, 0, 20);

  const estimatedTotal = useMemo(() => {
    if (stopsTravelled === 0) return 0;
    if (tripType === "return" && returnFare != null) {
      const childReturn = Math.round(returnFare * 0.5);
      return safeAdults * returnFare + safeChildren * childReturn;
    }
    return safeAdults * adultFare + safeChildren * childFare;
  }, [adultFare, childFare, returnFare, safeAdults, safeChildren, stopsTravelled, tripType]);

  const canContinue = useMemo(() => {
    if (step === 1) return Boolean(fromStop && toStop && stopsTravelled > 0);
    if (step === 2) return true;
    if (step === 3) return true;
    return true;
  }, [fromStop, step, stopsTravelled, toStop]);

  const whatsAppMessage = useMemo(() => {
    const parts: string[] = [];
    if (date) parts.push(`Preferred date: ${formatDateHuman(date)}`);
    if (time) parts.push(`Preferred time: ${time}`);
    parts.push(`Route: ${fromStop.label} → ${toStop.label}`);
    parts.push(`Stops travelled: ${stopsTravelled}`);
    parts.push(`Trip: ${tripType === "return" ? "Return" : "One-way"}`);
    parts.push(`Passengers: ${safeAdults} adult(s), ${safeChildren} child(ren) 5–15`);
    if (stopsTravelled > 0) {
      if (tripType === "return" && returnFare == null) {
        parts.push("Return fare: ask on board");
      }
      parts.push(`Estimated total: KES ${estimatedTotal.toLocaleString("en-US")}`);
    }
    parts.push(`Page: ${SITE_URL}/trips/fort-jesus-trip`);
    return buildBookingMessage(tripName, parts.join(" | "));
  }, [
    date,
    estimatedTotal,
    fromStop.label,
    returnFare,
    safeAdults,
    safeChildren,
    stopsTravelled,
    time,
    toStop.label,
    tripName,
    tripType,
  ]);

  const whatsAppUrl = useMemo(() => buildWhatsAppUrl(whatsAppMessage), [whatsAppMessage]);

  const reset = () => {
    setStep(1);
    setFromStopId(stops[0]?.id ?? "");
    setToStopId(stops[stops.length - 1]?.id ?? "");
    setTripType("one_way");
    setAdults(1);
    setChildren(0);
    setDate("");
    setTime("09:30");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setStep(1);
          // focus the panel after open
          window.setTimeout(() => panelRef.current?.focus(), 30);
        }}
        className="inline-flex w-full sm:w-auto items-center justify-center h-12 sm:h-11 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-sm font-bold transition-colors"
      >
        {ctaLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-[200]">
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
            aria-label="Close trip planner"
          />

          {/* Panel (bottom sheet on mobile, centered on desktop) */}
          <div className="absolute inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center p-0 sm:p-6">
            <div
              ref={panelRef}
              tabIndex={-1}
              className="relative w-full sm:max-w-[620px] max-h-[92svh] sm:max-h-[calc(100vh-48px)] rounded-t-3xl sm:rounded-3xl bg-neutral-950 border border-white/10 shadow-2xl shadow-black/50 outline-none flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Trip planner"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
                    Trip planner
                  </p>
                  <p className="text-sm font-semibold text-white">{tripName}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 mx-auto" />
                </button>
              </div>

              {/* Body */}
              <div className="px-5 py-5 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <p className="text-sm font-semibold text-white">
                    Step {step} of 4
                  </p>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4].map((n) => (
                      <span
                        key={n}
                        className={`h-1.5 rounded-full transition-all ${
                          n === step ? "w-6 bg-teal-300" : "w-2 bg-white/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {step === 1 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-white/90">
                      <Route className="w-4 h-4 text-teal-300" />
                      <p className="text-sm font-semibold">Choose your route</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block">
                        <span className="block text-[11px] font-black uppercase tracking-[0.3em] text-white/60 mb-2">
                          From
                        </span>
                        <select
                          value={fromStopId}
                          onChange={(e) => setFromStopId(e.target.value)}
                          className="w-full h-12 sm:h-11 rounded-xl bg-neutral-900 border border-white/15 px-3 text-white text-sm"
                          style={{ colorScheme: "dark" }}
                        >
                          {stops.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="block">
                        <span className="block text-[11px] font-black uppercase tracking-[0.3em] text-white/60 mb-2">
                          To
                        </span>
                        <select
                          value={toStopId}
                          onChange={(e) => setToStopId(e.target.value)}
                          className="w-full h-12 sm:h-11 rounded-xl bg-neutral-900 border border-white/15 px-3 text-white text-sm"
                          style={{ colorScheme: "dark" }}
                        >
                          {stops.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      {stopsTravelled > 0 ? (
                        <>
                          <p className="text-sm font-semibold text-white">
                            {fromStop.label} → {toStop.label}
                          </p>
                          <p className="mt-1 text-sm text-white/80">
                            Stops travelled:{" "}
                            <span className="font-semibold tabular-nums text-white">{stopsTravelled}</span>
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-white/70">
                          Select a different destination to continue.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-white/90">
                      <Users className="w-4 h-4 text-teal-300" />
                      <p className="text-sm font-semibold">Passengers</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block">
                        <span className="block text-[11px] font-black uppercase tracking-[0.3em] text-white/60 mb-2">
                          Adults
                        </span>
                        <input
                          type="number"
                          inputMode="numeric"
                          min={0}
                          max={20}
                          value={adults}
                          onChange={(e) => setAdults(clampInt(Number(e.target.value), 0, 20))}
                          className="w-full h-12 sm:h-11 rounded-xl bg-white/10 border border-white/15 px-3 text-white text-sm tabular-nums"
                        />
                      </label>

                      <label className="block">
                        <span className="block text-[11px] font-black uppercase tracking-[0.3em] text-white/60 mb-2">
                          Children (5–15)
                        </span>
                        <input
                          type="number"
                          inputMode="numeric"
                          min={0}
                          max={20}
                          value={children}
                          onChange={(e) => setChildren(clampInt(Number(e.target.value), 0, 20))}
                          className="w-full h-12 sm:h-11 rounded-xl bg-white/10 border border-white/15 px-3 text-white text-sm tabular-nums"
                        />
                      </label>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setTripType("one_way")}
                        className={`h-10 px-3 rounded-xl border text-sm font-semibold transition-colors ${
                          tripType === "one_way"
                            ? "bg-white/15 border-white/20 text-white"
                            : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                        }`}
                      >
                        One-way
                      </button>
                      <button
                        type="button"
                        onClick={() => setTripType("return")}
                        className={`h-10 px-3 rounded-xl border text-sm font-semibold transition-colors ${
                          tripType === "return"
                            ? "bg-white/15 border-white/20 text-white"
                            : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                        }`}
                      >
                        Return
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-white/90">
                      <CalendarDays className="w-4 h-4 text-teal-300" />
                      <p className="text-sm font-semibold">Preferred schedule (optional)</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block">
                        <span className="block text-[11px] font-black uppercase tracking-[0.3em] text-white/60 mb-2">
                          Date
                        </span>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full h-12 sm:h-11 rounded-xl bg-neutral-900 border border-white/15 px-3 text-white text-sm"
                          style={{ colorScheme: "dark" }}
                        />
                      </label>

                      <label className="block">
                        <span className="block text-[11px] font-black uppercase tracking-[0.3em] text-white/60 mb-2">
                          Time
                        </span>
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full h-12 sm:h-11 rounded-xl bg-neutral-900 border border-white/15 px-3 text-white text-sm tabular-nums"
                          style={{ colorScheme: "dark" }}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-white/55">
                      You can skip this step if you just want the fare estimate.
                    </p>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-white">Review</p>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/85 space-y-2">
                      <p>
                        <span className="font-semibold text-white">Route:</span> {fromStop.label} → {toStop.label}
                      </p>
                      <p>
                        <span className="font-semibold text-white">Stops travelled:</span>{" "}
                        <span className="tabular-nums">{stopsTravelled}</span>
                      </p>
                      <p>
                        <span className="font-semibold text-white">Trip:</span>{" "}
                        {tripType === "return" ? "Return" : "One-way"}
                      </p>
                      <p>
                        <span className="font-semibold text-white">Passengers:</span>{" "}
                        {safeAdults} adult(s), {safeChildren} child(ren) 5–15
                      </p>
                      {date && (
                        <p>
                          <span className="font-semibold text-white">Preferred date:</span> {formatDateHuman(date)}
                        </p>
                      )}
                      {time && (
                        <p>
                          <span className="font-semibold text-white">Preferred time:</span> <span className="tabular-nums">{time}</span>
                        </p>
                      )}
                      {stopsTravelled > 0 ? (
                        <>
                          <p>
                            <span className="font-semibold text-white">Estimated total:</span>{" "}
                            <span className="font-bold tabular-nums text-white">
                              KES {estimatedTotal.toLocaleString("en-US")}
                            </span>
                          </p>
                          {tripType === "return" && returnFare == null && (
                            <p className="text-white/65 text-xs">
                              Return fare is not published for this stop count — we’ll confirm on WhatsApp.
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-white/70">Select two different stops to estimate the fare.</p>
                      )}
                    </div>

                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-11 w-full rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-sm font-bold transition-colors"
                    >
                      Send booking request on WhatsApp
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        reset();
                        setOpen(false);
                      }}
                      className="inline-flex items-center justify-center h-11 w-full rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-white/10 pb-[calc(env(safe-area-inset-bottom)+16px)]">
                <button
                  type="button"
                  onClick={() => setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3 | 4) : prev))}
                  className="inline-flex items-center gap-2 h-11 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-colors disabled:opacity-40"
                  disabled={step === 1}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => setStep((prev) => ((prev + 1) as 2 | 3 | 4))}
                    className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-sm font-bold transition-colors disabled:opacity-40"
                    disabled={!canContinue}
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-sm font-bold transition-colors"
                  >
                    WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
