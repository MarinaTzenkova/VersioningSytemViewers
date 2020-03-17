struct Options {
  bool show;
  float brightness;
  float contrast;
  float threshold;
  float hue;
};

varying vec2 v_coords;

uniform sampler2D u_base;
uniform sampler2D u_red;
uniform sampler2D u_green;
uniform sampler2D u_conf;
uniform sampler2D u_scratch;

uniform Options u_rOpts;
uniform Options u_gOpts;
uniform Options u_cOpts;
uniform bool u_bSelected;

vec3 red = vec3(0.0);
bool redMask = true;
vec3 green = vec3(0.0);
bool greenMask = true;
vec3 conf = vec3(0.0);
bool confMask = true;
vec3 scratch = vec3(0.0);
bool scratchMask = true;
float scratchHue = 4.0/7.0;

vec4 lux() {
  vec3 base = u_bSelected ? vec3(texture2D(u_base, v_coords)) : vec3(0.0);

  if (u_rOpts.show) {
    float initialRed = texture2D(u_red, v_coords).s;
    vec3 rhsv = rgb2hsv(vec3(threshold(initialRed, u_rOpts.threshold), 0, 0));
    red = hsv2rgb(vec3(rhsv.r + u_rOpts.hue, rhsv.g, contrast(rhsv.b + u_rOpts.brightness, u_rOpts.contrast)));
    redMask = max(red.r, max(red.g, red.b)) <= contrast(u_rOpts.brightness, u_rOpts.contrast);
  }
  if (u_gOpts.show) {
    float initialGreen = texture2D(u_green, v_coords).s;
    vec3 ghsv = rgb2hsv(vec3(threshold(initialGreen, u_gOpts.threshold), 0, 0));
    green = hsv2rgb(vec3(ghsv.r + u_gOpts.hue, ghsv.g, contrast(ghsv.b + u_gOpts.brightness, u_gOpts.contrast)));
    greenMask = max(green.r, max(green.g, green.b)) <= contrast(u_gOpts.brightness, u_gOpts.contrast);
  }
  if (u_cOpts.show) {
    float initialConfluence = texture2D(u_conf, v_coords).s;
    vec3 chsv = rgb2hsv(vec3(initialConfluence, 0, 0));
    conf = hsv2rgb(vec3(chsv.r + u_cOpts.hue, chsv.g, contrast(chsv.b + u_cOpts.brightness, u_cOpts.contrast)));
    confMask = initialConfluence < u_cOpts.threshold;
  }

   vec4 i_scratch = texture2D(u_scratch, v_coords);
   float initialScratch = i_scratch.r;
   vec3 shsv = rgb2hsv(vec3(initialScratch, 0, 0));
   vec3 scratch = hsv2rgb(vec3(shsv.r + scratchHue, shsv.g, shsv.b));
   scratchMask = max(scratch.r, max(scratch.g, scratch.b)) <= 0.5;

  vec3 multiplied = green + red;
  vec3 rgColor; 

  if (redMask && greenMask) {
    rgColor = base;
  } else if (redMask) {
    rgColor = base + green;
  } else if (greenMask) {
    rgColor = base + red;
  } else {
    rgColor = base + multiplied;
  }

  vec3 black = rgColor.r == 0.0 ? vec3(0.5) : rgColor;
  vec3 algoColor;

  if (confMask && scratchMask) {    
      algoColor = rgColor;
  } else if (confMask) {
      algoColor = blendMultiply(black, scratch);
  } else if (scratchMask) {
      algoColor = blendMultiply(black, conf);
  }

  return vec4(vec3(algoColor), 1);
}