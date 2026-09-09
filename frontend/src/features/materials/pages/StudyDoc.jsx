import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DocumentRenderer from "../components/DocumentRenderer";
import Sidebar from "../components/Sidebar";
import { useStudyDocument } from "../hooks/useStudyDocument";
import { useStudyDocumentPersonalState } from "../hooks/useStudyDocumentPersonalState";
import { GoBackIcon, MenuIcon } from "../../../components/icons/index.jsx";
import { useTopicAccess, } from "../../topics/hooks/useTopicAccess";
import { useMaterialVisit, } from "../../materials/hooks/useMaterialVisit";


export default function StudyDoc() {
  const { id: topicId, docId } = useParams();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeId, setActiveId] = useState("");

  const {
      recordVisit,
  } = useMaterialVisit();

  const recordedVisitRef = useRef(null);
  
  const {
      document,
      isLoading,
      isSaving,
      error,
      addBlock,
      moveBlock,
      updateBlock,
      deleteBlock,
  } = useStudyDocument(docId);

  const {
      personalState,
      getCommentForBlock,
      togglePin,
      toggleBlockHidden,
      saveComment,
      hideComment,
      showComment,
      deleteComment,
      isSaving: isPersonalSaving,
      error: personalError,
  } = useStudyDocumentPersonalState(docId);

  const {
      canEdit,
      canView,
      isLoading: isAccessLoading,
      error: accessError,
  } = useTopicAccess(topicId);

  const combinedError = 
    error ?? personalError ?? accessError;

  const blocks = useMemo(() => {
    return document?.content_json?.blocks ?? [];
  }, [document]);

  const isCorrectTopic =
    document && Number(document.topic_id) === Number(topicId);

  const dynamicHeadings = useMemo(() => {
    return blocks.filter(block => block.type === "heading").map(block => {
      const rawText = block.data?.text ?? "";
      const title = rawText.replace(/<[^>]*>/g, "").trim();

      return {
        id: block.id,
        title: title || "Untitled Section",
        level: block.data.level || 2 
      };
    });
  }, [blocks]);

  useEffect(() => {
    const visibleHeadings = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleHeadings.set(entry.target.id, entry.target);
          } else {
            visibleHeadings.delete(entry.target.id);
          }
        });

        if (visibleHeadings.size === 0) {
          return;
        }

        const closest = Array.from(visibleHeadings.values()).sort(
          (a, b) => Math.abs(a.getBoundingClientRect().top) - Math.abs(b.getBoundingClientRect().top)
        )[0];

        setActiveId(closest.id);

      },
      { rootMargin: "-80px 0px -40% 0px" }
    );
  
    dynamicHeadings.forEach((heading) => {
      const element = window.document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [dynamicHeadings]);

  // visit effect 
  useEffect(() => {
    if (!document?.id || isAccessLoading || !canView) {
      return;
    }

    if (recordedVisitRef.current === document.id) {
      return;
    }

    recordedVisitRef.current = document.id;

    recordVisit(document.id);
  }, [document?.id, isAccessLoading, canView, recordVisit,]);

  // useEffect(() => {
  //   if (!document?.id) {
  //     return;
  //   }

  //   if (recordedVisitRef.current === document.id) {
  //     return;
  //   }

  //   recordedVisitRef.current = document.id;

  //   recordVisit(document.id);
  // }, [document?.id, recordVisit,]);


  if (isLoading || isAccessLoading) {
      return (
          <div className="p-8">
              Loading document...
          </div>
      );
  }

  if (combinedError) {
    return (
      <div className="p-8 text-red-500">
          Failed to load document.
      </div>
    );
  }

  if (!document) {
      return (
      <div className="p-8 text-red-500">
          Document not found.
      </div>
    );
  }

  if (!isCorrectTopic) {
    return (
        <div className="p-8">
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                Material not found
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                This material does not belong to the requested topic.
            </p>
        </div>
    );
  }

  if (!canView) {
      return (
        <div className="p-8">
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                Access denied
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                You do not have access to this topic.
            </p>
        </div>
      );
  }
  
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950">

      {/* Mobile Header Buttons */}
      <div className="fixed top-6 left-6 z-30 flex items-center gap-4 md:hidden">
        <button
            onClick={() => navigate(-1)}
            className="text-slate-400 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-200 transition-colors"
            aria-label="Go Back"
        >
            <GoBackIcon className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" />
        </button>
        <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-400 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-200 transition-colors"
            aria-label="Open Menu"
        >
            <MenuIcon className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" />
        </button>
      </div>
      
      {/* Sidebar */}
      <Sidebar
          isOpen={sidebarOpen}
          onOpen={() => setSidebarOpen(true)}
          onClose={() => setSidebarOpen(false)}
          headings={dynamicHeadings}
          activeId={activeId}
          onSearch={setSearchTerm}
      />

      {/* Study Doc Body */}
      <div className="max-w-3xl mx-auto px-6 py-16 sm:px-12 md:pl-24">
        <header className="mb-12 border-b border-slate-100 pb-6 dark:border-slate-800">

            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {document?.name ?? document?.content_json?.title ?? "Untitled Material"}
          </h1>

            <p className="text-sm text-slate-400 mt-2">
                {document?.content_json?.description ?? "Description"}
            </p>

            {(isSaving || isPersonalSaving) && (
                <span className="text-xs text-slate-400">
                    Saving...
                </span>
            )}

        </header>


        <DocumentRenderer
            blocks={blocks}
            mode="study"
            searchTerm={searchTerm}

            canEdit={canEdit}

            onAddBlock={addBlock}
            onMoveBlock={moveBlock}
            onUpdateBlock={updateBlock}
            onDeleteBlock={deleteBlock}

            personalState={personalState}
            getCommentForBlock={getCommentForBlock}

            onTogglePin={togglePin}
            onToggleBlockHidden={toggleBlockHidden}

            onSaveComment={saveComment}
            onHideComment={hideComment}
            onShowComment={showComment}
            onDeleteComment={deleteComment}
        />

      </div>

    </div>

  );
}