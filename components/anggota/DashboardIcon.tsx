interface DashboardIconProps {
  name: string;
  size?: number;
}

export default function DashboardIcon({
  name,
  size = 18,
}: DashboardIconProps) {
  const commonProps: React.SVGProps<SVGSVGElement> = {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

  switch (name) {
    case "dashboard":
      return (
        <svg {...commonProps}>
          <rect x="4" y="4" width="6" height="6" rx="1" />
          <rect x="14" y="4" width="6" height="6" rx="1" />
          <rect x="4" y="14" width="6" height="6" rx="1" />
          <rect x="14" y="14" width="6" height="6" rx="1" />
        </svg>
      );

    case "news":
      return (
        <svg {...commonProps}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M8 9h8M8 13h8M8 16h4" />
        </svg>
      );

    case "users":
      return (
        <svg {...commonProps}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19c.7-3 2.5-4.5 5.5-4.5s4.8 1.5 5.5 4.5" />
          <path d="M16 5.5a3 3 0 0 1 0 5.8M17 14.5c2 .5 3.2 1.8 3.5 3.5" />
        </svg>
      );

    case "shield":
      return (
        <svg {...commonProps}>
          <path d="M12 3l7 3v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );

    case "calendar":
      return (
        <svg {...commonProps}>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M8 3v4M16 3v4M4 9h16" />
        </svg>
      );

    case "trophy":
      return (
        <svg {...commonProps}>
          <path d="M8 4h8v4c0 3-1.5 5-4 6-2.5-1-4-3-4-6V4z" />
          <path d="M8 6H5v2c0 2 1.5 3 3 3M16 6h3v2c0 2-1.5 3-3 3" />
          <path d="M12 14v4M8 21h8M9 18h6" />
        </svg>
      );

    case "search":
      return (
        <svg {...commonProps}>
          <circle cx="10.5" cy="10.5" r="5.5" />
          <path d="m15 15 5 5" />
        </svg>
      );

    case "home":
      return (
        <svg {...commonProps}>
          <path d="m4 11 8-7 8 7" />
          <path d="M6 10v9h12v-9M10 19v-5h4v5" />
        </svg>
      );

    case "user":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="8" r="3" />
          <path d="M5 20c.8-4 3-6 7-6s6.2 2 7 6" />
        </svg>
      );

    case "chevron":
      return (
        <svg {...commonProps}>
          <path d="m7 9 5 5 5-5" />
        </svg>
      );

      case "settings":
        return (
          <svg {...commonProps}>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        );

      case "logout":
        return (
          <svg {...commonProps}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="M16 17l5-5-5-5" />
            <path d="M21 12H9" />
          </svg>
        );

      case "pin":
        return (
          <svg {...commonProps}>
            <path d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        );

      case "chat":
        return (
          <svg {...commonProps}>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        );

      case "panel":
        return (
          <svg {...commonProps}>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M9 4v16" />
            <rect x="4.5" y="5.5" width="3" height="13" rx="0.5" fill="currentColor" stroke="none" />
          </svg>
        );

      case "cat":
        return (
          <svg {...commonProps}>
            <path d="M4 8l3-4 2 3h6l2-3 3 4v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8z" />
            <path d="M9 14h.01M15 14h.01M10 17c.6.6 1.4 1 2 1s1.4-.4 2-1" />
          </svg>
        );

    default:
      return null;
  }
}