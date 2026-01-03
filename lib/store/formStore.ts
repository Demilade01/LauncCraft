import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormData } from "@/lib/schemas/formSchema";

interface FormStore {
  formData: Partial<FormData>;
  currentStep: number;
  setFormData: (data: Partial<FormData>) => void;
  updateFormData: (data: Partial<FormData>) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetForm: () => void;
}

const initialFormData: Partial<FormData> = {
  productName: "",
  productDescription: "",
  targetAudience: "",
  problemStatement: "",
  mainBenefit: "",
  ctaText: "",
  ctaType: "signup",
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      formData: initialFormData,
      currentStep: 1,
      setFormData: (data) => set({ formData: data }),
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 5),
        })),
      previousStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),
      resetForm: () =>
        set({
          formData: initialFormData,
          currentStep: 1,
        }),
    }),
    {
      name: "launchcraft-form-storage",
    }
  )
);

