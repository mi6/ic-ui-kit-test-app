import {
  IcAccordion,
  IcDataList,
  IcDataRow,
  IcTypography,
  IcLink,
  IcAccordionGroup,
  IcSectionContainer,
} from "@ukic/react";
import React from "react";

import "./index.css";

const Info: React.FC = () => {
  return (
    <IcSectionContainer aligned="full-width">
      <IcTypography variant="h2" applyVerticalMargins>
        FAQs
      </IcTypography>
      <IcAccordionGroup singleExpansion>
        <IcAccordion
          heading="What is the ICDS?"
          message="The ICDS is a design system that provides a set of reusable components and guidelines for building consistent and user-friendly interfaces."
        />
        <IcAccordion heading="Which components are canary components?">
          <IcTypography applyVerticalMargins>
            Please find a list below of canary components
          </IcTypography>
          <IcDataList size="small">
            <IcDataRow label="Card horizontal">
              <IcLink
                slot="value"
                href="https://design.sis.gov.uk/components/card-horizontal"
                target="_blank"
              >
                Guidance for card horizontal
              </IcLink>
            </IcDataRow>
            <IcDataRow label="Data table">
              <IcLink
                slot="value"
                href="https://design.sis.gov.uk/components/data-table"
                target="_blank"
              >
                Guidance for data table
              </IcLink>
            </IcDataRow>
            <IcDataRow label="Date input">
              <IcLink
                slot="value"
                href="https://design.sis.gov.uk/components/date-input"
                target="_blank"
              >
                Guidance for date input
              </IcLink>
            </IcDataRow>
            <IcDataRow label="Date picker">
              <IcLink
                slot="value"
                href="https://design.sis.gov.uk/components/date-picker"
                target="_blank"
              >
                Guidance for date picker
              </IcLink>
            </IcDataRow>
            <IcDataRow label="Tree view">
              <IcLink
                slot="value"
                href="https://design.sis.gov.uk/components/tree-view"
                target="_blank"
              >
                Guidance for tree view
              </IcLink>
            </IcDataRow>
          </IcDataList>
        </IcAccordion>
        <IcAccordion heading="Which components aren't on this site?">
          <IcTypography>So far this site is not actively using:</IcTypography>
          <ul>
            <li>IcBackToTop</li>
            <li>IcBadge</li>
            <li>IcBreadcrumb</li>
            <li>IcClassificationBanner</li>
            <li>IcLoadingIndicator</li>
            <li>IcPagination</li>
            <li>IcPopoverMenu</li>
            <li>IcSearchBar</li>
            <li>IcSideNavigation</li>
            <li>IcSkeleton</li>
            <li>IcSwitch</li>
            <li>IcTab</li>
            <li>IcToggleButton</li>
            <li>IcTooltip</li>
          </ul>
        </IcAccordion>
      </IcAccordionGroup>
    </IcSectionContainer>
  );
};

export default Info;
