import { useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import TopicFilters from "../components/TopicFilters";
import TopicCard from "../components/TopicCard";
import SubscriptionModal from "../components/modals/SubscriptionModal";
// import { processTopics } from "../utils/topicUtils";
import { getAvailableCategories } from "../../config/topicThemes";
import { useTopics, } from "../../hooks/useTopics"

export default function MyTopics() {

  const navigate = useNavigate();

  const {
      topics,

      isLoading,
      error,

      followTopic,
      unfollowTopic,

      isMutating,
      mutationError,
  } = useTopics();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recently_visited");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("grid");
  const [category, setCategory] = useState("all");
  const [sourceTab, setSourceTab] = useState("my_topics");

  const [
    modalConfig, 
    setModalConfig
  ] = useState({ 
    isOpen: false, 
    type: null, 
    topic: null 
  });

  const categories = ["all", ...getAvailableCategories()];


  const processedTopics = useMemo(() => {
    let result = [...topics];

    // Tab filtering
    if (sourceTab === "my_topics") {
      result = result.filter((topic) =>
        topic.role === "owner"
      );
    }
    else if (sourceTab === "shared") {
      // access relationship between user and topic 
      result = result.filter((topic) =>
        topic.is_followed
      );
    }
    else if (sourceTab === "public") {
      result = result.filter((topic) =>
        topic.is_public
      );
    }

    // Search
    const normalizedSearch = search.trim().toLowerCase();
    if (normalizedSearch) {
        result = result.filter((topic) => {
          const name =
            topic.name?.toLowerCase() ?? "";

          const description =
            topic.description?.toLowerCase() ?? "";

          const owner =
            topic.owner?.username?.toLowerCase() ?? "";

          return (
            name.includes(normalizedSearch) ||
            description.includes(normalizedSearch) ||
            owner.includes(normalizedSearch)
          );
        }
      );
    }

    // Category
    if (category !== "all") {
      result = result.filter((topic) =>
        topic.category === category
      );
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "alphabetical") {
        comparison =
          (a.name ?? "").localeCompare(b.name ?? "");
      }
      else if (sortBy === "created_at") {
        comparison =
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime();
      }
      else if (sortBy === "updated_at") {
        comparison = 
          new Date(a.updated_at).getTime() -
          new Date(b.updated_at).getTime();
      }
      else {
        // recently_visited
        const aTime =
          a.last_visited_at
            ? new Date(a.last_visited_at).getTime()
            : 0;

        const bTime =
          b.last_visited_at
            ? new Date(b.last_visited_at).getTime()
            : 0;

        comparison = aTime - bTime;
      }

      return (sortOrder === "asc")
              ? comparison
              : -comparison;
    });

    return result;

  }, [
      topics,
      sourceTab,
      search,
      category,
      sortBy,
      sortOrder,
  ]);


  // Subscription Actions
  const handleActionClick = (topic, type) => {
    setModalConfig({ 
      isOpen: true, 
      type, 
      topic 
    });
  };

  const handleConfirmAction = async () => {
    const {topic, type} = modalConfig;

    if (!topic) {
      return;
    }

    try {
      if (type === "follow") {
        await followTopic(topic.id);
      }

      else if (type === "unfollow") {
        await unfollowTopic(
          topic.id
        );
      }


      setModalConfig({
        isOpen: false,

        type: null,

        topic: null,
      });

    } catch (error) {
        console.error("Topic access action failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-sm text-slate-400">
          Loading topics...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          Failed to load topics.
          {" "}
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Topics
        </h1>
      </div>

      {mutationError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          {mutationError.message}
        </div>
      )}

      <TopicFilters
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        viewMode={viewMode}
        setViewMode={setViewMode}
        category={category}
        setCategory={setCategory}
        categories={categories}
        sourceTab={sourceTab}
        setSourceTab={setSourceTab}
        onCreateClick={() => navigate("/topics/new")}
      />

      <div className={
        viewMode === "grid" 
        ? "flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6" 
        : "flex flex-col gap-4"
      }>
        {processedTopics.length > 0 
        ? (
            processedTopics.map(topic => (
              <TopicCard 
                key={topic.id} 
                topic={topic} 
                viewMode={viewMode} 
                // currentUser={CURRENT_USER}
                onActionClick={handleActionClick} 
              />
            ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500 dark:text-slate-400">
            No topics found matching your criteria.
          </div>
        )}
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal 
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        topicName={modalConfig.topic?.name}
        onConfirm={handleConfirmAction}
        onCancel={() => 
          setModalConfig({ 
            isOpen: false, 
            type: null, 
            topic: null 
          }
        )}
        isSubmitting={isMutating}
      />
      
    </div>
  );
}