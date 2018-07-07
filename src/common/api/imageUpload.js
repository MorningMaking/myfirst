import CosModel from "@/common/model/CosModel";

export function imageUpload(file) {
  // if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
  //
  //   return false
  // }
  return CosModel.uploadFile(file)
}
