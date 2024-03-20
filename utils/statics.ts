export const navItems: string[] = [
  "Portfiolo",
  "Collectible",
  "Staking",
  "Swap",
  "Activity",
];
import TuneIcon from "@mui/icons-material/Tune";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import ShieldIcon from "@mui/icons-material/Shield";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
// the array containing the sub item for the setting side nav
export interface Isettings {
  name: string;
  path: string;
  icon: any;
}
export const settingItems: Isettings[] = [
  { name: "General", path: "setting", icon: TuneIcon },
  { name: "Address book", path: "address", icon: PermContactCalendarIcon },
  { name: "Security & privacy", path: "security", icon: ShieldIcon },
  { name: "Support", path: "support", icon: LiveHelpIcon },
];

// LIST OF CURRENCY FOR
export const Languages: string[] = [
  "English",
  "Chinese",
  "Dutch",
  "French",
  "German",
  "Indonesian",
  "Korean",
  "Malaysia",
  "Ukrainian",
];
// THE LIST OF DEVELOPMENT NETWORK
export const Networks: string[] = ["Mainnet", "Testnet", "Devnet"];
// LIST OF CURRENCY BELOW
export const Currencies: string[] = [
  " United States Dollar (USD)",
  " Euro (EUR)",
  " Japanese Yen (JPY)",
  " British Pound Sterling (GBP)",
  " Australian Dollar (AUD)",
  " Canadian Dollar (CAD)",
  " Swiss Franc (CHF)",
  " Chinese Yuan (CNY)",
  " Swedish Krona (SEK)",
  " New Zealand Dollar (NZD)",
  " Mexican Peso (MXN)",
  " Singapore Dollar (SGD)",
  " Hong Kong Dollar (HKD)",
  " Norwegian Krone (NOK)",
  " South Korean Won (KRW)",
];
