import { v2 as cloudinary } from 'cloudinary'

const { CLOUDINARY_SECRET, CLOUDINARY_API_KEY, CLOUDINARY_NAME } = process.env

export class Cloudinary {
  private static cloudinaryInstance: Cloudinary | null = null

  private constructor () {}

  public static createInstance () {
    if (!Cloudinary.cloudinaryInstance) {
      cloudinary.config({
        cloud_name: CLOUDINARY_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_SECRET // Click 'View Credentials' below to copy your API secret
      })
      this.cloudinaryInstance = new Cloudinary()
    }
    return this.cloudinaryInstance
  }

  public upload (
    filePath: string
  ): Promise<{ ok: boolean; data?: any; error?: any }> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(filePath, (err, result) => {
        if (err) {
          console.log(err)
          reject({ ok: false, error: err })
        } else {
          resolve({ ok: true, data: result })
        }
      })
    })
  }

  public delete (
    publicId: string
  ): Promise<{ ok: boolean; data?: any; error?: any }> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (err, result) => {
        if (err) {
          console.log(err)
          reject({ ok: false, error: err })
        } else {
          resolve({ ok: true, data: result })
        }
      })
    })
  }
}
