import "../styles/ActionModal.css";

export default function Actionmodal({ children, cancel }: { children: React.ReactNode; cancel: () => void; }) {
  return (
    <>
      <div className="modal-overlay" onClick={cancel}></div> 
      <div className="action-modal">
        {children}
        <div className="modal-buttons">
                <button onClick={cancel} className="close-button">Okay</button>
            </div>
        
      </div>
    </>
  );
}