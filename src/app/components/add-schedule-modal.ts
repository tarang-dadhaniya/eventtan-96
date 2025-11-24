import { Component, Output, EventEmitter, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-add-schedule-modal",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Modal Overlay -->
    <div
      *ngIf="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      (click)="onOverlayClick($event)"
    >
      <!-- Modal Container -->
      <div
        class="bg-white rounded w-full max-w-3xl max-h-[90vh] flex flex-col"
        (click)="$event.stopPropagation()"
      >
        <!-- Fixed Header -->
        <div
          class="flex items-center justify-between px-8 py-6 border-b border-gray-200 flex-shrink-0"
        >
          <h2 class="text-[22px] font-medium text-[#3F4254]">
            {{ editMode ? "Edit Schedule" : "Add Schedule" }}
          </h2>
          <button
            (click)="onClose()"
            class="w-5 h-5 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Close modal"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.929495 18C0.692391 18 0.455286 17.9099 0.275141 17.7284C-0.0865054 17.3667 -0.0865054 16.7804 0.275141 16.4187L16.4227 0.271235C16.7843 -0.0904116 17.3706 -0.0904116 17.7323 0.271235C18.0939 0.632881 18.0939 1.2192 17.7323 1.58107L1.58498 17.7284C1.40348 17.9087 1.16637 18 0.929495 18Z"
                fill="#3F4254"
              />
              <path
                d="M17.0781 18C16.841 18 16.6042 17.9099 16.4238 17.7284L0.275141 1.58107C-0.0865054 1.2192 -0.0865054 0.632881 0.275141 0.271235C0.636787 -0.0904116 1.22311 -0.0904116 1.58498 0.271235L17.7323 16.4187C18.0939 16.7804 18.0939 17.3667 17.7323 17.7284C17.5508 17.9087 17.3139 18 17.0781 18Z"
                fill="#3F4254"
              />
            </svg>
          </button>
        </div>

        <!-- Scrollable Body -->
        <div class="flex-1 overflow-y-auto px-8 py-6">
          <div class="space-y-6">
            <!-- Title and Date Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Title Field -->
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2"
                  >Title</label
                >
                <input
                  type="text"
                  [(ngModel)]="formData.title"
                  placeholder="Enter Title"
                  class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded placeholder:text-[#C2C3CB] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
                />
              </div>

              <!-- Date Field -->
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2"
                  >Date</label
                >
                <div class="relative">
                  <input
                    type="date"
                    [(ngModel)]="formData.date"
                    placeholder="Select Date"
                    class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded placeholder:text-[#C2C3CB] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
                  />
                </div>
              </div>
            </div>

            <!-- Start Time and End Time Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Start Time Field -->
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2"
                  >Start Time</label
                >
                <div class="relative">
                  <input
                    type="time"
                    [(ngModel)]="formData.startTime"
                    placeholder="Select Time"
                    class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded placeholder:text-[#C2C3CB] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
                  />
                </div>
              </div>

              <!-- End Time Field -->
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2"
                  >End Time</label
                >
                <div class="relative">
                  <input
                    type="time"
                    [(ngModel)]="formData.endTime"
                    placeholder="Select Time"
                    class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded placeholder:text-[#C2C3CB] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
                  />
                </div>
              </div>
            </div>

            <!-- Speakers and Schedule For Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Speakers Field -->
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2"
                  >Speakers</label
                >
                <div class="relative">
                  <select
                    [(ngModel)]="formData.speakers"
                    class="w-full h-[50px] px-4 pr-10 border-2 border-[#E9EBEC] rounded text-base appearance-none focus:outline-none focus:border-[#009FD8] transition-colors"
                    [class.text-[#C2C3CB]]="!formData.speakers"
                    [class.text-[#212529]]="formData.speakers"
                  >
                    <option value="" disabled selected hidden>
                      Please Select Speakers
                    </option>
                    <option value="speaker1">Speaker 1</option>
                    <option value="speaker2">Speaker 2</option>
                    <option value="speaker3">Speaker 3</option>
                  </select>
                  <div
                    class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.31068 0.193108C8.57471 -0.0643956 9.00279 -0.0643956 9.26682 0.193108C9.53085 0.450612 9.53085 0.868109 9.26682 1.12561L5.21024 5.0819C4.95429 5.33152 4.54215 5.34026 4.27532 5.10171L0.218738 1.47512C-0.0565142 1.22904 -0.075108 0.811938 0.177206 0.543491C0.42952 0.275045 0.857196 0.25691 1.13245 0.502986L4.71184 3.70297L8.31068 0.193108Z"
                        fill="#434349"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Schedule For Field -->
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2"
                  >Schedule For</label
                >
                <div class="relative">
                  <select
                    [(ngModel)]="formData.scheduleFor"
                    class="w-full h-[50px] px-4 pr-10 border-2 border-[#E9EBEC] rounded text-base appearance-none focus:outline-none focus:border-[#009FD8] transition-colors"
                    [class.text-[#C2C3CB]]="!formData.scheduleFor"
                    [class.text-[#212529]]="formData.scheduleFor"
                  >
                    <option value="" disabled selected hidden>
                      Please Select
                    </option>
                    <option value="all">All Attendees</option>
                    <option value="vip">VIP Only</option>
                    <option value="speakers">Speakers Only</option>
                  </select>
                  <div
                    class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.31068 0.193108C8.57471 -0.0643956 9.00279 -0.0643956 9.26682 0.193108C9.53085 0.450612 9.53085 0.868109 9.26682 1.12561L5.21024 5.0819C4.95429 5.33152 4.54215 5.34026 4.27532 5.10171L0.218738 1.47512C-0.0565142 1.22904 -0.075108 0.811938 0.177206 0.543491C0.42952 0.275045 0.857196 0.25691 1.13245 0.502986L4.71184 3.70297L8.31068 0.193108Z"
                        fill="#434349"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Description Field -->
            <div>
              <label class="block text-base font-medium text-[#212529] mb-2"
                >Description</label
              >
              <textarea
                [(ngModel)]="formData.description"
                rows="6"
                placeholder="Enter description..."
                class="w-full px-4 py-3 border-2 border-[#CED4DA] rounded placeholder:text-[#C2C3CB] text-base focus:outline-none focus:border-[#009FD8] transition-colors resize-none"
              ></textarea>
            </div>

            <!-- Upload Document Field -->
            <div>
              <label class="block text-base font-medium text-[#212529] mb-2"
                >Upload Document</label
              >
              <div
                class="border border-dashed border-[#B9BBBC] rounded h-[120px] flex flex-col items-center justify-center cursor-pointer hover:border-[#009FD8] transition-colors"
                (click)="fileInput.click()"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="mb-2"
                >
                  <path
                    d="M25.0037 27.6421H19.8316H18.4389H18.1381V20.7046H20.407C20.9824 20.7046 21.3224 20.0507 20.9824 19.5799L16.5689 13.4729C16.2877 13.0805 15.7058 13.0805 15.4246 13.4729L11.011 19.5799C10.671 20.0507 11.0045 20.7046 11.5864 20.7046H13.8553V27.6421H13.5546H12.1618H6.16592C2.73314 27.4524 0 24.242 0 20.7634C0 18.3638 1.30119 16.2714 3.23008 15.1402C3.05354 14.6629 2.96199 14.1529 2.96199 13.6167C2.96199 11.1647 4.9432 9.18353 7.39518 9.18353C7.92481 9.18353 8.43482 9.27507 8.91214 9.45162C10.331 6.44385 13.3911 4.35803 16.9481 4.35803C21.5513 4.36457 25.3437 7.88889 25.7752 12.3809C29.3126 12.989 32 16.2649 32 19.9723C32 23.9347 28.9138 27.3674 25.0037 27.6421Z"
                    fill="#878A99"
                  />
                </svg>
                <p class="text-base font-medium text-[#212529]">
                  Drop file here or click to upload.
                </p>
                <input
                  #fileInput
                  type="file"
                  class="hidden"
                  (change)="onFileSelected($event)"
                />
              </div>
              <p *ngIf="formData.fileName" class="mt-2 text-sm text-[#212529]">
                Selected: {{ formData.fileName }}
              </p>
            </div>
          </div>
        </div>

        <!-- Fixed Footer -->
        <div
          class="flex items-center justify-end gap-4 px-8 py-5 border-t border-gray-200 flex-shrink-0"
        >
          <button
            (click)="onClose()"
            class="flex items-center gap-2 h-9 px-4 rounded bg-[#DEE1EB] text-[#4C546C] font-semibold text-base hover:bg-[#d0d3df] transition-colors"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.620965 12C0.462896 12 0.304826 11.9399 0.184729 11.8189C-0.0563682 11.5778 -0.0563682 11.1869 0.184729 10.9458L10.9497 0.180823C11.1908 -0.0602744 11.5817 -0.0602744 11.8228 0.180823C12.0639 0.421921 12.0639 0.8128 11.8228 1.05405L1.05795 11.8189C0.936954 11.9392 0.778884 12 0.620965 12Z"
                fill="#4C546C"
              />
              <path
                d="M11.3867 12C11.2287 12 11.0707 11.9399 10.9505 11.8189L0.184729 1.05405C-0.0563682 0.8128 -0.0563682 0.421921 0.184729 0.180823C0.425827 -0.0602744 0.816707 -0.0602744 1.05795 0.180823L11.8228 10.9458C12.0639 11.1869 12.0639 11.5778 11.8228 11.8189C11.7018 11.9392 11.5439 12 11.3867 12Z"
                fill="#4C546C"
              />
            </svg>
            <span>Close</span>
          </button>
          <button
            (click)="onSave()"
            class="flex items-center gap-2 h-9 px-4 rounded bg-[#009FD8] text-white font-semibold text-base hover:bg-[#0385b5] transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.7432 3.76582C14.0231 4.01076 14.0485 4.43749 13.7995 4.71384L6.79025 12.4937C6.53996 12.7715 6.11021 12.7892 5.83796 12.5329L1.78194 8.7145C1.529 8.47637 1.50478 8.07957 1.7218 7.8083C1.96127 7.50897 2.40721 7.46777 2.6922 7.7241L5.83913 10.5547C6.11261 10.8007 6.53366 10.7787 6.78005 10.5056L12.8091 3.82096C13.053 3.55046 13.4691 3.52594 13.7432 3.76582Z"
                fill="white"
              />
            </svg>
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class AddScheduleModalComponent {
  @Input() isOpen = false;
  @Input() editMode = false;
  @Input() set scheduleData(data: any) {
    if (data) {
      this.formData = {
        title: data.title || "",
        date: data.date || "",
        startTime: data.startTime || "",
        endTime: data.endTime || "",
        speakers: data.speakers || "",
        scheduleFor: data.scheduleFor || "",
        description: data.description || "",
        fileName: data.fileName || "",
      };
    }
  }
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  formData = {
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    speakers: "",
    scheduleFor: "",
    description: "",
    fileName: "",
  };

  onClose() {
    this.resetForm();
    this.close.emit();
  }

  onSave() {
    if (this.validateForm()) {
      this.save.emit(this.formData);
      this.resetForm();
    }
  }

  onOverlayClick(event: MouseEvent) {
    this.onClose();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.formData.fileName = input.files[0].name;
    }
  }

  validateForm(): boolean {
    if (!this.formData.title.trim()) {
      alert("Please enter a title");
      return false;
    }
    if (!this.formData.date) {
      alert("Please select a date");
      return false;
    }
    if (!this.formData.startTime) {
      alert("Please select a start time");
      return false;
    }
    if (!this.formData.endTime) {
      alert("Please select an end time");
      return false;
    }
    if (!this.formData.speakers) {
      alert("Please select a speaker");
      return false;
    }
    if (!this.formData.scheduleFor) {
      alert("Please select schedule for");
      return false;
    }
    return true;
  }

  resetForm() {
    this.formData = {
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      speakers: "",
      scheduleFor: "",
      description: "",
      fileName: "",
    };
  }
}
