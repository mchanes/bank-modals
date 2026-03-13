import { useState } from "react";

const MANDATE_TEXT = `By signing this mandate form, you authorise Stripe Payments Europe Ltd. (Creditor Identifier DE16ZZZ00001941136, with its principal place of business at The One Building, 1, Lower Grand Canal Street, Dublin 2, Ireland), at the direction of Kajabi Financial, LLC to send instructions to your bank to debit your account and (B) your bank to debit your account in accordance with the instructions from Kajabi Financial, LLC. As part of your rights, you are entitled to a refund from your bank under the terms and conditions of your agreement with your bank. A refund must be claimed within 8 weeks starting from the date on which your account was debited. Your rights are explained in a statement that you can obtain from your bank.`;

const styles = {
  overlay: {
    position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",
    display:"flex",alignItems:"center",justifyContent:"center",zIndex:50,padding:"16px"
  },
  modal: {
    background:"#fff",borderRadius:"12px",width:"100%",maxWidth:"420px",
    boxShadow:"0 8px 32px rgba(0,0,0,0.18)",fontFamily:"system-ui,sans-serif",
    fontSize:"14px",color:"#1a1a1a",maxHeight:"90vh",overflowY:"auto"
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
  infoBanner: (warn) => ({
    margin:"14px 20px 0",
    background: warn ? "#FFF8EC" : "#EEF4FF",
    border: `1px solid ${warn ? "#F9C846" : "#C7D9FF"}`,
    borderRadius:"8px",padding:"10px 12px",fontSize:"12px",
    color: warn ? "#7A5700" : "#1D4ED8",
    display:"flex",gap:"8px",alignItems:"flex-start",lineHeight:1.5
  }),
  infoIcon: { fontSize:"13px",flexShrink:0,marginTop:"1px" },
  body: { padding:"16px 20px 0",display:"flex",flexDirection:"column",gap:"12px" },
  fieldGroup: { display:"flex",flexDirection:"column",gap:"4px" },
  label: { fontSize:"12px",color:"#555",fontWeight:500 },
  input: {
    border:"1px solid #D1D5DB",borderRadius:"6px",padding:"8px 10px",
    fontSize:"13px",color:"#1a1a1a",outline:"none",width:"100%",boxSizing:"border-box",
    background:"#fff"
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
  mandateText: {
    margin:"0 0 10px",fontSize:"11px",color:"#555",lineHeight:1.6
  },
  checkRow: { display:"flex",alignItems:"flex-start",gap:"8px",cursor:"pointer" },
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
    color: disabled ? "#9CA3AF" : "#fff",fontWeight:500,
    transition:"background 0.15s"
  }),
  successOverlay: {
    display:"flex",flexDirection:"column",alignItems:"center",
    justifyContent:"center",padding:"40px 20px",textAlign:"center",gap:"12px"
  },
  successIcon: {
    width:"48px",height:"48px",borderRadius:"50%",background:"#D1FAE5",
    display:"flex",alignItems:"center",justifyContent:"center",
    fontSize:"22px"
  },
  successTitle: { margin:0,fontWeight:600,fontSize:"16px",color:"#065F46" },
  successSub: { margin:0,fontSize:"13px",color:"#6B7280" },
  doneBtn: {
    marginTop:"8px",background:"#2563EB",border:"none",borderRadius:"6px",
    padding:"9px 24px",fontSize:"13px",color:"#fff",cursor:"pointer",fontWeight:500
  }
};

function Modal({ mode, onClose }) {
  const isEdit = mode === "edit";
  const [accepted, setAccepted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currency, setCurrency] = useState(isEdit ? "EUR – Euro" : "CHF – Swiss Franc");
  const [country, setCountry] = useState(isEdit ? "DE – Germany" : "LI – Liechtenstein");
  const [iban, setIban] = useState("");
  const [ibanConfirm, setIbanConfirm] = useState("");

  const handleSave = () => { if (accepted) setSaved(true); };

  return (
    <div style={styles.overlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={styles.modal}>
        {saved ? (
          <div style={styles.successOverlay}>
            <div style={styles.successIcon}>✓</div>
            <p style={styles.successTitle}>Bank account {isEdit ? "updated" : "added"} successfully</p>
            <p style={styles.successSub}>Your mandate has been recorded and your bank account is ready.</p>
            <button style={styles.doneBtn} onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <div style={styles.header}>
              <div>
                <p style={styles.title}>
                  {isEdit ? "Edit your OLINDA ZWEIGNIEDERLASSUNG DEUTSCHLA account ending in 5322" : "Add a bank account"}
                </p>
                {!isEdit && <p style={styles.subtitle}>A bank account is required to create an Offer and collect payments.</p>}
              </div>
              <button style={styles.closeBtn} onClick={onClose}>✕</button>
            </div>

            <div style={styles.infoBanner(isEdit)}>
              <span style={styles.infoIcon}>ℹ</span>
              <span>
                {isEdit
                  ? "To protect your account, funds from your sales will be unavailable for deposit for 7 days after you make changes to your bank account. For more information on payouts, please refer to our Help Center article on payouts."
                  : "Since your business is located in the EU, you are eligible to add additional bank accounts. For more information on bank accounts, please refer to our Help Center article on bank accounts."}
              </span>
            </div>

            <div style={styles.body}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Currency</label>
                <select style={styles.select} value={currency} onChange={e => setCurrency(e.target.value)}>
                  <option>CHF – Swiss Franc</option>
                  <option>EUR – Euro</option>
                  <option>USD – US Dollar</option>
                  <option>GBP – British Pound</option>
                </select>
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Country</label>
                <select style={styles.select} value={country} onChange={e => setCountry(e.target.value)}>
                  <option>LI – Liechtenstein</option>
                  <option>DE – Germany</option>
                  <option>FR – France</option>
                  <option>NL – Netherlands</option>
                </select>
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>IBAN</label>
                <input style={styles.input} placeholder="IBAN" value={iban} onChange={e => setIban(e.target.value)} />
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Confirm IBAN</label>
                <input style={styles.input} placeholder="Confirm IBAN" value={ibanConfirm} onChange={e => setIbanConfirm(e.target.value)} />
              </div>
            </div>

            <div style={styles.mandateBox}>
              <p style={styles.mandateText}>{MANDATE_TEXT}</p>
              <label style={styles.checkRow} onClick={() => setAccepted(p => !p)}>
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={() => setAccepted(p => !p)}
                  style={{ marginTop:"2px",flexShrink:0,accentColor:"#2563EB" }}
                />
                <span style={styles.checkLabel}>
                  By checking this box, I authorise the above mandate and confirm I have read and understood my rights.
                </span>
              </label>
            </div>

            <div style={styles.footer}>
              <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
              <button style={styles.saveBtn(!accepted)} onClick={handleSave} disabled={!accepted}>
                {isEdit ? "Save changes" : "Add bank account"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(null);

  const launchBtnStyle = (color) => ({
    padding:"10px 20px",borderRadius:"8px",border:"none",cursor:"pointer",
    fontFamily:"system-ui,sans-serif",fontSize:"14px",fontWeight:500,color:"#fff",
    background: color
  });

  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"16px",background:"#F3F4F6",fontFamily:"system-ui,sans-serif"}}>
      <p style={{margin:"0 0 8px",fontSize:"13px",color:"#6B7280"}}>Click to preview each modal</p>
      <div style={{display:"flex",gap:"12px",flexWrap:"wrap",justifyContent:"center"}}>
        <button style={launchBtnStyle("#2563EB")} onClick={() => setOpen("add")}>+ Add bank account</button>
        <button style={launchBtnStyle("#374151")} onClick={() => setOpen("edit")}>Edit bank account</button>
      </div>
      {open && <Modal mode={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
