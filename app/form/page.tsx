import { MultiStepForm } from "@/components/form/MultiStepForm";

export default function FormPage() {
  return (
    <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Create Your Landing Page
              </h1>
              <p className="text-xl text-muted-foreground">
                Answer a few questions and we'll generate your landing page copy
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6 sm:p-8 shadow-sm">
              <MultiStepForm />
            </div>
          </div>
        </div>
      </main>
  );
}

