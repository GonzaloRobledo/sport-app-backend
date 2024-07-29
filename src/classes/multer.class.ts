import multer from 'multer'

export class Multer {
  private upload: any = null

  public constructor () {
    const storage = multer.diskStorage({
      filename: function (req, file, cb) {
        // Configurar el nombre del archivo cargado
        cb(null, `${Date.now()}-${file.originalname}`)
      }
    })

    this.upload = multer({ storage })
  }

  public getUpload () {
    return this.upload
  }
}
