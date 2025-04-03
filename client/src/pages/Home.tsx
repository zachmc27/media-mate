import "../App.css"
import "../styles/Home.css"
import FeaturedCard from "../components/FeaturedCard"
import Teases from "../components/Teases"
import useAuthRedirect from "../utils/useAuthRedirect";
import { motion } from "framer-motion";

export default function Home() {
  useAuthRedirect();
  return (
    <motion.div className="home"
    initial= {{
      y: "10%",
      opacity: 0
    }}
    animate={{
      y: "0%",
      opacity: 1
    }}
    transition={{
      duration: .5,
      type:"spring"
    }}>
        <FeaturedCard />
        <Teases />
    </motion.div>
  )
}