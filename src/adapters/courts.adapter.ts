import { CourtType, CourtTypeDB } from '../types/courts.types'

export class CourtsAdapter {
  public static array (data: CourtTypeDB[]): CourtType[] {
    return data.map(el => ({
      id: el._id,
      createdAt: el.createdAt,
      updatedAt: el.updatedAt,
      name: el.name,
      description: el.description,
      images: el.images
    }))
  }

  public static single (data: CourtTypeDB): CourtType {
    return {
      id: data._id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      name: data.name,
      description: data.description,
      images: data.images
    }
  }
}
