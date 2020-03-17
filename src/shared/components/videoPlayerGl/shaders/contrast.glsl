float contrast(float base, float c) {
  float cn = (base - 0.5) * c + 0.5;
  return cn < 0.0 ? 0.0 : cn;
}