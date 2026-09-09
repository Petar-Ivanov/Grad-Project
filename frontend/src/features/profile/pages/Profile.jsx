import {
    useEffect,
    useState,
} from "react";
import ProfileForm from "../components/ProfileForm";
import DangerZone from "../components/DangerZone";
import SaveChangesModal from "../components/modals/SaveChangesModal";
import DeleteAccountModal from "../components/modals/DeleteAccountModal";
import {
    useProfile,
} from "../hooks/userProfile";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();

    const {
        profile,
        isLoading,

        updateProfile,
        deleteProfile,

        isSaving,
        isDeleting,

        saveError,
        deleteError,
    } = useProfile();

    const [formData, setFormData] = useState(null);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // loading server data into the form on page load
    useEffect(() => {
        if (!profile) {
            return;
        }

        setFormData({
            username:
                profile.username ?? "",

            email:
                profile.email ?? "",

            password:
                "",

            birthday:
                profile.birthday ?? "",

            educationLevel:
                profile.educationLevel ?? "",

            learningStyle:
                profile.learningStyle ?? "",

            bio:
                profile.bio ?? "",
        });
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirmSave = async () => {
        try {
            setIsSaveModalOpen(false);

            const payload = {
                ...formData,
            };

            if (!payload.password ?.trim()) {
                delete payload.password;
            }

            await updateProfile(payload);

            // resetting pasword after save
            setFormData(
                (previous) => ({
                    ...previous,
                    password: "",
                })
            );

        } catch (error) {
            console.error("Profile update failed:", error);
        }
    };


    const handleConfirmDelete = async () => {
        try {
            await deleteProfile();

            setIsDeleteModalOpen(false);

            navigate("/login", {replace: true});

        } catch (error) {
            console.error("Account deletion failed:", error);
        }
    };

    const getInitials = (name) => {
        if (!name) return "U";
        const parts = name.split(/[_\s-]/);
        if (parts.length >= 2) {
          return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    if (isLoading || !formData) {
        return (
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="text-sm text-slate-400">
                    Loading profile...
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-32">
            
            {/* Header with Avatar */}
            <div className="mb-10 flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-2xl font-extrabold text-indigo-600 shadow-sm dark:bg-indigo-900/50 dark:text-indigo-400">
                    {getInitials(formData.username)}
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                        Profile Settings
                    </h1>
                    <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                        Manage your account credentials, personal context, and learning preferences.
                    </p>
                </div>
            </div>

            {saveError && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                    {saveError.message}
                </div>
            )}

            {deleteError && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                    {deleteError.message}
                </div>
            )}


            {/* Main Form */}
            <ProfileForm 
                formData={formData} 
                onChange={handleChange} 
                onSubmitClick={() => setIsSaveModalOpen(true)} 
                isSaving={isSaving}//
            />

            {/* Danger Zone */}
            <DangerZone 
                onDeleteClick={() => setIsDeleteModalOpen(true)}
                isDeleting={isDeleting} 
            />

            {/* Modals */}
            <SaveChangesModal 
                isOpen={isSaveModalOpen} 
                onClose={() => setIsSaveModalOpen(false)} 
                onConfirm={handleConfirmSave} 
                isSaving={isSaving}
            />
            
            <DeleteAccountModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting} 
            />

        </div>
    );
}

// import ProfileCard from "../components/ProfileCard";
// import PasswordChangeForm from "../components/PasswordChangeForm";

// export default function Profile() {
//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
//       <div>
//         <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
//           Profile Settings
//         </h1>
//         <p className="text-xs text-slate-400 mt-1">
//           Manage your identity, personal biography, and platform security.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//         {/* Profile Card & Info */}
//         <div className="md:col-span-2 space-y-8">
//           <ProfileCard/>
//         </div>

//         {/* Security Actions Stack */}
//         <div className="space-y-8">
//           <PasswordChangeForm />

//           {/* Future Delete Account Anchor */}
//           <div className="rounded-xl border border-red-200 bg-red-50/10 p-6 dark:border-red-950/30">
//             <h4 className="text-sm font-bold text-red-600 dark:text-red-400">
//               Danger Zone
//             </h4>
//             <p className="text-xs text-slate-400 mt-1 leading-relaxed">
//               Permanently delete your profile, study workspaces, and vector indexes.
//             </p>
//             <button className="mt-4 rounded-lg bg-red-600 hover:bg-red-500 text-white px-3 py-2 text-xs font-semibold transition-colors">
//               Delete Account
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }