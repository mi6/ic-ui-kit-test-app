import React from "react";
import {
  IcCardVertical,
  IcHero,
  IcSectionContainer,
  IcTypography,
} from "@ukic/react";
import { IcCardHorizontal } from "@ukic/canary-react";

import "./index.css";
import { cards } from "./constants";
import { renderImage } from "./helpers";

const Home: React.FC = () => (
  <>
    <IcHero
      heading="Welcome to our café"
      subheading="We have everything you need to get your day started."
      aligned="full-width"
    >
      <IcCardVertical
        heading="Out now"
        message="Try our new subscription service so you can have your coffee delivered to your door every morning."
        slot="secondary"
      />
    </IcHero>
    <IcSectionContainer aligned="full-width">
      <IcTypography variant="h3" applyVerticalMargins>
        Important site information
      </IcTypography>
      <div className="cards">
        {cards.map((card, index) => (
          <IcCardHorizontal
            key={index}
            heading={card.heading}
            message={card.message}
            size="medium"
          >
            {renderImage(card.img)}
          </IcCardHorizontal>
        ))}
      </div>
    </IcSectionContainer>
  </>
);

export default Home;
