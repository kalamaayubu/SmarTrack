import { ReactElement, ReactNode } from "react";

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
  icon: ReactNode
  title: string
  value: string
}