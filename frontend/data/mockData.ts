import { Product, IngredientOption } from '../types';


const sauces: IngredientOption[] = [
  { id: 's1', name: 'Ajo' },
  { id: 's2', name: 'Soya' },
  { id: 's3', name: 'Ají' },
  { id: 's4', name: 'Albahaca' },
  { id: 's5', name: 'Cilantro' },
  { id: 's6', name: 'Perejil' },
  { id: 's7', name: 'Ciboulette' },
  { id: 's8', name: 'Mayo' },
  { id: 's9', name: 'Ketchup' },
  { id: 's10', name: 'Agridulce' },
  { id: 's11', name: 'Jengibre' },
  { id: 's12', name: 'Ají limón' },
  { id: 's13', name: 'Mostaza' },
  { id: 's14', name: 'Champiñón' },
];

export const menuData: Product[] = [
  {
    id: 'plato-fresh',
    name: 'Platos Fresh',
    category: 'Platos',
    description: '1 proteína (200gr), 1 acompañamiento y 2 salsas',
    rules: {
      proteinCount: 1,
      sideCount: 1,
      sauceCount: 2,
    },
    ingredients: {
      proteins: [
        { id: 'p1', name: 'Pollo al jugo', price: 5000 },
        { id: 'p2', name: 'Cerdo al jugo', price: 5000 },
        { id: 'p3', name: 'Falafel 18u', price: 5000 },
        { id: 'p4', name: 'Camarones apanados 12u', price: 5300 },
        { id: 'p5', name: 'Champiñones salteados', price: 5300 },
        { id: 'p6', name: 'Vacuno al jugo', price: 6300 },
        { id: 'p7', name: 'Salmón (apanado o plancha)', price: 6300 },
      ],
      sides: [
        { id: 'ac1', name: 'Arroz blanco', price: 1300 },
        { id: 'ac2', name: 'Arroz curry', price: 1650 },
        { id: 'ac3', name: 'Arroz chaufán', price: 2200 },
        { id: 'ac4', name: 'Papas fritas', price: 2700 },
      ],
      sauces: sauces,
    },
  },
  {
    id: 'bowl-tradicional',
    name: 'Bowl Tradicional',
    category: 'Bowls',
    description: '1 Base, 4 vegetales, 4 toques y 4 salsas',
    rules: {
      baseCount: 1,
      veggieCount: 4,
      touchCount: 4,
      sauceCount: 4,
    },
    ingredients: {
      bases: [
        { id: 'b1', name: 'Arroz blanco' },
        { id: 'b2', name: 'Arroz Curry' },
        { id: 'b3', name: 'Vegetal' },
        { id: 'b4', name: 'Corbatita' },
        { id: 'b5', name: 'Espirales' },
      ], // Bases mocked since prompt only says "Base (1)"
      proteins: [
        { id: 'b_p1', name: 'Pollo', price: 5500 },
        { id: 'b_p2', name: 'Falafel', price: 5500 },
        { id: 'b_p3', name: 'Champiñón', price: 5500 },
        { id: 'b_p4', name: 'Cerdo', price: 5500 },
        { id: 'b_p5', name: 'Camarón', price: 6000 },
        { id: 'b_p6', name: 'Pollo Teriyaki', price: 6000 },
        { id: 'b_p7', name: 'Pollo Shawarma', price: 6000 },
        { id: 'b_p8', name: 'Tofu', price: 6000 },
        { id: 'b_p9', name: 'Salmón', price: 6600 },
        { id: 'b_p10', name: 'Vacuno', price: 6600 },
        { id: 'b_p11', name: 'Camarón apanado', price: 6600 },
      ],
      veggies: [
        { id: 'v1', name: 'Lechuga' },
        { id: 'v2', name: 'Repollo' },
        { id: 'v3', name: 'Pepino' },
        { id: 'v4', name: 'Tomate' },
        { id: 'v5', name: 'Zanahoria' },
        { id: 'v6', name: 'Cebolla morada' },
        { id: 'v7', name: 'Cebollín' },
        { id: 'v8', name: 'Mix pimentón' },
        { id: 'v9', name: 'Brócoli' },
        { id: 'v10', name: 'Coliflor' },
        { id: 'v11', name: 'Choclo baby' },
        { id: 'v12', name: 'Palmito' },
      ],
      touches: [
        { id: 't1', name: 'Mix morrón' },
        { id: 't2', name: 'Pebre' },
        { id: 't3', name: 'Ají verde' },
        { id: 't4', name: 'Salsa verde' },
        { id: 't5', name: 'Cebolla morada' },
        { id: 't6', name: 'Apio' },
      ],
      extras: [
        { id: 'e1', name: 'Palta', price: 900 },
        { id: 'e2', name: 'Queso crema', price: 1100 },
      ],
      sauces: sauces,
    },
  },
  {
    id: 'sandwich',
    name: 'Sándwich',
    category: 'Sándwich',
    description: 'Arma tu sándwich a medida',
    basePrice: 5800,
    rules: {
      sauceCount: 2,
    },
    ingredients: {
      bases: [
        { id: 's_b1', name: 'Barros Luco (Lomito + queso)' },
        { id: 's_b2', name: 'Pollo Clásico (Pollo + queso)' },
      ],
      sauces: [
        { id: 'ss1', name: 'Mayo' },
        { id: 'ss2', name: 'Ajo' },
        { id: 'ss3', name: 'Mostaza' },
        { id: 'ss4', name: 'Agridulce' },
        { id: 'ss5', name: 'Ají' },
      ],
      extras: [
        { id: 'se1', name: 'Huevo', price: 900 },
        { id: 'se2', name: 'Palta', price: 900 },
      ],
    },
  },
];
