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
interface Isettings {
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
