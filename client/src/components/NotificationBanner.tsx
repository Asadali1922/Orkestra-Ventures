import { useState, useEffect } from "react";
import { X, Info, AlertCircle, CheckCircle, Bell } from "lucide-react";

export type NotificationType = "info" | "success" | "warning" | "announcement";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  link?: {
    text: string;
    href: string;
  };
  dismissible?: boolean;
  expiresAt?: Date;
}

interface NotificationBannerProps {
  notification: Notification;
  onDismiss?: (id: string) => void;
}

export function NotificationBanner({
  notification,
  onDismiss,
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if notification is expired
    if (notification.expiresAt && new Date() > notification.expiresAt) {
      setIsVisible(false);
      return;
    }

    // Check if user has dismissed this notification before
    const dismissedNotifications = JSON.parse(
      localStorage.getItem("dismissedNotifications") || "[]"
    );
    if (dismissedNotifications.includes(notification.id)) {
      setIsVisible(false);
    }
  }, [notification]);

  const handleDismiss = () => {
    setIsVisible(false);
    
    // Save to localStorage
    const dismissedNotifications = JSON.parse(
      localStorage.getItem("dismissedNotifications") || "[]"
    );
    dismissedNotifications.push(notification.id);
    localStorage.setItem(
      "dismissedNotifications",
      JSON.stringify(dismissedNotifications)
    );

    // Call parent callback
    if (onDismiss) {
      onDismiss(notification.id);
    }
  };

  if (!isVisible) return null;

  const getIcon = () => {
    switch (notification.type) {
      case "info":
        return <Info className="h-5 w-5" />;
      case "success":
        return <CheckCircle className="h-5 w-5" />;
      case "warning":
        return <AlertCircle className="h-5 w-5" />;
      case "announcement":
        return <Bell className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getStyles = () => {
    switch (notification.type) {
      case "info":
        return {
          bg: "bg-[oklch(0.55_0.18_260_/_0.1)]",
          border: "border-[oklch(0.55_0.18_260_/_0.3)]",
          text: "text-[oklch(0.2_0.05_240)]",
          icon: "text-[oklch(0.55_0.18_260)]",
          link: "text-[oklch(0.55_0.18_260)] hover:text-[oklch(0.45_0.18_260)]",
        };
      case "success":
        return {
          bg: "bg-[oklch(0.65_0.12_180_/_0.1)]",
          border: "border-[oklch(0.65_0.12_180_/_0.3)]",
          text: "text-[oklch(0.2_0.05_240)]",
          icon: "text-[oklch(0.65_0.12_180)]",
          link: "text-[oklch(0.65_0.12_180)] hover:text-[oklch(0.55_0.12_180)]",
        };
      case "warning":
        return {
          bg: "bg-[oklch(0.7_0.15_70_/_0.1)]",
          border: "border-[oklch(0.7_0.15_70_/_0.3)]",
          text: "text-[oklch(0.2_0.05_240)]",
          icon: "text-[oklch(0.7_0.15_70)]",
          link: "text-[oklch(0.7_0.15_70)] hover:text-[oklch(0.6_0.15_70)]",
        };
      case "announcement":
        return {
          bg: "bg-[oklch(0.55_0.18_260)]",
          border: "border-[oklch(0.55_0.18_260)]",
          text: "text-white",
          icon: "text-white",
          link: "text-white hover:text-[oklch(0.9_0.005_240)] underline",
        };
      default:
        return {
          bg: "bg-[oklch(0.55_0.18_260_/_0.1)]",
          border: "border-[oklch(0.55_0.18_260_/_0.3)]",
          text: "text-[oklch(0.2_0.05_240)]",
          icon: "text-[oklch(0.55_0.18_260)]",
          link: "text-[oklch(0.55_0.18_260)] hover:text-[oklch(0.45_0.18_260)]",
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`${styles.bg} ${styles.border} border-b py-3 px-4 transition-all duration-300`}
    >
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className={`flex-shrink-0 ${styles.icon}`}>{getIcon()}</div>
            <div className={`flex-1 ${styles.text}`}>
              <span className="text-sm md:text-base font-medium">
                {notification.message}
              </span>
              {notification.link && (
                <>
                  {" "}
                  <a
                    href={notification.link.href}
                    className={`${styles.link} font-semibold transition-colors inline-flex items-center gap-1`}
                  >
                    {notification.link.text}
                    <span>→</span>
                  </a>
                </>
              )}
            </div>
          </div>
          {notification.dismissible !== false && (
            <button
              onClick={handleDismiss}
              className={`flex-shrink-0 ${styles.icon} hover:opacity-70 transition-opacity p-1`}
              aria-label="Dismiss notification"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Example usage component
export function NotificationManager() {
  // Define your notifications here
  const notifications: Notification[] = [
    {
      id: "cohort-2025-q2",
      type: "announcement",
      message: "Applications now open for Q2 2026 cohort! Limited spots available.",
      link: {
        text: "Apply Now",
        href: "/apply",
      },
      dismissible: true,
    },
    // Add more notifications as needed
  ];

  const [activeNotifications, setActiveNotifications] = useState(notifications);

  const handleDismiss = (id: string) => {
    setActiveNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <>
      {activeNotifications.map((notification) => (
        <NotificationBanner
          key={notification.id}
          notification={notification}
          onDismiss={handleDismiss}
        />
      ))}
    </>
  );
}
