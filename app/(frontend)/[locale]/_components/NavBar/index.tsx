import { CampaignBanner } from "./CampaignBanner";
import { MainNav } from "./MainNav";
import { SecondaryNav } from "./SecondaryNav";

export const NavBar = () => {
  return (
    <header>
      <CampaignBanner />
      <SecondaryNav />
      <MainNav />
    </header>
  );
};

export default NavBar;
