import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../../firebase";

export class CustomUploadAdapter {
  loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return new Promise((resolve, reject) => {
      this.loader.file.then(async (file: any) => {
        const imageStorageRef = storageRef(
          storage,
          `images/posts/${file.name}`
        );
        await uploadBytes(imageStorageRef, file)
          .then(() => {
            console.log("Upload successful");
            getDownloadURL(imageStorageRef)
              .then((url) => console.log(url))
              .then((url) => resolve({ default: url }))
              .catch((error) => reject(error));
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }
}
