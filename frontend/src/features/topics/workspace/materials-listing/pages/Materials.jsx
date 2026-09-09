import { SearchIcon } from "../../../../../components/icons";
import { useState, useMemo } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import MaterialCard from "../components/MaterialCard";
import MaterialFilters from "../components/MaterialFilters";
import RenameMaterialModal from "../components/modals/RenameMaterialModal";
import DeleteMaterialModal from "../components/DeleteMaterialModal";

import { useTopicMaterials } from "../hooks/useTopicMaterials";

export default function Materials() {
    const {
        topic,
        theme,
        role,
    } = useOutletContext();

    const navigate = useNavigate();

    const isOwner =
        role === "owner";

    const {
        materials,
        isLoading,
        error,
        createMaterial,
        renameMaterial,
        duplicateMaterial,
        deleteMaterial,
        isMutating,
        mutationError,
    } = useTopicMaterials(topic.id);

    // Controls State
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [sortBy, setSortBy] = useState("updated_at");
    const [sortOrder, setSortOrder] = useState("desc");
    const [viewMode, setViewMode] = useState("grid");

    const [activeModal, setActiveModal] = useState({ type: null, item: null });

    const processedItems = useMemo(() => {
        let result = [...materials];

        const normalizedSearch =
            search.trim().toLowerCase();

        result = result.filter((item) => {
            const matchesSearch =
                !normalizedSearch || item.name?.toLowerCase().includes(normalizedSearch);

            const matchesType =
                filter === "All" ||
                item.type === filter;

            return (matchesSearch && matchesType);
        });

        result.sort((a, b) => {
                if (sortBy === "alphabetical") {
                    const comparison =
                        (a.name ?? "").toLowerCase().localeCompare(
                            (b.name ?? "").toLowerCase()
                        );

                    return (sortOrder === "asc")
                        ? comparison
                        : -comparison;
                }

                const aTime = new Date(a.updated_at).getTime();

                const bTime = new Date(b.updated_at).getTime();

                const comparison = aTime - bTime;

                return (sortOrder === "asc")
                    ? comparison
                    : -comparison;
            }
        );

        return result;
    }, [
        materials,
        search,
        filter,
        sortBy,
        sortOrder,
    ]);

    const handleCreateEmpty = async (type) => {
        if (!isOwner) {
            return;
        }

        const material = await createMaterial({type});

        setActiveModal({
            type: "rename",
            item: material,
        });
    };

    const handleNavigateToBuild = () => {
        navigate("../build", { state: { intent: 'generate' } });
    };

    const handleRename = async (newName) => {
        if (!activeModal.item || !isOwner) {
            return;
        }

        const material =
            await renameMaterial({
                materialId: activeModal.item.id,
                name: newName,
            });

        setActiveModal({
            type: null,
            item: null,
        });

        return material;
    };


    const handleDuplicate = async (item) => {
        if (!isOwner) {
            return;
        }

        try {
            await duplicateMaterial(item.id);
        } catch (error) {
            console.error("Failed to duplicate material:", error);
        }
    };

    const handleDelete = async () => {
        if (!activeModal.item || !isOwner) {
            return;
        }

        try {
            await deleteMaterial(activeModal.item.id);

            setActiveModal({
                type: null,
                item: null,
            });
        } catch (error) {
            console.error("Failed to delete material:", error);
        }
    };


    if (isLoading) {
        return (
            <div className="space-y-6 pb-32">
                <div className="text-sm text-slate-400">
                    Loading materials...
                </div>
            </div>
        );
    }


    if (error) {
        return (
            <div className="space-y-6 pb-32">
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                    Failed to load materials.{" "}
                    {error.message}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-32">

        {mutationError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                {mutationError.message}
            </div>
        )}

        <MaterialFilters 
            search={search} 
            setSearch={setSearch} 
            sortBy={sortBy} 
            setSortBy={setSortBy} 
            sortOrder={sortOrder} 
            setSortOrder={setSortOrder} 
            viewMode={viewMode} 
            setViewMode={setViewMode} 
            filter={filter} 
            setFilter={setFilter} 
            theme={theme}
            isOwner={isOwner}
            onCreateEmpty={handleCreateEmpty}
            onNavigateToBuild={handleNavigateToBuild}
        />

        {/* Grid/List Render */}
        <div className={viewMode === "grid" 
            ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" 
            : "flex flex-col gap-3"}
        >
            {
                processedItems.length > 0 
                ? (
                    processedItems.map(item => (
                        <MaterialCard
                            key={item.id}
                            item={item}
                            topicId={topic.id}
                            theme={theme}
                            viewMode={viewMode}
                            isOwner={isOwner}
                            onRename={(material) =>
                                setActiveModal({
                                    type: "rename",
                                    item: material,
                                })
                            }
                            onDuplicate={handleDuplicate}
                            onDelete={(material) =>
                                setActiveModal({
                                    type: "delete",
                                    item: material,
                                })
                            }
                        />
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
                        No materials found.
                    </div>
                )
            }
        </div>

        <RenameMaterialModal
            isOpen={activeModal.type === "rename"}
            initialName={activeModal.item?.name}
            onConfirm={handleRename}
            onCancel={() =>
                setActiveModal({
                    type: null,
                    item: null,
                })
            }
            theme={theme}
            isSubmitting={isMutating}
        />

        <DeleteMaterialModal
            isOpen={activeModal.type === "delete"}
            itemName={activeModal.item?.name}
            onConfirm={handleDelete}
            onCancel={() =>
                setActiveModal({
                    type: null,
                    item: null,
                })
            }
            isSubmitting={isMutating}
        />
        </div>
    );
}

// Mock Data State
// const [libraryItems, setLibraryItems] = useState([
//     { id: 1, name: "Schrodinger Proof", type: "Study Doc", cat: "Study Doc", edited_at: "2026-06-22" },
//     { id: 2, name: "Midterm Comprehensive Summary", type: "Study Doc", cat: "Study Doc", edited_at: "2026-07-02" },
//     { id: 3, name: "Quantum Postulates Core", type: "Presentation", cat: "Presentation", edited_at: "2026-07-03" },

//     { id: 4, name: "Schrodinger Proof", type: "Study Doc", cat: "Study Doc", edited_at: "2026-06-22" },
//     { id: 5, name: "Midterm Comprehensive Summary", type: "Study Doc", cat: "Study Doc", edited_at: "2026-07-02" },
//     { id: 6, name: "Quantum Postulates Core", type: "Presentation", cat: "Presentation", edited_at: "2026-07-03" },

//     { id: 7, name: "Schrodinger Proof", type: "Study Doc", cat: "Study Doc", edited_at: "2026-06-22" },
//     { id: 8, name: "Midterm Comprehensive Summary", type: "Study Doc", cat: "Study Doc", edited_at: "2026-07-02" },
//     { id: 9, name: "Quantum Postulates Core", type: "Presentation", cat: "Presentation", edited_at: "2026-07-03" },

//     { id: 10, name: "Schrodinger Proof", type: "Study Doc", cat: "Study Doc", edited_at: "2026-06-22" },
//     { id: 11, name: "Midterm Comprehensive Summary", type: "Study Doc", cat: "Study Doc", edited_at: "2026-07-02" },
//     { id: 12, name: "Quantum Postulates Core", type: "Presentation", cat: "Presentation", edited_at: "2026-07-03" },
// ]);