import "../styles/ActionModal.css";

export default function Actionmodal({ children, cancel, confirm }: { children: React.ReactNode; cancel: () => void; confirm: () => void}) {
  return (
    <>
      <div className="modal-overlay" onClick={cancel}></div> 
      <div className="action-modal">
        {children}
        <div className="modal-buttons">
                <button onClick={cancel} className="close-button">Cancel</button>
                <button onClick={confirm} className="yes-button">Confirm</button>
            </div>
        
      </div>
    </>
  );
}