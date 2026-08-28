import ImageKit from '@imagekit/nodejs';
import { config } from '../config/config.js';


const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,

});


export async uploadFile ()