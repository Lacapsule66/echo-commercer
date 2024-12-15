const storeInfo = {
  name: "storeInfo",
  title: "Store Information",
  type: "document",
  fields: [
    {
      name: "storeName",
      title: "Store Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "currency",
      title: "Default Currency",
      type: "string",
      options: {
        list: [
          { title: "Euro (€)", value: "EUR" },
          { title: "US Dollar ($)", value: "USD" },
          { title: "British Pound (£)", value: "GBP" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
      initialValue: "EUR",
    },
    {
      name: "currencySymbol",
      title: "Currency Symbol",
      type: "string",
      options: {
        list: [
          { title: "€", value: "€" },
          { title: "$", value: "$" },
          { title: "£", value: "£" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
      initialValue: "€",
    },
    {
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        {
          name: "street",
          title: "Street Address",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "city",
          title: "City",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "postalCode",
          title: "Postal Code",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "country",
          title: "Country",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: "contact",
      title: "Contact Information",
      type: "object",
      fields: [
        {
          name: "email",
          title: "Email Address",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "phone",
          title: "Phone Number",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: "socialMedia",
      title: "Social Media Links",
      type: "object",
      fields: [
        {
          name: "facebook",
          title: "Facebook URL",
          type: "url",
        },
        {
          name: "twitter",
          title: "Twitter URL",
          type: "url",
        },
        {
          name: "instagram",
          title: "Instagram URL",
          type: "url",
        },
        {
          name: "linkedin",
          title: "LinkedIn URL",
          type: "url",
        },
      ],
    },
    {
      name: "businessHours",
      title: "Business Hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              title: "Day",
              type: "string",
              options: {
                list: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
              },
            },
            {
              name: "openTime",
              title: "Opening Time",
              type: "string",
            },
            {
              name: "closeTime",
              title: "Closing Time",
              type: "string",
            },
            {
              name: "isClosed",
              title: "Closed",
              type: "boolean",
              initialValue: false,
            },
          ],
        },
      ],
    },
  ],
};

export default storeInfo;
