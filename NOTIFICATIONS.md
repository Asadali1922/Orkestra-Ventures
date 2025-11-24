# Custom Notification System

The Orkestra Ventures website includes a flexible notification banner system for displaying announcements, updates, and important messages to visitors.

## Features

- **Multiple notification types**: info, success, warning, announcement
- **Dismissible notifications**: Users can close notifications, which are remembered in localStorage
- **Auto-expiration**: Set expiration dates for time-sensitive notifications
- **Custom links**: Include call-to-action links within notifications
- **Responsive design**: Works seamlessly on mobile and desktop
- **Government-ready styling**: Professional appearance matching the website's design system

## Notification Types

### 1. Announcement (Blue background, white text)
Best for: Major announcements, application deadlines, important updates
```typescript
{
  id: "unique-id",
  type: "announcement",
  message: "Applications now open for Q2 2025 cohort!",
  link: { text: "Apply Now", href: "/apply" },
  dismissible: true
}
```

### 2. Info (Light blue background)
Best for: General information, tips, reminders
```typescript
{
  id: "info-notification",
  type: "info",
  message: "Join our upcoming webinar on AI careers.",
  link: { text: "Register Here", href: "/events" }
}
```

### 3. Success (Light green background)
Best for: Confirmations, achievements, positive news
```typescript
{
  id: "success-msg",
  type: "success",
  message: "Successfully submitted your application!",
  dismissible: true
}
```

### 4. Warning (Light orange background)
Best for: Urgent updates, deadline reminders, important notices
```typescript
{
  id: "deadline-warning",
  type: "warning",
  message: "Application deadline in 3 days!",
  link: { text: "Complete Application", href: "/apply" }
}
```

## How to Add/Edit Notifications

### Step 1: Open the NotificationBanner component
File: `client/src/components/NotificationBanner.tsx`

### Step 2: Find the NotificationManager function
Look for the `notifications` array around line 150:

```typescript
export function NotificationManager() {
  const notifications: Notification[] = [
    {
      id: "cohort-2025-q2",
      type: "announcement",
      message: "Applications now open for Q2 2025 cohort! Limited spots available.",
      link: {
        text: "Apply Now",
        href: "/apply",
      },
      dismissible: true,
    },
    // Add more notifications here
  ];
  // ...
}
```

### Step 3: Add your notification
Add a new object to the array:

```typescript
{
  id: "your-unique-id",           // Must be unique for each notification
  type: "announcement",            // info | success | warning | announcement
  message: "Your message here",    // The notification text
  link: {                          // Optional: Add a CTA link
    text: "Click Here",
    href: "/your-page"
  },
  dismissible: true,               // Optional: Allow users to dismiss (default: true)
  expiresAt: new Date('2025-12-31') // Optional: Auto-hide after this date
}
```

## Examples

### Example 1: Application Deadline Reminder
```typescript
{
  id: "deadline-2025-q2",
  type: "warning",
  message: "Final call! Applications close in 48 hours.",
  link: {
    text: "Apply Now",
    href: "/apply"
  },
  dismissible: true,
  expiresAt: new Date('2025-06-30')
}
```

### Example 2: New Partnership Announcement
```typescript
{
  id: "partnership-mbzuai",
  type: "success",
  message: "We're proud to announce our partnership with MBZUAI for research collaboration!",
  link: {
    text: "Learn More",
    href: "/partners"
  },
  dismissible: true
}
```

### Example 3: Event Invitation
```typescript
{
  id: "webinar-ai-careers",
  type: "info",
  message: "Join our free webinar: 'Building a Global AI Career from Egypt' - May 15, 2025",
  link: {
    text: "Register Free",
    href: "/events/webinar"
  },
  dismissible: true,
  expiresAt: new Date('2025-05-15')
}
```

### Example 4: Non-dismissible Important Notice
```typescript
{
  id: "system-maintenance",
  type: "warning",
  message: "Website maintenance scheduled for May 1st, 2-4 AM GMT.",
  dismissible: false  // Users cannot close this
}
```

## Managing Multiple Notifications

You can display multiple notifications at once. They will stack vertically at the top of the page:

```typescript
const notifications: Notification[] = [
  {
    id: "announcement-1",
    type: "announcement",
    message: "Q2 2025 applications now open!",
    link: { text: "Apply", href: "/apply" }
  },
  {
    id: "info-1",
    type: "info",
    message: "New AI curriculum modules added to Technical Track.",
    link: { text: "View Programs", href: "/programs" }
  }
];
```

## Best Practices

1. **Use unique IDs**: Each notification must have a unique ID to track dismissals correctly
2. **Keep messages concise**: Aim for one sentence, maximum two
3. **Use appropriate types**: Match the notification type to the message urgency/importance
4. **Set expiration dates**: For time-sensitive notifications, always set an expiration date
5. **Limit active notifications**: Show maximum 2-3 notifications at once to avoid overwhelming users
6. **Test on mobile**: Ensure notifications are readable on small screens
7. **Update regularly**: Remove expired or outdated notifications from the code

## Clearing Dismissed Notifications

Users' dismissed notifications are stored in localStorage. To clear them (for testing):

```javascript
// In browser console:
localStorage.removeItem('dismissedNotifications');
```

## Styling Customization

The notification colors are defined in the `getStyles()` function. To customize:

1. Open `client/src/components/NotificationBanner.tsx`
2. Find the `getStyles()` function
3. Modify the OKLCH color values to match your brand

## Troubleshooting

**Notification not showing?**
- Check if the ID was previously dismissed (clear localStorage)
- Verify the expiration date hasn't passed
- Ensure the notification is added to the `notifications` array

**Notification looks wrong?**
- Verify the `type` value is one of: info, success, warning, announcement
- Check for typos in property names

**Link not working?**
- Ensure the `href` starts with `/` for internal links
- Use full URLs (https://...) for external links
