import AnimatedInput from "@/components/AnimatedInput";
import { toast } from "sonner";

const Index = () => {
  const handleSubmit = (question: string) => {
    toast.success("Question submitted: " + question);
    console.log("Question submitted:", question);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-2xl mb-8">
        
        
      </div>
      
      <AnimatedInput onSubmit={handleSubmit} className="shadow-lg" />
      
      <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Just an animated prototype, icons, fonts and rest does not match the actual design.
      </div>
      
      <div className="mt-12 w-full max-w-2xl">
        
      </div>
    </div>
  );
};

export default Index;
