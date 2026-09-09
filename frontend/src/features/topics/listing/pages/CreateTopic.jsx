import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import CreateTopicForm from "../components/CreateTopicForm";
import { useTopics, } from "../../hooks/useTopics"

export default function CreateTopic() {
  const navigate = useNavigate();

  const {
    createTopic,
  } = useTopics();

  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async (topicData) => {
    try 
    {
      setError(null);
      setIsCreating(true);

      const topic = await createTopic(topicData);

      navigate(`/topics/${topic.id}/library`);
    } 
    catch (error) 
    {
      console.error("Failed to create topic:", error);
      setError(error.message || "Failed to create topic.");
    } 
    finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
      
      {/* Top Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      {/* Header */}
      <div className="text-left mb-10">

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Initialize Study Topic
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-xl dark:text-slate-400">
          Establish the structural seed of your dynamic workspace. Set the foundation now, and you can upload files and invite peers immediately after.
        </p>
      </div>

      {
        error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )
      }

      {/* Form Container */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900 sm:p-8">
        <CreateTopicForm
          onSubmit={handleCreate}
          onCancel={() => navigate(-1)}
          isSubmitting={isCreating}
        />
      </div>
      
    </div>
  );
}