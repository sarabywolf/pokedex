export const color_by_types = {
  bug: "#4CAF50",
  dark: "#424242",
  dragon: "#2196F3",
  electric: "#FFEB3B",
  fairy: "#FFC0CB",
  fighting: "#FF5722",
  fire: "#FF5722",
  flying: "#03A9F4",
  ghost: "#9C27B0",
  grass: "#8BC34A",
  ground: "#795548",
  ice: "#B3E5FC",
  normal: "#9E9E9E",
  poison: "#9C27B0",
  psychic: "#E91E63",
  rock: "#795548",
  steel: "#607D8B",
  water: "#2196F3"
}

export type ColorType = keyof typeof color_by_types;
