
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
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-gray-100">
          Travel Assistant
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Ask any travel-related questions and get instant answers
        </p>
      </div>
      
      <AnimatedInput 
        onSubmit={handleSubmit}
        className="shadow-lg"
      />
      
      <div className="mt-12 w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Popular Questions</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• How to change my flight date?</li>
              <li>• Can I bring my pet on the flight?</li>
              <li>• What is the baggage allowance?</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Travel Tips</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Check-in online 24 hours before departure</li>
              <li>• Arrive at least 2 hours before domestic flights</li>
              <li>• Keep travel documents in an accessible place</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
