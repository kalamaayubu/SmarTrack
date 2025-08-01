// Views, kind of pages
export type View = "home" | "scanning" | "settings"; 

export type SettingsForm = {
  checkInTime: string | null
  checkOutTime: string | null
  notificationsEnabled: boolean
}

export type NotificationRecipient = {
  endpoint: string;
};

export type NotificationProps = {
  title: string
  body: string
  recipients: NotificationRecipient[]
}

export type PreferenceCardProps = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  value: string
}