import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface GalleryImage {
  id: string;
  eventId: string;
  title: string;
  imageUrl: string;
  caption?: string;
  createdAt: string;
}

@Injectable({
  providedIn: "root",
})
export class ImageGalleryService {
  private readonly STORAGE_KEY = "eventtan_gallery_images";
  private galleryImagesSubject = new BehaviorSubject<GalleryImage[]>(
    this.loadFromStorage(),
  );

  galleryImages$: Observable<GalleryImage[]> =
    this.galleryImagesSubject.asObservable();

  constructor() {}

  private loadFromStorage(): GalleryImage[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveToStorage(images: GalleryImage[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(images));
  }

  getGalleryImages(): GalleryImage[] {
    return this.galleryImagesSubject.value;
  }

  getGalleryImagesByEvent(eventId: string): GalleryImage[] {
    return this.getGalleryImages().filter(
      (image) => image.eventId === eventId,
    );
  }

  addGalleryImage(
    eventId: string,
    image: Omit<GalleryImage, "id" | "eventId" | "createdAt">,
  ): GalleryImage {
    const newImage: GalleryImage = {
      ...image,
      id: this.generateId(),
      eventId: eventId,
      createdAt: new Date().toISOString(),
    };

    const images = [...this.getGalleryImages(), newImage];
    this.galleryImagesSubject.next(images);
    this.saveToStorage(images);
    return newImage;
  }

  updateGalleryImage(id: string, updates: Partial<GalleryImage>): void {
    const images = this.getGalleryImages().map((image) => {
      if (image.id === id) {
        return { ...image, ...updates };
      }
      return image;
    });
    this.galleryImagesSubject.next(images);
    this.saveToStorage(images);
  }

  deleteGalleryImage(id: string): void {
    const images = this.getGalleryImages().filter((image) => image.id !== id);
    this.galleryImagesSubject.next(images);
    this.saveToStorage(images);
  }

  getGalleryImageById(id: string): GalleryImage | undefined {
    return this.getGalleryImages().find((image) => image.id === id);
  }

  private generateId(): string {
    return `gallery_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
