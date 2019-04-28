// import * as functions from 'firebase-functions';

// const { Storage } = require('@google-cloud/storage');
// const gcs = new Storage();

// import { tmpdir } from 'os';
// import { join, dirname } from 'path';

// import * as sharp from 'sharp';
// import * as fs from 'fs-extra';

// export const resizeImages = functions.storage
//     .object()
//     .onFinalize(async object => {
//         const bucket = gcs.bucket(object.bucket);
//         const contentType: string = object.contentType || '';
//         const filePath = object.name || '';
//         const fileName = filePath.split('/').pop() || '';
//         const bucketDir = dirname(filePath);

//         const workingDir = join(tmpdir(), 'thumbs');
//         const tmpFilePath = join(workingDir, 'source.png');

//         if (fileName.includes('thumb@') || !contentType.includes('image')) {
//             console.log('exiting function');
//             return false;
//         }

//         // 1. Ensure thumbnail dir exists
//         await fs.ensureDir(workingDir);

//         // 2. Download Source File
//         await bucket.file(filePath).download({
//             destination: tmpFilePath
//         });

//         // 3. Resize the images and define an array of upload promises
//         const sizes = [64, 256, 600];

//         const uploadPromises = sizes.map(async size => {
//             const thumbName = `thumb@${size}_${fileName}`;
//             const thumbPath = join(workingDir, thumbName);

//             // Resize source image
//             await sharp(tmpFilePath)
//                 .resize(size, size)
//                 .toFile(thumbPath);

//             // Upload to GCS
//             return bucket.upload(thumbPath, {
//                 destination: join(bucketDir, thumbName)
//             }).then((resp: any) => {
//                 console.log("UPLOAD RESPONSE", resp.metaData.mediaLink)
//             });
//         });

//         // 4. Run the upload operations
//         await Promise.all(uploadPromises);

//         // 5. Cleanup remove the tmp/thumbs from the filesystem
//         return fs.remove(workingDir).then(() => {
//             return fs.remove(bucketDir);
//         })
//     });