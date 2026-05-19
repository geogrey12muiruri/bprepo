"use client";

import React, { useMemo, useState } from "react";
import { Heading } from "@/components/ui/Heading";
import {
  CheckCircle2,
  Clock,
  Compass,
  Mail,
  MapPin,
  Phone,
  Ship,
  Ticket,
  Wallet,
} from "lucide-react";
import { FORT_JESUS_TRIP_CONTENT } from "@/content/trips/fort-jesus-trip";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/constants/contacts";
import { TripPlannerWizard } from "@/components/trips/TripPlannerWizard";

interface HopOnHopOffSectionProps {
  readonly variant?: "light" | "dark";
}

export function HopOnHopOffSection({ variant = "light" }: HopOnHopOffSectionProps) {
  const isDark = variant === "dark";
  const { hopOnHopOff, stopOvers } = FORT_JESUS_TRIP_CONTENT;

  /* ── Colour helpers ────────────────────────────────────────────────── */
  const textPrimary  = isDark ? "text-white"      : "text-neutral-950";
  const textBody     = isDark ? "text-white/85"   : "text-neutral-700";
  const textMuted    = isDark ? "text-white/50"   : "text-neutral-500";
  const textAccent   = isDark ? "text-teal-300"   : "text-brand-blue";
  const borderLight  = isDark ? "border-white/12" : "border-neutral-200";
  const borderFaint  = isDark ? "border-white/8"  : "border-neutral-100";
  const bgPill       = isDark ? "bg-white/[0.04]" : "bg-neutral-100";
  const bgCard       = isDark ? "bg-white/[0.03]" : "bg-white";
  const sectionLabel = isDark ? "text-teal-300"   : "text-brand-blue";
  const tableHeadCls = isDark
    ? "bg-white/[0.04] text-white/70"
    : "bg-neutral-100 text-neutral-600";
  const tableCellCls = (bold: boolean) =>
    isDark
      ? (bold ? "text-white/90 font-semibold" : "text-white/80")
      : (bold ? "text-neutral-800 font-semibold" : "text-neutral-700");
  const linkCls = isDark ? "text-teal-300 hover:text-teal-200" : "text-brand-blue hover:text-blue-900";

  /* ── Quick details card ────────────────────────────────────────────── */
  const quickDetails = [
    { icon: MapPin, label: "Hop on anywhere",  value: "Any stop on the route" },
    { icon: Wallet, label: "Pay on board",      value: "Cash or M-Pesa"    },
    { icon: Ticket, label: "From",              value: "KES 500"           },
    { icon: Clock,  label: "Last return",       value: "By 5:30 PM"        },
    { icon: CheckCircle2, label: "Children 5-15", value: "50% off"         },
    { icon: CheckCircle2, label: "Under 5",      value: "Free"              },
  ];

  /* ═══════════════════════════════════════════════════════════════════════
   * LIVE MINI-FARE TALLY
   * ─────────────────────────────────────────────────────────────────────
   * Reuses exactly the same fare rows as TripPlannerWizard so the numbers
   * are always consistent with what the WhatsApp booking will quote.
   * ═══════════════════════════════════════════════════════════════════════ */
  type OneWayFareRow = { readonly stops: number; readonly adultKes: number; readonly childKes: number };
  type ReturnFareRow  = { readonly stops: number; readonly adultKes: number };

  const faresOneWay: readonly OneWayFareRow[] = hopOnHopOff.fares.oneWay;
  const faresReturn: readonly ReturnFareRow[] = hopOnHopOff.fares.returnFares;

  const [tallyStops,    setTallyStops]    = useState(1);
  const [tallyTripType, setTallyTripType] = useState<"one_way" | "return">("one_way");
  const [tallyAdults,   setTallyAdults]   = useState(1);
  const [tallyChildren, setTallyChildren] = useState(0);

  const fareRow = useMemo(
    () => faresOneWay.find((r) => r.stops === tallyStops) ?? null,
    [tallyStops],
  );

  const oneWayTotal = useMemo(
    () => (fareRow ? tallyAdults * fareRow.adultKes + tallyChildren * fareRow.childKes : 0),
    [fareRow, tallyAdults, tallyChildren],
  );

  const returnFareRow = useMemo(
    () => (tallyTripType === "return" ? faresReturn.find((r) => r.stops === tallyStops) ?? null : null),
    [tallyTripType, tallyStops],
  );

  const returnTotal = useMemo(
    () =>
      tallyTripType === "return" && returnFareRow
        ? tallyAdults * returnFareRow.adultKes + tallyChildren * Math.round(returnFareRow.adultKes * 0.5)
        : 0,
    [tallyTripType, returnFareRow, tallyAdults, tallyChildren],
  );

  const bookingDiscount = useMemo(() => {
    const paying = tallyAdults + tallyChildren;
    if (paying >= 4) return { label: "Group/family 20% off", pct: 0.2 };
    if (paying === 2) return { label: "Couple 10% off",    pct: 0.1 };
    return null;
  }, [tallyAdults, tallyChildren]);

  const subtotal   = tallyTripType === "return" ? returnTotal : oneWayTotal;
  const discountAmt = Math.round(subtotal * (bookingDiscount?.pct ?? 0));
  const grandTotal  = Math.max(0, subtotal - discountAmt);
  /* end live tally helpers */

  return (
    <section id="hop-on-hop-off" className="scroll-mt-24">
      <div className="space-y-10 lg:space-y-14">

        {/* ── ROW 1 : Hero copy + Quick Details card ──────────────────── */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:items-stretch">
          {/* Left: copy */}
          <div className={`border-t ${borderLight} pt-6 lg:pt-8`}>
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${sectionLabel}`}>
              Hop-on Hop-off
            </p>
            <Heading level="h2" size="xl" className={`mt-2 max-w-3xl ${textPrimary} !font-bold tracking-tight`}>
              {hopOnHopOff.headline}
            </Heading>
            <p className={`mt-3 max-w-2xl text-sm sm:text-base ${textBody}`}>
              {hopOnHopOff.subtitle}. Travel the Mombasa North Coast like a water matatu, with Fort Jesus as the final stop.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { icon: MapPin,  title: "Hop on anywhere", detail: "Start at Mtwapa, Serena, Bamburi, Nyali, English Point, or any stop along the line." },
                { icon: Wallet,  title: "Pay on board",    detail: "Choose your route, step aboard, then pay only for the stops you travel." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className={`border-l-2 ${isDark ? "border-teal-500/40" : "border-brand-blue"} pl-4`}>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-brand-blue">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </div>
                    <h3 className={`text-sm font-bold ${textPrimary}`}>{item.title}</h3>
                    <p className={`mt-1 text-xs leading-relaxed ${textMuted}`}>{item.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: quick details + planner */}
          <div className={`rounded-2xl border ${borderLight} ${bgCard} p-5 sm:p-6 shadow-sm`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${textMuted}`}>
                  Plan in 10 seconds
                </p>
                <h3 className={`mt-2 text-xl font-bold ${textPrimary}`}>Quick details</h3>
              </div>
              <span className={`rounded-full border ${borderLight} ${bgPill} px-3 py-1 text-xs font-bold ${textAccent}`}>
                From KES 500
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {quickDetails.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className={`flex items-start gap-3 border-t ${borderFaint} pt-3 first:border-t-0 first:pt-0`}>
                    <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${textAccent}`} strokeWidth={1.8} />
                    <div>
                      <p className={`text-[11px] font-semibold uppercase tracking-wide ${textMuted}`}>{item.label}</p>
                      <p className={`text-sm font-semibold ${textPrimary}`}>{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <TripPlannerWizard
              tripName="Fort Jesus Hop-On Hop-Off"
              stops={stopOvers}
              ctaLabel="Plan route now"
              triggerClassName="mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-blue px-5 text-sm font-bold text-white transition-colors hover:bg-blue-900"
            />
          </div>
        </div>

        {/* ── ROW 2 : Route stops + Timetable (+ live fare tally) ───────── */}
        <div className={`border-t ${borderLight} pt-8`}>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${sectionLabel}`}>Route and schedule</p>
              <Heading level="h3" size="md" className={`mt-2 ${textPrimary} !font-semibold`}>
                Stops and timetable, together
              </Heading>
            </div>
            <p className={`text-xs ${textMuted}`}>{hopOnHopOff.routePill} . {hopOnHopOff.footerLine}</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            {/* Stops list */}
            <div>
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {stopOvers.map((stop, idx) => (
                  <div key={stop.id} className={`flex items-center gap-3 border-b ${borderFaint} px-1 py-2.5 last:border-b-0 sm:border-b-0`}>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${bgPill} text-xs font-black ${textAccent}`}>
                      {stop.variant === "final" ? "\u2605" : idx + 1}
                    </span>
                    <span className={`text-sm font-medium ${textPrimary}`}>{stop.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timetable */}
            <div className={`overflow-x-auto border-y ${borderLight} ${bgCard}`}>
              <table className="min-w-[360px] w-full text-left text-sm">
                <thead className={tableHeadCls}>
                  <tr>
                    <th className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em]">Location</th>
                    <th className="px-4 py-3 text-right text-[11px] font-black uppercase tracking-[0.2em]">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {hopOnHopOff.timetable.map((row) => (
                    <tr key={row.label} className={`border-b ${borderLight} last:border-0`}>
                      <td className={`px-4 py-3 ${tableCellCls(false)}`}>{row.label}</td>
                      <td className={`px-4 py-3 text-right font-semibold tabular-nums ${tableCellCls(true)}`}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── LIVE MINI-FARE TALLY ───────────────────────────────────── */}
          <div className="mt-4 rounded-2xl border border-brand-blue/20 bg-brand-blue/[0.035] p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <Ticket className="h-4 w-4 text-brand-blue" strokeWidth={1.8} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue">
                Fare estimate - adjust live
              </span>
            </div>

            {/* Trip type toggle */}
            <div className="flex gap-2 mb-3">
              {(["one_way", "return"] as const).map((tt) => (
                <button
                  key={tt}
                  type="button"
                  onClick={() => setTallyTripType(tt)}
                  className={`h-9 px-3 rounded-lg text-[11px] font-bold transition-all ${
                    tallyTripType === tt
                      ? "bg-brand-blue text-white"
                      : "bg-white border border-neutral-200 text-neutral-700 hover:border-brand-blue/40"
                  }`}
                >
                  {tt === "one_way" ? "One-way" : "Return"}
                </button>
              ))}
            </div>

            {/* Stops selector */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setTallyStops(n)}
                  className={`h-8 px-2.5 rounded-lg text-[11px] font-bold tabular-nums transition-all ${
                    tallyStops === n
                      ? "bg-brand-blue text-white"
                      : "bg-white border border-neutral-200 text-neutral-700 hover:border-brand-blue/40"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            {/* Passenger counters */}
            <div className={`grid grid-cols-2 gap-2 mb-3 ${textBody}`}>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 w-16">Adults</span>
                <button
                  type="button"
                  onClick={() => setTallyAdults(Math.max(1, tallyAdults - 1))}
                  className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 font-bold text-sm hover:bg-neutral-200 transition-colors"
                  aria-label="Decrease adults"
                >-</button>
                <span className="w-6 text-center text-sm font-bold tabular-nums">{tallyAdults}</span>
                <button
                  type="button"
                  onClick={() => setTallyAdults(Math.min(20, tallyAdults + 1))}
                  className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 font-bold text-sm hover:bg-neutral-200 transition-colors"
                  aria-label="Increase adults"
                >+</button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 w-16">Children</span>
                <button
                  type="button"
                  onClick={() => setTallyChildren(Math.max(0, tallyChildren - 1))}
                  className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 font-bold text-sm hover:bg-neutral-200 transition-colors"
                  aria-label="Decrease children"
                >-</button>
                <span className="w-6 text-center text-sm font-bold tabular-nums">{tallyChildren}</span>
                <button
                  type="button"
                  onClick={() => setTallyChildren(Math.min(20, tallyChildren + 1))}
                  className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 font-bold text-sm hover:bg-neutral-200 transition-colors"
                  aria-label="Increase children"
                >+</button>
              </div>
            </div>

            {/* Result */}
            <div className="flex items-baseline justify-between border-t border-brand-blue/15 pt-3">
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${textMuted}`}>
                {tallyTripType === "return" ? "Return" : "One-way"} total
              </span>
              <div className="flex items-baseline gap-2">
                {bookingDiscount && (
                  <span className="text-[9px] font-black uppercase tracking-wider bg-amber-500 text-amber-50 px-1.5 py-0.5 rounded-full">
                    -{Math.round(bookingDiscount.pct * 100)}%
                  </span>
                )}
                <span className="text-2xl font-black tabular-nums text-brand-blue">
                  KES {grandTotal.toLocaleString("en-US")}
                </span>
              </div>
            </div>
            {discountAmt > 0 && (
              <p className="mt-1 text-[10px] text-neutral-600 tabular-nums">
                {bookingDiscount!.label}: -KES {discountAmt.toLocaleString("en-US")} applied
              </p>
            )}

            <TripPlannerWizard
              tripName="Fort Jesus Hop-On Hop-Off"
              stops={stopOvers}
              ctaLabel="Plan full route on WhatsApp"
              triggerClassName="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand-blue px-5 text-xs font-bold text-white transition-colors hover:bg-blue-900"
            />
          </div>
        </div>

        {/* ── ROW 3 : Pricing + Concessions ───────────────────────────── */}
        <div className={`grid gap-8 border-t ${borderLight} pt-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start`}>
          {/* Pricing snapshot */}
          <div>
            <Heading level="h3" size="md" className={`${textPrimary} !font-semibold`}>
              Pricing snapshot
            </Heading>
            <div className={`mt-4 divide-y ${borderLight} border-y ${borderLight}`}>
              {hopOnHopOff.pricingCards.map((card) => (
                <div key={card.label} className="flex items-baseline justify-between gap-4 py-3">
                  <p className={`text-sm font-semibold ${textBody}`}>{card.label}</p>
                  <p className="text-2xl font-black tabular-nums text-brand-blue">
                    KES {card.priceKes.toLocaleString("en-US")}
                  </p>
                </div>
              ))}
            </div>
            <p className={`mt-4 text-sm ${textMuted}`}>{hopOnHopOff.pricingNote}</p>
            <a href="#full-fares" className={`mt-3 inline-flex text-sm font-semibold ${linkCls} transition-colors`}>
              View detailed fare tables
            </a>
          </div>

          {/* How it works + concessions */}
          <div>
            <Heading level="h3" size="md" className={`${textPrimary} !font-semibold`}>
              How it works
            </Heading>
            <ol className="mt-4 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Compass, title: "Choose your stop",  detail: "Board at any of our 9 coastal stops." },
                { icon: Ship,    title: "Step aboard",        detail: "Our crew welcomes you onto the boat." },
                { icon: Ticket,  title: "Pay on board",       detail: "Pay only for the stops you travel." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className={`border-t ${borderLight} pt-4`}>
                    <Icon className={`h-5 w-5 ${textAccent}`} strokeWidth={1.7} />
                    <p className={`mt-3 text-sm font-bold ${textPrimary}`}>{item.title}</p>
                    <p className={`mt-1 text-xs leading-relaxed ${textMuted}`}>{item.detail}</p>
                  </li>
                );
              })}
            </ol>

            <div className="mt-5 grid gap-x-5 gap-y-3 sm:grid-cols-2">
              {hopOnHopOff.concessions.map((concession) => (
                <div key={concession.title} className={`border-l-2 border-brand-blue pl-3`}>
                  <p className={`text-sm font-bold ${textPrimary}`}>{concession.title}</p>
                  <p className={`mt-1 text-xs ${textMuted}`}>{concession.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ROW 4 : Full fare tables ────────────────────────────────── */}
        <div id="full-fares" className={`scroll-mt-24 border-t ${borderLight} pt-8`}>
          <div className="mb-5">
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${sectionLabel}`}>Fare comparison</p>
            <Heading level="h3" size="md" className={`mt-2 ${textPrimary} !font-semibold`}>
              Full fares
            </Heading>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            {/* One-way */}
            <div>
              <Heading level="h4" size="sm" className={`mb-3 ${textPrimary} !font-semibold`}>
                One-way fares
              </Heading>
              <div className={`overflow-x-auto border-y ${borderLight} ${bgCard}`}>
                <table className="min-w-[460px] w-full text-left text-sm">
                  <thead className={tableHeadCls}>
                    <tr>
                      <th className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em]">Stops</th>
                      <th className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em]">Adult</th>
                      <th className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em]">Child 5-15</th>
                      <th className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em]">Under 5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hopOnHopOff.fares.oneWay.map((row) => (
                      <tr
                        key={row.stops}
                        className={`${borderLight} ${"highlight" in row && row.highlight ? "bg-neutral-50 dark:bg-white/[0.03]" : ""}`}
                      >
                        <td className={`px-4 py-3 ${tableCellCls(false)}`}>{row.stops}</td>
                        <td className={`px-4 py-3 font-semibold tabular-nums ${tableCellCls(true)}`}>{row.adultKes.toLocaleString("en-US")}</td>
                        <td className={`px-4 py-3 font-semibold tabular-nums ${tableCellCls(true)}`}>{row.childKes.toLocaleString("en-US")}</td>
                        <td className={`px-4 py-3 ${tableCellCls(false)}`}>{row.under5}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Return */}
            <div>
              <Heading level="h4" size="sm" className={`mb-3 ${textPrimary} !font-semibold`}>
                Return fares
              </Heading>
              <div className={`overflow-x-auto border-y ${borderLight} ${bgCard}`}>
                <table className="min-w-[360px] w-full text-left text-sm">
                  <thead className={tableHeadCls}>
                    <tr>
                      <th className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em]">Stops</th>
                      <th className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em]">Adult</th>
                      <th className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em]">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hopOnHopOff.fares.returnFares.map((row) => (
                      <tr key={`return-${row.stops}`} className={borderLight}>
                        <td className={`px-4 py-3 tabular-nums ${tableCellCls(false)}`}>{row.stops}</td>
                        <td className={`px-4 py-3 font-semibold tabular-nums ${tableCellCls(true)}`}>
                          {row.adultKes.toLocaleString("en-US")}
                        </td>
                        <td className={`px-4 py-3 ${textMuted}`}>
                          {"label" in row && row.label ? row.label : "Child 5-15 pays 50%"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={`mt-3 text-sm ${textMuted}`}>{hopOnHopOff.fares.returnSummary}</p>
            </div>
          </div>
        </div>

        {/* ── ROW 5 : Contact chips ───────────────────────────────────── */}
        <div className={`grid gap-3 border-t ${borderLight} pt-6 sm:grid-cols-3`}>
          <a href={`tel:${PHONE_TEL}`} className={`flex items-center gap-3 rounded-xl border ${borderLight} bg-white p-3 transition-colors hover:bg-neutral-50`}>
            <Phone className="h-4 w-4 text-brand-blue" />
            <span className={`text-sm font-semibold ${textPrimary}`}>{PHONE_DISPLAY}</span>
          </a>
          <a href={`mailto:${EMAIL}`} className={`flex items-center gap-3 rounded-xl border ${borderLight} bg-white p-3 transition-colors hover:bg-neutral-50`}>
            <Mail className="h-4 w-4 text-brand-blue" />
            <span className={`min-w-0 truncate text-sm font-semibold ${textPrimary}`}>{EMAIL}</span>
          </a>
          <a href={SITE_URL} className={`flex items-center gap-3 rounded-xl border ${borderLight} bg-white p-3 transition-colors hover:bg-neutral-50`}>
            <Ship className="h-4 w-4 text-brand-blue" />
            <span className={`min-w-0 truncate text-sm font-semibold ${textPrimary}`}>{SITE_URL}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
