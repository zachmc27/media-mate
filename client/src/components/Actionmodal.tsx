import { motion } from "framer-motion";
import "../styles/ActionModal.css";
export default function Actionmodal({ children, cancel, confirm }: { children: React.ReactNode; cancel: () => void; confirm: () => void}) {
  return (
    <>
      <div className="modal-overlay" onClick={cancel}></div> 
      <motion.div className="action-modal"
      initial= {{
        scale: 0
      }}
      animate= {{
        scale: 1
      }}
      transition={{
        duration: .5,
        type: "spring"
      }}
      >
        {children}
        <div className="modal-buttons">
                <button onClick={cancel} className="close-button">Cancel</button>
                <button onClick={confirm} className="yes-button">Confirm</button>
            </div>
        
      </motion.div>
    </>
  );
}