import * as ImageTransformations from 'ephox/imagetools/api/ImageTransformations';
import * as ResultConversions from 'ephox/imagetools/api/ResultConversions';
import { ImageResult } from 'ephox/imagetools/util/ImageResult';

const isSelect = (el: HTMLElement): el is HTMLSelectElement => {
  return el.tagName === 'SELECT';
};

const getValue = (el: HTMLSelectElement | HTMLButtonElement): string => {
  let value;
  if (isSelect(el)) {
    value = el.options[el.selectedIndex].value;
  } else {
    value = el.value;
  }
  return value.trim();
};

const modify = (image: HTMLImageElement, op: string, args: any[]) => {
  ResultConversions.imageToImageResult(image).then((ir) => {
    args.unshift(ir);
    return (ImageTransformations as any)[op].apply(null, args)
      .then((imageResult: ImageResult) => {
        image.src = imageResult.toDataURL();
      });
  });
};

const forms = document.querySelectorAll<HTMLFormElement>('.options');
// tslint:disable-next-line:prefer-for-of
for (let i = 0; i < forms.length; i++) {
  (function (form: HTMLFormElement) {
    form.onsubmit = function (_) {
      const selector = document.getElementById('selector') as HTMLSelectElement;
      const currOp = getValue(selector);
      const image = document.getElementById('editor') as HTMLImageElement;
      modify(image, currOp, [].slice.call((this as HTMLFormElement).elements)
        .filter((el: HTMLElement) => {
          return el.tagName !== 'BUTTON';
        })
        .map((el: HTMLButtonElement) => {
          return getValue(el);
        })
      );
      return false;
    };
  }(forms[i]));
}
