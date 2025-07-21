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