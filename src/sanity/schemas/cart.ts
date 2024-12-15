const cart = {
  name: "cart",
  title: "Cart",
  type: "document",
  fields: [
    {
      name: "userId",
      title: "User ID",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "discountedPrice",
      title: "Discounted Price",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "quantity",
      title: "Quantity",
      type: "number",
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: "thumbnails",
      title: "Thumbnails",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "color",
              title: "Color",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "previewImages",
      title: "Preview Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "color",
              title: "Color",
              type: "string",
            },
          ],
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
    },
    prepare(selection: any) {
      return Object.assign({}, selection, {
        subtitle: `by`,
      });
    },
  },
};
export default cart;
