"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// ─── Constants ───────────────────────────────────────────────────────────────

const SEX_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "intersex", label: "Intersex" },
  { value: "other", label: "Other" },
  { value: "unknown", label: "Prefer not to say" },
];

const PRONOUN_OPTIONS = ["He/Him", "She/Her", "They/Them", "Other"];

const CONTACT_METHODS = ["Phone", "Email", "SMS"];

const RACE_ETHNICITY_OPTIONS = [
  "White/Caucasian",
  "Black/African American",
  "Hispanic/Latino",
  "Asian",
  "Middle Eastern/North African",
  "Native American",
  "Pacific Islander",
  "Prefer not to say",
];

const HEALTH_RATING_OPTIONS = [
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" },
  { value: "unsure", label: "Unsure" },
];

const PREDEFINED_CONDITIONS = [
  "Hypertension",
  "Diabetes (Type 1 / Type 2)",
  "Asthma / COPD",
  "Heart Disease",
  "Thyroid Disorder",
  "Autoimmune Condition",
  "Anxiety / Depression",
  "Chronic Pain",
  "GERD / GI Issues",
  "Kidney Disease",
  "Cancer (current/history)",
  "High Cholesterol",
];

const FAMILY_CONDITIONS = [
  "Heart Disease",
  "Diabetes",
  "Cancer",
  "Stroke",
  "Mental Health Conditions",
  "Autoimmune Disease",
];

const TOBACCO_OPTIONS = [
  "Never",
  "Former smoker",
  "Current smoker",
  "Vape/e-cigarette",
  "Smokeless tobacco",
];

const ALCOHOL_OPTIONS = [
  "None",
  "Occasional (<1x/week)",
  "Moderate (1-7 drinks/week)",
  "Heavy (>7 drinks/week)",
];

const SUBSTANCE_OPTIONS = [
  "None",
  "Cannabis",
  "Other",
  "Prefer not to say",
];

const LIVING_SITUATION_OPTIONS = [
  "Alone",
  "With partner/spouse",
  "With family",
  "With roommates",
  "Other",
];

const MENTAL_HEALTH_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself",
  "Trouble concentrating on things",
  "Feeling anxious, nervous, or on edge",
  "Not being able to stop or control worrying",
];

const SCORE_LABELS = [
  "Not at all",
  "Several days",
  "More than half the days",
  "Nearly every day",
];

const CONSENT_ITEMS = [
  {
    type: "consent_to_treatment",
    label:
      "I consent to receive medical care and health coaching services from bloom360 providers via telehealth.",
    heading: "Consent to Treatment",
  },
  {
    type: "hipaa_authorization",
    label:
      "I acknowledge receipt of bloom360's Notice of Privacy Practices and consent to the use and disclosure of my health information for treatment, payment, and operations.",
    heading: "HIPAA Authorization",
  },
  {
    type: "telehealth_consent",
    label:
      "I understand that telehealth services involve electronic communication and consent to receive care via video, phone, and secure messaging.",
    heading: "Telehealth Consent",
  },
  {
    type: "membership_agreement",
    label:
      "I agree to the terms and conditions of the bloom360 Direct Primary Care membership, including the monthly membership fee and cancellation policy.",
    heading: "Membership Agreement",
  },
  {
    type: "release_of_records",
    label:
      "I authorize bloom360 to obtain medical records from prior healthcare providers as needed for my care.",
    heading: "Release of Records",
  },
  {
    type: "communication_consent",
    label:
      "I consent to receive appointment reminders, health tips, and care communications from Bloom360 via phone, email, and/or SMS. Message frequency varies, up to 10 messages per month. Reply STOP to unsubscribe. Reply HELP for help. Msg & data rates may apply. My mobile opt-in data will not be shared with third parties. US carriers are not liable for delayed or undelivered messages.",
    heading: "Communication Consent",
  },
];

const STEPS = [
  { number: 1, label: "About You" },
  { number: 2, label: "Health Goals" },
  { number: 3, label: "Medical History" },
  { number: 4, label: "Lifestyle" },
  { number: 5, label: "Mental Health" },
  { number: 6, label: "Consents" },
];

// ─── Types ───────────────────────────────────────────────────────────────────

interface ConditionState {
  checked: boolean;
  medicationName: string;
  dose: string;
  frequency: string;
}

interface OtherCondition {
  name: string;
  medicationName: string;
  dose: string;
  frequency: string;
}

interface FormState {
  // Demographics
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: string;
  genderIdentity: string;
  pronouns: string;
  preferredLanguage: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  phoneMobile: string;
  phoneHome: string;
  email: string;
  preferredContactMethod: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  raceEthnicity: string[];
  // Health Goals
  primaryGoals: string;
  firstVisitConcerns: string;
  overallHealthRating: string;
  // Medical History
  primaryCarePhysician: string;
  lastPhysicalExamDate: string;
  height: string;
  weight: string;
  hasNoConditions: boolean;
  conditions: Record<string, ConditionState>;
  otherConditions: OtherCondition[];
  surgicalHistory: string;
  medAllergen: string;
  medAllergyReaction: string;
  envAllergen: string;
  envAllergyReaction: string;
  familyConditions: string[];
  familyOtherHistory: string;
  // Social History
  tobaccoUse: string;
  alcoholUse: string;
  substanceUse: string[];
  substanceUseOther: string;
  sleepHours: string;
  stressLevel: string;
  occupation: string;
  workEnvironment: string;
  livingSituation: string;
  // Mental Health
  mhResponses: (number | null)[];
  seeingProvider: string;
  // Consents
  consentChecks: Record<string, boolean>;
  signatureText: string;
  dateSigned: string;
  printedName: string;
}

function createInitialState(): FormState {
  const conditions: Record<string, ConditionState> = {};
  PREDEFINED_CONDITIONS.forEach((c) => {
    conditions[c] = { checked: false, medicationName: "", dose: "", frequency: "" };
  });
  const consentChecks: Record<string, boolean> = {};
  CONSENT_ITEMS.forEach((c) => {
    consentChecks[c.type] = false;
  });
  return {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    sex: "",
    genderIdentity: "",
    pronouns: "",
    preferredLanguage: "",
    addressStreet: "",
    addressCity: "",
    addressState: "",
    addressZip: "",
    phoneMobile: "",
    phoneHome: "",
    email: "",
    preferredContactMethod: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    raceEthnicity: [],
    primaryGoals: "",
    firstVisitConcerns: "",
    overallHealthRating: "",
    primaryCarePhysician: "",
    lastPhysicalExamDate: "",
    height: "",
    weight: "",
    hasNoConditions: false,
    conditions,
    otherConditions: [{ name: "", medicationName: "", dose: "", frequency: "" }],
    surgicalHistory: "",
    medAllergen: "",
    medAllergyReaction: "",
    envAllergen: "",
    envAllergyReaction: "",
    familyConditions: [],
    familyOtherHistory: "",
    tobaccoUse: "",
    alcoholUse: "",
    substanceUse: [],
    substanceUseOther: "",
    sleepHours: "",
    stressLevel: "",
    occupation: "",
    workEnvironment: "",
    livingSituation: "",
    mhResponses: new Array(MENTAL_HEALTH_QUESTIONS.length).fill(null),
    seeingProvider: "",
    consentChecks,
    signatureText: "",
    dateSigned: "",
    printedName: "",
  };
}

// ─── Reusable styled components ─────────────────────────────────────────────

function Input({
  label,
  required,
  ...props
}: {
  label?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm text-ink-light">
          {label}
          {required && <span className="text-warm ml-0.5">*</span>}
        </label>
      )}
      <input
        {...props}
        className={`w-full rounded-lg border border-ink/10 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 outline-none transition-all focus:border-sage focus:ring-1 focus:ring-sage/30 ${props.className ?? ""}`}
      />
    </div>
  );
}

function Select({
  label,
  required,
  options,
  ...props
}: {
  label?: string;
  required?: boolean;
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm text-ink-light">
          {label}
          {required && <span className="text-warm ml-0.5">*</span>}
        </label>
      )}
      <select
        {...props}
        className={`w-full rounded-lg border border-ink/10 bg-cream px-4 py-3 text-sm text-ink outline-none transition-all focus:border-sage focus:ring-1 focus:ring-sage/30 appearance-none ${props.className ?? ""}`}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Textarea({
  label,
  ...props
}: {
  label?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm text-ink-light">{label}</label>
      )}
      <textarea
        {...props}
        className={`w-full rounded-lg border border-ink/10 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 outline-none transition-all focus:border-sage focus:ring-1 focus:ring-sage/30 resize-none ${props.className ?? ""}`}
      />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-medium tracking-[0.15em] uppercase text-ink-muted mb-4">
      {children}
    </h3>
  );
}

// ─── Step Components ─────────────────────────────────────────────────────────

function StepDemographics({
  state,
  setState,
}: {
  state: FormState;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  const set = useCallback(
    (field: keyof FormState, value: string | boolean) =>
      setState((s) => ({ ...s, [field]: value })),
    [setState]
  );

  const toggleRace = useCallback(
    (option: string) =>
      setState((s) => ({
        ...s,
        raceEthnicity: s.raceEthnicity.includes(option)
          ? s.raceEthnicity.filter((r) => r !== option)
          : [...s.raceEthnicity, option],
      })),
    [setState]
  );

  const computedAge = useMemo(() => {
    if (!state.dateOfBirth) return null;
    const dob = new Date(state.dateOfBirth + "T00:00:00");
    if (isNaN(dob.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age--;
    return age >= 0 ? age : null;
  }, [state.dateOfBirth]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl mb-2">Tell us about yourself</h2>
        <p className="text-ink-muted">
          Basic information so your care team knows who you are from the start.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="First Name" required value={state.firstName} onChange={(e) => set("firstName", e.target.value)} />
        <Input label="Last Name" required value={state.lastName} onChange={(e) => set("lastName", e.target.value)} />
        <Input label="Date of Birth" required type="date" value={state.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)} />
        <Input label="Age" value={computedAge !== null ? `${computedAge} years` : ""} disabled className="!bg-cream-dark" />
        <Select label="Sex Assigned at Birth" required options={SEX_OPTIONS} value={state.sex} onChange={(e) => set("sex", e.target.value)} />
        <Input label="Gender Identity" value={state.genderIdentity} onChange={(e) => set("genderIdentity", e.target.value)} placeholder="Optional" />
        <Select
          label="Preferred Pronouns"
          options={PRONOUN_OPTIONS.map((p) => ({ value: p, label: p }))}
          value={state.pronouns}
          onChange={(e) => set("pronouns", e.target.value)}
        />
        <Input label="Preferred Language" value={state.preferredLanguage} onChange={(e) => set("preferredLanguage", e.target.value)} placeholder="e.g. English, Spanish" />
      </div>

      <div>
        <SectionHeading>Home Address</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <Input label="Street" required value={state.addressStreet} onChange={(e) => set("addressStreet", e.target.value)} />
          </div>
          <Input label="City" required value={state.addressCity} onChange={(e) => set("addressCity", e.target.value)} />
          <div className="grid grid-cols-2 gap-5">
            <Input label="State" required value={state.addressState} onChange={(e) => set("addressState", e.target.value)} />
            <Input label="ZIP" required value={state.addressZip} onChange={(e) => set("addressZip", e.target.value)} />
          </div>
        </div>
      </div>

      <div>
        <SectionHeading>Contact Information</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input label="Phone (Mobile)" required type="tel" value={state.phoneMobile} onChange={(e) => set("phoneMobile", e.target.value)} />
          <Input label="Phone (Home/Other)" type="tel" value={state.phoneHome} onChange={(e) => set("phoneHome", e.target.value)} />
          <Input label="Email Address" type="email" value={state.email} onChange={(e) => set("email", e.target.value)} />
          <Select
            label="Preferred Contact Method"
            options={CONTACT_METHODS.map((m) => ({ value: m, label: m }))}
            value={state.preferredContactMethod}
            onChange={(e) => set("preferredContactMethod", e.target.value)}
          />
        </div>
      </div>

      <div>
        <SectionHeading>Emergency Contact</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Input label="Name" required value={state.emergencyContactName} onChange={(e) => set("emergencyContactName", e.target.value)} />
          <Input label="Phone" required type="tel" value={state.emergencyContactPhone} onChange={(e) => set("emergencyContactPhone", e.target.value)} />
          <Input label="Relationship" required value={state.emergencyContactRelationship} onChange={(e) => set("emergencyContactRelationship", e.target.value)} />
        </div>
      </div>

      <div>
        <SectionHeading>Race / Ethnicity</SectionHeading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {RACE_ETHNICITY_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-2.5 text-sm text-ink-light cursor-pointer group">
              <input
                type="checkbox"
                checked={state.raceEthnicity.includes(option)}
                onChange={() => toggleRace(option)}
                className="rounded border-ink/20 text-sage focus:ring-sage/30"
              />
              <span className="group-hover:text-ink transition-colors">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepHealthGoals({
  state,
  setState,
}: {
  state: FormState;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  const set = useCallback(
    (field: keyof FormState, value: string) =>
      setState((s) => ({ ...s, [field]: value })),
    [setState]
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl mb-2">
          What are you hoping to achieve?
        </h2>
        <p className="text-ink-muted">
          Understanding your goals helps us build a care plan around what matters most to you.
        </p>
      </div>

      <Textarea
        label="Primary Health Goals"
        value={state.primaryGoals}
        onChange={(e) => set("primaryGoals", e.target.value)}
        placeholder="What are your primary health goals? (e.g., manage weight, improve sleep, reduce stress)"
        rows={4}
      />
      <Textarea
        label="Concerns for Your First Visit"
        value={state.firstVisitConcerns}
        onChange={(e) => set("firstVisitConcerns", e.target.value)}
        placeholder="Any specific concerns you'd like to address during your first visit?"
        rows={4}
      />
      <div>
        <label className="block text-sm text-ink-light mb-3">
          How would you rate your overall health?
        </label>
        <div className="flex flex-wrap gap-3">
          {HEALTH_RATING_OPTIONS.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => set("overallHealthRating", option.value)}
              className={`px-5 py-2.5 rounded-full text-sm border transition-all ${
                state.overallHealthRating === option.value
                  ? "bg-sage text-cream border-sage"
                  : "border-ink/10 text-ink-light hover:border-sage/40"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepMedicalHistory({
  state,
  setState,
}: {
  state: FormState;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  const set = useCallback(
    (field: keyof FormState, value: string | boolean) =>
      setState((s) => ({ ...s, [field]: value })),
    [setState]
  );

  const updateCondition = useCallback(
    (name: string, field: keyof ConditionState, value: string | boolean) =>
      setState((s) => ({
        ...s,
        conditions: {
          ...s.conditions,
          [name]: { ...s.conditions[name], [field]: value },
        },
      })),
    [setState]
  );

  const updateOtherCondition = useCallback(
    (index: number, field: keyof OtherCondition, value: string) =>
      setState((s) => ({
        ...s,
        otherConditions: s.otherConditions.map((oc, i) =>
          i === index ? { ...oc, [field]: value } : oc
        ),
      })),
    [setState]
  );

  const toggleFamilyCondition = useCallback(
    (cond: string) =>
      setState((s) => ({
        ...s,
        familyConditions: s.familyConditions.includes(cond)
          ? s.familyConditions.filter((c) => c !== cond)
          : [...s.familyConditions, cond],
      })),
    [setState]
  );

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl mb-2">Your medical history</h2>
        <p className="text-ink-muted">
          This helps your physician understand your health background and coordinate the right care.
        </p>
      </div>

      {/* Current Health Status */}
      <div>
        <SectionHeading>Current Health Status</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input label="Primary Care Physician" value={state.primaryCarePhysician} onChange={(e) => set("primaryCarePhysician", e.target.value)} />
          <Input label="Last Physical Exam Date" type="date" value={state.lastPhysicalExamDate} onChange={(e) => set("lastPhysicalExamDate", e.target.value)} />
          <Input label="Height" value={state.height} onChange={(e) => set("height", e.target.value)} placeholder="e.g. 5'10&quot; or 178 cm" />
          <Input label="Weight" value={state.weight} onChange={(e) => set("weight", e.target.value)} placeholder="e.g. 170 lbs or 77 kg" />
        </div>
      </div>

      {/* Active Medical Conditions */}
      <div>
        <SectionHeading>Active Medical Conditions & Medications</SectionHeading>
        <label className="flex items-center gap-2.5 text-sm text-ink-light cursor-pointer mb-5">
          <input
            type="checkbox"
            checked={state.hasNoConditions}
            onChange={(e) => set("hasNoConditions", e.target.checked)}
            className="rounded border-ink/20 text-sage focus:ring-sage/30"
          />
          None &mdash; I have no active medical conditions
        </label>

        {!state.hasNoConditions && (
          <div className="space-y-3">
            {PREDEFINED_CONDITIONS.map((condName) => {
              const cond = state.conditions[condName];
              return (
                <div key={condName} className="rounded-lg border border-ink/5 bg-cream p-4">
                  <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cond.checked}
                      onChange={(e) => updateCondition(condName, "checked", e.target.checked)}
                      className="rounded border-ink/20 text-sage focus:ring-sage/30"
                    />
                    <span className="text-ink">{condName}</span>
                  </label>
                  {cond.checked && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 ml-7">
                      <Input placeholder="Medication Name" value={cond.medicationName} onChange={(e) => updateCondition(condName, "medicationName", e.target.value)} />
                      <Input placeholder="Dose" value={cond.dose} onChange={(e) => updateCondition(condName, "dose", e.target.value)} />
                      <Input placeholder="Frequency" value={cond.frequency} onChange={(e) => updateCondition(condName, "frequency", e.target.value)} />
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mt-4">
              <p className="text-sm text-ink-muted mb-3">Other Conditions</p>
              {state.otherConditions.map((other, index) => (
                <div key={index} className="rounded-lg border border-ink/5 bg-cream p-4 mb-2">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <Input placeholder="Condition Name" value={other.name} onChange={(e) => updateOtherCondition(index, "name", e.target.value)} />
                    <Input placeholder="Medication Name" value={other.medicationName} onChange={(e) => updateOtherCondition(index, "medicationName", e.target.value)} />
                    <Input placeholder="Dose" value={other.dose} onChange={(e) => updateOtherCondition(index, "dose", e.target.value)} />
                    <Input placeholder="Frequency" value={other.frequency} onChange={(e) => updateOtherCondition(index, "frequency", e.target.value)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Surgical History */}
      <div>
        <SectionHeading>Surgical & Hospitalization History</SectionHeading>
        <Textarea
          value={state.surgicalHistory}
          onChange={(e) => set("surgicalHistory", e.target.value)}
          placeholder="List any prior surgeries or hospitalizations (procedure, year)"
          rows={3}
        />
      </div>

      {/* Allergies */}
      <div>
        <SectionHeading>Allergies</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input label="Medication Allergies" value={state.medAllergen} onChange={(e) => set("medAllergen", e.target.value)} />
          <Input label="Reaction" value={state.medAllergyReaction} onChange={(e) => set("medAllergyReaction", e.target.value)} />
          <Input label="Food / Environmental Allergies" value={state.envAllergen} onChange={(e) => set("envAllergen", e.target.value)} />
          <Input label="Reaction" value={state.envAllergyReaction} onChange={(e) => set("envAllergyReaction", e.target.value)} />
        </div>
      </div>

      {/* Family History */}
      <div>
        <SectionHeading>Family Medical History</SectionHeading>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {FAMILY_CONDITIONS.map((cond) => (
            <label key={cond} className="flex items-center gap-2.5 text-sm text-ink-light cursor-pointer group">
              <input
                type="checkbox"
                checked={state.familyConditions.includes(cond)}
                onChange={() => toggleFamilyCondition(cond)}
                className="rounded border-ink/20 text-sage focus:ring-sage/30"
              />
              <span className="group-hover:text-ink transition-colors">{cond}</span>
            </label>
          ))}
        </div>
        <Textarea
          value={state.familyOtherHistory}
          onChange={(e) => set("familyOtherHistory", e.target.value)}
          placeholder="Other relevant family history"
          rows={2}
        />
      </div>
    </div>
  );
}

function StepSocialHistory({
  state,
  setState,
}: {
  state: FormState;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  const set = useCallback(
    (field: keyof FormState, value: string) =>
      setState((s) => ({ ...s, [field]: value })),
    [setState]
  );

  const toggleSubstance = useCallback(
    (option: string) =>
      setState((s) => ({
        ...s,
        substanceUse: s.substanceUse.includes(option)
          ? s.substanceUse.filter((su) => su !== option)
          : [...s.substanceUse, option],
      })),
    [setState]
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl mb-2">Lifestyle & social history</h2>
        <p className="text-ink-muted">
          Your habits and environment matter. This helps us give you well-rounded care.
        </p>
      </div>

      {/* Tobacco */}
      <div>
        <label className="block text-sm text-ink-light mb-3">Tobacco Use</label>
        <div className="flex flex-wrap gap-2">
          {TOBACCO_OPTIONS.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => set("tobaccoUse", option)}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                state.tobaccoUse === option
                  ? "bg-sage text-cream border-sage"
                  : "border-ink/10 text-ink-light hover:border-sage/40"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Alcohol */}
      <div>
        <label className="block text-sm text-ink-light mb-3">Alcohol Use</label>
        <div className="flex flex-wrap gap-2">
          {ALCOHOL_OPTIONS.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => set("alcoholUse", option)}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                state.alcoholUse === option
                  ? "bg-sage text-cream border-sage"
                  : "border-ink/10 text-ink-light hover:border-sage/40"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Substance Use */}
      <div>
        <label className="block text-sm text-ink-light mb-3">Recreational / Substance Use</label>
        <div className="flex flex-wrap gap-2">
          {SUBSTANCE_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm text-ink-light cursor-pointer group">
              <input
                type="checkbox"
                checked={state.substanceUse.includes(option)}
                onChange={() => toggleSubstance(option)}
                className="rounded border-ink/20 text-sage focus:ring-sage/30"
              />
              <span className="group-hover:text-ink transition-colors">{option}</span>
            </label>
          ))}
        </div>
        {state.substanceUse.includes("Other") && (
          <div className="mt-3">
            <Input placeholder="Please specify..." value={state.substanceUseOther} onChange={(e) => set("substanceUseOther", e.target.value)} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="Average Sleep (hours/night)" type="number" min={0} max={24} value={state.sleepHours} onChange={(e) => set("sleepHours", e.target.value)} />
        <Input label="Stress Level (1-10)" type="number" min={1} max={10} value={state.stressLevel} onChange={(e) => set("stressLevel", e.target.value)} />
        <Input label="Occupation / Industry" value={state.occupation} onChange={(e) => set("occupation", e.target.value)} />
        <Input label="Work Environment" value={state.workEnvironment} onChange={(e) => set("workEnvironment", e.target.value)} />
      </div>

      {/* Living Situation */}
      <div>
        <label className="block text-sm text-ink-light mb-3">Living Situation</label>
        <div className="flex flex-wrap gap-2">
          {LIVING_SITUATION_OPTIONS.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => set("livingSituation", option)}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                state.livingSituation === option
                  ? "bg-sage text-cream border-sage"
                  : "border-ink/10 text-ink-light hover:border-sage/40"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepMentalHealth({
  state,
  setState,
}: {
  state: FormState;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  const setMhResponse = useCallback(
    (index: number, value: number) =>
      setState((s) => ({
        ...s,
        mhResponses: s.mhResponses.map((r, i) => (i === index ? value : r)),
      })),
    [setState]
  );

  const mhTotal = useMemo(
    () => state.mhResponses.reduce<number>((sum, val) => sum + (val ?? 0), 0),
    [state.mhResponses]
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl mb-2">Mental health screening</h2>
        <p className="text-ink-muted">
          Over the last 2 weeks, how often have you been bothered by any of the following? This is a standard PHQ/GAD screening.
        </p>
      </div>

      <div className="space-y-4">
        {MENTAL_HEALTH_QUESTIONS.map((question, qIdx) => (
          <div key={qIdx} className="rounded-lg border border-ink/5 bg-cream p-5">
            <p className="text-sm text-ink mb-3">
              {qIdx + 1}. {question}
            </p>
            <div className="flex flex-wrap gap-2">
              {SCORE_LABELS.map((label, score) => (
                <button
                  type="button"
                  key={score}
                  onClick={() => setMhResponse(qIdx, score)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                    state.mhResponses[qIdx] === score
                      ? "bg-sage text-cream border-sage"
                      : "border-ink/10 text-ink-muted hover:border-sage/40"
                  }`}
                >
                  {label} ({score})
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-lg bg-sage-50 p-4">
        <span className="text-sm text-ink-light">Total Score</span>
        <span className="text-2xl font-serif text-sage">{mhTotal} <span className="text-sm text-ink-muted font-sans">/ 27</span></span>
      </div>

      <div>
        <label className="block text-sm text-ink-light mb-3">
          Are you currently seeing a mental health provider?
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "interested", label: "Interested in a referral" },
          ].map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() =>
                setState((s) => ({ ...s, seeingProvider: option.value }))
              }
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                state.seeingProvider === option.value
                  ? "bg-sage text-cream border-sage"
                  : "border-ink/10 text-ink-light hover:border-sage/40"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepConsents({
  state,
  setState,
}: {
  state: FormState;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  const toggleConsent = useCallback(
    (type: string) =>
      setState((s) => ({
        ...s,
        consentChecks: {
          ...s.consentChecks,
          [type]: !s.consentChecks[type],
        },
      })),
    [setState]
  );

  const set = useCallback(
    (field: keyof FormState, value: string) =>
      setState((s) => ({ ...s, [field]: value })),
    [setState]
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl mb-2">Consents & agreements</h2>
        <p className="text-ink-muted">
          Please review and acknowledge each item below to complete your intake.
        </p>
      </div>

      <div className="space-y-3">
        {CONSENT_ITEMS.map((item) => (
          <label
            key={item.type}
            className={`flex items-start gap-4 p-5 rounded-lg border cursor-pointer transition-all ${
              state.consentChecks[item.type]
                ? "border-sage/30 bg-sage-50"
                : "border-ink/5 bg-cream hover:border-ink/15"
            }`}
          >
            <input
              type="checkbox"
              checked={state.consentChecks[item.type]}
              onChange={() => toggleConsent(item.type)}
              className="rounded border-ink/20 text-sage focus:ring-sage/30 mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="text-sm font-medium text-ink mb-1">{item.heading}</p>
              <p className="text-sm text-ink-muted leading-relaxed">{item.label}</p>
            </div>
          </label>
        ))}
      </div>

      <div>
        <SectionHeading>Signature</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Input
            label="Patient / Guardian Signature"
            required
            value={state.signatureText}
            onChange={(e) => set("signatureText", e.target.value)}
            placeholder="Full legal name"
          />
          <Input
            label="Date Signed"
            type="date"
            value={state.dateSigned}
            onChange={(e) => set("dateSigned", e.target.value)}
          />
          <Input
            label="Printed Name (if signing for minor)"
            value={state.printedName}
            onChange={(e) => set("printedName", e.target.value)}
            placeholder="Only if signing on behalf of someone"
          />
        </div>
      </div>

      <p className="text-xs text-ink-muted leading-relaxed mt-6">
        By submitting this form, you agree to our{" "}
        <a href="/privacy" className="underline hover:text-ink">Privacy Policy</a>{" "}
        and{" "}
        <a href="/terms" className="underline hover:text-ink">Terms of Service</a>
        . For help or questions, contact{" "}
        <a href="mailto:care@bloom360.com" className="underline hover:text-ink">care@bloom360.com</a>.
      </p>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function IntakePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<FormState>(createInitialState);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Stub — form doesn't go anywhere yet
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-4xl mb-3">Thank you</h1>
          <p className="text-ink-muted leading-relaxed mb-8">
            Your intake form has been received. Our team will review your information and
            reach out to schedule your first visit.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-full bg-sage text-cream text-sm hover:bg-sage-dark transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-dark">
      {/* Header */}
      <header className="bg-cream border-b border-ink/5">
        <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/emblem.svg" alt="bloom360" width={28} height={28} />
            <span className="font-serif text-xl">bloom360</span>
          </Link>
          <span className="text-sm text-ink-muted">Health Intake Form</span>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setCurrentStep(step.number)}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all ${
                    step.number === currentStep
                      ? "bg-sage text-cream"
                      : step.number < currentStep
                      ? "bg-sage/20 text-sage"
                      : "bg-ink/5 text-ink-muted"
                  }`}
                >
                  {step.number < currentStep ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`text-xs hidden md:block transition-colors ${
                    step.number === currentStep ? "text-sage font-medium" : "text-ink-muted"
                  }`}
                >
                  {step.label}
                </span>
              </button>
            ))}
          </div>
          <div className="w-full bg-ink/5 rounded-full h-1">
            <div
              className="bg-sage h-1 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl border border-ink/5 p-8 md:p-12 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && <StepDemographics state={state} setState={setState} />}
              {currentStep === 2 && <StepHealthGoals state={state} setState={setState} />}
              {currentStep === 3 && <StepMedicalHistory state={state} setState={setState} />}
              {currentStep === 4 && <StepSocialHistory state={state} setState={setState} />}
              {currentStep === 5 && <StepMentalHealth state={state} setState={setState} />}
              {currentStep === 6 && <StepConsents state={state} setState={setState} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
            disabled={currentStep === 1}
            className="px-6 py-3 rounded-full text-sm border border-ink/10 text-ink-light hover:border-ink/25 transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            Back
          </button>
          {currentStep < STEPS.length ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => Math.min(STEPS.length, s + 1))}
              className="px-8 py-3 rounded-full text-sm bg-sage text-cream hover:bg-sage-dark transition-colors"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-3 rounded-full text-sm bg-sage text-cream hover:bg-sage-dark transition-colors"
            >
              Submit Intake Form
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
