export const PRODUCT_SIZES = {
  Topwear: [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
  ],

  Bottomwear: [
    "28",
    "30",
    "32",
    "34",
    "36",
    "38",
    "40",
  ],

  Footwear: [
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ],

  Accessories: [
    "Free Size",
  ],
};

export const getSizesByCategory = (category) =>
  PRODUCT_SIZES[category] || [];