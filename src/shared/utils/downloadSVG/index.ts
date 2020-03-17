//@ts-ignore
import saveAs from "file-saver";
//@ts-ignore
import SvgSaver from "svgsaver";
export default function() {
  return {
    asSvg: (svgNode: SVGElement, name: string) => {
      const svgSaver = new SvgSaver();
      svgSaver.asSvg(svgNode, `${name}.svg`);
    },
    asPng: (svgNode: SVGElement, name: string) => {
      let isIE11 =
        !!(window as any).MSInputMethodContext &&
        !!(document as any).documentMode;

      if (isIE11) {
        saveAs(svgNode, `${name}.png`);
      } else {
        const svgSaver = new SvgSaver();
        svgSaver.asPng(svgNode, `${name}.png`);
      }
    }
  };
}
