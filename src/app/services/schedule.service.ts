import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface Schedule {
  id: string;
  eventId: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  speakers: string;
  speakerName?: string;
  speakerAvatar?: string;
  scheduleFor: string;
  description: string;
  fileName?: string;
}

@Injectable({
  providedIn: "root",
})
export class ScheduleService {
  private readonly STORAGE_KEY = "eventtan_schedules";
  private schedulesSubject = new BehaviorSubject<Schedule[]>(
    this.loadFromStorage()
  );

  schedules$: Observable<Schedule[]> = this.schedulesSubject.asObservable();

  constructor() {}

  private loadFromStorage(): Schedule[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveToStorage(schedules: Schedule[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(schedules));
  }

  getSchedules(): Schedule[] {
    return this.schedulesSubject.value;
  }

  getSchedulesByEvent(eventId: string): Schedule[] {
    return this.getSchedules().filter(
      (schedule) => schedule.eventId === eventId
    );
  }

  addSchedule(
    eventId: string,
    schedule: Omit<Schedule, "id" | "eventId">
  ): Schedule {
    const newSchedule: Schedule = {
      ...schedule,
      id: this.generateId(),
      eventId: eventId,
      speakerName: this.getSpeakerName(schedule.speakers),
      speakerAvatar: this.getSpeakerAvatar(schedule.speakers),
    };

    const schedules = [...this.getSchedules(), newSchedule];
    this.schedulesSubject.next(schedules);
    this.saveToStorage(schedules);
    return newSchedule;
  }

  updateSchedule(id: string, updates: Partial<Schedule>): void {
    const schedules = this.getSchedules().map((schedule) => {
      if (schedule.id === id) {
        const updated = { ...schedule, ...updates };
        if (updates.speakers) {
          updated.speakerName = this.getSpeakerName(updates.speakers);
          updated.speakerAvatar = this.getSpeakerAvatar(updates.speakers);
        }
        return updated;
      }
      return schedule;
    });
    this.schedulesSubject.next(schedules);
    this.saveToStorage(schedules);
  }

  deleteSchedule(id: string): void {
    const schedules = this.getSchedules().filter(
      (schedule) => schedule.id !== id
    );
    this.schedulesSubject.next(schedules);
    this.saveToStorage(schedules);
  }

  getScheduleById(id: string): Schedule | undefined {
    return this.getSchedules().find((schedule) => schedule.id === id);
  }

  private generateId(): string {
    return `schedule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getSpeakerName(speakerId: string): string {
    const speakerMap: { [key: string]: string } = {
      speaker1: "Kajal Patel",
      speaker2: "John Smith",
      speaker3: "Sarah Johnson",
    };
    return speakerMap[speakerId] || speakerId;
  }

  private getSpeakerAvatar(speakerId: string): string {
    const avatarMap: { [key: string]: string } = {
      speaker1:
        "https://api.builder.io/api/v1/image/assets/TEMP/cbf457395a6cdfc9d9200dac74cd11d1d764fa6d",
      speaker2:
        "https://api.builder.io/api/v1/image/assets/TEMP/cbf457395a6cdfc9d9200dac74cd11d1d764fa6d",
      speaker3:
        "https://api.builder.io/api/v1/image/assets/TEMP/cbf457395a6cdfc9d9200dac74cd11d1d764fa6d",
    };
    return avatarMap[speakerId] || "";
  }
}
