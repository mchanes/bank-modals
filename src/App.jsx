import { useState } from "react";

const DD_LOGO = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" style={{height:"40px",display:"block"}}>
    <rect width="200" height="60" rx="4" fill="#1B3E91"/>
    <g transform="translate(10,8)">
      <ellipse cx="22" cy="22" rx="20" ry="20" fill="#1B3E91" stroke="white" strokeWidth="2"/>
      <path d="M8 28 Q14 8 30 14 Q38 17 36 28" fill="white"/>
      <ellipse cx="22" cy="28" rx="8" ry="6" fill="#1B3E91"/>
      <path d="M6 30 Q12 42 22 42 Q32 42 38 30" fill="white"/>
    </g>
    <text x="58" y="28" fontFamily="Arial" fontWeight="bold" fontSize="13" fill="white" letterSpacing="1">DIRECT</text>
    <text x="58" y="46" fontFamily="Arial" fontWeight="bold" fontSize="13" fill="white" letterSpacing="1">DEBIT</text>
  </svg>
);

const EU_MANDATE = `By signing this mandate form, you authorise Stripe Payments Europe Ltd. (Creditor Identifier DE16ZZZ00001941136, with its principal place of business at The One Building, 1, Lower Grand Canal Street, Dublin 2, Ireland), at the direction of Kajabi Financial, LLC to send instructions to your bank to debit your account and (B) your bank to debit your account in accordance with the instructions from Kajabi Financial, LLC. As part of your rights, you are entitled to a refund from your bank under the terms and conditions of your agreement with your bank. A refund must be claimed within 8 weeks starting from the date on which your account was debited. Your rights are explained in a statement that you can obtain from your bank.`;

const UK_BEFORE_LOGO = `I authorize Stripe to electronically debit my account if my (your company) User account goes negative or for any other reason required pursuant to Kajabi's terms of services, subject to the safeguards assured by the Direct Debit Guarantee. I confirm that I am the only person required to authorise debits from this bank account. I agree to receive notice of each debit two days prior to the debit, unless otherwise agreed to in the case of scheduled debit transfers.`;

const UK_AFTER_LOGO = `This Guarantee is offered by all banks and building societies that accept instructions to pay Direct Debits. If there are any changes to the amount, date or frequency of your Direct Debit, Kajabi will notify you 2 working days in advance of your account being debited or as otherwise agreed. If an error is made in the payment of your Direct Debit, by Kajabi or your bank or building society, you are entitled to a full and immediate refund of the amount paid from your bank or building society. If you receive a refund you are not entitled to, you must pay it back when Kajabi asks you to. You can cancel a Direct Debit at any time by simply contacting your bank or building society. Written confirmation may be required. Please also notify us.`;

const s = {
  overlay: {
    position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",
    display:"flex",alignItems:"center",justifyContent:"center",zIndex:50,padding:"16px"
  },
  modal: {
    background:"#fff",borderRadius:"12px",width:"100%",maxWidth:"420px",
    boxShadow:"0 8px 32px rgba(0,0,0,0.18)",fontFamily:"system-ui,sans-serif",
    fontSize:"14px",color:"#1a1a1a",maxHeight:"92vh",overflowY:"auto"
  },
  header: {
    display:"flex",justifyContent:"space-between",alignItems:"flex-start",
    padding:"20px 20px 0"
  },
  title: { margin:0,fontWeight:600,fontSize:"15px",lineHeight:1.3 },
  subtitle: { margin:"4px 0 0",fontSize:"12px",color:"#666",lineHeight:1.4 },
  closeBtn: {
    background:"none",border:"none",cursor:"pointer",fontSize:"18px",
    color:"#888",padding:"0 0 0 12px",lineHeight:1,flexShrink:0
  },
  banner: (warn) => ({
    margin:"14px 20px 0",
    background: warn ? "#FFF8EC" : "#EEF4FF",
    border:`1px solid ${warn ? "#F9C846" : "#C7D9FF"}`,
    borderRadius:"8px",padding:"10px 12px",fontSize:"12px",
    color: warn ? "#7A5700" : "#1D4ED8",
    display:"flex",gap:"8px",alignItems:"flex-start",lineHeight:1.5
  }),
  body: { padding:"16px 20px 0",display:"flex",flexDirection:"column",gap:"12px" },
  fieldGroup: { display:"flex",flexDirection:"column",gap:"4px" },
  label: { fontSize:"12px",color:"#555",fontWeight:500 },
  input: {
    border:"1px solid #D1D5DB",borderRadius:"6px",padding:"8px 10px",
    fontSize:"13px",color:"#1a1a1a",outline:"none",width:"100%",
    boxSizing:"border-box",background:"#fff"
  },
  select: {
    border:"1px solid #D1D5DB",borderRadius:"6px",padding:"8px 10px",
    fontSize:"13px",color:"#1a1a1a",outline:"none",width:"100%",
    background:"#fff",appearance:"auto"
  },
  mandateBox: {
    margin:"16px 20px 0",background:"#F9FAFB",border:"1px solid #E5E7EB",
    borderRadius:"8px",padding:"12px"
  },
  mandateTitle: { margin:"0 0 6px",fontSize:"12px",fontWeight:600,color:"#1a1a1a" },
  mandateText: { margin:0,fontSize:"11px",color:"#555",lineHeight:1.65 },
  logoRow: { display:"flex",justifyContent:"center",margin:"12px 0" },
  divider: { border:"none",borderTop:"1px solid #E5E7EB",margin:"10px 0" },
  checkRow: { display:"flex",alignItems:"flex-start",gap:"8px",cursor:"pointer",marginTop:"10px" },
  checkLabel: { fontSize:"12px",color:"#1a1a1a",lineHeight:1.4,userSelect:"none" },
  footer: {
    display:"flex",justifyContent:"flex-end",gap:"8px",
    padding:"16px 20px",borderTop:"1px solid #F0F0F0",marginTop:"16px"
  },
  cancelBtn: {
    background:"#fff",border:"1px solid #D1D5DB",borderRadius:"6px",
    padding:"8px 16px",fontSize:"13px",cursor:"pointer",color:"#1a1a1a",fontWeight:500
  },
  saveBtn: (disabled) => ({
    background: disabled ? "#E5E7EB" : "#2563EB",
    border:"none",borderRadius:"6px",padding:"8px 18px",fontSize:"13px",
    cursor: disabled ? "not-allowed" : "pointer",
    color: disabled ? "#9CA3AF" : "#fff",fontWeight:500,transition:"background 0.15s"
  }),
  successWrap: {
    display:"flex",flexDirection:"column",alignItems:"center",
    justifyContent:"center",padding:"40px 20px",textAlign:"center",gap:"12px"
  },
  successIcon: {
    width:"48px",height:"48px",borderRadius:"50%",background:"#D1FAE5",
    display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px"
  },
  successTitle: { margin:0,fontWeight:600,fontSize:"16px",color:"#065F46" },
  successSub: { margin:0,fontSize:"13px",color:"#6B7280" },
  doneBtn: {
    marginTop:"8px",background:"#2563EB",border:"none",borderRadius:"6px",
    padding:"9px 24px",fontSize:"13px",color:"#fff",cursor:"pointer",fontWeight:500
  }
};

function EUMandateSection({ accepted, setAccepted }) {
  return (
    <div style={s.mandateBox}>
      <p style={s.mandateText}>{EU_MANDATE}</p>
      <label style={s.checkRow} onClick={() => setAccepted(p => !p)}>
        <input type="checkbox" checked={accepted} onChange={() => setAccepted(p => !p)}
          style={{ marginTop:"2px",flexShrink:0,accentColor:"#2563EB" }} />
        <span style={s.checkLabel}>
          By checking this box, I authorise the above mandate and confirm I have read and understood my rights.
        </span>
      </label>
    </div>
  );
}

function UKMandateSection({ accepted, setAccepted }) {
  return (
    <div style={s.mandateBox}>
      <p style={s.mandateTitle}>The Direct Debit Guarantee</p>
      <p style={s.mandateText}>{UK_BEFORE_LOGO}</p>
      <div style={s.logoRow}><DD_LOGO /></div>
      <hr style={s.divider} />
      <p style={s.mandateText}>{UK_AFTER_LOGO}</p>
      <label style={s.checkRow} onClick={() => setAccepted(p => !p)}>
        <input type="checkbox" checked={accepted} onChange={() => setAccepted(p => !p)}
          style={{ marginTop:"2px",flexShrink:0,accentColor:"#2563EB" }} />
        <span style={s.checkLabel}>
          I have read and I authorise this Direct Debit mandate on behalf of Kajabi Financial, LLC.
        </span>
      </label>
    </div>
  );
}

function Modal({ mode, region, onClose }) {
  const isEdit = mode === "edit";
  const isUK = region === "uk";
  const [accepted, setAccepted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currency, setCurrency] = useState(isUK ? "GBP – British Pound" : isEdit ? "EUR – Euro" : "CHF – Swiss Franc");
  const [country, setCountry] = useState(isUK ? "GB – United Kingdom" : isEdit ? "DE – Germany" : "LI – Liechtenstein");
  const [iban, setIban] = useState("");
  const [ibanConfirm, setIbanConfirm] = useState("");

  const euCountries = ["LI – Liechtenstein","DE – Germany","FR – France","NL – Netherlands","EUR – Euro"];
  const ukCountries = ["GB – United Kingdom"];
  const euCurrencies = ["CHF – Swiss Franc","EUR – Euro","USD – US Dollar","GBP – British Pound"];
  const ukCurrencies = ["GBP – British Pound","EUR – Euro"];

  return (
    <div style={s.overlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={s.modal}>
        {saved ? (
          <div style={s.successWrap}>
            <div style={s.successIcon}>✓</div>
            <p style={s.successTitle}>Bank account {isEdit ? "updated" : "added"} successfully</p>
            <p style={s.successSub}>Your {isUK ? "Direct Debit mandate" : "mandate"} has been recorded.</p>
            <button style={s.doneBtn} onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <div style={s.header}>
              <div>
                <p style={s.title}>
                  {isEdit
                    ? (isUK ? "Edit your WISE PAYMENTS LTD account ending in 0796" : "Edit your OLINDA ZWEIGNIEDERLASSUNG DEUTSCHLA account ending in 5322")
                    : "Add a bank account"}
                </p>
                {!isEdit && <p style={s.subtitle}>A bank account is required to create an Offer and collect payments.</p>}
              </div>
              <button style={s.closeBtn} onClick={onClose}>✕</button>
            </div>

            <div style={s.banner(isEdit)}>
              <span style={{fontSize:"13px",flexShrink:0,marginTop:"1px"}}>ℹ</span>
              <span>
                {isEdit
                  ? "To protect your account, funds from your sales will be unavailable for deposit for 7 days after you make changes to your bank account."
                  : isUK
                    ? "Since your business is located in the U.K., you are eligible to add additional bank accounts."
                    : "Since your business is located in the EU, you are eligible to add additional bank accounts."}
              </span>
            </div>

            <div style={s.body}>
              <div style={s.fieldGroup}>
                <label style={s.label}>Currency</label>
                <select style={s.select} value={currency} onChange={e => setCurrency(e.target.value)}>
                  {(isUK ? ukCurrencies : euCurrencies).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={s.fieldGroup}>
                <label style={s.label}>Country</label>
                <select style={s.select} value={country} onChange={e => setCountry(e.target.value)}>
                  {(isUK ? ukCountries : euCountries).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={s.fieldGroup}>
                <label style={s.label}>IBAN</label>
                <input style={s.input} placeholder="IBAN" value={iban} onChange={e => setIban(e.target.value)} />
              </div>
              <div style={s.fieldGroup}>
                <label style={s.label}>Confirm IBAN</label>
                <input style={s.input} placeholder="Confirm IBAN" value={ibanConfirm} onChange={e => setIbanConfirm(e.target.value)} />
              </div>
            </div>

            {isUK
              ? <UKMandateSection accepted={accepted} setAccepted={setAccepted} />
              : <EUMandateSection accepted={accepted} setAccepted={setAccepted} />
            }

            <div style={s.footer}>
              <button style={s.cancelBtn} onClick={onClose}>Cancel</button>
              <button style={s.saveBtn(!accepted)} onClick={() => accepted && setSaved(true)} disabled={!accepted}>
                {isEdit ? "Save changes" : "Save"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function EUBankModals() {
  const [open, setOpen] = useState(null);
  const btn = (bg) => ({
    padding:"10px 20px",borderRadius:"8px",border:"none",cursor:"pointer",
    fontFamily:"system-ui,sans-serif",fontSize:"14px",fontWeight:500,color:"#fff",background:bg
  });
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"12px"}}>
      <p style={{margin:0,fontSize:"12px",color:"#6B7280",fontFamily:"system-ui,sans-serif"}}>EU modals</p>
      <div style={{display:"flex",gap:"12px",flexWrap:"wrap",justifyContent:"center"}}>
        <button style={btn("#2563EB")} onClick={() => setOpen("add")}>+ Add bank account</button>
        <button style={btn("#374151")} onClick={() => setOpen("edit")}>Edit bank account</button>
      </div>
      {open && <Modal mode={open} region="eu" onClose={() => setOpen(null)} />}
    </div>
  );
}

export function UKBankModals() {
  const [open, setOpen] = useState(null);
  const btn = (bg) => ({
    padding:"10px 20px",borderRadius:"8px",border:"none",cursor:"pointer",
    fontFamily:"system-ui,sans-serif",fontSize:"14px",fontWeight:500,color:"#fff",background:bg
  });
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"12px"}}>
      <p style={{margin:0,fontSize:"12px",color:"#6B7280",fontFamily:"system-ui,sans-serif"}}>UK modals</p>
      <div style={{display:"flex",gap:"12px",flexWrap:"wrap",justifyContent:"center"}}>
        <button style={btn("#2563EB")} onClick={() => setOpen("add")}>+ Add bank account</button>
        <button style={btn("#374151")} onClick={() => setOpen("edit")}>Edit bank account</button>
      </div>
      {open && <Modal mode={open} region="uk" onClose={() => setOpen(null)} />}
    </div>
  );
}

export default function App() {
  return (
    <div style={{
      minHeight:"100vh",display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",
      gap:"32px",background:"#F3F4F6",fontFamily:"system-ui,sans-serif"
    }}>
      <EUBankModals />
      <div style={{width:"200px",borderTop:"1px solid #D1D5DB"}} />
      <UKBankModals />
    </div>
  );
}