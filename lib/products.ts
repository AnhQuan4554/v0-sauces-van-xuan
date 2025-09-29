export interface Product {
  id: number;
  name: string;
  price: number;
  sold: number;
  image_url: string;
  tags: string[];
  description?: string;
}

// export const products: Product[] = [
//   {
//     id: 1,
//     name: "Hot Salsa Doritos 300G",
//     price: 179900,
//     sold: 48,
//     image: "/hot-salsa-sauce-jar.jpg",
//     tags: ["HOT", "HOT", "HOT", "HOT"],
//     description: "Spicy hot salsa sauce perfect for adding heat to your meals",
//   },
//   {
//     id: 2,
//     name: "Green Pepper Sauce Tabasco 60ML",
//     price: 79900,
//     sold: 19,
//     image: "/green-tabasco-sauce-bottle.jpg",
//     tags: [],
//     description: "Classic green pepper sauce with authentic Tabasco flavor",
//   },
//   {
//     id: 3,
//     name: "Mild Salsa Doritos 300G",
//     price: 179900,
//     sold: 30,
//     image: "/mild-salsa-sauce-jar.jpg",
//     tags: ["MILD", "MILD", "MILD"],
//     description: "Mild salsa sauce for those who prefer less heat",
//   },
//   {
//     id: 4,
//     name: "Bean Sauce Lee Kum Kee 240G",
//     price: 25900,
//     sold: 8,
//     image: "/asian-bean-sauce-jar.jpg",
//     tags: [],
//     description: "Traditional Asian bean sauce for authentic cooking",
//   },
//   {
//     id: 5,
//     name: "Pesto Genovese Sauce Barilla 190G",
//     price: 179900,
//     sold: 25,
//     image: "/pesto-sauce-jar.jpg",
//     tags: [],
//     description: "Authentic Italian pesto sauce made with fresh basil",
//   },
//   {
//     id: 6,
//     name: "Red Pepper Sauce Tabasco 60ML",
//     price: 79900,
//     sold: 42,
//     image: "/red-tabasco-sauce-bottle.jpg",
//     tags: [],
//     description: "Classic red pepper sauce with signature Tabasco heat",
//   },
//   {
//     id: 7,
//     name: "Tomato Sauce Heinz 300G",
//     price: 39900,
//     sold: 67,
//     image: "/heinz-tomato-sauce-bottle.jpg",
//     tags: [],
//     description: "Premium tomato sauce perfect for all your cooking needs",
//   },
//   {
//     id: 8,
//     name: "Organic Sriracha Sauce Lumium 250G",
//     price: 86900,
//     sold: 15,
//     image: "/organic-sriracha-sauce-bottle.jpg",
//     tags: [],
//     description: "Organic sriracha sauce with natural ingredients",
//   },
// ]

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
};
