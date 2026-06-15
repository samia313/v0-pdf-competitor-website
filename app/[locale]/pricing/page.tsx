'use client'

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import PaymentModal from "@/components/payment-modal";
import { Button } from "@/components/ui/button";
import { CheckCircle, X, Crown, Zap, Building2 } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for occasional use",
    icon: Zap,
    color: "border-border/60",
    btnClass: "border border-primary text-primary hover:bg-primary/10",
    btnVariant: "outline",
    features: [
      { text: "5 files per task", included: true },
      { text: "Up to 100MB file size", included: true },
      { text: "All basic PDF tools", included: true },
      { text: "Ads supported", included: true },
      { text: "Priority processing", included: false },
      { text: "No watermarks", included: false },
      { text: "Batch processing", included: false },
      { text: "API access", included: false },
    ],
  },
  {
    name: "Pro",
    price: { monthly: 5, yearly: 4 },
    description: "For power users & professionals",
    icon: Crown,
    popular: true,
    color: "border-primary shadow-2xl shadow-primary/20",
    btnClass: "bg-primary hover:bg-primary/90 text-white",
    features: [
      { text: "Unlimited files per task", included: true },
      { text: "Up to 2GB file size", included: true },
      { text: "All PDF tools + AI features", included: true },
      { text: "Ad-free experience", included: true },
      { text: "Priority processing", included: true },
      { text: "No watermarks", included: true },
      { text: "Batch processing", included: true },
      { text: "API access", included: false },
    ],
  },
  {
    name: "Business",
    price: { monthly: 10, yearly: 8 },
    description: "For teams & enterprises",
    icon: Building2,
    color: "border-border/60",
    btnClass: "border border-foreground text-foreground hover:bg-secondary",
    btnVariant: "outline",
    features: [
      { text: "Unlimited files per task", included: true },
      { text: "Unlimited file size", included: true },
      { text: "All PDF tools + AI features", included: true },
      { text: "Ad-free experience", included: true },
      { text: "Priority processing", included: true },
      { text: "No watermarks", included: true },
      { text: "Batch processing", included: true },
      { text: "API access", included: true },
    ],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background">
      {selectedPlan && (
        <PaymentModal
          plan={{ name: selectedPlan.name, price: yearly ? selectedPlan.price.yearly : selectedPlan.price.monthly }}
          onClose={() => setSelectedPlan(null)}
        />
      )}
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Simple, <span className="text-primary">Transparent Pricing</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">Choose the plan that works best for you.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-secondary rounded-full px-2 py-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${!yearly ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${yearly ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              Yearly
              <span className="ml-1.5 text-xs bg-green-500/20 text-green-600 px-1.5 py-0.5 rounded-full">-20%</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = yearly ? plan.price.yearly : plan.price.monthly;
            return (
              <div key={plan.name} className={`relative rounded-2xl border-2 ${plan.color} bg-card p-8 flex flex-col`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl ${plan.popular ? "bg-primary/20" : "bg-secondary"} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">${price}</span>
                  {price > 0 && <span className="text-muted-foreground text-sm ml-1">/ month</span>}
                  {price === 0 && <span className="text-muted-foreground text-sm ml-1">Forever free</span>}
                </div>

                <Button
                  className={`w-full h-11 font-semibold mb-8 ${plan.btnClass}`}
                  onClick={() => price > 0 && setSelectedPlan(plan)}
                >
                  {price === 0 ? "Get Started Free" : "Activate " + plan.name}
                </Button>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2.5">
                      {f.included
                        ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        : <X className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5" />}
                      <span className={`text-sm ${f.included ? "text-foreground" : "text-muted-foreground/50"}`}>{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground text-sm">
            Have questions? <a href="mailto:support@pdfilio.com" className="text-primary hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
