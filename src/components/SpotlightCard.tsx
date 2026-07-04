import React from "react";
import { MagicBento, BentoCard } from "./MagicBento";
import "./SpotlightCard.css";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(97, 185, 25, 0.8)",
  ...props
}) => {
  return (
    <MagicBento>
      <BentoCard
        className={`spotlight-card ${className}`}
        contentClassName="spotlight-content"
        glowColor={spotlightColor}
        {...props}
      >
        {children}
      </BentoCard>
    </MagicBento>
  );
};

export default SpotlightCard;
