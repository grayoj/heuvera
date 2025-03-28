import React from "react";

interface HeuveraLogoProps {
  width?: number;
  height?: number;
  color?: string;
}

export const HeuveraLogo: React.FC<HeuveraLogoProps> = ({
  width = 241,
  height = 288,
  color = "#7B4F3A",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 241 288"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M216 275C180.328 207.353 94.0191 109.658 26 275C33.4642 258.33 93.1992 91.3875 122.134 10"
        stroke={color}
        strokeWidth="55"
      />
    </svg>
  );
};
