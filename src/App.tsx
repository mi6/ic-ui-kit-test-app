import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import {
  IcTopNavigation,
  IcNavigationItem,
  IcFooter,
  IcFooterLink,
} from "@ukic/react";

import SwitchRoutes from "./Routes";

const Navigation: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <IcTopNavigation appTitle="Coffee" status="alpha" version="v3.3.0">
      <IcNavigationItem
        slot="navigation"
        label="Home"
        href="/"
        selected={pathname === "/"}
      />
      <IcNavigationItem
        slot="navigation"
        label="Subscriptions"
        href="/subscribe"
        selected={pathname === "/subscribe"}
      />
      <IcNavigationItem
        slot="navigation"
        label="FAQs"
        href="/info"
        selected={pathname === "/info"}
      />
    </IcTopNavigation>
  );
};

const App: React.FC = () => (
  <Router>
    <Navigation />
    <SwitchRoutes />
    <IcFooter description="This app is maintained by the ICDS team.">
      <IcFooterLink
        slot="link"
        href="https://design.sis.gov.uk/"
        target="_blank"
      >
        ICDS guidance site
      </IcFooterLink>
      <IcFooterLink
        slot="link"
        href="https://github.com/mi6/ic-ui-kit"
        target="_blank"
      >
        UI Kit GitHub
      </IcFooterLink>
    </IcFooter>
  </Router>
);

export default App;
