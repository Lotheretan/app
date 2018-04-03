import { helper } from '@ember/component/helper';

export function maskPassword([value, ...rest]) {
if (value){
  return "*".repeat(value.length);
}
return "";

}

export default helper(maskPassword);
