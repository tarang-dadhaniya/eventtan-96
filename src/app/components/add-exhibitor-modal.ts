import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-add-exhibitor-modal",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Modal Backdrop -->
    <div
      *ngIf="isOpen"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
      (click)="onCancel()"
    >
      <!-- Modal Container -->
      <div
        class="bg-white rounded shadow-lg w-full max-w-[767px] max-h-[95vh] overflow-y-auto"
        (click)="$event.stopPropagation()"
      >
        <!-- Modal Header -->
        <div class="px-5 py-4 border-b border-[#CED4DA]">
          <div class="flex items-center justify-between">
            <h2 class="text-[22px] font-medium text-[#3F4254]">
              Add Exhibitors
            </h2>
            <button
              type="button"
              (click)="onCancel()"
              class="text-[#3F4254] hover:text-[#212529] transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <path
                    d="M0.929495 18C0.692391 18 0.455286 17.9099 0.275141 17.7284C-0.0865054 17.3667 -0.0865054 16.7804 0.275141 16.4187L16.4227 0.271235C16.7843 -0.0904116 17.3706 -0.0904116 17.7323 0.271235C18.0939 0.632881 18.0939 1.2192 17.7323 1.58107L1.58498 17.7284C1.40348 17.9087 1.16637 18 0.929495 18Z"
                    fill="currentColor"
                  />
                  <path
                    d="M17.0781 18C16.841 18 16.6042 17.9099 16.4238 17.7284L0.275141 1.58107C-0.0865054 1.2192 -0.0865054 0.632881 0.275141 0.271235C0.636787 -0.0904116 1.22311 -0.0904116 1.58498 0.271235L17.7323 16.4187C18.0939 16.7804 18.0939 17.3667 17.7323 17.7284C17.5508 17.9087 17.3139 18 17.0781 18Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <form class="px-6 py-5" (ngSubmit)="onSubmit()">
          <!-- Profile Upload -->
          <div class="flex justify-center mb-8">
            <div class="relative">
              <div
                class="w-[120px] h-[120px] rounded-full border-2 border-[#8B8B8B] bg-[#F5F5F5] flex items-center justify-center overflow-hidden cursor-pointer"
                (click)="logoInput.click()"
              >
                <img
                  *ngIf="formData.companyLogo"
                  [src]="formData.companyLogo"
                  alt="Company Logo"
                  class="w-full h-full object-cover"
                />
                <svg
                  *ngIf="!formData.companyLogo"
                  width="60"
                  height="60"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="15" y="25" width="70" height="55" rx="6" fill="#5B7285" />
                  <rect x="35" y="15" width="30" height="20" rx="3" fill="#5B7285" />
                  <rect x="70" y="28" width="12" height="10" rx="2" fill="#6FB3A5" />
                  <circle cx="50" cy="52" r="12" fill="none" stroke="white" stroke-width="3" />
                </svg>
              </div>
              <button
                type="button"
                (click)="logoInput.click()"
                class="absolute bottom-0 right-0 w-12 h-12 rounded-full bg-[#009FD8] flex items-center justify-center shadow-md hover:bg-[#0385b5] transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.8333 3.16667L16.8333 2.16667C17.5 1.5 18.5833 1.5 19.25 2.16667C19.9167 2.83333 19.9167 3.91667 19.25 4.58333L18.25 5.58333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3.33333 16.6667H2V18C2 18.5523 2.44772 19 3 19H4.33333V17.6667" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.25 5.58333L5.5 18.3333C5.03333 18.8 4.33333 19 3.5 19H2V17.5C2 16.6667 2.2 15.9667 2.66667 15.5L15.4167 2.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <input
                #logoInput
                type="file"
                (change)="onLogoSelected($event)"
                accept="image/*"
                class="hidden"
              />
            </div>
          </div>

          <!-- Company and Stall Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Company -->
            <div>
              <label class="block text-base font-medium text-[#212529] mb-2">
                Company
              </label>
              <input
                type="text"
                [(ngModel)]="formData.companyName"
                name="companyName"
                placeholder="Enter Company Name"
                class="w-full px-5 py-3 border-2 border-[#E9EBEC] rounded text-base text-[#212529] placeholder-[#C2C3CB] focus:outline-none focus:border-[#049AD0] transition-colors"
              />
            </div>

            <!-- Stall No -->
            <div>
              <label class="block text-base font-medium text-[#212529] mb-2">
                Stall No
              </label>
              <input
                type="text"
                [(ngModel)]="formData.stallNo"
                name="stallNo"
                placeholder="Enter Stall No"
                class="w-full px-5 py-3 border-2 border-[#E9EBEC] rounded text-base text-[#212529] placeholder-[#C2C3CB] focus:outline-none focus:border-[#049AD0] transition-colors"
              />
            </div>
          </div>

          <!-- Hall No and Registration Code Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Hall No -->
            <div>
              <label class="block text-base font-medium text-[#212529] mb-2">
                Hall No
              </label>
              <input
                type="text"
                [(ngModel)]="formData.hallNo"
                name="hallNo"
                placeholder="Enter Hall No"
                class="w-full px-5 py-3 border-2 border-[#E9EBEC] rounded text-base text-[#212529] placeholder-[#C2C3CB] focus:outline-none focus:border-[#049AD0] transition-colors"
              />
            </div>

            <!-- Registration Code -->
            <div>
              <label class="block text-base font-medium text-[#212529] mb-2">
                Registration Code
              </label>
              <input
                type="text"
                [(ngModel)]="formData.registrationCode"
                name="registrationCode"
                placeholder="Enter Registration Code"
                class="w-full px-5 py-3 border-2 border-[#E9EBEC] rounded text-base text-[#212529] placeholder-[#C2C3CB] focus:outline-none focus:border-[#049AD0] transition-colors"
              />
            </div>
          </div>

          <!-- Phone and Email Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Phone -->
            <div>
              <label class="block text-base font-medium text-[#212529] mb-2">
                Phone
              </label>
              <input
                type="tel"
                [(ngModel)]="formData.phone"
                name="phone"
                placeholder="Phone"
                class="w-full px-5 py-3 border-2 border-[#E9EBEC] rounded text-base text-[#212529] placeholder-[#C2C3CB] focus:outline-none focus:border-[#049AD0] transition-colors"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-base font-medium text-[#212529] mb-2">
                Email
              </label>
              <input
                type="email"
                [(ngModel)]="formData.email"
                name="email"
                placeholder="Enter Email"
                class="w-full px-5 py-3 border-2 border-[#E9EBEC] rounded text-base text-[#212529] placeholder-[#C2C3CB] focus:outline-none focus:border-[#049AD0] transition-colors"
              />
            </div>
          </div>

          <!-- Social Media and Exhibitors For Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Social Media -->
            <div class="relative">
              <label class="block text-base font-medium text-[#212529] mb-2">
                Social Media
              </label>
              <div class="relative">
                <button
                  type="button"
                  (click)="toggleSocialDropdown()"
                  class="w-full px-4 py-3 border-2 border-[#E9EBEC] rounded text-base text-left text-[#C2C3CB] focus:outline-none focus:border-[#049AD0] transition-colors flex items-center justify-between"
                >
                  <span>Please Select</span>
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
                </button>
                <div
                  *ngIf="showSocialDropdown"
                  class="absolute z-10 w-full mt-1 bg-white border-2 border-[#E9EBEC] rounded shadow-lg"
                >
                  <div class="p-4 space-y-4">
                    <label class="flex items-center gap-3 cursor-pointer">
                      <div
                        class="w-5 h-5 rounded flex items-center justify-center border-2 transition-colors"
                        [class.bg-[#009FD8]]="formData.socialMedia.blogRss"
                        [class.border-[#009FD8]]="formData.socialMedia.blogRss"
                        [class.border-[#BFC3C5]]="!formData.socialMedia.blogRss"
                      >
                        <svg
                          *ngIf="formData.socialMedia.blogRss"
                          width="14"
                          height="14"
                          viewBox="0 0 15 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.1949 3.29512C12.4433 3.50945 12.4659 3.88283 12.2449 4.12464L6.02507 10.932C5.80296 11.1751 5.42162 11.1906 5.18003 10.9663L1.58082 7.62522C1.35636 7.41685 1.33487 7.06965 1.52745 6.8323C1.73995 6.57038 2.13566 6.53433 2.38856 6.75862L5.18107 9.2354C5.42375 9.45065 5.79737 9.4314 6.01602 9.1924L11.366 3.34337C11.5825 3.10668 11.9517 3.08522 12.1949 3.29512Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <input
                        type="checkbox"
                        [(ngModel)]="formData.socialMedia.blogRss"
                        name="blogRss"
                        class="hidden"
                      />
                      <span class="text-base text-[#000]">Blog/Rss</span>
                    </label>
                    <label class="flex items-center gap-3 cursor-pointer">
                      <div
                        class="w-5 h-5 rounded flex items-center justify-center border-2 transition-colors"
                        [class.bg-[#009FD8]]="formData.socialMedia.facebook"
                        [class.border-[#009FD8]]="formData.socialMedia.facebook"
                        [class.border-[#BFC3C5]]="
                          !formData.socialMedia.facebook
                        "
                      >
                        <svg
                          *ngIf="formData.socialMedia.facebook"
                          width="14"
                          height="14"
                          viewBox="0 0 15 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.1949 3.29512C12.4433 3.50945 12.4659 3.88283 12.2449 4.12464L6.02507 10.932C5.80296 11.1751 5.42162 11.1906 5.18003 10.9663L1.58082 7.62522C1.35636 7.41685 1.33487 7.06965 1.52745 6.8323C1.73995 6.57038 2.13566 6.53433 2.38856 6.75862L5.18107 9.2354C5.42375 9.45065 5.79737 9.4314 6.01602 9.1924L11.366 3.34337C11.5825 3.10668 11.9517 3.08522 12.1949 3.29512Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <input
                        type="checkbox"
                        [(ngModel)]="formData.socialMedia.facebook"
                        name="facebook"
                        class="hidden"
                      />
                      <span class="text-base text-[#000]">Facebook</span>
                    </label>
                    <label class="flex items-center gap-3 cursor-pointer">
                      <div
                        class="w-5 h-5 rounded flex items-center justify-center border-2 transition-colors"
                        [class.bg-[#009FD8]]="formData.socialMedia.twitter"
                        [class.border-[#009FD8]]="formData.socialMedia.twitter"
                        [class.border-[#BFC3C5]]="!formData.socialMedia.twitter"
                      >
                        <svg
                          *ngIf="formData.socialMedia.twitter"
                          width="14"
                          height="14"
                          viewBox="0 0 15 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.1949 3.29512C12.4433 3.50945 12.4659 3.88283 12.2449 4.12464L6.02507 10.932C5.80296 11.1751 5.42162 11.1906 5.18003 10.9663L1.58082 7.62522C1.35636 7.41685 1.33487 7.06965 1.52745 6.8323C1.73995 6.57038 2.13566 6.53433 2.38856 6.75862L5.18107 9.2354C5.42375 9.45065 5.79737 9.4314 6.01602 9.1924L11.366 3.34337C11.5825 3.10668 11.9517 3.08522 12.1949 3.29512Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <input
                        type="checkbox"
                        [(ngModel)]="formData.socialMedia.twitter"
                        name="twitter"
                        class="hidden"
                      />
                      <span class="text-base text-[#000]">Twitter</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Exhibitors For -->
            <div>
              <label class="block text-base font-medium text-[#212529] mb-2">
                Exhibitors For
              </label>
              <div class="relative">
                <select
                  [(ngModel)]="formData.exhibitorsFor"
                  name="exhibitorsFor"
                  class="w-full px-4 py-3 border-2 border-[#E9EBEC] rounded text-base text-[#C2C3CB] focus:outline-none focus:border-[#049AD0] transition-colors appearance-none"
                >
                  <option value="">Please Select</option>
                  <option value="products">Products</option>
                  <option value="services">Services</option>
                  <option value="both">Both</option>
                </select>
                <svg
                  class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
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

          <!-- Social Media URLs -->
          <div
            *ngIf="
              formData.socialMedia.blogRss || formData.socialMedia.facebook
            "
            class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          >
            <!-- Blog/RSS URL -->
            <div *ngIf="formData.socialMedia.blogRss" class="relative">
              <input
                type="url"
                [(ngModel)]="formData.blogRssUrl"
                name="blogRssUrl"
                placeholder="Enter Blog/Rss URL"
                class="w-full pl-16 pr-5 py-3 border-2 border-[#E9EBEC] rounded text-base text-[#212529] placeholder-[#C2C3CB] focus:outline-none focus:border-[#049AD0] transition-colors"
              />
              <div
                class="absolute left-0 top-0 w-[50px] h-full bg-[#E9EBEC] rounded-l flex items-center justify-center"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_297_9437)">
                    <path d="M3.09074 15.8186C1.38647 15.8186 0 17.2051 0 18.9093C0 20.6135 1.38652 22 3.09074 22C4.79497 22 6.18144 20.6135 6.18144 18.9093C6.18144 17.2051 4.79493 15.8186 3.09074 15.8186ZM3.09074 20.7032C2.10152 20.7032 1.2968 19.8984 1.2968 18.9093C1.2968 17.9201 2.1016 17.1154 3.09074 17.1154C4.07984 17.1154 4.88464 17.9201 4.88464 18.9093C4.8846 19.8984 4.07988 20.7032 3.09074 20.7032Z" fill="#353846"/>
                    <path d="M14.8538 20.0612C14.2232 16.8822 12.6741 13.9813 10.3742 11.6721C8.05793 9.34652 5.14108 7.78138 1.93905 7.14601C1.46021 7.051 0.969375 7.17402 0.592238 7.48361C0.215832 7.79256 0 8.24906 0 8.73602V10.3368C0 11.1014 0.521512 11.7518 1.26827 11.9184C3.41924 12.3989 5.3845 13.4811 6.95157 15.0481C8.51903 16.6157 9.60128 18.5808 10.0813 20.7312C10.248 21.4781 10.8985 21.9997 11.663 21.9997H13.2637C13.7506 21.9997 14.2071 21.7838 14.5161 21.4075C14.8257 21.0305 14.9487 20.5399 14.8538 20.0612ZM13.5139 20.5846C13.4776 20.6288 13.3969 20.7029 13.2636 20.7029H11.663C11.5103 20.7029 11.3803 20.5984 11.3469 20.4488C10.8132 18.0577 9.61035 15.8731 7.86848 14.1312C6.12704 12.3898 3.94243 11.187 1.55079 10.6529C1.40121 10.6195 1.29675 10.4895 1.29675 10.3368V8.73602C1.29675 8.6029 1.37092 8.52217 1.41509 8.48586C1.45187 8.45578 1.52251 8.41135 1.62027 8.41135C1.64115 8.41135 1.66323 8.41337 1.68661 8.41801C4.63513 9.00312 7.32145 10.4448 9.45536 12.5872C11.5741 14.7146 13.0011 17.3863 13.5818 20.3135C13.6079 20.4456 13.5505 20.5401 13.5139 20.5846Z" fill="#353846"/>
                    <path d="M21.9857 20.1694C21.6484 17.6188 20.8979 15.158 19.7548 12.8556C18.6406 10.6109 17.179 8.56621 15.4109 6.77832C13.6113 4.95838 11.5436 3.4537 9.26518 2.30613C6.92845 1.12905 4.42741 0.357885 1.83163 0.0139202C1.37027 -0.0470095 0.904148 0.0938851 0.553438 0.401155C0.201738 0.709326 0 1.15414 0 1.6216V3.20499C0 4.0046 0.599887 4.69356 1.39545 4.8076C5.34329 5.37371 8.94128 7.15799 11.8004 9.96729C13.2355 11.3778 14.4265 12.9976 15.3405 14.782C16.277 16.6102 16.8997 18.5686 17.1913 20.6024C17.3054 21.399 17.9956 21.9997 18.7966 21.9997H20.3778C20.8452 21.9997 21.2901 21.798 21.5982 21.4465C21.9055 21.0961 22.0466 20.6305 21.9857 20.1694ZM20.6231 20.5916C20.5867 20.6331 20.5064 20.7028 20.3778 20.7028H18.7967C18.634 20.7028 18.4986 20.5832 18.4751 20.4184C18.1631 18.2421 17.4968 16.1468 16.4948 14.1907C15.5174 12.2826 14.2438 10.5504 12.7094 9.04234C9.6516 6.03784 5.80293 4.12955 1.5794 3.52387C1.41569 3.5004 1.29684 3.36626 1.29684 3.20491V1.62151C1.29684 1.49312 1.36649 1.41285 1.40804 1.37646C1.44405 1.34496 1.51594 1.29649 1.6176 1.29649C1.63161 1.29649 1.64618 1.29748 1.6613 1.29942C4.11288 1.62435 6.47496 2.35262 8.68175 3.46405C10.8344 4.54833 12.7881 5.97016 14.4886 7.6899C16.1595 9.37947 17.5405 11.3114 18.5932 13.432C19.6726 15.6063 20.3815 17.9303 20.7 20.3391C20.7164 20.4636 20.6589 20.5507 20.6231 20.5916Z" fill="#353846"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_297_9437">
                      <rect width="22" height="22" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>

            <!-- Facebook URL -->
            <div *ngIf="formData.socialMedia.facebook" class="relative">
              <input
                type="url"
                [(ngModel)]="formData.facebookUrl"
                name="facebookUrl"
                placeholder="Enter Facebook URL"
                class="w-full pl-16 pr-5 py-3 border-2 border-[#E9EBEC] rounded text-base text-[#212529] placeholder-[#C2C3CB] focus:outline-none focus:border-[#049AD0] transition-colors"
              />
              <div
                class="absolute left-0 top-0 w-[50px] h-full bg-[#E9EBEC] rounded-l flex items-center justify-center"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip1)">
                    <path
                      d="M12.4858 21.957H8.9558C8.36618 21.957 7.88654 21.4783 7.88654 20.8899V12.9433H5.82707C5.23745 12.9433 4.75781 12.4645 4.75781 11.8762V8.47106C4.75781 7.88259 5.23745 7.40389 5.82707 7.40389H7.88654V5.69873C7.88654 4.00801 8.41848 2.56957 9.42467 1.53915C10.4354 0.504044 11.8479 -0.0429688 13.5095 -0.0429688L16.2016 -0.0386048C16.7902 -0.0375977 17.269 0.441101 17.269 1.02856V4.19013C17.269 4.7786 16.7896 5.25729 16.2001 5.25729L14.3875 5.25797C13.8347 5.25797 13.694 5.36858 13.6639 5.40248C13.6143 5.45871 13.5552 5.61766 13.5552 6.05658V7.40372H16.0639C16.2528 7.40372 16.4357 7.45021 16.593 7.53783C16.9322 7.72699 17.1431 8.08467 17.1431 8.47122L17.1417 11.8763C17.1417 12.4645 16.6621 12.9432 16.0725 12.9432H13.5552V20.8899C13.5552 21.4783 13.0754 21.957 12.4858 21.957Z"
                      fill="#353846"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <!-- Website -->
          <div class="mb-6">
            <label class="block text-base font-medium text-[#212529] mb-2">
              Website
            </label>
            <input
              type="url"
              [(ngModel)]="formData.website"
              name="website"
              placeholder="Enter Website Url"
              class="w-full px-4 py-3 border-2 border-[#E9EBEC] rounded text-base text-[#212529] placeholder-[#C2C3CB] focus:outline-none focus:border-[#049AD0] transition-colors"
            />
          </div>

          <!-- Description -->
          <div class="mb-6">
            <label class="block text-base font-medium text-[#212529] mb-2">
              Description
            </label>
            <textarea
              [(ngModel)]="formData.description"
              name="description"
              rows="6"
              placeholder="Enter description..."
              class="w-full px-4 py-3 border border-[#CED4DA] rounded text-base text-[#212529] placeholder-[#C2C3CB] focus:outline-none focus:border-[#049AD0] transition-colors resize-none"
            ></textarea>
          </div>

          <!-- Upload Document -->
          <div class="mb-6">
            <label class="block text-base font-medium text-[#212529] mb-2">
              Upload Document
            </label>
            <div
              class="border border-dashed border-[#B9BBBC] rounded py-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#009FD8] transition-colors"
              (click)="documentInput.click()"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="mb-3"
              >
                <path
                  d="M25.0037 27.6419H19.8316H18.4389H18.1381V20.7045H20.407C20.9824 20.7045 21.3224 20.0506 20.9824 19.5798L16.5689 13.4727C16.2877 13.0804 15.7058 13.0804 15.4246 13.4727L11.011 19.5798C10.671 20.0506 11.0045 20.7045 11.5864 20.7045H13.8553V27.6419H13.5546H12.1618H6.16592C2.73314 27.4523 0 24.2418 0 20.7633C0 18.3636 1.30119 16.2713 3.23008 15.1401C3.05354 14.6628 2.96199 14.1528 2.96199 13.6166C2.96199 11.1646 4.9432 9.18341 7.39518 9.18341C7.92481 9.18341 8.43482 9.27495 8.91214 9.45149C10.331 6.44373 13.3911 4.35791 16.9481 4.35791C21.5513 4.36445 25.3437 7.88876 25.7752 12.3808C29.3126 12.9889 32 16.2647 32 19.9721C32 23.9345 28.9138 27.3673 25.0037 27.6419Z"
                  fill="#878A99"
                />
              </svg>
              <p class="text-base font-medium text-[#212529]">
                Drop file here or click to upload.
              </p>
              <input
                #documentInput
                type="file"
                (change)="onDocumentSelected($event)"
                accept=".pdf,.doc,.docx"
                class="hidden"
              />
            </div>
            <p
              *ngIf="formData.documentName"
              class="text-sm text-[#878A99] mt-2"
            >
              Selected: {{ formData.documentName }}
            </p>
          </div>

          <!-- Product Image -->
          <div class="mb-6">
            <label class="block text-base font-medium text-[#212529] mb-2">
              Product Image
            </label>
            <div
              class="border border-dashed border-[#B9BBBC] rounded py-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#009FD8] transition-colors"
              (click)="productImageInput.click()"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="mb-3"
              >
                <path
                  d="M25.0037 27.6419H19.8316H18.4389H18.1381V20.7045H20.407C20.9824 20.7045 21.3224 20.0506 20.9824 19.5798L16.5689 13.4727C16.2877 13.0804 15.7058 13.0804 15.4246 13.4727L11.011 19.5798C10.671 20.0506 11.0045 20.7045 11.5864 20.7045H13.8553V27.6419H13.5546H12.1618H6.16592C2.73314 27.4523 0 24.2418 0 20.7633C0 18.3636 1.30119 16.2713 3.23008 15.1401C3.05354 14.6628 2.96199 14.1528 2.96199 13.6166C2.96199 11.1646 4.9432 9.18341 7.39518 9.18341C7.92481 9.18341 8.43482 9.27495 8.91214 9.45149C10.331 6.44373 13.3911 4.35791 16.9481 4.35791C21.5513 4.36445 25.3437 7.88876 25.7752 12.3808C29.3126 12.9889 32 16.2647 32 19.9721C32 23.9345 28.9138 27.3673 25.0037 27.6419Z"
                  fill="#878A99"
                />
              </svg>
              <p class="text-base font-medium text-[#212529]">
                Drop Images here or click to upload.
              </p>
              <input
                #productImageInput
                type="file"
                (change)="onProductImageSelected($event)"
                accept="image/*"
                multiple
                class="hidden"
              />
            </div>
            <p
              *ngIf="formData.productImageNames.length > 0"
              class="text-sm text-[#878A99] mt-2"
            >
              Selected: {{ formData.productImageNames.join(", ") }}
            </p>
          </div>

          <!-- Modal Footer -->
          <div class="flex justify-end gap-3 pt-6">
            <button
              type="button"
              (click)="onCancel()"
              class="px-6 py-2 bg-[#DEE1EB] hover:bg-[#CED1DB] rounded text-[#4C546C] font-semibold transition-colors flex items-center gap-2"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip2)">
                  <path
                    d="M0.620965 12C0.462896 12 0.304826 11.9399 0.184729 11.8189C-0.0563682 11.5778 -0.0563682 11.1869 0.184729 10.9458L10.9497 0.180823C11.1908 -0.0602744 11.5817 -0.0602744 11.8228 0.180823C12.0639 0.421921 12.0639 0.8128 11.8228 1.05405L1.05795 11.8189C0.936954 11.9392 0.778884 12 0.620965 12Z"
                    fill="currentColor"
                  />
                  <path
                    d="M11.3867 12C11.2287 12 11.0707 11.9399 10.9505 11.8189L0.184729 1.05405C-0.0563682 0.8128 -0.0563682 0.421921 0.184729 0.180823C0.425827 -0.0602744 0.816707 -0.0602744 1.05795 0.180823L11.8228 10.9458C12.0639 11.1869 12.0639 11.5778 11.8228 11.8189C11.7018 11.9392 11.5439 12 11.3867 12Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip2">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Close
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-[#009FD8] hover:bg-[#0385b5] text-white rounded font-semibold transition-colors flex items-center gap-2"
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class AddExhibitorModalComponent {
  @Input() isOpen = false;
  @Input() editMode = false;
  @Input() set exhibitorData(data: any) {
    if (data) {
      this.formData = {
        companyName: data.companyName || "",
        hallNo: data.hallNo || "",
        stallNo: data.stallNo || "",
        registrationCode: data.registrationCode || "",
        phone: data.phone || "",
        email: data.email || "",
        socialMedia: {
          blogRss: data.socialMedia?.blogRss || false,
          facebook: data.socialMedia?.facebook || false,
          twitter: data.socialMedia?.twitter || false,
        },
        blogRssUrl: data.blogRssUrl || "",
        facebookUrl: data.facebookUrl || "",
        exhibitorsFor: data.exhibitorsFor || "",
        website: data.website || "",
        description: data.description || "",
        companyLogo: data.companyLogo || "",
        documentName: data.documentName || "",
        productImageNames: data.productImageNames || [],
      };
    }
  }

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  showSocialDropdown = false;

  formData = {
    companyName: "",
    hallNo: "",
    stallNo: "",
    registrationCode: "",
    phone: "",
    email: "",
    socialMedia: {
      blogRss: false,
      facebook: false,
      twitter: false,
    },
    blogRssUrl: "",
    facebookUrl: "",
    exhibitorsFor: "",
    website: "",
    description: "",
    companyLogo: "",
    documentName: "",
    productImageNames: [] as string[],
  };

  toggleSocialDropdown() {
    this.showSocialDropdown = !this.showSocialDropdown;
  }

  onLogoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.formData.companyLogo = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onDocumentSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.formData.documentName = input.files[0].name;
    }
  }

  onProductImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.formData.productImageNames = Array.from(input.files).map(
        (file) => file.name,
      );
    }
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }
    this.save.emit(this.formData);
    this.resetForm();
  }

  onCancel() {
    this.close.emit();
    this.resetForm();
    this.showSocialDropdown = false;
  }

  private validateForm(): boolean {
    if (!this.formData.companyName.trim()) {
      alert("Please enter company name");
      return false;
    }
    if (!this.formData.hallNo.trim()) {
      alert("Please enter hall number");
      return false;
    }
    if (!this.formData.stallNo.trim()) {
      alert("Please enter stall number");
      return false;
    }
    if (!this.formData.registrationCode.trim()) {
      alert("Please enter registration code");
      return false;
    }
    return true;
  }

  private resetForm() {
    this.formData = {
      companyName: "",
      hallNo: "",
      stallNo: "",
      registrationCode: "",
      phone: "",
      email: "",
      socialMedia: {
        blogRss: false,
        facebook: false,
        twitter: false,
      },
      blogRssUrl: "",
      facebookUrl: "",
      exhibitorsFor: "",
      website: "",
      description: "",
      companyLogo: "",
      documentName: "",
      productImageNames: [],
    };
  }
}
