import React from "react";
import { IcDataTable } from "@ukic/canary-react";
import { IcSectionContainer, IcTypography } from "@ukic/react";
import { columns } from "./constants";
import { FormValues } from "../Subscription/types";

const View: React.FC = () => {
  const { detailForm, coffeeForm, checkoutForm }: FormValues = JSON.parse(
    localStorage.getItem("formValues") ?? "{}",
  );

  const capitaliseFirstLetter = (string?: string) =>
    string && `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

  const data = [
    {
      name: "Coffee lover",
      grind: "Whole",
      variety: "Arabica",
      size: "250g",
      startDate: "2024-09-25T23:00:00.000Z",
      contactBy: "Email",
    },
    {
      name: "Your name",
      grind: "Espresso",
      variety: "House",
      size: "250g",
      startDate: "2025-10-25T23:00:00.000Z",
      contactBy: "Sms, Email",
    },
    {
      name: "John Doe",
      grind: "Filter",
      variety: "Liberica",
      size: "500g",
      startDate: "2025-11-01T23:00:00.000Z",
      contactBy: "Email",
    },
    {
      name: "Jane Doe",
      grind: "Cafetiere",
      variety: "Arabica",
      size: "1000g",
      startDate: "2025-12-15T23:00:00.000Z",
      contactBy: "Sms",
    },
    {
      name: "Lorum Ipsum",
      grind: "Filter",
      variety: "Liberica",
      size: "250g",
      startDate: "2026-01-10T23:00:00.000Z",
      contactBy: "Sms",
    },
    {
      name: "Another name",
      grind: "Espresso",
      variety: "Mundo Nova",
      size: "500g",
      startDate: "2026-02-20T23:00:00.000Z",
      contactBy: "Sms, Email",
    },
    {
      name: "Coffee Drinker",
      grind: "Whole",
      variety: "Arabica",
      size: "500g",
      startDate: "2020-01-25T23:00:00.000Z",
      contactBy: "Sms",
    },
    {
      name: "Tea Lover",
      grind: "Filter",
      variety: "Mundo Nova",
      size: "1000g",
      startDate: "2018-07-08T23:00:00.000Z",
      contactBy: "Email",
    },
    {
      name: capitaliseFirstLetter(detailForm?.name),
      grind: capitaliseFirstLetter(coffeeForm?.grind),
      variety: capitaliseFirstLetter(coffeeForm?.variety),
      size: `${coffeeForm?.size}g`,
      startDate: checkoutForm?.dateToStart,
      contactBy: detailForm?.contact
        .filter((contact) => contact !== "")
        .map((contact) => capitaliseFirstLetter(contact))
        .join(", "),
    },
  ];

  return (
    <IcSectionContainer aligned="full-width">
      <IcTypography variant="h2" applyVerticalMargins>
        View your subscriptions
      </IcTypography>
      <IcDataTable
        caption="Current subscriptions"
        columns={columns}
        data={data}
        embedded
        sortable
        showPagination
        paginationBarOptions={{
          itemsPerPageOptions: [
            { label: "5", value: "5" },
            { label: "7", value: "7" },
          ],
          showItemsPerPageControl: true,
        }}
      />
    </IcSectionContainer>
  );
};

export default View;
