import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Search, Plus, Trash2, Users, Target, Wallet, Sparkles, Bot, X,
  MessageCircle, Download, Globe, AlertTriangle, Home as HomeIcon,
  CheckCircle2, PiggyBank, HandCoins, Receipt, ChevronDown, Pencil,
  TrendingUp, TrendingDown, RefreshCw, Coins
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* Static config                                                     */
/* ---------------------------------------------------------------- */

const CATEGORIES = [
  { id: "food", en: "Food & Drinks", ur: "کھانا پینا", icon: "🍔", color: "#f97316" },
  { id: "transport", en: "Transport", ur: "ٹرانسپورٹ", icon: "🚗", color: "#3b82f6" },
  { id: "utilities", en: "Utilities", ur: "یوٹیلیٹیز", icon: "⚡", color: "#eab308" },
  { id: "home", en: "Home", ur: "گھر", icon: "🏠", color: "#22c55e" },
  { id: "clothes", en: "Clothes", ur: "کپڑے", icon: "👕", color: "#06b6d4" },
  { id: "entertainment", en: "Entertainment", ur: "تفریح", icon: "🎮", color: "#a855f7" },
  { id: "health", en: "Health", ur: "صحت", icon: "⚕️", color: "#ef4444" },
  { id: "education", en: "Education", ur: "تعلیم", icon: "📚", color: "#6366f1" },
  { id: "other", en: "Other", ur: "دیگر", icon: "📦", color: "#94a3b8" },
];

const SAVING_TIPS = {
  food: {
    title: "Food & Drinks", icon: "🍽️", color: "#f97316", bg: "#fff1e6",
    tips: [
      { text: "Cook at home — eating out costs 3-5x more", badge: "30-40% savings" },
      { text: "Plan weekly meals and shop accordingly" },
      { text: "Buy from local markets — 20% cheaper than superstores" },
      { text: "Buy rice, lentils, flour in bulk", badge: "15-20% savings" },
    ],
  },
  transport: {
    title: "Transport", icon: "🚌", color: "#3b82f6", bg: "#e9f0ff",
    tips: [
      { text: "Carpool — share fuel costs with coworkers", badge: "50% fuel savings" },
      { text: "Use motorcycle — 4x less fuel than car" },
      { text: "Walk to nearby places — good for health too" },
    ],
  },
  utilities: {
    title: "Utilities", icon: "⚡", color: "#eab308", bg: "#fff8e1",
    tips: [
      { text: "Switch to LED bulbs — 80% less electricity", badge: "PKR 500-1000/month" },
      { text: "Turn off fans, lights & chargers when not in use" },
      { text: "Use fan instead of AC when possible", badge: "PKR 2000-5000/month" },
    ],
  },
  home: {
    title: "Home", icon: "🏠", color: "#22c55e", bg: "#eafbf0",
    tips: [
      { text: "Review rent/mortgage terms yearly for better rates" },
      { text: "Do small repairs yourself before calling a technician" },
      { text: "Bundle maintenance tasks to save on service visits" },
    ],
  },
  entertainment: {
    title: "Entertainment", icon: "🎮", color: "#a855f7", bg: "#f5edff",
    tips: [
      { text: "Share streaming subscriptions with family", badge: "50-70% savings" },
      { text: "Look for free community events on weekends" },
      { text: "Set a fixed monthly fun budget and stick to it" },
    ],
  },
  clothes: {
    title: "Clothes", icon: "👕", color: "#06b6d4", bg: "#e6fbff",
    tips: [
      { text: "Buy off-season for bigger discounts", badge: "30-50% savings" },
      { text: "Invest in fewer, better-quality basics" },
    ],
  },
};

const T = {
  en: {
    appName: "Expense Tracker", tagline: "Family Finance Manager",
    budget: "Budget", export: "Export", langBtn: "اردو",
    totalExpenses: "Total Expenses", toReceive: "To Receive", toPay: "To Pay",
    records: "records", pending: "pending",
    monthlyBudget: "Monthly Budget", remaining: "remaining",
    search: "Search...", all: "All",
    tabs: { expenses: "Expenses", family: "Family", goals: "Goals", receivable: "Receivable", payable: "Payable", investments: "Investments" },
    invTitle: "Investment Portfolio", addInvestment: "+ Add Investment",
    invTotalInvested: "Total Invested", invCurrentValue: "Current Value", invProfitLoss: "Profit / Loss",
    invGold: "Gold", invBtc: "Bitcoin", invType: "Investment Type", invQuantity: "Quantity",
    invGrams: "Grams", invBtcAmount: "BTC Amount", invInvestedAmount: "Amount Invested (PKR)",
    invDate: "Purchase Date", invRateNow: "Rate now", invPerGram: "/gram", invRefresh: "Refresh Rates",
    invLastUpdated: "Last updated", invFetching: "Fetching live rates…", invRateError: "Couldn't fetch live rates — enter manually below",
    invManualGold: "Manual gold rate (PKR/gram)", invManualBtc: "Manual BTC rate (PKR)",
    invEmpty: "No investments yet — add your gold or BTC holdings", invUp: "up", invDown: "down",
    categoryChart: "Category Chart", hide: "Hide", show: "Show",
    expenseList: "Expense List", addExpense: "+ Add Expense", delete: "Delete",
    familyMembers: "Family Members", addMember: "+ Add Member",
    familyEmpty: "Add family members — earners and dependents",
    aiTitle: "AI Financial Analysis", aiSub: "Claude AI will analyze your data",
    aiStart: "Start AI Analysis", aiEmpty: "Click the button — AI will analyze your expenses",
    aiEmptySub: "Saving tips, risk areas, monthly target", aiThinking: "Analyzing your finances…",
    savingSkills: "Money-Saving Skills", savingSkillsSub: "Practical tips for your top spending categories",
    goalsTitle: "Your Financial Goals", newGoal: "+ New Goal",
    target: "Target", saved: "Saved", complete: "complete",
    timeEstimate: "Time Estimate", monthlyIncome: "Monthly Income", monthlyExpenses: "Monthly Expenses",
    monthlySavings: "Monthly Savings", toAchieveGoal: "to achieve goal", addSavings: "+ Add Savings",
    goalsEmpty: "No goals yet — set one and start saving",
    receivableTitle: "Money I Should Receive", payableTitle: "Money I Need to Pay",
    addRecord: "+ Add Record", noRecords: "No records found",
    settle: "Settle", partial: "Partial", settled: "Settled", paid: "Paid", remainingWord: "Remaining",
    partialPayment: "Partial Payment", whatsapp: "WhatsApp",
    footer1: "Developed with", footer2: "by",
  },
  ur: {
    appName: "خرچہ ٹریکر", tagline: "فیملی فنانس مینیجر",
    budget: "بجٹ", export: "ایکسپورٹ", langBtn: "English",
    totalExpenses: "کل اخراجات", toReceive: "وصول کرنا ہے", toPay: "ادا کرنا ہے",
    records: "ریکارڈز", pending: "زیر التوا",
    monthlyBudget: "ماہانہ بجٹ", remaining: "باقی",
    search: "تلاش کریں...", all: "تمام",
    tabs: { expenses: "اخراجات", family: "خاندان", goals: "اہداف", receivable: "وصولی", payable: "ادائیگی", investments: "سرمایہ کاری" },
    invTitle: "سرمایہ کاری کا پورٹ فولیو", addInvestment: "+ سرمایہ کاری شامل کریں",
    invTotalInvested: "کل سرمایہ کاری", invCurrentValue: "موجودہ مالیت", invProfitLoss: "نفع / نقصان",
    invGold: "سونا", invBtc: "بٹ کوائن", invType: "سرمایہ کاری کی قسم", invQuantity: "مقدار",
    invGrams: "گرام", invBtcAmount: "BTC مقدار", invInvestedAmount: "لگائی گئی رقم (PKR)",
    invDate: "خریداری کی تاریخ", invRateNow: "موجودہ ریٹ", invPerGram: "/گرام", invRefresh: "ریٹس تازہ کریں",
    invLastUpdated: "آخری تازہ کاری", invFetching: "لائیو ریٹس حاصل کیے جا رہے ہیں…", invRateError: "لائیو ریٹ حاصل نہیں ہو سکا — نیچے دستی درج کریں",
    invManualGold: "دستی گولڈ ریٹ (PKR/گرام)", invManualBtc: "دستی BTC ریٹ (PKR)",
    invEmpty: "ابھی تک کوئی سرمایہ کاری نہیں — اپنا سونا یا BTC شامل کریں", invUp: "اضافہ", invDown: "کمی",
    categoryChart: "کیٹیگری چارٹ", hide: "چھپائیں", show: "دکھائیں",
    expenseList: "اخراجات کی فہرست", addExpense: "+ خرچہ شامل کریں", delete: "حذف کریں",
    familyMembers: "خاندان کے افراد", addMember: "+ رکن شامل کریں",
    familyEmpty: "خاندان کے افراد شامل کریں — کمانے والے اور زیر کفالت",
    aiTitle: "AI مالی تجزیہ", aiSub: "Claude AI آپ کا ڈیٹا تجزیہ کرے گا",
    aiStart: "AI تجزیہ شروع کریں", aiEmpty: "بٹن دبائیں — AI آپ کے اخراجات کا تجزیہ کرے گا",
    aiEmptySub: "بچت کے مشورے، خطرے والے شعبے، ماہانہ ہدف", aiThinking: "آپ کے مالیات کا تجزیہ ہو رہا ہے…",
    savingSkills: "پیسے بچانے کی مہارتیں", savingSkillsSub: "آپ کی بڑی خرچ کیٹیگریز کے لیے عملی مشورے",
    goalsTitle: "آپ کے مالی اہداف", newGoal: "+ نیا ہدف",
    target: "ہدف", saved: "جمع شدہ", complete: "مکمل",
    timeEstimate: "وقت کا تخمینہ", monthlyIncome: "ماہانہ آمدنی", monthlyExpenses: "ماہانہ اخراجات",
    monthlySavings: "ماہانہ بچت", toAchieveGoal: "ہدف حاصل کرنے کے لیے", addSavings: "+ بچت شامل کریں",
    goalsEmpty: "ابھی تک کوئی ہدف نہیں — ایک بنائیں اور بچت شروع کریں",
    receivableTitle: "مجھے یہ رقم وصول کرنی ہے", payableTitle: "مجھے یہ رقم ادا کرنی ہے",
    addRecord: "+ ریکارڈ شامل کریں", noRecords: "کوئی ریکارڈ نہیں ملا",
    settle: "طے کریں", partial: "جزوی", settled: "طے شدہ", paid: "ادا شدہ", remainingWord: "باقی",
    partialPayment: "جزوی ادائیگی", whatsapp: "واٹس ایپ",
    footer1: "محبت سے بنایا", footer2: "بذریعہ",
  },
};

const fmt = (n) => "PKR " + Math.round(n || 0).toLocaleString("en-US");
const uid = () => Math.random().toString(36).slice(2, 10);
const todayISO = () => new Date().toISOString().slice(0, 10);
const catInfo = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];

/* ---------------------------------------------------------------- */
/* Reusable bits                                                     */
/* ---------------------------------------------------------------- */

function Card({ children, style, className = "" }) {
  return (
    <div
      className={`rounded-xl bg-white ${className}`}
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)", ...style }}
    >
      {children}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,20,0.45)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-5"
        style={{ maxHeight: "88vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg" style={{ color: "#14532d" }}>{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-medium mb-1" style={{ color: "#6b7280" }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "9px 12px", borderRadius: 10, border: "1px solid #e2e8e4",
  fontSize: 14, outline: "none", boxSizing: "border-box",
};

/* ---------------------------------------------------------------- */
/* Main App                                                           */
/* ---------------------------------------------------------------- */

export default function ExpenseTracker() {
  const [lang, setLang] = useState("en");
  const t = T[lang];
  const dir = lang === "ur" ? "rtl" : "ltr";

  const [tab, setTab] = useState("expenses");
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");

  const [expenses, setExpenses] = useState([]);
  const [family, setFamily] = useState([]);
  const [goals, setGoals] = useState([]);
  const [receivables, setReceivables] = useState([]);
  const [payables, setPayables] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [manualRates, setManualRates] = useState({ gold: "", btc: "" });
  const [rates, setRates] = useState({ goldPerGram: null, btcPkr: null, updatedAt: null, loading: false, error: null });
  const [budget, setBudget] = useState(0);
  const [showChart, setShowChart] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const [modal, setModal] = useState(null); // which add-modal is open
  const [payingId, setPayingId] = useState(null);
  const [payingKind, setPayingKind] = useState(null);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState(null);

  /* ---------------- persistence ---------------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("expense-tracker-state");
        if (res && res.value) {
          const d = JSON.parse(res.value);
          setExpenses(d.expenses || []);
          setFamily(d.family || []);
          setGoals(d.goals || []);
          setReceivables(d.receivables || []);
          setPayables(d.payables || []);
          setInvestments(d.investments || []);
          setManualRates(d.manualRates || { gold: "", btc: "" });
          setBudget(d.budget || 0);
          setLang(d.lang || "en");
        }
      } catch (e) {
        /* no saved state yet */
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const data = { expenses, family, goals, receivables, payables, investments, manualRates, budget, lang };
    window.storage.set("expense-tracker-state", JSON.stringify(data)).catch(() => {});
  }, [expenses, family, goals, receivables, payables, investments, manualRates, budget, lang, loaded]);

  /* ---------------- live market rates ---------------- */
  const fetchRates = useCallback(async () => {
    setRates((r) => ({ ...r, loading: true, error: null }));
    try {
      const [fxRes, goldRes, btcRes] = await Promise.all([
        fetch("https://open.er-api.com/v6/latest/USD"),
        fetch("https://api.gold-api.com/price/XAU"),
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=pkr,usd"),
      ]);
      const fx = await fxRes.json();
      const gold = await goldRes.json();
      const btc = await btcRes.json();

      const usdPkr = fx?.rates?.PKR;
      const goldUsdPerOz = gold?.price;
      let goldPerGram = null;
      if (usdPkr && goldUsdPerOz) goldPerGram = (goldUsdPerOz / 31.1034768) * usdPkr;

      let btcPkr = btc?.bitcoin?.pkr;
      if (!btcPkr && btc?.bitcoin?.usd && usdPkr) btcPkr = btc.bitcoin.usd * usdPkr;

      if (!goldPerGram && !btcPkr) throw new Error("no data");
      setRates({ goldPerGram, btcPkr, updatedAt: new Date().toISOString(), loading: false, error: null });
    } catch (e) {
      setRates((r) => ({ ...r, loading: false, error: "fetch-failed" }));
    }
  }, []);

  useEffect(() => { fetchRates(); }, [fetchRates]);

  const effectiveGoldRate = rates.goldPerGram || Number(manualRates.gold) || 0;
  const effectiveBtcRate = rates.btcPkr || Number(manualRates.btc) || 0;

  /* ---------------- derived numbers ---------------- */
  const totalExpenses = useMemo(() => expenses.reduce((s, e) => s + Number(e.amount), 0), [expenses]);
  const toReceive = useMemo(
    () => receivables.filter((r) => r.status !== "settled").reduce((s, r) => s + (r.amount - (r.paid || 0)), 0),
    [receivables]
  );
  const toPay = useMemo(
    () => payables.filter((r) => r.status !== "settled").reduce((s, r) => s + (r.amount - (r.paid || 0)), 0),
    [payables]
  );
  const budgetRemaining = budget - totalExpenses;
  const budgetPct = budget > 0 ? Math.min(100, (totalExpenses / budget) * 100) : 0;

  const categoryTotals = useMemo(() => {
    const map = {};
    expenses.forEach((e) => { map[e.category] = (map[e.category] || 0) + Number(e.amount); });
    return Object.entries(map)
      .map(([id, total]) => ({ ...catInfo(id), total }))
      .sort((a, b) => b.total - a.total);
  }, [expenses]);

  const topCategoryIds = useMemo(() => {
    const ids = categoryTotals.map((c) => c.id).filter((id) => SAVING_TIPS[id]);
    return ids.length ? ids.slice(0, 3) : ["food", "transport", "utilities"];
  }, [categoryTotals]);

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((e) => (filterCat === "all" ? true : e.category === filterCat))
      .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses, filterCat, search]);

  /* ---------------- actions ---------------- */
  const addExpense = (data) => setExpenses((p) => [{ id: uid(), ...data }, ...p]);
  const deleteExpense = (id) => setExpenses((p) => p.filter((e) => e.id !== id));

  const addMember = (data) => setFamily((p) => [{ id: uid(), ...data }, ...p]);
  const deleteMember = (id) => setFamily((p) => p.filter((m) => m.id !== id));

  const addGoal = (data) => setGoals((p) => [{ id: uid(), saved: 0, monthlyIncome: 0, monthlyExpenses: 0, ...data }, ...p]);
  const deleteGoal = (id) => setGoals((p) => p.filter((g) => g.id !== id));
  const updateGoal = (id, patch) => setGoals((p) => p.map((g) => (g.id === id ? { ...g, ...patch } : g)));

  const addLedgerRecord = (kind, data) => {
    const setter = kind === "receivable" ? setReceivables : setPayables;
    setter((p) => [{ id: uid(), paid: 0, status: "pending", ...data }, ...p]);
  };
  const deleteLedgerRecord = (kind, id) => {
    const setter = kind === "receivable" ? setReceivables : setPayables;
    setter((p) => p.filter((r) => r.id !== id));
  };
  const settleRecord = (kind, id) => {
    const setter = kind === "receivable" ? setReceivables : setPayables;
    setter((p) => p.map((r) => (r.id === id ? { ...r, paid: r.amount, status: "settled" } : r)));
  };
  const addPartialPayment = (kind, id, amount) => {
    const setter = kind === "receivable" ? setReceivables : setPayables;
    setter((p) =>
      p.map((r) => {
        if (r.id !== id) return r;
        const paid = Math.min(r.amount, (r.paid || 0) + amount);
        return { ...r, paid, status: paid >= r.amount ? "settled" : "partial" };
      })
    );
    setPayingId(null);
  };

  const addInvestment = (data) => setInvestments((p) => [{ id: uid(), ...data }, ...p]);
  const deleteInvestment = (id) => setInvestments((p) => p.filter((i) => i.id !== id));

  const investmentTotals = useMemo(() => {
    let invested = 0, current = 0;
    investments.forEach((inv) => {
      invested += Number(inv.investedAmount);
      const rate = inv.type === "gold" ? effectiveGoldRate : effectiveBtcRate;
      current += Number(inv.quantity) * rate;
    });
    return { invested, current, pl: current - invested };
  }, [investments, effectiveGoldRate, effectiveBtcRate]);

  const exportData = () => {
    const data = { expenses, family, goals, receivables, payables, investments, budget, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "expense-tracker-export.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const runAiAnalysis = async () => {
    setAiLoading(true); setAiError(null); setAiResult(null);
    try {
      const summary = categoryTotals.map((c) => `${c.en}: PKR ${Math.round(c.total)}`).join(", ") || "no expenses yet";
      const prompt =
        `You are a friendly family-finance coach for a household in Pakistan. Here is their data:\n` +
        `Total monthly expenses: PKR ${Math.round(totalExpenses)}\n` +
        `Spending by category: ${summary}\n` +
        `Monthly budget: PKR ${Math.round(budget)}\n` +
        `Money owed to them: PKR ${Math.round(toReceive)}, money they owe: PKR ${Math.round(toPay)}\n` +
        `Active savings goals: ${goals.map((g) => `${g.name} (saved PKR ${g.saved} of PKR ${g.target})`).join("; ") || "none"}\n\n` +
        `Give a short, practical analysis in 3 sections with plain headers (no markdown symbols): ` +
        `1) Saving Tips (2-3 bullet points), 2) Risk Areas (1-2 bullet points about overspending categories), ` +
        `3) Suggested Monthly Target (one sentence with a concrete PKR number). Keep the whole answer under 160 words.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const text = (data.content || []).map((b) => b.text || "").join("\n").trim();
      setAiResult(text || "No response received.");
    } catch (e) {
      setAiError("Couldn't reach the AI right now. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const waShare = (name, amount, kind) => {
    const msg =
      kind === "receivable"
        ? `Hi ${name}, a friendly reminder — PKR ${Math.round(amount).toLocaleString()} is still pending. Thanks!`
        : `Hi ${name}, just noting I owe PKR ${Math.round(amount).toLocaleString()} — will settle soon.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  /* ---------------- UI ---------------- */
  return (
    <div dir={dir} style={{ background: "#f3f8f4", minHeight: "100%", fontFamily: "'Inter', system-ui, sans-serif", color: "#1f2937" }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#2f8f52,#155e3a)", padding: "16px 20px" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div
              style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}
            >💰</div>
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: 17, lineHeight: 1.1 }}>{t.appName}</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>{t.tagline}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === "en" ? "ur" : "en")} className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium"
              style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
              <Globe size={14} /> {t.langBtn}
            </button>
            <button onClick={() => setModal("budget")} className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium"
              style={{ background: "#f59e0b", color: "white" }}>
              <AlertTriangle size={14} /> {t.budget}
            </button>
            <button onClick={exportData} className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium"
              style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
              <Download size={14} /> {t.export}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-16 pt-5" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card style={{ borderTop: "3px solid #22c55e", padding: "14px 16px" }}>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{t.totalExpenses}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#16a34a" }}>{fmt(totalExpenses)}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{expenses.length} {t.records}</div>
          </Card>
          <Card style={{ borderTop: "3px solid #3b82f6", padding: "14px 16px" }}>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{t.toReceive}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#2563eb" }}>{fmt(toReceive)}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{receivables.filter((r) => r.status !== "settled").length} {t.pending}</div>
          </Card>
          <Card style={{ borderTop: "3px solid #ef4444", padding: "14px 16px" }}>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{t.toPay}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#dc2626" }}>{fmt(toPay)}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{payables.filter((r) => r.status !== "settled").length} {t.pending}</div>
          </Card>
        </div>

        {/* Budget */}
        <Card style={{ padding: "16px 18px" }}>
          <div className="flex items-center justify-between mb-2">
            <div style={{ fontWeight: 600, fontSize: 14 }}>{t.monthlyBudget}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>{fmt(totalExpenses)} / {fmt(budget)}</div>
          </div>
          <div style={{ height: 8, borderRadius: 6, background: "#e5e7eb", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${budgetPct}%`, background: budgetPct > 90 ? "#ef4444" : "#22c55e", transition: "width .3s" }} />
          </div>
          <div style={{ fontSize: 11, color: budgetRemaining < 0 ? "#dc2626" : "#9ca3af", marginTop: 6 }}>
            {fmt(Math.abs(budgetRemaining))} {budgetRemaining < 0 ? (lang === "ur" ? "زائد خرچ" : "over budget") : t.remaining}
          </div>
        </Card>

        {/* Search + filter */}
        <div className="flex gap-2">
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={15} style={{ position: "absolute", top: 11, [lang === "ur" ? "right" : "left"]: 12, color: "#9ca3af" }} />
            <input
              value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search}
              style={{ ...inputStyle, [lang === "ur" ? "paddingRight" : "paddingLeft"]: 34 }}
            />
          </div>
          <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} style={{ ...inputStyle, width: 130 }}>
            <option value="all">{t.all}</option>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.icon} {lang === "ur" ? c.ur : c.en}</option>)}
          </select>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, background: "white", borderRadius: 12, padding: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", flexWrap: "wrap" }}>
          {[
            ["expenses", "🌿", t.tabs.expenses],
            ["family", "🏠", t.tabs.family],
            ["goals", "🎯", t.tabs.goals],
            ["receivable", "💵", t.tabs.receivable],
            ["payable", "💳", t.tabs.payable],
            ["investments", "📈", t.tabs.investments],
          ].map(([id, icon, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className="flex items-center gap-1 text-sm font-medium"
              style={{
                padding: "8px 12px", borderRadius: 9, flex: "1 1 auto", justifyContent: "center", display: "flex",
                background: tab === id ? "#eafbf0" : "transparent", color: tab === id ? "#15803d" : "#6b7280",
              }}>
              <span>{icon}</span> {label}
            </button>
          ))}
        </div>

        {/* ---------------- Expenses tab ---------------- */}
        {tab === "expenses" && (
          <>
            <Card style={{ padding: "16px 18px" }}>
              <div className="flex items-center justify-between mb-3">
                <div style={{ fontWeight: 600, fontSize: 14 }}>📊 {t.categoryChart}</div>
                <button onClick={() => setShowChart((s) => !s)} style={{ fontSize: 12, color: "#6b7280", border: "1px solid #e5e7eb", borderRadius: 8, padding: "4px 10px" }}>
                  {showChart ? t.hide : t.show} <ChevronDown size={12} style={{ display: "inline", transform: showChart ? "rotate(180deg)" : "none" }} />
                </button>
              </div>
              {showChart && (
                categoryTotals.length ? <DonutChart data={categoryTotals} total={totalExpenses} lang={lang} /> :
                  <div style={{ textAlign: "center", color: "#9ca3af", fontSize: 13, padding: "20px 0" }}>—</div>
              )}
            </Card>

            <Card style={{ padding: "16px 18px" }}>
              <div className="flex items-center justify-between mb-3">
                <div style={{ fontWeight: 600, fontSize: 14 }}>{t.expenseList} ({filteredExpenses.length})</div>
                <button onClick={() => setModal("expense")} style={{ background: "#16a34a", color: "white", fontSize: 13, fontWeight: 500, padding: "7px 14px", borderRadius: 9 }}>
                  {t.addExpense}
                </button>
              </div>
              {filteredExpenses.length === 0 ? (
                <EmptyState icon="🧾" text={t.noRecords} />
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {filteredExpenses.map((e) => (
                    <Row key={e.id}
                      icon={catInfo(e.category).icon}
                      title={e.name}
                      subtitle={new Date(e.date).toLocaleDateString(lang === "ur" ? "ur-PK" : "en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      amount={fmt(e.amount)}
                      amountColor="#dc2626"
                      onDelete={() => deleteExpense(e.id)}
                      deleteLabel={t.delete}
                    />
                  ))}
                </div>
              )}
            </Card>
          </>
        )}

        {/* ---------------- Family tab ---------------- */}
        {tab === "family" && (
          <Card style={{ padding: "16px 18px" }}>
            <div className="flex items-center justify-between mb-3">
              <div style={{ fontWeight: 600, fontSize: 14 }}>{t.familyMembers} ({family.length})</div>
              <button onClick={() => setModal("member")} style={{ background: "#16a34a", color: "white", fontSize: 13, fontWeight: 500, padding: "7px 14px", borderRadius: 9 }}>
                {t.addMember}
              </button>
            </div>
            {family.length === 0 ? (
              <EmptyState icon="👨‍👩‍👧" text={t.familyEmpty} />
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {family.map((m) => (
                  <Row key={m.id} icon={m.role === "earner" ? "💼" : "🧒"} title={m.name}
                    subtitle={m.role === "earner" ? `${lang === "ur" ? "کمانے والا" : "Earner"} · ${fmt(m.income)}/mo` : (lang === "ur" ? "زیر کفالت" : "Dependent")}
                    onDelete={() => deleteMember(m.id)} deleteLabel={t.delete} />
                ))}
              </div>
            )}
          </Card>
        )}

        {/* AI + tips only show on expenses/family tabs to mirror original layout */}
        {(tab === "expenses" || tab === "family") && (
          <>
            <Card style={{ padding: "16px 18px", borderLeft: "4px solid #7c3aed" }}>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span>🤖</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.aiTitle}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{t.aiSub}</div>
                  </div>
                </div>
                <button onClick={runAiAnalysis} disabled={aiLoading}
                  className="flex items-center gap-1" style={{ background: "#7c3aed", color: "white", fontSize: 13, fontWeight: 500, padding: "7px 14px", borderRadius: 9, opacity: aiLoading ? 0.7 : 1 }}>
                  <Sparkles size={13} /> {t.aiStart}
                </button>
              </div>
              {aiLoading && <div style={{ textAlign: "center", color: "#7c3aed", fontSize: 13, padding: "18px 0" }}>{t.aiThinking}</div>}
              {aiError && <div style={{ textAlign: "center", color: "#dc2626", fontSize: 13, padding: "10px 0" }}>{aiError}</div>}
              {aiResult && !aiLoading && (
                <div style={{ whiteSpace: "pre-wrap", fontSize: 13, lineHeight: 1.6, color: "#374151", background: "#faf5ff", borderRadius: 10, padding: 14 }}>
                  {aiResult}
                </div>
              )}
              {!aiResult && !aiLoading && !aiError && (
                <EmptyState icon="🤖" text={t.aiEmpty} subtext={t.aiEmptySub} />
              )}
            </Card>

            <Card style={{ padding: "16px 18px" }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>💡 {t.savingSkills}</div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 12 }}>{t.savingSkillsSub}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {topCategoryIds.map((id) => {
                  const s = SAVING_TIPS[id]; if (!s) return null;
                  return (
                    <div key={id} style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #f0f0f0" }}>
                      <div style={{ background: s.bg, padding: "8px 12px", fontWeight: 600, fontSize: 13, color: s.color }}>{s.icon} {s.title}</div>
                      <div style={{ padding: "8px 14px" }}>
                        {s.tips.map((tip, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "start", gap: 8, fontSize: 12.5, padding: "5px 0", color: "#374151" }}>
                            <CheckCircle2 size={13} style={{ color: "#22c55e", marginTop: 2, flexShrink: 0 }} />
                            <span>{tip.text} {tip.badge && <span style={{ background: "#fef3c7", color: "#92400e", borderRadius: 6, padding: "1px 6px", fontSize: 11, marginLeft: 4 }}>{tip.badge}</span>}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </>
        )}

        {/* ---------------- Goals tab ---------------- */}
        {tab === "goals" && (
          <Card style={{ padding: "16px 18px" }}>
            <div className="flex items-center justify-between mb-3">
              <div style={{ fontWeight: 600, fontSize: 14 }}>🎯 {t.goalsTitle}</div>
              <button onClick={() => setModal("goal")} style={{ background: "#7c3aed", color: "white", fontSize: 13, fontWeight: 500, padding: "7px 14px", borderRadius: 9 }}>
                {t.newGoal}
              </button>
            </div>
            {goals.length === 0 ? <EmptyState icon="🎯" text={t.goalsEmpty} /> : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {goals.map((g) => <GoalCard key={g.id} g={g} t={t} lang={lang} onDelete={() => deleteGoal(g.id)} onUpdate={(patch) => updateGoal(g.id, patch)} />)}
              </div>
            )}
          </Card>
        )}

        {/* ---------------- Receivable / Payable ---------------- */}
        {(tab === "receivable" || tab === "payable") && (
          <Card style={{ padding: "16px 18px" }}>
            <div className="flex items-center justify-between mb-3">
              <div style={{ fontWeight: 600, fontSize: 14 }}>{tab === "receivable" ? t.receivableTitle : t.payableTitle}</div>
              <button onClick={() => setModal(tab === "receivable" ? "receivable" : "payable")}
                style={{ background: tab === "receivable" ? "#2563eb" : "#dc2626", color: "white", fontSize: 13, fontWeight: 500, padding: "7px 14px", borderRadius: 9 }}>
                {t.addRecord}
              </button>
            </div>
            {(tab === "receivable" ? receivables : payables).length === 0 ? (
              <EmptyState icon="📋" text={t.noRecords} />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {(tab === "receivable" ? receivables : payables).map((r) => (
                  <LedgerRow key={r.id} r={r} t={t} lang={lang} kind={tab}
                    onSettle={() => settleRecord(tab, r.id)}
                    onDelete={() => deleteLedgerRecord(tab, r.id)}
                    onWhatsapp={() => waShare(r.name, r.amount - (r.paid || 0), tab)}
                    onPartial={() => { setPayingId(r.id); setPayingKind(tab); }}
                  />
                ))}
              </div>
            )}
          </Card>
        )}

        {/* ---------------- Investments tab ---------------- */}
        {tab === "investments" && (
          <>
            <Card style={{ padding: "16px 18px" }}>
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <div style={{ fontWeight: 600, fontSize: 14 }}>📈 {t.invTitle}</div>
                <button onClick={fetchRates} disabled={rates.loading} className="flex items-center gap-1"
                  style={{ fontSize: 12, color: "#6b7280", border: "1px solid #e5e7eb", borderRadius: 8, padding: "5px 10px" }}>
                  <RefreshCw size={12} style={{ animation: rates.loading ? "spin 1s linear infinite" : "none" }} /> {t.invRefresh}
                </button>
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 10 }}>
                {rates.loading ? t.invFetching : rates.updatedAt ? `${t.invLastUpdated}: ${new Date(rates.updatedAt).toLocaleTimeString()}` : ""}
              </div>

              <div className="grid grid-cols-2 gap-3" style={{ marginBottom: 10 }}>
                <div style={{ border: "1px solid #fde68a", background: "#fffbeb", borderRadius: 10, padding: 10 }}>
                  <div style={{ fontSize: 11, color: "#92400e" }}>🥇 {t.invGold} {t.invRateNow}</div>
                  <div style={{ fontWeight: 700, color: "#92400e" }}>{effectiveGoldRate ? fmt(effectiveGoldRate) + t.invPerGram : "—"}</div>
                </div>
                <div style={{ border: "1px solid #fed7aa", background: "#fff7ed", borderRadius: 10, padding: 10 }}>
                  <div style={{ fontSize: 11, color: "#9a3412" }}>₿ {t.invBtc} {t.invRateNow}</div>
                  <div style={{ fontWeight: 700, color: "#9a3412" }}>{effectiveBtcRate ? fmt(effectiveBtcRate) : "—"}</div>
                </div>
              </div>

              {rates.error && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: 10, marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: "#b91c1c", marginBottom: 8 }}>⚠️ {t.invRateError}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="number" placeholder={t.invManualGold} value={manualRates.gold}
                      onChange={(e) => setManualRates((r) => ({ ...r, gold: e.target.value }))}
                      style={{ ...inputStyle, fontSize: 12 }} />
                    <input type="number" placeholder={t.invManualBtc} value={manualRates.btc}
                      onChange={(e) => setManualRates((r) => ({ ...r, btc: e.target.value }))}
                      style={{ ...inputStyle, fontSize: 12 }} />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                <div style={{ padding: "10px 4px" }}>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{t.invTotalInvested}</div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{fmt(investmentTotals.invested)}</div>
                </div>
                <div style={{ padding: "10px 4px" }}>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{t.invCurrentValue}</div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{fmt(investmentTotals.current)}</div>
                </div>
                <div style={{ padding: "10px 4px" }}>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{t.invProfitLoss}</div>
                  <div className="flex items-center gap-1" style={{ fontWeight: 700, fontSize: 15, color: investmentTotals.pl >= 0 ? "#16a34a" : "#dc2626" }}>
                    {investmentTotals.pl >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {fmt(Math.abs(investmentTotals.pl))}
                  </div>
                </div>
              </div>
            </Card>

            <Card style={{ padding: "16px 18px" }}>
              <div className="flex items-center justify-between mb-3">
                <div style={{ fontWeight: 600, fontSize: 14 }}>{t.invTitle} ({investments.length})</div>
                <button onClick={() => setModal("investment")} style={{ background: "#b45309", color: "white", fontSize: 13, fontWeight: 500, padding: "7px 14px", borderRadius: 9 }}>
                  {t.addInvestment}
                </button>
              </div>
              {investments.length === 0 ? <EmptyState icon="📈" text={t.invEmpty} /> : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {investments.map((inv) => (
                    <InvestmentRow key={inv.id} inv={inv} t={t} lang={lang}
                      currentRate={inv.type === "gold" ? effectiveGoldRate : effectiveBtcRate}
                      onDelete={() => deleteInvestment(inv.id)} />
                  ))}
                </div>
              )}
            </Card>
          </>
        )}

        {/* Footer */}
        <div style={{ background: "linear-gradient(135deg,#dcfce7,#bbf7d0)", borderRadius: 14, padding: "18px", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#166534" }}>{t.footer1} ❤️ {t.footer2}</div>
          <div style={{ fontWeight: 700, color: "#14532d", fontSize: 14, margin: "3px 0" }}>Hamad Ul Islam</div>
          <div className="flex items-center justify-center gap-2" style={{ marginTop: 4 }}>
            <span style={{ background: "white", borderRadius: 20, padding: "3px 10px", fontSize: 11, color: "#166534" }}>🇵🇰 Pakistan</span>
            <span style={{ background: "white", borderRadius: 20, padding: "3px 10px", fontSize: 11, color: "#166534" }}>💰 Finance Tracker</span>
          </div>
        </div>
      </div>

      {/* ---------------- Modals ---------------- */}
      {modal === "budget" && (
        <Modal title={t.monthlyBudget} onClose={() => setModal(null)}>
          <BudgetForm initial={budget} onSave={(v) => { setBudget(v); setModal(null); }} lang={lang} />
        </Modal>
      )}
      {modal === "expense" && (
        <Modal title={t.addExpense.replace("+ ", "")} onClose={() => setModal(null)}>
          <ExpenseForm lang={lang} onSave={(d) => { addExpense(d); setModal(null); }} />
        </Modal>
      )}
      {modal === "member" && (
        <Modal title={t.addMember.replace("+ ", "")} onClose={() => setModal(null)}>
          <MemberForm lang={lang} onSave={(d) => { addMember(d); setModal(null); }} />
        </Modal>
      )}
      {modal === "goal" && (
        <Modal title={t.newGoal.replace("+ ", "")} onClose={() => setModal(null)}>
          <GoalForm lang={lang} onSave={(d) => { addGoal(d); setModal(null); }} />
        </Modal>
      )}
      {(modal === "receivable" || modal === "payable") && (
        <Modal title={t.addRecord.replace("+ ", "")} onClose={() => setModal(null)}>
          <LedgerForm lang={lang} onSave={(d) => { addLedgerRecord(modal, d); setModal(null); }} />
        </Modal>
      )}
      {modal === "investment" && (
        <Modal title={t.addInvestment.replace("+ ", "")} onClose={() => setModal(null)}>
          <InvestmentForm lang={lang} onSave={(d) => { addInvestment(d); setModal(null); }} />
        </Modal>
      )}
      {payingId && (
        <Modal title={t.partialPayment} onClose={() => setPayingId(null)}>
          <PartialForm lang={lang} onSave={(amt) => addPartialPayment(payingKind, payingId, amt)} />
        </Modal>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Small components                                                  */
/* ---------------------------------------------------------------- */

function EmptyState({ icon, text, subtext }) {
  return (
    <div style={{ textAlign: "center", padding: "30px 10px" }}>
      <div style={{ fontSize: 34, marginBottom: 8 }}>{icon}</div>
      <div style={{ color: "#6b7280", fontSize: 13 }}>{text}</div>
      {subtext && <div style={{ color: "#9ca3af", fontSize: 11, marginTop: 3 }}>{subtext}</div>}
    </div>
  );
}

function Row({ icon, title, subtitle, amount, amountColor, onDelete, deleteLabel }) {
  return (
    <div className="flex items-center justify-between" style={{ padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
      <div className="flex items-center gap-3">
        <div style={{ width: 34, height: 34, borderRadius: 9, background: "#f3f8f4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{icon}</div>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 500 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 11, color: "#9ca3af" }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        {amount && <div style={{ fontWeight: 600, fontSize: 13.5, color: amountColor || "#111827" }}>{amount}</div>}
        <button onClick={onDelete} style={{ fontSize: 11, color: "#ef4444" }}>{deleteLabel}</button>
      </div>
    </div>
  );
}

function DonutChart({ data, total, lang }) {
  const size = 140, stroke = 22, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-6 flex-wrap">
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f0f0f0" strokeWidth={stroke} />
        {data.map((d) => {
          const pct = d.total / total;
          const dash = pct * c;
          const el = (
            <circle key={d.id} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={d.color} strokeWidth={stroke}
              strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={-offset} />
          );
          offset += dash;
          return el;
        })}
      </svg>
      <div style={{ flex: 1, minWidth: 140 }}>
        <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 6 }}>{lang === "ur" ? "کل" : "Total"}: <b style={{ color: "#111827" }}>{fmt(total)}</b></div>
        {data.map((d) => (
          <div key={d.id} className="flex items-center gap-2" style={{ fontSize: 12, padding: "3px 0" }}>
            <span style={{ width: 9, height: 9, borderRadius: 5, background: d.color, display: "inline-block" }} />
            <span>{d.icon} {lang === "ur" ? d.ur : d.en}</span>
            <span style={{ marginLeft: "auto", color: "#6b7280" }}>{Math.round((d.total / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GoalCard({ g, t, lang, onDelete, onUpdate }) {
  const pct = g.target > 0 ? Math.min(100, (g.saved / g.target) * 100) : 0;
  const remaining = Math.max(0, g.target - g.saved);
  const monthlySavings = (Number(g.monthlyIncome) || 0) - (Number(g.monthlyExpenses) || 0);
  let timeText = "—";
  if (monthlySavings > 0 && remaining > 0) {
    const months = Math.ceil(remaining / monthlySavings);
    const yrs = Math.floor(months / 12), mo = months % 12;
    timeText = lang === "ur"
      ? `${yrs ? yrs + " سال " : ""}${mo} ماہ`
      : `${yrs ? yrs + " yr " : ""}${mo} mo`;
  } else if (remaining <= 0) {
    timeText = lang === "ur" ? "مکمل! 🎉" : "Achieved! 🎉";
  }

  return (
    <div style={{ border: "1px solid #f0f0f0", borderRadius: 12, padding: 14 }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div style={{ width: 34, height: 34, borderRadius: 9, background: "#f5edff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{g.icon || "🎯"}</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13.5 }}>{g.name}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{t.target}: {fmt(g.target)} · {t.saved}: {fmt(g.saved)}</div>
          </div>
        </div>
        <button onClick={onDelete} style={{ fontSize: 11, color: "#ef4444" }}>{t.delete}</button>
      </div>
      <div style={{ height: 7, borderRadius: 6, background: "#f3e8ff", overflow: "hidden", marginBottom: 4 }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "#7c3aed" }} />
      </div>
      <div className="flex items-center justify-between" style={{ fontSize: 11, color: "#9ca3af", marginBottom: 10 }}>
        <span>{Math.round(pct)}% {t.complete}</span>
        <span>{t.remainingWord}: {fmt(remaining)}</span>
      </div>

      <div style={{ background: "#f5edff", borderRadius: 10, padding: 10, marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#7c3aed", marginBottom: 6 }}>⏱ {t.timeEstimate}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <MiniInput label={t.monthlyIncome} value={g.monthlyIncome} onChange={(v) => onUpdate({ monthlyIncome: v })} />
          <MiniInput label={t.monthlyExpenses} value={g.monthlyExpenses} onChange={(v) => onUpdate({ monthlyExpenses: v })} />
        </div>
        <div style={{ fontSize: 11, color: "#6b21a8", margin: "6px 0" }}>{t.monthlySavings}: {fmt(monthlySavings)}</div>
        <div style={{ background: "#7c3aed", color: "white", textAlign: "center", borderRadius: 8, padding: "8px 0", fontWeight: 600, fontSize: 13 }}>
          {timeText} <div style={{ fontSize: 10, fontWeight: 400, opacity: 0.85 }}>{t.toAchieveGoal}</div>
        </div>
      </div>
      <AddSavingsButton t={t} onAdd={(v) => onUpdate({ saved: g.saved + v })} />
    </div>
  );
}

function MiniInput({ label, value, onChange }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: "#6b21a8", marginBottom: 2 }}>{label}</div>
      <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))}
        style={{ ...inputStyle, padding: "5px 8px", fontSize: 12, background: "white" }} />
    </div>
  );
}

function AddSavingsButton({ t, onAdd }) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  if (!open) {
    return <button onClick={() => setOpen(true)} style={{ width: "100%", border: "1px dashed #c084fc", color: "#7c3aed", borderRadius: 9, padding: "8px 0", fontSize: 12.5, fontWeight: 500 }}>{t.addSavings}</button>;
  }
  return (
    <div className="flex gap-2">
      <input autoFocus type="number" value={val} onChange={(e) => setVal(e.target.value)} placeholder="0" style={{ ...inputStyle, flex: 1 }} />
      <button onClick={() => { if (val) onAdd(Number(val)); setVal(""); setOpen(false); }} style={{ background: "#7c3aed", color: "white", borderRadius: 9, padding: "0 14px", fontSize: 12.5 }}>OK</button>
    </div>
  );
}

function LedgerRow({ r, t, lang, kind, onSettle, onDelete, onWhatsapp, onPartial }) {
  const remaining = r.amount - (r.paid || 0);
  const pct = r.amount > 0 ? Math.min(100, ((r.paid || 0) / r.amount) * 100) : 0;
  const badgeColor = r.status === "settled" ? "#16a34a" : r.status === "partial" ? "#f59e0b" : "#2563eb";
  const badgeBg = r.status === "settled" ? "#dcfce7" : r.status === "partial" ? "#fef3c7" : "#dbeafe";
  const initials = r.name.slice(0, 1).toUpperCase();

  return (
    <div style={{ border: "1px solid #f3f4f6", borderRadius: 12, padding: 12 }}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: kind === "receivable" ? "#dbeafe" : "#fee2e2", color: kind === "receivable" ? "#2563eb" : "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>{initials}</div>
          <div>
            <div className="flex items-center gap-2">
              <span style={{ fontWeight: 600, fontSize: 13.5 }}>{r.name}</span>
              <span style={{ fontSize: 10, background: badgeBg, color: badgeColor, borderRadius: 20, padding: "1px 8px" }}>{r.status === "settled" ? t.settled : r.status === "partial" ? t.partial : t.pending}</span>
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{new Date(r.date).toLocaleDateString(lang === "ur" ? "ur-PK" : "en-GB", { day: "numeric", month: "short", year: "numeric" })}{r.note ? " · " + r.note : ""}</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          {r.status !== "settled" && r.paid > 0 && <div style={{ fontSize: 11, color: "#9ca3af", textDecoration: "line-through" }}>{fmt(r.amount)}</div>}
          <div style={{ fontWeight: 700, fontSize: 14, color: kind === "receivable" ? "#2563eb" : "#dc2626" }}>{fmt(r.status === "settled" ? r.amount : remaining)}</div>
        </div>
      </div>

      {r.status !== "settled" && r.paid > 0 && (
        <>
          <div style={{ height: 6, borderRadius: 6, background: "#f3f4f6", overflow: "hidden", margin: "8px 0 3px" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "#16a34a" }} />
          </div>
          <div className="flex justify-between" style={{ fontSize: 10.5, color: "#9ca3af", marginBottom: 6 }}>
            <span>{t.paid}: {fmt(r.paid)}</span>
            <span>{t.remainingWord}: {fmt(remaining)}</span>
          </div>
        </>
      )}

      <div className="flex items-center gap-4 flex-wrap" style={{ marginTop: 8 }}>
        <button onClick={onWhatsapp} className="flex items-center gap-1" style={{ background: "#22c55e", color: "white", borderRadius: 8, padding: "5px 10px", fontSize: 11.5, fontWeight: 500 }}>
          <MessageCircle size={12} /> {t.whatsapp}
        </button>
        {r.status !== "settled" && (
          <>
            <button onClick={onSettle} style={{ fontSize: 12, color: "#16a34a", fontWeight: 500 }}>{t.settle}</button>
            <button onClick={onPartial} style={{ fontSize: 12, color: "#2563eb", fontWeight: 500, border: "1px solid #bfdbfe", borderRadius: 8, padding: "4px 10px" }}>{t.partialPayment}</button>
          </>
        )}
        <button onClick={onDelete} style={{ fontSize: 12, color: "#ef4444", marginLeft: "auto" }}>{t.delete}</button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Forms                                                              */
/* ---------------------------------------------------------------- */

function ExpenseForm({ lang, onSave }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [date, setDate] = useState(todayISO());
  const t = T[lang];
  return (
    <div>
      <Field label={lang === "ur" ? "تفصیل" : "Description"}><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder={lang === "ur" ? "مثلاً بجلی کا بل" : "e.g. Electricity bill"} /></Field>
      <Field label={lang === "ur" ? "رقم (PKR)" : "Amount (PKR)"}><input type="number" style={inputStyle} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" /></Field>
      <Field label={lang === "ur" ? "کیٹیگری" : "Category"}>
        <select style={inputStyle} value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.icon} {lang === "ur" ? c.ur : c.en}</option>)}
        </select>
      </Field>
      <Field label={lang === "ur" ? "تاریخ" : "Date"}><input type="date" style={inputStyle} value={date} onChange={(e) => setDate(e.target.value)} /></Field>
      <SubmitBtn color="#16a34a" disabled={!name || !amount} onClick={() => onSave({ name, amount: Number(amount), category, date })} label={t.addExpense.replace("+ ", "")} />
    </div>
  );
}

function MemberForm({ lang, onSave }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("earner");
  const [income, setIncome] = useState("");
  const t = T[lang];
  return (
    <div>
      <Field label={lang === "ur" ? "نام" : "Name"}><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} /></Field>
      <Field label={lang === "ur" ? "کردار" : "Role"}>
        <select style={inputStyle} value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="earner">{lang === "ur" ? "کمانے والا" : "Earner"}</option>
          <option value="dependent">{lang === "ur" ? "زیر کفالت" : "Dependent"}</option>
        </select>
      </Field>
      {role === "earner" && <Field label={lang === "ur" ? "ماہانہ آمدنی" : "Monthly income (PKR)"}><input type="number" style={inputStyle} value={income} onChange={(e) => setIncome(e.target.value)} /></Field>}
      <SubmitBtn color="#16a34a" disabled={!name} onClick={() => onSave({ name, role, income: Number(income) || 0 })} label={t.addMember.replace("+ ", "")} />
    </div>
  );
}

function GoalForm({ lang, onSave }) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [icon, setIcon] = useState("🎯");
  const t = T[lang];
  const icons = ["🎯", "🏠", "🚗", "✈️", "🎓", "💍", "📱", "🏥"];
  return (
    <div>
      <Field label={lang === "ur" ? "ہدف کا نام" : "Goal name"}><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder={lang === "ur" ? "مثلاً گھر خریدنا" : "e.g. Buy a house"} /></Field>
      <Field label={lang === "ur" ? "ہدف کی رقم" : "Target amount (PKR)"}><input type="number" style={inputStyle} value={target} onChange={(e) => setTarget(e.target.value)} /></Field>
      <Field label={lang === "ur" ? "آئیکن" : "Icon"}>
        <div className="flex gap-2 flex-wrap">
          {icons.map((i) => (
            <button key={i} onClick={() => setIcon(i)} style={{ fontSize: 18, width: 36, height: 36, borderRadius: 9, border: icon === i ? "2px solid #7c3aed" : "1px solid #e5e7eb" }}>{i}</button>
          ))}
        </div>
      </Field>
      <SubmitBtn color="#7c3aed" disabled={!name || !target} onClick={() => onSave({ name, target: Number(target), icon })} label={t.newGoal.replace("+ ", "")} />
    </div>
  );
}

function LedgerForm({ lang, onSave }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(todayISO());
  const t = T[lang];
  return (
    <div>
      <Field label={lang === "ur" ? "نام" : "Person's name"}><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} /></Field>
      <Field label={lang === "ur" ? "رقم (PKR)" : "Amount (PKR)"}><input type="number" style={inputStyle} value={amount} onChange={(e) => setAmount(e.target.value)} /></Field>
      <Field label={lang === "ur" ? "نوٹ (اختیاری)" : "Note (optional)"}><input style={inputStyle} value={note} onChange={(e) => setNote(e.target.value)} /></Field>
      <Field label={lang === "ur" ? "تاریخ" : "Date"}><input type="date" style={inputStyle} value={date} onChange={(e) => setDate(e.target.value)} /></Field>
      <SubmitBtn color="#2563eb" disabled={!name || !amount} onClick={() => onSave({ name, amount: Number(amount), note, date })} label={t.addRecord.replace("+ ", "")} />
    </div>
  );
}

function InvestmentRow({ inv, t, lang, currentRate, onDelete }) {
  const currentValue = Number(inv.quantity) * (currentRate || 0);
  const pl = currentValue - Number(inv.investedAmount);
  const plPct = inv.investedAmount > 0 ? (pl / inv.investedAmount) * 100 : 0;
  const up = pl >= 0;
  return (
    <div style={{ border: "1px solid #f3f4f6", borderRadius: 12, padding: 12 }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div style={{ width: 32, height: 32, borderRadius: 9, background: inv.type === "gold" ? "#fffbeb" : "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
            {inv.type === "gold" ? "🥇" : "₿"}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13.5 }}>{inv.type === "gold" ? t.invGold : t.invBtc}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>
              {inv.quantity} {inv.type === "gold" ? "g" : "BTC"} · {new Date(inv.date).toLocaleDateString(lang === "ur" ? "ur-PK" : "en-GB", { day: "numeric", month: "short", year: "numeric" })}
            </div>
          </div>
        </div>
        <button onClick={onDelete} style={{ fontSize: 11, color: "#ef4444" }}>{t.delete}</button>
      </div>
      <div className="grid grid-cols-3 gap-2" style={{ marginTop: 10 }}>
        <div>
          <div style={{ fontSize: 10, color: "#9ca3af" }}>{t.invInvestedAmount}</div>
          <div style={{ fontWeight: 600, fontSize: 12.5 }}>{fmt(inv.investedAmount)}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: "#9ca3af" }}>{t.invCurrentValue}</div>
          <div style={{ fontWeight: 600, fontSize: 12.5 }}>{currentRate ? fmt(currentValue) : "—"}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: "#9ca3af" }}>{t.invProfitLoss}</div>
          <div className="flex items-center gap-1" style={{ fontWeight: 700, fontSize: 12.5, color: up ? "#16a34a" : "#dc2626" }}>
            {currentRate ? (
              <>{up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{fmt(Math.abs(pl))} ({Math.abs(plPct).toFixed(1)}%)</>
            ) : "—"}
          </div>
        </div>
      </div>
    </div>
  );
}

function InvestmentForm({ lang, onSave }) {
  const [type, setType] = useState("gold");
  const [quantity, setQuantity] = useState("");
  const [investedAmount, setInvestedAmount] = useState("");
  const [date, setDate] = useState(todayISO());
  const t = T[lang];
  return (
    <div>
      <Field label={t.invType}>
        <div className="flex gap-2">
          <button onClick={() => setType("gold")} style={{ flex: 1, padding: "9px 0", borderRadius: 9, fontSize: 13, fontWeight: 500, background: type === "gold" ? "#fef3c7" : "#f9fafb", color: type === "gold" ? "#92400e" : "#6b7280", border: type === "gold" ? "1.5px solid #f59e0b" : "1px solid #e5e7eb" }}>🥇 {t.invGold}</button>
          <button onClick={() => setType("btc")} style={{ flex: 1, padding: "9px 0", borderRadius: 9, fontSize: 13, fontWeight: 500, background: type === "btc" ? "#ffedd5" : "#f9fafb", color: type === "btc" ? "#9a3412" : "#6b7280", border: type === "btc" ? "1.5px solid #f97316" : "1px solid #e5e7eb" }}>₿ {t.invBtc}</button>
        </div>
      </Field>
      <Field label={type === "gold" ? t.invGrams : t.invBtcAmount}>
        <input type="number" step="any" style={inputStyle} value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder={type === "gold" ? "e.g. 10" : "e.g. 0.015"} />
      </Field>
      <Field label={t.invInvestedAmount}><input type="number" style={inputStyle} value={investedAmount} onChange={(e) => setInvestedAmount(e.target.value)} /></Field>
      <Field label={t.invDate}><input type="date" style={inputStyle} value={date} onChange={(e) => setDate(e.target.value)} /></Field>
      <SubmitBtn color="#b45309" disabled={!quantity || !investedAmount} onClick={() => onSave({ type, quantity: Number(quantity), investedAmount: Number(investedAmount), date })} label={t.addInvestment.replace("+ ", "")} />
    </div>
  );
}

function PartialForm({ lang, onSave }) {
  const [amount, setAmount] = useState("");
  const t = T[lang];
  return (
    <div>
      <Field label={lang === "ur" ? "ادا کی گئی رقم" : "Amount paid (PKR)"}><input type="number" autoFocus style={inputStyle} value={amount} onChange={(e) => setAmount(e.target.value)} /></Field>
      <SubmitBtn color="#2563eb" disabled={!amount} onClick={() => onSave(Number(amount))} label={t.partialPayment} />
    </div>
  );
}

function BudgetForm({ initial, onSave, lang }) {
  const [val, setVal] = useState(initial || "");
  return (
    <div>
      <Field label={lang === "ur" ? "ماہانہ بجٹ (PKR)" : "Monthly budget (PKR)"}><input type="number" autoFocus style={inputStyle} value={val} onChange={(e) => setVal(e.target.value)} /></Field>
      <SubmitBtn color="#f59e0b" disabled={val === ""} onClick={() => onSave(Number(val))} label={lang === "ur" ? "محفوظ کریں" : "Save"} />
    </div>
  );
}

function SubmitBtn({ onClick, disabled, color, label }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: "100%", background: disabled ? "#d1d5db" : color, color: "white", borderRadius: 10, padding: "10px 0", fontWeight: 600, fontSize: 14, marginTop: 6 }}>
      {label}
    </button>
  );
}
