import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { WebView } from "../services/web-view.service";

@Component({
  selector: "app-add-web-view-modal",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      *ngIf="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      (click)="onBackdropClick($event)"
    >
      <div
        class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between px-6 py-4 border-b border-[#E9E9E9] sticky top-0 bg-white z-10"
        >
          <h2 class="text-xl font-semibold text-[#181C32]">
            {{ editMode ? "Edit Web View" : "Add Web View" }}
          </h2>
          <button
            (click)="onClose()"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="px-6 py-6">
          <form (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Title -->
            <div class="flex flex-col gap-2">
              <label class="text-base font-medium text-[#878A99]"
                >Title <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                [(ngModel)]="formData.title"
                name="title"
                required
                placeholder="Enter title"
                class="w-full h-11 px-4 border border-[#CED4DA] rounded text-base text-[#686868] placeholder-[#878A99] focus:outline-none focus:border-[#049AD0] transition-colors"
              />
            </div>

            <!-- Type -->
            <div class="flex flex-col gap-2">
              <label class="text-base font-medium text-[#878A99]"
                >Type <span class="text-red-500">*</span></label
              >
              <div class="relative">
                <select
                  [(ngModel)]="formData.type"
                  name="type"
                  required
                  class="w-full h-11 px-4 pr-10 border border-[#CED4DA] rounded text-base text-[#686868] focus:outline-none focus:border-[#049AD0] appearance-none bg-white transition-colors"
                >
                  <option value="">Select type</option>
                  <option value="Standard">Standard</option>
                  <option value="External">External</option>
                  <option value="Custom">Custom</option>
                </select>
                <svg
                  class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L6 6L11 1"
                    stroke="#686868"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>

            <!-- Floor Plan Type -->
            <div class="flex flex-col gap-2">
              <label class="text-base font-medium text-[#878A99]"
                >Floor Plan Type <span class="text-red-500">*</span></label
              >
              <div class="flex items-center gap-6">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    [(ngModel)]="floorPlanMobile"
                    name="floorPlanMobile"
                    class="w-5 h-5 text-[#009FD8] border-[#CED4DA] rounded focus:ring-[#009FD8]"
                  />
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0156 1.83337H10.8156C10.5117 1.83337 10.2656 2.07941 10.2656 2.38337C10.2656 2.68733 10.5117 2.93337 10.8156 2.93337H13.0156C13.3196 2.93337 13.5656 2.68733 13.5656 2.38337C13.5656 2.07941 13.3196 1.83337 13.0156 1.83337Z"
                      fill="black"
                    />
                    <path
                      d="M15.3984 0H6.59844C5.38552 0 4.39844 0.987078 4.39844 2.2V19.8C4.39844 21.0129 5.38552 22 6.59844 22H15.3984C16.6114 22 17.5984 21.0129 17.5984 19.8V2.2C17.5984 0.987078 16.6114 0 15.3984 0ZM16.4984 19.8C16.4984 20.4076 16.006 20.9 15.3984 20.9H6.59844C5.99086 20.9 5.49844 20.4076 5.49844 19.8V2.2C5.49844 1.59242 5.99086 1.1 6.59844 1.1H15.3984C16.006 1.1 16.4984 1.59242 16.4984 2.2V19.8Z"
                      fill="black"
                    />
                    <path
                      d="M10.9984 20.1667C11.606 20.1667 12.0984 19.6742 12.0984 19.0667C12.0984 18.4592 11.606 17.9667 10.9984 17.9667C10.3909 17.9667 9.89844 18.4592 9.89844 19.0667C9.89844 19.6742 10.3909 20.1667 10.9984 20.1667Z"
                      fill="black"
                    />
                    <path
                      d="M8.97969 2.93337C9.28344 2.93337 9.52969 2.68713 9.52969 2.38337C9.52969 2.07962 9.28344 1.83337 8.97969 1.83337C8.67593 1.83337 8.42969 2.07962 8.42969 2.38337C8.42969 2.68713 8.67593 2.93337 8.97969 2.93337Z"
                      fill="black"
                    />
                  </svg>
                  <span class="text-base text-[#686868]">Mobile</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    [(ngModel)]="floorPlanDesktop"
                    name="floorPlanDesktop"
                    class="w-5 h-5 text-[#009FD8] border-[#CED4DA] rounded focus:ring-[#009FD8]"
                  />
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5417 15.5833H20.1667V5.49997C20.1667 4.48888 19.3444 3.66663 18.3333 3.66663H3.66665C2.65555 3.66663 1.8333 4.48883 1.8333 5.49997V15.5833H0.458305C0.205004 15.5833 0 15.7883 0 16.0416V16.5C0 17.5111 0.822207 18.3333 1.83335 18.3333H20.1667C21.1778 18.3333 22 17.5111 22 16.5V16.0416C22 15.7883 21.795 15.5833 21.5417 15.5833ZM2.75 5.49997C2.75 4.99466 3.16134 4.58332 3.66665 4.58332H18.3333C18.8386 4.58332 19.25 4.99466 19.25 5.49997V15.5833H13.2917H8.70835H2.75V5.49997ZM20.1667 17.4166H1.83335C1.32804 17.4166 0.916695 17.0053 0.916695 16.5H2.2917H8.51855L8.84263 16.824C8.92856 16.91 9.04492 16.9583 9.1667 16.9583H12.8333C12.9551 16.9583 13.0715 16.91 13.1574 16.824L13.4814 16.5H19.7083H21.0833C21.0833 17.0053 20.672 17.4166 20.1667 17.4166Z"
                      fill="black"
                    />
                  </svg>
                  <span class="text-base text-[#686868]">Desktop</span>
                </label>
              </div>
            </div>

            <!-- Footer -->
            <div
              class="flex items-center justify-end gap-3 pt-6 border-t border-[#E9E9E9]"
            >
              <button
                type="button"
                (click)="onClose()"
                class="px-6 py-2.5 border border-[#CED4DA] rounded font-semibold text-[#686868] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2.5 bg-[#009FD8] hover:bg-[#0385b5] text-white rounded font-semibold transition-colors"
              >
                {{ editMode ? "Update" : "Add" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class AddWebViewModalComponent {
  @Input() isOpen = false;
  @Input() editMode = false;
  @Input() editingWebView: WebView | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  floorPlanMobile = false;
  floorPlanDesktop = false;

  formData = {
    title: "",
    type: "",
  };

  ngOnChanges() {
    if (this.editMode && this.editingWebView) {
      this.formData = {
        title: this.editingWebView.title,
        type: this.editingWebView.type,
      };
      this.floorPlanMobile =
        this.editingWebView.floorPlanTypes.includes("mobile");
      this.floorPlanDesktop =
        this.editingWebView.floorPlanTypes.includes("desktop");
    } else {
      this.resetForm();
    }
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  onClose() {
    this.resetForm();
    this.close.emit();
  }

  onSubmit() {
    const floorPlanTypes: string[] = [];
    if (this.floorPlanMobile) floorPlanTypes.push("mobile");
    if (this.floorPlanDesktop) floorPlanTypes.push("desktop");

    if (
      !this.formData.title ||
      !this.formData.type ||
      floorPlanTypes.length === 0
    ) {
      return;
    }

    const webViewData = {
      title: this.formData.title,
      type: this.formData.type,
      floorPlanTypes,
    };

    this.save.emit(webViewData);
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      title: "",
      type: "",
    };
    this.floorPlanMobile = false;
    this.floorPlanDesktop = false;
  }
}
