import "../styles/Hero.css"
// import Orb from './Orb';
import { Link } from "react-router-dom";
import BlurText from "./BlurText";
import { motion } from 'framer-motion';

import Silk from './Silk';


export default function Hero() {
    return (
        <div className="hero-container">
            {/* <Orb
                hoverIntensity={0.5}
                rotateOnHover={true}
                hue={120}
                forceHoverState={true}
            /> */}
            <div style={{ width: "100vw", height: "100vh", position: "absolute" }}>
                <Silk
                    speed={2.7}
                    scale={1}
                    color="#5a9450"
                    noiseIntensity={2.3}
                    rotation={0}
                />

            </div>
            <div className="hero-text-container">
                <h1 className="hero-header">
                    <BlurText
                        text="Here is a good header for the site"
                        delay={100}
                        stepDuration={0.4}
                        direction="top"
                        align="center"
                    />
                </h1>
                <div className="hero-link-container" >
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                    >
                        <Link className="hero-link" to="/">Link</Link>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}