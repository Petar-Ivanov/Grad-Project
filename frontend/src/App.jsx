import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import TopicLayout from "./layouts/TopicLayout";
import MaterialLayout from "./layouts/MaterialLayout";

import ProtectedRoute from "./features/auth/components/ProtectedRoute";

import Landing from "./features/landing/pages/Landing";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

import Dashboard from "./features/dashboard/pages/Dashboard";
import Profile from "./features/profile/pages/Profile";

import CreateTopic from "./features/topics/listing/pages/CreateTopic";
import MyTopics from "./features/topics/listing/pages/MyTopics";

import Build from "./features/topics/workspace/build/pages/Build";
import Library from "./features/topics/workspace/materials-listing/pages/Materials";
import Sharing from "./features/topics/workspace/sharing/pages/Sharing";
import TopicSettings from "./features/topics/workspace/topic-settings/pages/TopicSettings";

import StudyDoc from "./features/materials/pages/StudyDoc";
// import TestDoc from "./features/materials/pages/TestDoc";

function App() {
  return (
    <Routes>

        {/* Public pages */}

        <Route element={<PublicLayout />}>
            <Route
                path="/"
                element={<Landing />}
            />
        </Route>


        {/* Authentication pages */}

        <Route element={<AuthLayout />}>
            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />
        </Route>


        {/* Protected application */}

        <Route element={<ProtectedRoute />}>

            <Route element={<AppLayout />}>

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/topics"
                    element={<MyTopics />}
                />

                <Route
                    path="/topics/new"
                    element={<CreateTopic />}
                />


                <Route
                    path="/topics/:id"
                    element={<TopicLayout />}
                >
                    <Route
                        index
                        element={
                            <Navigate
                                to="library"
                                replace
                            />
                        }
                    />

                    <Route
                        path="build"
                        element={<Build />}
                    />

                    <Route
                        path="library"
                        element={<Library />}
                    />

                    <Route
                        path="sharing"
                        element={<Sharing />}
                    />

                    <Route
                        path="topic-settings"
                        element={<TopicSettings />}
                    />
                </Route>

            </Route>


            <Route element={<MaterialLayout />}>
                <Route
                    path="/topics/:id/study/:docId"
                    element={<StudyDoc />}
                />

                {/* 
                <Route
                    path="/topics/:id/test/:testId"
                    element={<TestDoc />}
                />
                */}
            </Route>

        </Route>

    </Routes>
  );
}

export default App;
